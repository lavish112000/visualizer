-- Core User Identity
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(32) UNIQUE,
    identity_public_key BYTEA NOT NULL,
    registration_id INT NOT NULL,
    last_seen_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- PreKeys for X3DH
CREATE TABLE IF NOT EXISTS signed_pre_keys (
    key_id INT NOT NULL,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    public_key BYTEA NOT NULL,
    signature BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, key_id)
);

CREATE TABLE IF NOT EXISTS one_time_pre_keys (
    key_id INT NOT NULL,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    public_key BYTEA NOT NULL,
    PRIMARY KEY (user_id, key_id)
);

-- Rich Media Metadata
CREATE TABLE IF NOT EXISTS sticker_packs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_hash BIGINT NOT NULL,
    name TEXT NOT NULL,
    publisher_id UUID REFERENCES users(user_id),
    tray_icon_file_id TEXT NOT NULL,
    is_animated BOOLEAN DEFAULT FALSE,
    install_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stickers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pack_id UUID REFERENCES sticker_packs(id) ON DELETE CASCADE,
    emoji_anchor VARCHAR(10),
    file_id TEXT NOT NULL,
    sort_order INT NOT NULL
);
