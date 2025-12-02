package api

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/cipherchat/backend/internal/db"
)

type MediaHandler struct {
	Store *db.Store
}

type PresignedURLResponse struct {
	URL      string `json:"url"`
	FileName string `json:"file_name,omitempty"`
	Expiry   int64  `json:"expiry"`
}

func (h *MediaHandler) GetPresignedPutURL(w http.ResponseWriter, r *http.Request) {
	// 1. Auth Check
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// 2. Parse Request (Optional: get file type/extension)
	// For simplicity, we'll generate a random filename or use a query param
	fileType := r.URL.Query().Get("type") // e.g., "image/jpeg"
	if fileType == "" {
		fileType = "application/octet-stream"
	}

	// Generate object name: uploads/<user_id>/<timestamp>_<random>.ext
	objectName := fmt.Sprintf("uploads/%s/%d", userID, time.Now().UnixNano())

	// 3. Generate Presigned URL
	expiry := time.Hour * 1 // 1 hour expiry
	presignedURL, err := h.Store.Minio.PresignedPutObject(context.Background(), "cipherchat-media", objectName, expiry)
	if err != nil {
		log.Printf("Failed to generate presigned PUT url: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// 4. Return Response
	resp := PresignedURLResponse{
		URL:      presignedURL.String(),
		FileName: objectName,
		Expiry:   time.Now().Add(expiry).Unix(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func (h *MediaHandler) GetPresignedGetURL(w http.ResponseWriter, r *http.Request) {
	// 1. Auth Check
	if r.Header.Get("X-User-ID") == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// 2. Get Object Name
	objectName := r.URL.Query().Get("object_name")
	if objectName == "" {
		http.Error(w, "Missing object_name", http.StatusBadRequest)
		return
	}

	// 3. Generate Presigned URL
	expiry := time.Hour * 24 // 24 hours expiry for downloads
	reqParams := make(map[string][]string)
	presignedURL, err := h.Store.Minio.PresignedGetObject(context.Background(), "cipherchat-media", objectName, expiry, reqParams)
	if err != nil {
		log.Printf("Failed to generate presigned GET url: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// 4. Return Response
	resp := PresignedURLResponse{
		URL:      presignedURL.String(),
		FileName: objectName,
		Expiry:   time.Now().Add(expiry).Unix(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
