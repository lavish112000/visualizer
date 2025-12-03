# CipherChat Setup - Visual Quick Reference

## 🎯 Setup Overview Flowchart

```
┌─────────────────────────────────────────────────────────────┐
│                  CIPHERCHAT SETUP JOURNEY                   │
└─────────────────────────────────────────────────────────────┘

START
  ↓
[1] Install Required Software (JDK, Node.js, Go, Docker)
  ├─ Download & install each tool
  ├─ Verify: java -version, node --version, go version, docker version
  └─ ✅ All tools installed
  ↓
[2] Install Android Studio
  ├─ Download from developer.android.com
  ├─ Run installer
  ├─ Accept licenses
  ├─ Install SDK components (API 34, build tools, emulator)
  └─ ✅ Android Studio ready
  ↓
[3] Configure Environment Variables
  ├─ Set ANDROID_HOME
  ├─ Set JAVA_HOME
  ├─ Update PATH
  └─ ✅ Environment configured
  ↓
[4] Create Android Emulator
  ├─ Tools > Device Manager
  ├─ Create Pixel 8 with API 34
  ├─ Allocate 4GB RAM
  ├─ Start emulator and verify boot
  └─ ✅ Emulator ready
  ↓
[5] Open CipherChat in Android Studio
  ├─ File > Open > mobile directory
  ├─ Wait for Gradle sync
  ├─ Mark directories
  └─ ✅ Project loaded
  ↓
[6] Install Frontend Dependencies
  ├─ npm install (in mobile directory)
  ├─ npm install -g expo-cli
  └─ ✅ Dependencies ready
  ↓
[7] Start Backend Services
  ├─ docker-compose up -d (Infrastructure)
  ├─ go run ./cmd/server/main.go (Backend)
  └─ ✅ Services running
  ↓
[8] Start Expo Dev Server
  ├─ npm start (in mobile directory)
  └─ ✅ Expo ready
  ↓
[9] Launch App on Emulator
  ├─ Press 'a' in Expo CLI
  ├─ Wait for build & launch
  └─ ✅ App running
  ↓
READY TO DEVELOP! 🎉
```

---

## 🔧 Terminal Setup Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              RECOMMENDED TERMINAL LAYOUT                    │
└─────────────────────────────────────────────────────────────┘

Your Screen (after setup):
┌──────────────────────────────────────────────────────────────┐
│                    ANDROID STUDIO IDE                        │
│                  (mobile project open)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ File  Edit  View  Build  Run  Tools  Help             │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │  Project Files (mobile/)                            │  │
│  │  ├─ components/                                      │  │
│  │  ├─ services/                                        │  │
│  │  └─ App.tsx                                          │  │
│  │                                                       │  │
│  │ [Logcat Tab - showing app logs ↓]                    │  │
│  │ [Running Device - Emulator-5554]                     │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

Left Side (Taskbar):
┌──────────────────┐
│ ① Terminal 1     │  Docker Infrastructure
│    (minimized)   │  docker-compose up -d
└──────────────────┘
┌──────────────────┐
│ ② Terminal 2     │  Backend Server
│    (minimized)   │  go run ./cmd/server/main.go
└──────────────────┘
┌──────────────────┐
│ ③ Terminal 3     │  Expo Dev Server
│    (minimized)   │  npm start
└──────────────────┘
```

---

## 📋 Key Commands Reference

### Terminal 1: Docker Infrastructure
```powershell
cd C:\Users\Lavish\visualizer\CipherChat

# Start all services
docker-compose -f infra/docker-compose.yml up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Terminal 2: Go Backend
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\backend

# Start server
go run ./cmd/server/main.go

# Run tests
go test ./...

# Expected output: "WebSocket server running on :8080"
```

### Terminal 3: Expo Frontend
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile

# Start dev server
npm start

# Or direct run
expo start

# Press 'a' to launch on Android emulator
```

