# CipherChat - Technical Requirements & Architecture Analysis

## Executive Summary

**CipherChat** is a full-stack encrypted messaging platform combining:
- **React Native + Expo** frontend for cross-platform mobile development
- **Go microservices** backend with WebSocket real-time messaging
- **End-to-End Encryption** using Signal Protocol
- **Multi-database architecture** (PostgreSQL, ScyllaDB, Redis, MinIO)
- **Protocol Buffers** for efficient serialization

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CIPHERCHAT ARCHITECTURE                 │
└─────────────────────────────────────────────────────────────┘

CLIENT LAYER (Mobile - React Native + Expo)
├── UI Components (React Native)
│   ├── LoginScreen (OTP-based)
│   ├── HomeScreen (Contact list)
│   ├── ChatScreen (Message display)
│   ├── ProfileScreen (User profile)
│   └── SettingsScreen (App settings)
├── State Management & Services
│   ├── ChatManager (Message orchestration)
│   ├── SignalService (E2E Encryption)
│   ├── WebSocketClient (Real-time sync)
│   └── Local Storage (WatermelonDB, AsyncStorage)
└── Data Models
    ├── Conversation (Chat metadata)
    ├── Message (Message content & crypto)
    └── Contact (User info)

│

API LAYER (WebSocket + REST via Gorilla)
├── Authentication (JWT-based)
├── Chat API (Send/Receive messages)
├── User Management (Profile, contacts)
├── Media Upload/Download
├── Sticker Management
└── Real-time WebSocket Hub

│

BUSINESS LOGIC LAYER (Go Services)
├── Chat Service
│   ├── Message persistence
│   ├── Chat room management
│   └── Message delivery
├── User Service
│   ├── Registration/Login
│   ├── Profile management
│   └── Contact list
├── Encryption Service
│   ├── Key exchange (Signal Protocol)
│   ├── Message encryption
│   └── Session management
└── Media Service
    ├── File upload/download
    └── Temporary storage

│

DATA LAYER
├── PostgreSQL (relational data)
│   ├── Users table
│   ├── Conversations table
│   ├── Messages table
│   └── Contacts table
├── ScyllaDB (high-volume writes)
│   ├── Message log (time-series)
│   └── Session cache
├── Redis (caching/sessions)
│   ├── User sessions
│   ├── Message cache
│   └── Rate limiting
└── MinIO (object storage)
    ├── Media files
    ├── Backups
    └── User attachments
```

---

## Technology Stack

### Frontend (Mobile)
```
Framework:
  - React Native 0.81.5
  - Expo 54.0.25
  - TypeScript 5.9.2
  - React Navigation 6.1.18

Encryption & Security:
  - @privacyresearch/libsignal-protocol-typescript 0.0.16
  - expo-crypto (WebCrypto API)
  - react-native-get-random-values

Data Storage:
  - @nozbe/watermelondb 0.28.0 (Local DB)
  - @react-native-async-storage/async-storage 2.2.0
  - lokijs 1.5.12 (In-memory DB)

Networking:
  - React Native WebSocket API
  - Protocol Buffers (protobufjs 7.5.4)

UI/UX:
  - React Native (native components)
  - lottie-react-native 7.3.4 (animations)
  - @lottiefiles/dotlottie-react 0.17.8
  - expo-image 3.0.10

Polyfills & Compatibility:
  - buffer 6.0.3
  - events 3.3.0
  - process 0.11.10
  - readable-stream 4.7.0
```

### Backend (Go)
```
Core:
  - Go 1.25.4
  - Gorilla WebSocket 1.5.3 (Real-time messaging)
  - Google Protocol Buffers 1.36.10

Databases:
  - PostgreSQL driver (jackc/pgx 5.7.6)
  - Cassandra/ScyllaDB driver (gocql 1.7.0)
  - Redis client (redis/go-redis 9.17.2)

Authentication:
  - JWT tokens (golang-jwt 5.3.0)

