import { chat } from '../proto/chat'

type MessageHandler = (message: chat.WebSocketMessage) => void

export class WebSocketClient {
    private ws: WebSocket | null = null
    private url: string
    private reconnectInterval: number = 1000
    private maxReconnectInterval: number = 30000
    private messageHandler: MessageHandler | null = null
    private userId: string

    constructor(userId: string) {
        // Use 10.0.2.2 for Android Emulator to access host localhost
        // For iOS Simulator, localhost is fine
        // In production, this should be a config
        this.url = `ws://10.0.2.2:8080/ws?user_id=${userId}`
        this.userId = userId
    }

    connect() {
        console.log(`Connecting to ${this.url}`)
        this.ws = new WebSocket(this.url)
        this.ws.binaryType = 'arraybuffer' // Important for Protobuf

        this.ws.onopen = () => {
            console.log('WebSocket Connected')
            this.reconnectInterval = 1000
        }

        this.ws.onmessage = (event) => {
            try {
                const buffer = new Uint8Array(event.data as ArrayBuffer)
                const message = chat.WebSocketMessage.decode(buffer)
                if (this.messageHandler) {
                    this.messageHandler(message)
                }
            } catch (e) {
                console.error('Failed to decode message', e)
            }
        }

        this.ws.onclose = () => {
            console.log('WebSocket Closed')
            this.scheduleReconnect()
        }

        this.ws.onerror = (e) => {
            console.error('WebSocket Error', e)
            this.ws?.close()
        }
    }

    private scheduleReconnect() {
        setTimeout(() => {
            console.log('Reconnecting...')
            this.reconnectInterval = Math.min(this.reconnectInterval * 2, this.maxReconnectInterval)
            this.connect()
        }, this.reconnectInterval)
    }

    send(message: chat.WebSocketMessage) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const buffer = chat.WebSocketMessage.encode(message).finish()
            this.ws.send(buffer)
        } else {
            console.warn('WebSocket not connected, cannot send')
        }
    }

    setMessageHandler(handler: MessageHandler) {
        this.messageHandler = handler
    }
}
