package api

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"time"

	"github.com/cipherchat/backend/internal/db"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	Store *db.Store
}

// --- Request/Response Structs ---

type RegisterInitRequest struct {
	PhoneNumber    string `json:"phone_number"`
	Username       string `json:"username"`
	Password       string `json:"password"`
	IdentityKey    []byte `json:"identity_public_key"`
	RegistrationID int    `json:"registration_id"`
}

type RegisterVerifyRequest struct {
	PhoneNumber string `json:"phone_number"`
	OTP         string `json:"otp"`
}

type LoginInitRequest struct {
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}

type LoginVerifyRequest struct {
	PhoneNumber string `json:"phone_number"`
	OTP         string `json:"otp"`
}

type AuthResponse struct {
	Token  string `json:"token"`
	UserID string `json:"user_id"`
}

// --- Constants ---

var jwtSecret = []byte("SUPER_SECRET_KEY_CHANGE_ME") // In prod, load from config

// --- Handlers ---

// RegisterInit: Validates input, hashes password, generates OTP, stores temp data in Redis
func (h *AuthHandler) RegisterInit(w http.ResponseWriter, r *http.Request) {
	var req RegisterInitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 1. Hash Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to process password", http.StatusInternalServerError)
		return
	}

	// 2. Generate OTP
	otp, err := generateOTP()
	if err != nil {
		http.Error(w, "Failed to generate OTP", http.StatusInternalServerError)
		return
	}

	// 3. Store Data in Redis (TTL 5 mins)
	ctx := context.Background()

	// Store Registration Data
	regData := map[string]interface{}{
		"username":            req.Username,
		"password_hash":       string(hashedPassword),
		"identity_public_key": req.IdentityKey,
		"registration_id":     req.RegistrationID,
	}
	regDataJSON, _ := json.Marshal(regData)

	if err := h.Store.Redis.Set(ctx, "reg_data:"+req.PhoneNumber, regDataJSON, 5*time.Minute).Err(); err != nil {
		http.Error(w, "Redis error", http.StatusInternalServerError)
		return
	}

	// Store OTP
	if err := h.Store.Redis.Set(ctx, "otp:"+req.PhoneNumber, otp, 5*time.Minute).Err(); err != nil {
		http.Error(w, "Redis error", http.StatusInternalServerError)
		return
	}

	// 4. Log OTP (No-cost SMS)
	log.Printf("[OTP] Registration OTP for %s: %s", req.PhoneNumber, otp)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "OTP sent"})
}

// RegisterVerify: Validates OTP, creates user, returns token
func (h *AuthHandler) RegisterVerify(w http.ResponseWriter, r *http.Request) {
	var req RegisterVerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	// 1. Validate OTP
	storedOTP, err := h.Store.Redis.Get(ctx, "otp:"+req.PhoneNumber).Result()
	if err != nil || storedOTP != req.OTP {
		http.Error(w, "Invalid or expired OTP", http.StatusUnauthorized)
		return
	}

	// 2. Retrieve Registration Data
	regDataJSON, err := h.Store.Redis.Get(ctx, "reg_data:"+req.PhoneNumber).Result()
	if err != nil {
		http.Error(w, "Registration session expired", http.StatusBadRequest)
		return
	}

	var regData struct {
		Username       string `json:"username"`
		PasswordHash   string `json:"password_hash"`
		IdentityKey    []byte `json:"identity_public_key"`
		RegistrationID int    `json:"registration_id"`
	}
	json.Unmarshal([]byte(regDataJSON), &regData)

	// 3. Insert User into Postgres
	var userID string
	query := `
		INSERT INTO users (phone_number, username, password_hash, identity_public_key, registration_id, last_seen_at)
		VALUES ($1, $2, $3, $4, $5, NOW())
		ON CONFLICT (phone_number) DO UPDATE 
		SET last_seen_at = NOW(),
		    username = $2,
		    password_hash = $3,
		    identity_public_key = $4,
		    registration_id = $5
		RETURNING user_id
	`
	err = h.Store.Postgres.QueryRow(ctx, query,
		req.PhoneNumber, regData.Username, regData.PasswordHash, regData.IdentityKey, regData.RegistrationID).Scan(&userID)

	if err != nil {
		log.Printf("Error registering user: %v", err)
		http.Error(w, "Registration failed", http.StatusInternalServerError)
		return
	}

	// 4. Cleanup Redis
	h.Store.Redis.Del(ctx, "otp:"+req.PhoneNumber, "reg_data:"+req.PhoneNumber)

	// 5. Generate JWT
	token, err := generateJWT(userID)
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AuthResponse{Token: token, UserID: userID})
}

// LoginInit: Validates password, generates OTP
func (h *AuthHandler) LoginInit(w http.ResponseWriter, r *http.Request) {
	var req LoginInitRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 1. Get User from DB
	var passwordHash string
	query := `SELECT password_hash FROM users WHERE phone_number = $1`
	err := h.Store.Postgres.QueryRow(context.Background(), query, req.PhoneNumber).Scan(&passwordHash)

	if err == pgx.ErrNoRows {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// 2. Verify Password
	if err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password)); err != nil {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	// 3. Generate OTP
	otp, err := generateOTP()
	if err != nil {
		http.Error(w, "Failed to generate OTP", http.StatusInternalServerError)
		return
	}

	// 4. Store OTP in Redis
	ctx := context.Background()
	if err := h.Store.Redis.Set(ctx, "otp:"+req.PhoneNumber, otp, 5*time.Minute).Err(); err != nil {
		http.Error(w, "Redis error", http.StatusInternalServerError)
		return
	}

	// 5. Log OTP
	log.Printf("[OTP] Login OTP for %s: %s", req.PhoneNumber, otp)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "OTP sent"})
}

// LoginVerify: Validates OTP, returns token
func (h *AuthHandler) LoginVerify(w http.ResponseWriter, r *http.Request) {
	var req LoginVerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	// 1. Validate OTP
	storedOTP, err := h.Store.Redis.Get(ctx, "otp:"+req.PhoneNumber).Result()
	if err != nil || storedOTP != req.OTP {
		http.Error(w, "Invalid or expired OTP", http.StatusUnauthorized)
		return
	}

	// 2. Get User ID
	var userID string
	query := `SELECT user_id FROM users WHERE phone_number = $1`
	err = h.Store.Postgres.QueryRow(ctx, query, req.PhoneNumber).Scan(&userID)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// 3. Cleanup Redis
	h.Store.Redis.Del(ctx, "otp:"+req.PhoneNumber)

	// 4. Generate JWT
	token, err := generateJWT(userID)
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AuthResponse{Token: token, UserID: userID})
}

// --- Helpers ---

func generateJWT(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(72 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func generateOTP() (string, error) {
	n, err := rand.Int(rand.Reader, big.NewInt(1000000))
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%06d", n.Int64()), nil
}
