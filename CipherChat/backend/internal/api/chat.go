package api

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/cipherchat/backend/internal/db"
	"github.com/cipherchat/backend/pb"
	"github.com/gocql/gocql"
	"google.golang.org/protobuf/proto"
)

type ChatHandler struct {
	Store *db.Store
}

func (h *ChatHandler) SaveMessage(ctx context.Context, msg *pb.SignalMessage, senderID string) error {
	// 1. Save to ScyllaDB (Permanent Log)
	// Partition by conversation_id (sender + recipient sorted) and bucket (YYYYMM)
	// For simplicity, let's just use a single conversation ID for now or derive it.
	// In a real app, we'd look up the conversation ID.

	// Generate a TimeUUID
	messageID := gocql.TimeUUID()

	// Insert into message_history
	query := `
		INSERT INTO message_history (conversation_id, bucket, message_id, sender_id, ciphertext, is_delivered)
		VALUES (?, ?, ?, ?, ?, ?)
	`
	// Mock conversation ID and bucket
	convID, _ := gocql.ParseUUID("00000000-0000-0000-0000-000000000000")
	bucket := int(time.Now().Month())

	if err := h.Store.Scylla.Query(query, convID, bucket, messageID, senderID, msg.Ciphertext, false).Exec(); err != nil {
		log.Printf("Failed to save message to Scylla: %v", err)
		return err
	}

	return nil
}

func (h *ChatHandler) StorePendingMessage(ctx context.Context, msg *pb.SignalMessage) error {
	// Store in Scylla pending_messages table for offline delivery
	query := `
		INSERT INTO pending_messages (recipient_id, device_id, message_id, payload)
		VALUES (?, ?, ?, ?)
	`
	recipientUUID, _ := gocql.ParseUUID(msg.RecipientId)
	messageID := gocql.TimeUUID()

	if err := h.Store.Scylla.Query(query, recipientUUID, 1, messageID, msg.Ciphertext).Exec(); err != nil {
		log.Printf("Failed to store pending message: %v", err)
		return err
	}
	return nil
}

func (h *ChatHandler) SyncMessages(w http.ResponseWriter, r *http.Request) {
	// Fetch pending messages for the user
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Query pending_messages table
	// In a real app, we would paginate this.
	query := `SELECT message_id, payload FROM pending_messages WHERE recipient_id = ?`

	recipientUUID, _ := gocql.ParseUUID(userID)
	iter := h.Store.Scylla.Query(query, recipientUUID).Iter()

	var messages []*pb.SignalMessage
	var messageID gocql.UUID
	var payload []byte

	for iter.Scan(&messageID, &payload) {
		// Deserialize payload (which is the SignalMessage protobuf)
		var msg pb.SignalMessage
		if err := proto.Unmarshal(payload, &msg); err == nil {
			messages = append(messages, &msg)
		}
	}

	if err := iter.Close(); err != nil {
		log.Printf("Failed to sync messages: %v", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	resp := &pb.SyncResponse{
		Messages: messages,
		HasMore:  false,
	}

	w.Header().Set("Content-Type", "application/x-protobuf")
	out, _ := proto.Marshal(resp)
	w.Write(out)

	// Delete messages after sync
	// for _, msg := range messages {
	// 	// We need the original messageID to delete efficiently.
	// 	// In a real implementation, we'd track IDs better.
	// 	// For now, we rely on the fact that we just scanned them.
	// 	// But we can't easily get the ID back from the msg payload unless we stored it there.
	// 	// Let's just delete by recipient_id for now (DANGEROUS in prod, but ok for prototype)
	// 	// Actually, let's skip deletion for safety in this prototype or implement ACK.
	// 	// h.Store.Scylla.Query(`DELETE FROM pending_messages WHERE recipient_id = ?`, recipientUUID).Exec()
	// }
}
