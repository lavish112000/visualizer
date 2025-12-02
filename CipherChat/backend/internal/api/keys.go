package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/cipherchat/backend/internal/db"
	"github.com/jackc/pgx/v5"
)

type KeysHandler struct {
	Store *db.Store
}

// UploadKeysRequest matches the structure of the PreKeys payload from the client
type UploadKeysRequest struct {
	IdentityKey    []byte          `json:"identity_key"`
	SignedPreKey   SignedPreKey    `json:"signed_pre_key"`
	OneTimePreKeys []OneTimePreKey `json:"one_time_pre_keys"`
	RegistrationID int             `json:"registration_id"`
}

type SignedPreKey struct {
	KeyID     int    `json:"key_id"`
	PublicKey []byte `json:"public_key"`
	Signature []byte `json:"signature"`
}

type OneTimePreKey struct {
	KeyID     int    `json:"key_id"`
	PublicKey []byte `json:"public_key"`
}

func (h *KeysHandler) UploadKeys(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID") // Middleware should set this
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req UploadKeysRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	tx, err := h.Store.Postgres.Begin(ctx)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback(ctx)

	// 1. Store Signed PreKey
	_, err = tx.Exec(ctx, `
		INSERT INTO signed_pre_keys (user_id, key_id, public_key, signature)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (user_id, key_id) DO UPDATE 
		SET public_key = $3, signature = $4, created_at = NOW()
	`, userID, req.SignedPreKey.KeyID, req.SignedPreKey.PublicKey, req.SignedPreKey.Signature)
	if err != nil {
		log.Printf("Failed to insert signed prekey: %v", err)
		http.Error(w, "Failed to store keys", http.StatusInternalServerError)
		return
	}

	// 2. Store One-Time PreKeys (Batch Insert)
	// Note: In a real app, use CopyFrom for bulk insert efficiency
	for _, k := range req.OneTimePreKeys {
		_, err = tx.Exec(ctx, `
			INSERT INTO one_time_pre_keys (user_id, key_id, public_key)
			VALUES ($1, $2, $3)
			ON CONFLICT DO NOTHING
		`, userID, k.KeyID, k.PublicKey)
		if err != nil {
			log.Printf("Failed to insert onetime key: %v", err)
			http.Error(w, "Failed to store keys", http.StatusInternalServerError)
			return
		}
	}

	if err := tx.Commit(ctx); err != nil {
		http.Error(w, "Commit failed", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *KeysHandler) GetPreKeyBundle(w http.ResponseWriter, r *http.Request) {
	targetUserID := r.URL.Query().Get("user_id")
	if targetUserID == "" {
		http.Error(w, "Missing user_id", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	// 1. Get Identity Key & Registration ID
	var identityKey []byte
	var registrationID int
	err := h.Store.Postgres.QueryRow(ctx, `
		SELECT identity_public_key, registration_id FROM users WHERE user_id = $1
	`, targetUserID).Scan(&identityKey, &registrationID)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// 2. Get Signed PreKey (Latest)
	var spk SignedPreKey
	err = h.Store.Postgres.QueryRow(ctx, `
		SELECT key_id, public_key, signature FROM signed_pre_keys 
		WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1
	`, targetUserID).Scan(&spk.KeyID, &spk.PublicKey, &spk.Signature)
	if err != nil {
		http.Error(w, "No signed prekey found", http.StatusNotFound)
		return
	}

	// 3. Get One One-Time PreKey (and delete it!)
	// This needs to be atomic.
	tx, err := h.Store.Postgres.Begin(ctx)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback(ctx)

	var otpk OneTimePreKey
	err = tx.QueryRow(ctx, `
		DELETE FROM one_time_pre_keys
		WHERE user_id = $1 AND key_id = (
			SELECT key_id FROM one_time_pre_keys WHERE user_id = $1 LIMIT 1
		)
		RETURNING key_id, public_key
	`, targetUserID).Scan(&otpk.KeyID, &otpk.PublicKey)

	if err == pgx.ErrNoRows {
		// No one-time keys left. This is bad for security but we can proceed without it (X3DH falls back)
		// Or we can return an error telling the user to upload more keys.
		// For now, let's return empty otpk.
		log.Printf("User %s is out of one-time keys!", targetUserID)
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(ctx); err != nil {
		http.Error(w, "Commit failed", http.StatusInternalServerError)
		return
	}

	// Construct Response
	resp := map[string]interface{}{
		"identity_key":     identityKey,
		"registration_id":  registrationID,
		"signed_pre_key":   spk,
		"one_time_pre_key": otpk, // Can be empty/zero value
	}

	json.NewEncoder(w).Encode(resp)
}
