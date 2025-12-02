import { Model } from '@nozbe/watermelondb'
import { field, date, text, relation } from '@nozbe/watermelondb/decorators'

export default class Message extends Model {
    static table = 'messages'

    @relation('conversations', 'conversation_id') conversation
    @field('sender_id') senderId
    @text('content') content
    @date('timestamp') timestamp
    @field('status') status
    @field('type') type
}
