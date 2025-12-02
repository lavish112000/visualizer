import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { schema } from './schema'
import Conversation from './Conversation'
import Message from './Message'
// import User from './User' // TODO

const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment out migrationEvents for now)
    // migrationEvents: {
    //   onSuccess: () => console.log('Database initialized'),
    //   onError: (error) => console.log('Database failed to load', error),
    // },
    jsi: true, // Enable JSI for performance
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
        console.error("Database setup error", error)
    }
})

export const database = new Database({
    adapter,
    modelClasses: [
        Conversation,
        Message,
    ],
})
