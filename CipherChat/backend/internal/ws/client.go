package ws

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/cipherchat/backend/internal/api"
	"github.com/cipherchat/backend/pb"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512 * 1024 // 512KB
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for now
	},
}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	Hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte

	UserID string

	ChatHandler *api.ChatHandler
}

// readPump pumps messages from the websocket connection to the hub.
func (c *Client) readPump() {
	defer func() {
		c.Hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		// Parse Protobuf message
		var wsMsg pb.WebSocketMessage
		if err := proto.Unmarshal(message, &wsMsg); err != nil {
			log.Printf("Invalid protobuf message: %v", err)
			continue
		}

		// Handle Signal Message
		if signalMsg := wsMsg.GetSignalMessage(); signalMsg != nil {
			// 1. Save to DB
			if c.ChatHandler != nil {
				// Create a context (could use a timeout)
				ctx := context.Background()
				if err := c.ChatHandler.SaveMessage(ctx, signalMsg, c.UserID); err != nil {
					log.Printf("Failed to save message: %v", err)
				}
			}

			// 2. Forward to Recipient
			// Re-marshal just the signal message or the whole wrapper?
			// The client expects a WebSocketMessage wrapper.
			// We need to set the sender ID on the outgoing message if it's not there.
			// signalMsg.SenderId = c.UserID (Protobuf definition might need this field if not present)

			// For now, let's just broadcast the raw bytes to the recipient via Hub
			// But Hub expects raw bytes. We should probably route via Hub using UserID.

			// Let's re-marshal the message to ensure it's correct
			outBytes, _ := proto.Marshal(&wsMsg)
			c.Hub.SendToUser(signalMsg.RecipientId, outBytes)
		}
	}
}

// writePump pumps messages from the hub to the websocket connection.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.BinaryMessage)
			if err != nil {
				return
			}
			w.Write(message)

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// ServeWs handles websocket requests from the peer.
func ServeWs(hub *Hub, chatHandler *api.ChatHandler, w http.ResponseWriter, r *http.Request) {
	// Authenticate user here (e.g. via JWT in query param or header)
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{Hub: hub, ChatHandler: chatHandler, conn: conn, send: make(chan []byte, 256), UserID: userID}
	client.Hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}
