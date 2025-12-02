package main

import (
	"log"
	"net/http"

	"github.com/cipherchat/backend/internal/api"
	"github.com/cipherchat/backend/internal/config"
	"github.com/cipherchat/backend/internal/db"
	"github.com/cipherchat/backend/internal/ws"
)

func main() {
	// 1. Load Configuration
	cfg := config.Load()
	log.Printf("Starting CipherChat Server on port %s", cfg.ServerPort)

	// 2. Connect to Databases
	store, err := db.NewStore(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to databases: %v", err)
	}
	defer store.Close()

	// 3. Initialize WebSocket Hub
	hub := ws.NewHub()
	go hub.Run()

	// 4. Setup HTTP Routes
	authHandler := &api.AuthHandler{Store: store}
	keysHandler := &api.KeysHandler{Store: store}

	chatHandler := &api.ChatHandler{Store: store}
	mediaHandler := &api.MediaHandler{Store: store}

	http.HandleFunc("/auth/register", authHandler.Register)
	http.HandleFunc("/auth/login", authHandler.Login)

	http.HandleFunc("/keys/upload", api.AuthMiddleware(keysHandler.UploadKeys))
	http.HandleFunc("/keys/query", api.AuthMiddleware(keysHandler.GetPreKeyBundle))

	http.HandleFunc("/chat/sync", api.AuthMiddleware(chatHandler.SyncMessages))

	http.HandleFunc("/media/presigned-put", api.AuthMiddleware(mediaHandler.GetPresignedPutURL))
	http.HandleFunc("/media/presigned-get", api.AuthMiddleware(mediaHandler.GetPresignedGetURL))

	stickerHandler := &api.StickerHandler{Store: store}
	http.HandleFunc("/stickers/packs", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			api.AuthMiddleware(stickerHandler.CreateStickerPack)(w, r)
		} else {
			api.AuthMiddleware(stickerHandler.ListStickerPacks)(w, r)
		}
	})
	http.HandleFunc("/stickers/pack", api.AuthMiddleware(stickerHandler.GetStickerPack))

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		ws.ServeWs(hub, chatHandler, w, r)
	})

	// 5. Start Server
	log.Fatal(http.ListenAndServe(":"+cfg.ServerPort, nil))
}
