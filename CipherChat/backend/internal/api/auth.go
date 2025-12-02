package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/cipherchat/backend/internal/db"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
)

type AuthHandler struct {
	Store *db.Store
}

type RegisterRequest struct {
	PhoneNumber    string `json:"phone_number"`
	Username       string `json:"username"`
	IdentityKey    []byte `json:"identity_public_key"`
	RegistrationID int    `json:"registration_id"`
}

type LoginRequest struct {
	PhoneNumber string `json:"phone_number"`
	OTP         string `json:"otp"` // Stubbed for now
}

type AuthResponse struct {
	Token  string `json:"token"`
	UserID string `json:"user_id"`
}

var jwtSecret = []byte("SUPER_SECRET_KEY_CHANGE_ME") // In prod, load from config

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 1. Insert User into Postgres
	var userID string
	query := `
		INSERT INTO users (phone_number, username, identity_public_key, registration_id, last_seen_at)
		VALUES ($1, $2, $3, $4, NOW())
		ON CONFLICT (phone_number) DO UPDATE 
		SET last_seen_at = NOW()
		RETURNING user_id
	`
	err := h.Store.Postgres.QueryRow(context.Background(), query,
		req.PhoneNumber, req.Username, req.IdentityKey, req.RegistrationID).Scan(&userID)

	if err != nil {
		log.Printf("Error registering user: %v", err)
		http.Error(w, "Registration failed", http.StatusInternalServerError)
		return
	}

	// 2. Generate JWT
	token, err := generateJWT(userID)
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AuthResponse{Token: token, UserID: userID})
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Stub OTP check
	if req.OTP != "123456" {
		http.Error(w, "Invalid OTP", http.StatusUnauthorized)
		return
	}

	var userID string
	query := `SELECT user_id FROM users WHERE phone_number = $1`
	err := h.Store.Postgres.QueryRow(context.Background(), query, req.PhoneNumber).Scan(&userID)

	if err == pgx.ErrNoRows {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	token, err := generateJWT(userID)
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AuthResponse{Token: token, UserID: userID})
}

func generateJWT(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(72 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
