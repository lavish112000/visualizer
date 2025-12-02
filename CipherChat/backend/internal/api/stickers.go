package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/cipherchat/backend/internal/db"
	"github.com/jackc/pgx/v5"
)

type StickerHandler struct {
	Store *db.Store
}

type CreateStickerPackRequest struct {
	Name           string    `json:"name"`
	TrayIconFileID string    `json:"tray_icon_file_id"`
	IsAnimated     bool      `json:"is_animated"`
	Stickers       []Sticker `json:"stickers"`
}

type Sticker struct {
	EmojiAnchor string `json:"emoji_anchor"`
	FileID      string `json:"file_id"`
	SortOrder   int    `json:"sort_order"`
}

type StickerPackResponse struct {
	ID             string    `json:"id"`
	Name           string    `json:"name"`
	PublisherID    string    `json:"publisher_id"`
	TrayIconFileID string    `json:"tray_icon_file_id"`
	IsAnimated     bool      `json:"is_animated"`
	Stickers       []Sticker `json:"stickers,omitempty"`
}

func (h *StickerHandler) CreateStickerPack(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreateStickerPackRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Transaction
	tx, err := h.Store.Postgres.Begin(context.Background())
	if err != nil {
		log.Printf("Failed to begin transaction: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback(context.Background())

	// Insert Pack
	var packID string
	err = tx.QueryRow(context.Background(), `
		INSERT INTO sticker_packs (name, publisher_id, tray_icon_file_id, is_animated, access_hash)
		VALUES ($1, $2, $3, $4, 0)
		RETURNING id
	`, req.Name, userID, req.TrayIconFileID, req.IsAnimated).Scan(&packID)

	if err != nil {
		log.Printf("Failed to insert sticker pack: %v", err)
		http.Error(w, "Database Error", http.StatusInternalServerError)
		return
	}

	// Insert Stickers
	for _, s := range req.Stickers {
		_, err := tx.Exec(context.Background(), `
			INSERT INTO stickers (pack_id, emoji_anchor, file_id, sort_order)
			VALUES ($1, $2, $3, $4)
		`, packID, s.EmojiAnchor, s.FileID, s.SortOrder)
		if err != nil {
			log.Printf("Failed to insert sticker: %v", err)
			http.Error(w, "Database Error", http.StatusInternalServerError)
			return
		}
	}

	if err := tx.Commit(context.Background()); err != nil {
		log.Printf("Failed to commit transaction: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": packID})
}

func (h *StickerHandler) ListStickerPacks(w http.ResponseWriter, r *http.Request) {
	rows, err := h.Store.Postgres.Query(context.Background(), `
		SELECT id, name, publisher_id, tray_icon_file_id, is_animated 
		FROM sticker_packs
	`)
	if err != nil {
		log.Printf("Failed to list sticker packs: %v", err)
		http.Error(w, "Database Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var packs []StickerPackResponse
	for rows.Next() {
		var p StickerPackResponse
		if err := rows.Scan(&p.ID, &p.Name, &p.PublisherID, &p.TrayIconFileID, &p.IsAnimated); err != nil {
			continue
		}
		packs = append(packs, p)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(packs)
}

func (h *StickerHandler) GetStickerPack(w http.ResponseWriter, r *http.Request) {
	packID := r.URL.Query().Get("id")
	if packID == "" {
		http.Error(w, "Missing pack id", http.StatusBadRequest)
		return
	}

	// Get Pack
	var p StickerPackResponse
	err := h.Store.Postgres.QueryRow(context.Background(), `
		SELECT id, name, publisher_id, tray_icon_file_id, is_animated 
		FROM sticker_packs WHERE id = $1
	`, packID).Scan(&p.ID, &p.Name, &p.PublisherID, &p.TrayIconFileID, &p.IsAnimated)

	if err == pgx.ErrNoRows {
		http.Error(w, "Pack not found", http.StatusNotFound)
		return
	} else if err != nil {
		log.Printf("Failed to get sticker pack: %v", err)
		http.Error(w, "Database Error", http.StatusInternalServerError)
		return
	}

	// Get Stickers
	rows, err := h.Store.Postgres.Query(context.Background(), `
		SELECT emoji_anchor, file_id, sort_order 
		FROM stickers WHERE pack_id = $1 ORDER BY sort_order ASC
	`, packID)
	if err != nil {
		log.Printf("Failed to get stickers: %v", err)
		http.Error(w, "Database Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var s Sticker
		if err := rows.Scan(&s.EmojiAnchor, &s.FileID, &s.SortOrder); err != nil {
			continue
		}
		p.Stickers = append(p.Stickers, s)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}
