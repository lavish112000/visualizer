package ws

import (
	"log"
	"sync"
)

type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client

	// Map of UserID to Client(s) for direct messaging
	userClients map[string]map[*Client]bool
	userLock    sync.RWMutex
}

func NewHub() *Hub {
	return &Hub{
		broadcast:   make(chan []byte),
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		clients:     make(map[*Client]bool),
		userClients: make(map[string]map[*Client]bool),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			h.addUserClient(client)
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				h.removeUserClient(client)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}

func (h *Hub) addUserClient(client *Client) {
	h.userLock.Lock()
	defer h.userLock.Unlock()
	if client.UserID == "" {
		return
	}
	if _, ok := h.userClients[client.UserID]; !ok {
		h.userClients[client.UserID] = make(map[*Client]bool)
	}
	h.userClients[client.UserID][client] = true
	log.Printf("User %s connected", client.UserID)
}

func (h *Hub) removeUserClient(client *Client) {
	h.userLock.Lock()
	defer h.userLock.Unlock()
	if client.UserID == "" {
		return
	}
	if clients, ok := h.userClients[client.UserID]; ok {
		delete(clients, client)
		if len(clients) == 0 {
			delete(h.userClients, client.UserID)
			log.Printf("User %s disconnected", client.UserID)
		}
	}
}

// SendToUser sends a message to a specific user's connected clients
func (h *Hub) SendToUser(userID string, message []byte) {
	h.userLock.RLock()
	defer h.userLock.RUnlock()
	if clients, ok := h.userClients[userID]; ok {
		for client := range clients {
			select {
			case client.send <- message:
			default:
				// Handle blocked client
			}
		}
	}
}
