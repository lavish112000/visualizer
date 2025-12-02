import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import { schema } from './schema'
import Conversation from './Conversation'
import Message from './Message'
// import User from './User' // TODO

const adapter = new LokiJSAdapter({
    schema,
    // migrations, // optional migrations
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    // dbName: 'myapp', // optional db name
    // onQuotaExceededError: (error) => { ... }
})

export const database = new Database({
    adapter,
    modelClasses: [
        Conversation,
        Message,
    ],
})
