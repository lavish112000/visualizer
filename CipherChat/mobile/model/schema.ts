import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'users',
            columns: [
                { name: 'username', type: 'string', isOptional: true },
                { name: 'phone_number', type: 'string' },
                { name: 'identity_key', type: 'string' }, // Base64 encoded
                { name: 'registration_id', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'conversations',
            columns: [
                { name: 'peer_id', type: 'string' }, // UUID of the other user
                { name: 'last_message_at', type: 'number' },
                { name: 'unread_count', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'messages',
            columns: [
                { name: 'conversation_id', type: 'string', isIndexed: true },
                { name: 'sender_id', type: 'string' },
                { name: 'content', type: 'string' }, // Encrypted blob (Base64)
                { name: 'timestamp', type: 'number', isIndexed: true },
                { name: 'status', type: 'string' }, // sent, delivered, read, failed
                { name: 'type', type: 'string' }, // text, image, sticker
            ],
        }),
    ],
})