### Terminal 4: General Commands
```powershell
# Check devices
adb devices

# View logs
adb logcat

# Kill server
adb kill-server
adb start-server
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    DATA FLOW ARCHITECTURE                    │
└──────────────────────────────────────────────────────────────┘

USER DEVICE (Emulator/Physical Phone)
│
│  ┌─────────────────────────────────────┐
│  │      CIPHERCHAT APP (React Native)  │
│  │                                     │
│  │  Components:                        │
│  │  ├─ LoginScreen                     │
│  │  ├─ ChatScreen                      │
│  │  └─ ProfileScreen                   │
│  │                                     │
│  │  Services:                          │
│  │  ├─ SignalService (Encryption)      │
│  │  ├─ WebSocketClient (Networking)    │
│  │  ├─ ChatManager (Logic)             │
│  │  └─ Local Storage (WatermelonDB)    │
│  └──────────────┬──────────────────────┘
│                 │
│      ┌──────────┴──────────┐
│      │ (1) User Input      │
│      │ (2) Encrypt with    │
│      │     Signal Protocol │
│      │ (3) Send over       │
│      │     WebSocket       │
│      └──────────┬──────────┘
│                 │
└─────────────────┼────────────────────────────────────────────
                  │ NETWORK (WebSocket + REST)
┌─────────────────┼────────────────────────────────────────────
│                 │
│      ┌──────────┴──────────┐
│      │ GO BACKEND SERVER   │
│      │ (Port 8080)         │
│      │ ┌─────────────────┐ │
│      │ │ API Handlers    │ │
│      │ │ ├─ auth.go      │ │
│      │ │ ├─ chat.go      │ │
│      │ │ ├─ keys.go      │ │
│      │ │ └─ media.go     │ │
│      │ └─────────────────┘ │
│      │ ┌─────────────────┐ │
│      │ │ WebSocket Hub   │ │
│      │ │ (Broadcasting)  │ │
│      │ └─────────────────┘ │
│      └────────────┬─────────┘
│                   │
│      ┌────────────┼─────────────┐
│      │            │             │
│      ▼            ▼             ▼
│  ┌────────┐  ┌────────┐  ┌──────────┐
│  │ Postgres│  │ ScyllaDB│  │   Redis  │
│  │ (Rel.  │  │(NoSQL) │  │ (Cache)  │
│  │ Data)  │  │        │  │          │
│  │        │  │        │  │          │
│  │ Users  │  │Messages│  │Sessions  │
│  │ Chats  │  │History │  │Prekeys   │
│  │        │  │        │  │          │
│  └────────┘  └────────┘  └──────────┘
│
└─ Docker Container Network
```

---

## 🗂️ File Structure Visualization

```
C:\Users\Lavish\visualizer\CipherChat\
│
├─ 📱 mobile/                      [← Main development directory]
│  ├─ components/                  [UI components]
│  │  ├─ ChatScreen.tsx           [Message display]
│  │  ├─ LoginScreen.tsx          [Auth UI]
│  │  ├─ MessageBubble.tsx        [Message item]
│  │  ├─ ProfileScreen.tsx        [User profile]
│  │  └─ SettingsScreen.tsx       [App settings]
│  │
│  ├─ services/                    [Business logic]
│  │  ├─ ChatManager.ts           [Message orchestration]
│  │  ├─ SignalService.ts         [E2E encryption] ⭐
│  │  └─ WebSocketClient.ts       [Real-time sync]
│  │
│  ├─ model/                       [Data structures]
│  │  ├─ Message.ts               [Message model]
│  │  ├─ Conversation.ts          [Chat model]
│  │  └─ schema.ts                [WatermelonDB schema]
│  │
│  ├─ screens/                     [Screen components]
│  ├─ navigation/                  [React Navigation]
│  ├─ proto/                       [Protobuf definitions]
│  ├─ assets/                      [Images, icons]
│  │
│  ├─ App.tsx                      [Entry point] ⭐
│  ├─ package.json                 [Dependencies] ⭐
│  ├─ tsconfig.json                [TypeScript config]
│  └─ babel.config.js              [Babel config]
│
├─ 🔧 backend/
│  ├─ cmd/
│  │  └─ server/
│  │     └─ main.go               [Server entry point]
│  │
│  ├─ internal/
│  │  ├─ api/
│  │  │  ├─ auth.go              [Authentication]
│  │  │  ├─ chat.go              [Chat operations]
│  │  │  ├─ keys.go              [Key management]
│  │  │  └─ middleware.go        [HTTP middleware]
│  │  ├─ crypto/                 [Encryption logic]
│  │  ├─ db/                     [Database layer]
│  │  └─ ws/                     [WebSocket hub]
│  │
│  ├─ pb/                         [Protobuf generated]
│  ├─ go.mod                      [Go dependencies]
│  └─ go.sum                      [Dependency lock]
│
├─ 🐳 infra/
│  ├─ docker-compose.yml          [Services definition]
│  ├─ postgres/
│  │  └─ init.sql                [Database init]
│  └─ scylla/
│     └─ init.cql                [NoSQL init]
│
├─ 🔐 proto/
│  ├─ chat.proto                 [Message schema]
│  └─ keys.proto                 [Key schema]
│
└─ 📚 Documentation/
   ├─ README_SETUP.md            [← Overview & summary] ⭐
   ├─ ANDROID_SETUP.md           [← Detailed setup guide] ⭐
   ├─ TECHNICAL_REQUIREMENTS.md  [Architecture]
   ├─ IDE_CONFIGURATION.md       [IDE setup]
   ├─ DEVELOPMENT_WORKFLOW.md    [Daily dev guide]
   ├─ SETUP_CHECKLIST.md         [Verification]
   ├─ setup.ps1                  [PowerShell script]
   └─ setup.bat                  [Batch script]

⭐ = Start with these files
```