Infrastructure:
  - Docker & Docker Compose
  - MinIO (S3-compatible object storage)

Protobuf Definitions:
  - chat.proto (message schemas)
  - keys.proto (encryption key schemas)
```

### Infrastructure
```
Containerization:
  - Docker
  - Docker Compose

Databases:
  - PostgreSQL 15-alpine
  - ScyllaDB 5.2 (Cassandra-compatible)
  - Redis 7-alpine

Object Storage:
  - MinIO (S3-compatible)

Networking:
  - Expose ports: 5432 (PG), 9042 (Scylla), 6379 (Redis), 9000 (MinIO)
  - WebSocket: Custom port (default in backend config)
```

---

## System Requirements Analysis

### Minimum Hardware Requirements
| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| CPU | Dual-core 2.5GHz | Quad-core 3.0GHz+ | Virtualization support needed |
| RAM | 8GB | 16GB | For Docker + IDE + Emulator |
| Storage | 50GB SSD | 100GB+ SSD | Node modules, Docker images, SDK |
| Network | 10Mbps | Fiber 100Mbps+ | For dependency downloads |

### Software Requirements
| Software | Version | Purpose |
|----------|---------|---------|
| Android Studio | 2024.1+ | IDE & emulator |
| JDK | 17+ | Android development |
| Node.js | 18+ | Frontend development |
| npm | 9+ | Package management |
| Go | 1.25.4+ | Backend development |
| Docker Desktop | 4.0+ | Infrastructure |
| Git | 2.30+ | Version control |

---

## Feature Analysis

### Authentication Flow
```
1. User Input (Phone number + password)
2. OTP Generation & Validation
3. JWT Token Generation
4. Client-side Signal Protocol initialization
5. Session establishment
```

### Encryption Features
```
1. Signal Protocol (End-to-End Encryption)
   - Double Ratchet algorithm
   - Forward secrecy
   - Backward secrecy

2. Message Flow:
   User A → SignalService.encryptMessage() 
   → Protocol Buffer serialization 
   → WebSocket transmission
   → Server relay (no decryption)
   → WebSocket to User B
   → SignalService.decryptMessage()
   → Display in UI

3. Key Management:
   - One-time prekeys (OPKs)
   - Identity keys
   - Signed prekeys
   - Session keys (ephemeral)
```

### Real-time Messaging
```
1. WebSocket Connection Pool
   - Per-user WebSocket channel
   - Persistent connection
   - Heartbeat mechanism

2. Message Queue
   - Outgoing: Signal → Serialize → Queue → Send
   - Incoming: Receive → Deserialize → Decrypt → Store → UI update

3. Reliability
   - Message acknowledgments
   - Retry mechanism
   - Offline message queue (WatermelonDB)
   - Sync on reconnect
```

### Data Persistence
```
Local (Mobile):
  - WatermelonDB: Encrypted local database
  - AsyncStorage: Simple key-value store
  - File System: Media files, voice notes

Remote (Backend):
  - PostgreSQL: User accounts, chat metadata
  - ScyllaDB: Message history (high-volume writes)
  - Redis: Sessions, temporary caches
  - MinIO: Media files
