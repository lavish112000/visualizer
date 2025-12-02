import { SignalService } from './SignalService'
import { WebSocketClient } from './WebSocketClient'
import { database } from '../model'
import { chat } from '../proto/chat'
import { SessionBuilder, SignalProtocolAddress } from '@privacyresearch/libsignal-protocol-typescript'

export class ChatManager {
    private signalService: SignalService
    private wsClient: WebSocketClient
    private userId: string

    constructor(userId: string, signalService: SignalService, wsClient: WebSocketClient) {
        this.userId = userId
        this.signalService = signalService
        this.wsClient = wsClient

        this.wsClient.setMessageHandler(this.handleIncomingMessage.bind(this))
    }

    async sendMessage(recipientId: string, text: string) {
        // 1. Ensure Session Exists
        const hasSession = await this.signalService.hasSession(recipientId)
        if (!hasSession) {
            console.log(`No session with ${recipientId}, fetching keys...`)
            // In a real app, fetch from server:
            // const bundle = await fetch(`http://10.0.2.2:8080/keys/query?user_id=${recipientId}`).then(r => r.json())
            // await this.signalService.processPreKeyBundle(recipientId, bundle)

            // For prototype, we assume keys are pre-shared or we skip encryption if no keys found (fallback)
            console.warn("Skipping key fetch in prototype. Encryption might fail if not pre-seeded.")
        }

        // 2. Encrypt
        const ciphertext = await this.signalService.encrypt(recipientId, text)

        // 3. Save to DB (Optimistic Update)
        await database.write(async () => {
            // const conversation = await database.get('conversations').query().fetch() // Find or create
            // Create message
        })

        // 4. Send via WebSocket
        // Signal Protocol ciphertext structure: { type: number, body: string (base64) }
        // We need to serialize this to bytes for Protobuf

        const signalMessage = chat.SignalMessage.create({
            recipientId: recipientId,
            ciphertext: new TextEncoder().encode(ciphertext.body), // Simplified: sending body as bytes
            timestamp: Date.now(),
        })

        const wsMessage = chat.WebSocketMessage.create({
            requestId: 'req-' + Date.now(),
            signalMessage: signalMessage,
        })

        this.wsClient.send(wsMessage)
    }

    private async handleIncomingMessage(message: chat.WebSocketMessage) {
        if (message.signalMessage) {
            const { senderId, ciphertext } = message.signalMessage

            if (!senderId || !ciphertext) return

            // Decrypt
            // Reconstruct the object Signal expects
            const signalCiphertext = {
                type: 3, // Assuming PreKeyWhisper for now
                body: new TextDecoder().decode(ciphertext),
                registrationId: 0 // TODO
            }

            try {
                const plaintext = await this.signalService.decrypt(senderId, signalCiphertext)
                console.log(`Received message from ${senderId}: ${plaintext}`)
                // Save to DB...
            } catch (e) {
                console.error('Decryption failed', e)
            }
        }
    }
}
