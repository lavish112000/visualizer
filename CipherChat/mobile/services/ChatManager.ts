import { SignalService } from './SignalService'
import { WebSocketClient } from './WebSocketClient'
import { database } from '../model'
import { chat } from '../proto/chat'
import { SessionBuilder, SignalProtocolAddress } from '@privacyresearch/libsignal-protocol-typescript'

export class ChatManager {
    private signalService: SignalService
    private wsClient: WebSocketClient
    private userId: string

    private token: string

    constructor(userId: string, token: string, signalService: SignalService, wsClient: WebSocketClient) {
        this.userId = userId
        this.token = token
        this.signalService = signalService
        this.wsClient = wsClient

        this.wsClient.setMessageHandler(this.handleIncomingMessage.bind(this))
    }

    async sendMessage(recipientId: string, text: string) {
        // 1. Ensure Session Exists
        const hasSession = await this.signalService.hasSession(recipientId)
        if (!hasSession) {
            console.log(`No session with ${recipientId}, fetching keys...`)
            try {
                const response = await fetch(`http://localhost:8080/keys/query?user_id=${recipientId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                })

                if (!response.ok) {
                    throw new Error(`Key fetch failed: ${response.statusText}`)
                }

                const bundle = await response.json()

                // Process bundle
                // The bundle structure from backend:
                // { identity_key: base64, signed_pre_key: { key_id, public_key: base64, signature: base64 }, one_time_pre_key: { key_id, public_key: base64 }, registration_id }

                const processedBundle = {
                    identityKey: SignalService.base64ToArrayBuffer(bundle.identity_key),
                    registrationId: bundle.registration_id,
                    signedPreKey: {
                        keyId: bundle.signed_pre_key.key_id,
                        publicKey: SignalService.base64ToArrayBuffer(bundle.signed_pre_key.public_key),
                        signature: SignalService.base64ToArrayBuffer(bundle.signed_pre_key.signature)
                    },
                    preKey: bundle.one_time_pre_key && bundle.one_time_pre_key.key_id ? {
                        keyId: bundle.one_time_pre_key.key_id,
                        publicKey: SignalService.base64ToArrayBuffer(bundle.one_time_pre_key.public_key)
                    } : undefined
                }

                await this.signalService.processPreKeyBundle(recipientId, processedBundle)
                console.log(`Session established with ${recipientId}`)

            } catch (e) {
                console.error("Key fetch failed", e)
                throw e // Re-throw to stop sending
            }
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
