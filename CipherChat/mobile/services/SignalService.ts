import {
    KeyHelper,
    SignalProtocolAddress,
    SessionBuilder,
    SessionCipher,
} from '@privacyresearch/libsignal-protocol-typescript'
import * as Crypto from 'expo-crypto'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Mock Store - In production use WatermelonDB or a proper persistent store
// @ts-ignore
class InMemorySignalStore {
    private identityKeyPair: any
    private localRegistrationId: number
    private preKeys: Map<number, any> = new Map()
    private signedPreKeys: Map<number, any> = new Map()
    private sessions: Map<string, any> = new Map()

    constructor() {
        this.localRegistrationId = 0
    }

    async getIdentityKeyPair() { return this.identityKeyPair }
    async getLocalRegistrationId() { return this.localRegistrationId }

    async saveIdentity(identifier: string, key: ArrayBuffer): Promise<boolean> {
        // Save peer identity
        return true
    }
    async isTrustedIdentity(identifier: string, key: ArrayBuffer, direction: number) {
        return true // Trust on first use
    }

    async loadPreKey(keyId: number) { return this.preKeys.get(keyId) }
    async storePreKey(keyId: number, key: any) { this.preKeys.set(keyId, key) }
    async removePreKey(keyId: number) { this.preKeys.delete(keyId) }

    async loadSignedPreKey(keyId: number) { return this.signedPreKeys.get(keyId) }
    async storeSignedPreKey(keyId: number, key: any) { this.signedPreKeys.set(keyId, key) }
    async removeSignedPreKey(keyId: number) { this.signedPreKeys.delete(keyId) }

    async loadSession(identifier: string) { return this.sessions.get(identifier) }
    async storeSession(identifier: string, record: any) { this.sessions.set(identifier, record) }

    // Custom helpers for initialization
    setIdentityKeyPair(kp: any) { this.identityKeyPair = kp }
    setLocalRegistrationId(id: number) { this.localRegistrationId = id }

    async hasSession(identifier: string): Promise<boolean> {
        return this.sessions.has(identifier)
    }
}

export class SignalService {
    public store: InMemorySignalStore
    private userId: string

    constructor(userId: string) {
        this.userId = userId
        this.store = new InMemorySignalStore()
    }

    async initialize() {
        const registrationId = KeyHelper.generateRegistrationId()
        const identityKeyPair = await KeyHelper.generateIdentityKeyPair()

        this.store.setLocalRegistrationId(registrationId)
        this.store.setIdentityKeyPair(identityKeyPair)

        // Generate PreKeys
        const preKeys: any[] = []
        for (let i = 0; i < 10; i++) {
            const preKey = await KeyHelper.generatePreKey(i)
            this.store.storePreKey(preKey.keyId, preKey.keyPair)
            preKeys.push(preKey)
        }

        // Generate Signed PreKey
        const signedPreKey = await KeyHelper.generateSignedPreKey(identityKeyPair, 1)
        this.store.storeSignedPreKey(signedPreKey.keyId, signedPreKey.keyPair)

        return {
            registrationId,
            identityKeyPair,
            preKeys,
            signedPreKey
        }
    }

    async hasSession(recipientId: string): Promise<boolean> {
        const address = new SignalProtocolAddress(recipientId, 1)
        return this.store.hasSession(address.toString())
    }

    async processPreKeyBundle(recipientId: string, bundle: any) {
        const address = new SignalProtocolAddress(recipientId, 1)
        const sessionBuilder = new SessionBuilder(this.store as any, address)

        // Convert raw bytes back to ArrayBuffers if needed (depending on API response format)
        // Assuming bundle comes in as { identityKey: ArrayBuffer, ... }

        await sessionBuilder.processPreKey(bundle)
    }

    async encrypt(recipientId: string, plaintext: string) {
        const address = new SignalProtocolAddress(recipientId, 1)
        const cipher = new SessionCipher(this.store as any, address)

        const ciphertext = await cipher.encrypt(new TextEncoder().encode(plaintext).buffer)
        return ciphertext
    }

    async decrypt(senderId: string, ciphertext: any) {
        const address = new SignalProtocolAddress(senderId, 1)
        const cipher = new SessionCipher(this.store as any, address)

        let plaintext: ArrayBuffer
        if (ciphertext.type === 3) { // PreKeyWhisperMessage
            plaintext = await cipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary')
        } else {
            plaintext = await cipher.decryptWhisperMessage(ciphertext.body, 'binary')
        }

        return new TextDecoder().decode(plaintext)
    }
}