---

## 🎨 Technology Stack Visualization

```
┌──────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                          │
└──────────────────────────────────────────────────────────────┘

FRONTEND LAYER
───────────────────────────────────────────────────────────────
    React Native 0.81.5  ├─ Cross-platform mobile
    Expo 54.0.25        ├─ Managed React Native
    TypeScript 5.9.2    ├─ Type safety
    React Navigation    ├─ Screen routing
    
ENCRYPTION LAYER
───────────────────────────────────────────────────────────────
    Signal Protocol     ├─ End-to-End encryption
    libsignal-ts        ├─ TypeScript implementation
    Crypto API          ├─ Browser crypto
    
DATA LAYER (Mobile)
───────────────────────────────────────────────────────────────
    WatermelonDB        ├─ Local encrypted database
    AsyncStorage        ├─ Simple key-value store
    FileSystem          ├─ Media files
    
NETWORK LAYER
───────────────────────────────────────────────────────────────
    WebSocket           ├─ Real-time sync
    REST API            ├─ Additional requests
    Protobuf            ├─ Efficient serialization
    
BACKEND LAYER
───────────────────────────────────────────────────────────────
    Go 1.25.4           ├─ Server language
    Gorilla WebSocket   ├─ WebSocket support
    JWT                 ├─ Authentication
    
DATABASE LAYER
───────────────────────────────────────────────────────────────
    PostgreSQL 15       ├─ Relational data (users, metadata)
    ScyllaDB 5.2        ├─ Time-series (message history)
    Redis 7             ├─ Cache & sessions
    MinIO               ├─ File storage (S3-compatible)
    
INFRASTRUCTURE
───────────────────────────────────────────────────────────────
    Docker              ├─ Containerization
    Docker Compose      ├─ Orchestration
```

---

## ✅ Setup Verification Checklist

```
INSTALLATION VERIFICATION
┌─────────────────────────────────────────┐
│ ✅ JDK 17+       (java -version)        │
│ ✅ Node.js 18+   (node --version)       │
│ ✅ npm 9+        (npm --version)        │
│ ✅ Go 1.25.4+    (go version)           │
│ ✅ Docker        (docker --version)     │
│ ✅ Git (optional)(git --version)        │
└─────────────────────────────────────────┘

ANDROID SETUP VERIFICATION
┌─────────────────────────────────────────┐
│ ✅ Android Studio 2024.1+               │
│ ✅ SDK Platform 34 installed            │
│ ✅ SDK Build Tools 34.0.0+              │
│ ✅ Emulator installed                   │
│ ✅ JDK configured                       │
│ ✅ ANDROID_HOME set                     │
│ ✅ PATH includes Android tools          │
└─────────────────────────────────────────┘

ENVIRONMENT VERIFICATION
┌─────────────────────────────────────────┐
│ ✅ adb devices (shows emulator)         │
│ ✅ npm list (shows packages)            │
│ ✅ expo --version (CLI installed)       │
│ ✅ docker ps (shows containers)         │
│ ✅ Docker services running              │
└─────────────────────────────────────────┘

PROJECT SETUP VERIFICATION
┌─────────────────────────────────────────┐
│ ✅ mobile/node_modules/ exists          │
│ ✅ package-lock.json exists             │
│ ✅ Project opens in Android Studio      │
│ ✅ Gradle sync completes                │
│ ✅ TypeScript compiles                  │
└─────────────────────────────────────────┘

RUNTIME VERIFICATION
┌─────────────────────────────────────────┐
│ ✅ Docker containers running            │
│ ✅ Backend server listening             │
│ ✅ Expo dev server running              │
│ ✅ Emulator boots and connects          │
│ ✅ App loads without errors             │
└─────────────────────────────────────────┘
```

