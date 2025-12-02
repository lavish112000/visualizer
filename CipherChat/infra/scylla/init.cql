CREATE KEYSPACE IF NOT EXISTS messenger 
WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 1};

USE messenger;

-- The "Sync" Queue: Messages waiting to be delivered
CREATE TABLE IF NOT EXISTS pending_messages (
    recipient_id UUID,
    device_id INT,
    message_id TIMEUUID,
    payload BLOB,
    PRIMARY KEY (recipient_id, message_id)
);

-- The Permanent Log
CREATE TABLE IF NOT EXISTS message_history (
    conversation_id UUID,
    bucket INT,
    message_id TIMEUUID,
    sender_id UUID,
    ciphertext BLOB, 
    media_url TEXT,
    is_delivered BOOLEAN,
    PRIMARY KEY ((conversation_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
