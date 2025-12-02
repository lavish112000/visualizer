import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, children } from '@nozbe/watermelondb/decorators'

export default class Conversation extends Model {
    static table = 'conversations'

    @field('peer_id') peerId
    @date('last_message_at') lastMessageAt
    @field('unread_count') unreadCount

    @children('messages') messages
}