---

## 🔍 Debugging Quick Reference

```
Problem: App crashes on startup
──────────────────────────────────
1. Check Logcat:
   View > Tool Windows > Logcat
   Filter: "Error" or "Exception"
   
2. Check console.log:
   Should appear in Logcat with "ReactNativeJS" tag
   
3. Check backend:
   Terminal 2 should show errors if API issue

Problem: WebSocket won't connect
──────────────────────────────────
1. Verify backend running:
   Terminal 2 should show "WebSocket server running"
   netstat -ano | findstr :8080
   
2. Verify Docker services:
   docker-compose ps (all should be "Up")
   
3. Check emulator network:
   Use 10.0.2.2 instead of localhost
   
4. Check logs:
   Logcat > Filter "WebSocket"
   Backend terminal for errors

Problem: Encryption/Decryption fails
──────────────────────────────────────
1. Check Signal Service init:
   console.log('Signal initialized:', ok)
   
2. Check key storage:
   Backend should store user keys
   
3. Verify session created:
   console.log('Session keys:', keys)
   
4. Enable debug logging:
   this.debug = true in SignalService.ts

Problem: Performance issues
────────────────────────────
1. Check memory:
   Profiler > Memory tab
   Look for memory leaks
   
2. Check CPU:
   Profiler > CPU tab
   During message encryption
   
3. Increase emulator RAM:
   AVD settings > 4GB minimum
   
4. Enable GPU:
   AVD settings > GPU: Emulation
```

---

## 🚀 Fast Restart Procedure

After first setup, restart is faster:

```
┌─────────────────────────────────────────┐
│ FAST RESTART (next day)                 │
└─────────────────────────────────────────┘

1. Start Docker (5 min)
   docker-compose up -d
   
2. Start Backend (1 min)
   go run ./cmd/server/main.go
   
3. Launch Emulator (if not running)
   Android Studio Device Manager
   
4. Start Expo (1 min)
   npm start
   
5. Launch App (1 min)
   Press 'a' in Expo CLI
   
Total: ~8-10 minutes from scratch
```

---

## 📊 Resource Usage Guidelines

```
MEMORY ALLOCATION
─────────────────────────────────────
Component              | Min    | Recommended
─────────────────────────────────────
Emulator               | 2GB    | 4GB
Docker Services        | 2GB    | 4GB
Android Studio IDE     | 2GB    | 2GB
Go Backend             | 200MB  | 500MB
─────────────────────────────────────
TOTAL                  | 6.2GB  | 10.5GB
─────────────────────────────────────

Note: Allocate from your available RAM
If you have 8GB: Run minimal config
If you have 16GB: Run recommended config
```

---

## 🎓 Learning Path

```
New to Development?
  → Start with README_SETUP.md
  → Follow SETUP_CHECKLIST.md
  → Watch setup process
  → Read TECHNICAL_REQUIREMENTS.md
  
Experienced Developer?
  → Run setup.ps1 script
  → Skip to DEVELOPMENT_WORKFLOW.md
  → Reference docs as needed
  
Backend Focused?
  → Understand TECHNICAL_REQUIREMENTS.md
  → Focus on backend/ directory
  → Reference API documentation
  
Frontend Focused?
  → Study mobile/ structure
  → Review React Navigation setup
  → Understand SignalService.ts
  → Practice with DevTools
```

---

## 📞 Need Help?

**Check Documentation:**
1. README_SETUP.md - Overview
2. SETUP_CHECKLIST.md - Step-by-step
3. DEVELOPMENT_WORKFLOW.md - Daily work
4. Specific document based on issue

**Verify Setup:**
- Run setup.ps1 again
- Check environment variables
- Verify all services running
- Restart Android Studio

**Debug More:**
- Enable verbose logging
- Check Logcat carefully
- Review backend logs
- Test with simple message

---

**Happy Developing! 🎉**