```

---

## Development Workflow

### Project Structure
```
CipherChat/
├── mobile/                 # React Native + Expo frontend
│   ├── components/         # UI components
│   ├── screens/            # Screen components
│   ├── services/           # Business logic (Signal, WebSocket, ChatManager)
│   ├── model/              # Data models & schema
│   ├── navigation/         # React Navigation setup
│   ├── proto/              # Protobuf JS definitions
│   ├── assets/             # Images, icons, splash
│   ├── App.tsx             # Entry point
│   ├── package.json        # Dependencies
│   └── tsconfig.json       # TypeScript config
│
├── backend/                # Go microservices
│   ├── cmd/server/         # Server entry point
│   ├── internal/           # Internal packages
│   │   ├── api/            # HTTP/WebSocket handlers
│   │   ├── config/         # Configuration
│   │   ├── crypto/         # Encryption logic
│   │   ├── db/             # Database connections
│   │   └── ws/             # WebSocket hub
│   ├── pb/                 # Protobuf generated code
│   ├── go.mod              # Go dependencies
│   └── main.go             # Entry point
│
├── proto/                  # Protobuf definitions
│   ├── chat.proto          # Chat message schema
│   └── keys.proto          # Key management schema
│
├── infra/                  # Infrastructure as Code
│   ├── docker-compose.yml  # Services definition
│   ├── postgres/           # PostgreSQL init
│   └── scylla/             # ScyllaDB init
│
└── docs/                   # Documentation
```

### Typical Development Cycle
```
1. Make code changes (frontend/backend)
2. Commit to Git
3. Docker services run in background (postgres, redis, scylla, minio)
4. Start backend: go run ./cmd/server/main.go
5. Start Expo: npm start
6. Run on emulator: Press 'a' in Expo CLI
7. Test features and debug using Logcat
8. Verify encryption/decryption with console logs
9. Test WebSocket with network inspector
```

---

## Database Schema Overview

### PostgreSQL (Relational Data)
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone_number VARCHAR UNIQUE,
  username VARCHAR UNIQUE,
  password_hash VARCHAR,
  signal_identity_key TEXT,
  created_at TIMESTAMP
);

-- Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  participants UUID[],
  name VARCHAR,
  is_group BOOLEAN,
  created_at TIMESTAMP
);

-- Contacts
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES users(id),
  contact_id UUID REFERENCES users(id),
  name VARCHAR,
  created_at TIMESTAMP
);
```

### ScyllaDB (High-Write Time-Series)
```cql
-- Message log (time-series)
CREATE TABLE messages (
  conversation_id UUID,
  timestamp BIGINT,
  message_id UUID,
  sender_id UUID,
  encrypted_content BLOB,
  PRIMARY KEY ((conversation_id), timestamp, message_id)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

### Redis (Caching)
```
Sessions:
  - session:{user_id} → JWT token + expiry
  
Message cache:
  - messages:{conversation_id} → Last 50 messages
  
User online status:
  - online_users → Set of active user IDs
```

---

## Android Studio Workspace Configuration

### Recommended Folder Structure in Android Studio
```
Project (CipherChat)
├── mobile (Module)
│   ├── src (if using native Android code)
│   ├── components
│   ├── screens
│   ├── services
│   ├── model
│   ├── navigation
│   ├── proto
│   ├── assets
│   ├── package.json
│   └── tsconfig.json
├── backend (Optional - for context, not buildable in AS)
└── infra (Optional - for reference)
```

### Key Files to Focus On
1. **App.tsx** - Main app entry point, auth flow, navigation setup
2. **services/SignalService.ts** - E2E encryption logic
3. **services/WebSocketClient.ts** - Real-time communication
4. **services/ChatManager.ts** - Message orchestration
5. **model/Message.ts** - Data model for messages
6. **components/ChatScreen.tsx** - Main UI for messaging

---

## Performance Considerations

### Mobile (Frontend)
```
1. Message Rendering
   - FlatList virtualization for long message lists
   - Memoization of components
   - Lazy load message history

2. Encryption Performance
   - Pre-compute Signal sessions
   - Batch encrypt/decrypt where possible
   - Cache session keys in memory

3. Storage
   - Limit local DB to last 1000 messages per conversation
   - Compress old message archives
   - Clean up cache regularly

4. Network
   - Connection pooling
   - Message batching
   - Exponential backoff for retries
```

### Backend (Go)
```
1. Database
   - PostgreSQL: Indexed queries on user_id, conversation_id
   - ScyllaDB: Partition by conversation_id for fast writes
   - Redis: TTL on session keys

2. WebSocket
   - Use goroutines for concurrent connections
   - Implement hub pattern for message broadcasting
   - Connection limits per user (prevent resource exhaustion)

3. Encryption
   - Prekey rotation (scheduled background task)
   - Key derivation caching
   - Batch session establishment
```

---

## Testing Strategy

### Unit Tests
```
Frontend:
  - Message encryption/decryption
  - Message model serialization
  - Navigation state management

Backend:
  - API endpoint handlers
  - Database queries
  - Encryption key generation
```

### Integration Tests
```
- WebSocket connection & message flow
- End-to-end encryption (client ↔ server ↔ client)
- Database persistence & retrieval
- Authentication & JWT validation
```

### E2E Tests
```
- User registration & login flow
- Send encrypted message
- Receive & decrypt message
- Conversation history
- Contact list management
```

---

## Debugging Tools & Techniques

### Mobile (Frontend)
```
1. React Native Debugger
   - Inspect React component tree
   - View Redux state (if using)
   - Monitor network requests

2. Logcat in Android Studio
   - Filter by app package name
   - Log Signal Protocol operations
   - Monitor WebSocket messages

3. Chrome DevTools
   - JavaScript debugging
   - Performance profiling
   - Console logs
```

### Backend (Go)
```
1. Delve Debugger
   - Breakpoints
   - Step through code
   - Inspect variables

2. Go pprof
   - CPU profiling
   - Memory allocation
   - Goroutine analysis

3. Backend logs
   - Database query logs
   - WebSocket event logs
   - Error traces
```

### Network Monitoring
```
1. Charles Proxy / Burp Suite
   - Intercept WebSocket messages
   - Monitor HTTPS traffic
   - Test encryption

2. Wireshark
   - Packet-level analysis
   - Protocol verification
```

---

## Security Considerations

### Authentication
```
- JWT tokens with expiry
- Refresh token mechanism
- Phone OTP verification
- Session invalidation on logout
```

### Encryption
```
- Signal Protocol (industry standard)
- Random IV for each message
- No plaintext logging
- Secure key storage (Keystore on Android)
```

### API Security
```
- HTTPS/TLS for all connections
- CORS configuration
- Rate limiting
- Input validation & sanitization
```

### Data Privacy
```
- Minimal data collection
- Encryption at rest (DB)
- Secure deletion of old sessions
- User data can be deleted on request
```

---

## Deployment Considerations

### Local Development (Current Setup)
```
✅ Docker containers for databases
✅ Go server running locally
✅ Expo dev server for frontend
✅ Emulator or physical device for testing
```

### Staging/Production (Future)
```
Cloud Deployment Options:
  - AWS (EC2, RDS, ElastiCache)
  - Google Cloud (Compute Engine, Cloud SQL)
  - Azure (App Service, Azure Database)

CI/CD Pipeline:
  - GitHub Actions for automated testing
  - Docker image builds
  - Automated deployment to staging
  - Manual promotion to production
```

---

## Key Takeaways for Android Studio Setup

1. **This is a React Native project**, not traditional Android development
2. **Expo manages the build process**, Android Studio is for emulation & debugging
3. **Backend is separate Go service** - runs independently via Docker
4. **TypeScript is used**, not Kotlin
5. **WebSocket for real-time**, not traditional REST polling
6. **E2E encryption** - Signal Protocol handles all crypto
7. **Local databases** for offline functionality
8. **Protobuf** for efficient message serialization

---

## Next Steps

1. ✅ Install Android Studio (latest version)
2. ✅ Configure JDK, SDK, and emulator
3. ✅ Setup environment variables (JAVA_HOME, ANDROID_HOME, NODE_HOME)
4. ✅ Install Node.js & npm globally
5. ✅ Install Docker & Docker Desktop
6. ✅ Clone/open the CipherChat project
7. ✅ Run `npm install` in mobile directory
8. ✅ Start Docker services: `docker-compose up -d`
9. ✅ Start backend: `go run ./cmd/server/main.go`
10. ✅ Start Expo: `npm start`
11. ✅ Test on emulator or device

---

**Document Version**: 1.0  
**Last Updated**: December 3, 2025  
**Status**: Complete

