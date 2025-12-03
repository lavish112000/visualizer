# CipherChat - Startup Process Log
**Started:** December 3, 2025 | **Session ID:** Automated Test Session

---

## 🚀 STARTUP SUMMARY

All essential services for CipherChat testing have been initiated. Follow the status below and the next steps to launch the app on Android.

---

## ✅ SERVICES STARTED

### 1. **Docker Infrastructure** ✓
Status: **RUNNING**

**Services:**
- ✅ PostgreSQL (Port 5432) - Database for users, messages, keys
- ✅ ScyllaDB (Port 9042) - NoSQL database for message history  
- ✅ Redis (Port 6379) - Cache and session management
- ✅ MinIO (Ports 9000-9001) - Object storage for media/files

**Startup Time:** ~6 minutes
**Health Check:** ScyllaDB shows "healthy" status

### 2. **Backend Go Server** ⏳
Status: **PENDING**

Location: `C:\Users\Lavish\visualizer\CipherChat\backend`

**Configuration:**
- Port: 8080 (default)
- API Endpoints:
  - `/auth/register/init` - OTP registration
  - `/auth/login/init` - OTP login
  - `/keys/upload` - Signal protocol key exchange
  - `/keys/query` - PreKey bundle queries
  - `/chat/sync` - Message synchronization
  - `/media/*` - Media upload/download with presigned URLs
  - `/stickers/packs` - Sticker management
  - WebSocket endpoint for real-time messaging

**Start Command (in separate terminal):**
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\backend
go run ./cmd/server/main.go
```

**Expected Output:**
```
2025/12/03 ... Starting CipherChat Server on port 8080
2025/12/03 ... Connected to PostgreSQL at ...
2025/12/03 ... Connected to ScyllaDB at ...
2025/12/03 ... WebSocket server running
```

### 3. **Frontend Mobile App** ✓
Status: **READY**

Location: `C:\Users\Lavish\visualizer\CipherChat\mobile`

**Dependencies:** npm packages installed (883 packages)
- ✅ Expo 54.0.25
- ✅ React Native 0.81.5
- ✅ React Navigation for routing
- ✅ libsignal-protocol-typescript for E2E encryption
- ✅ WatermelonDB for local encrypted database
- ✅ Async Storage for secure credentials

**Expo Dev Server:** Starting...

**Start Command (in separate terminal):**
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm start
```

**Expected Output:**
```
Starting Expo server on port 19000...
Expo DevTools running at http://localhost:19000
LAN:  exp://YOUR_IP_ADDRESS:19000
```

---

## 📋 NEXT STEPS TO TEST THE APP

### Step 1: Ensure Backend is Running
```powershell
# In a NEW terminal
cd C:\Users\Lavish\visualizer\CipherChat\backend
go run ./cmd/server/main.go
```
Wait for "Server started on port 8080" message.

### Step 2: Ensure Expo Dev Server is Running
```powershell
# In another NEW terminal
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm start
```
Wait for "Expo DevTools running" message.

### Step 3: Launch on Android Emulator

**Option A: Press 'a' in Expo Terminal**
```
When you see the menu in Expo terminal, press 'a' to open on Android
```

**Option B: Via npm script**
```powershell
# In mobile directory
npm run android
```

**Option C: Via Android Studio**
- Open Android Studio
- Go to: Tools > Device Manager
- Select "Pixel_8_API_34" emulator
- Click green play button to launch
- App will auto-launch when ready

### Step 4: Test the App

Once the app launches on emulator:

1. **Login Screen**
   - Should display OTP login form
   - No red error overlay
   - UI elements are interactive

2. **Backend Connection**
   - Check Android Studio Logcat
   - Filter: "CipherChat" or "WebSocket"
   - Should see: "WebSocket connected" message

3. **Send Test Message**
   - Login with test credentials
   - Navigate to contacts/chat
   - Send a test message
   - Should appear in chat (encrypted/decrypted locally)

4. **Verify Encryption**
   - Check Logcat for "Message encrypted" log
   - Verify message is decrypted before display
   - Check Signal protocol logs

---

## 🔧 SYSTEM CONFIGURATION

### Environment Variables
```
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
ANDROID_HOME=C:\Users\Lavish\AppData\Local\Android\Sdk
GOPATH=C:\Users\Lavish\go (or your Go workspace)
NODE_PATH=C:\Program Files\nodejs
```

### Android Studio Configuration
- **Project:** C:\Users\Lavish\visualizer\CipherChat\mobile
- **Gradle:** Configured and synced
- **JDK:** 17+ (from Android Studio)
- **SDK Level:** Android 14 (API 34) - recommended

### Emulator Configuration
- **Device:** Pixel 8 / Pixel 8 Pro
- **Android Version:** 14 (API 34)
- **RAM:** 4GB
- **Storage:** 2GB internal, 512MB SD card
- **GPU:** Hardware acceleration (enabled)

---

## 🌐 SERVICE ENDPOINTS

**Backend API:**
```
Base URL: http://10.0.2.2:8080 (from Android emulator)
         http://localhost:8080 (from host machine)
```

**Expo Dev Server:**
```
URL: http://localhost:19000
LAN: exp://192.168.x.x:19000
```

**Database Services:**
- PostgreSQL: localhost:5432 (user: postgres, pass: password, db: cipherchat)
- ScyllaDB: localhost:9042 (NoSQL cluster)
- Redis: localhost:6379
- MinIO: http://localhost:9000 (Console: 9001)

---

## ⚠️ COMMON ISSUES & FIXES

### Issue: Backend "Failed to connect to PostgreSQL"
```
✓ Docker containers running? Check: docker-compose ps
✓ PostgreSQL healthy? Wait 10-15 seconds for full startup
✓ Reset containers: docker-compose down && docker-compose up -d
```

### Issue: "WebSocket connection refused"
```
✓ Backend server running on 8080?
✓ Android emulator network: Use 10.0.2.2 not localhost
✓ Firewall blocking? Allow port 8080
```

### Issue: "npm modules not found"
```
✓ npm install completed? Check output for "added X packages"
✓ Try clean install: npm ci --legacy-peer-deps
```

### Issue: Expo Dev Server not starting
```
✓ Node.js installed? Check: node --version
✓ npm audit: npm audit fix --force
✓ Port 19000 free? Check: netstat -ano | findstr :19000
```

### Issue: Emulator won't boot
```
✓ Check: C:\Users\Lavish\AppData\Local\Android\Sdk\emulator\emulator.exe
✓ Hyper-V enabled? (Windows Features)
✓ WSL 2 enabled? (for Docker)
✓ Restart emulator: Close and relaunch from Device Manager
```

---

## 📊 SERVICE HEALTH CHECKLIST

- [x] Docker containers running
- [x] npm dependencies installed
- [ ] Backend server running (start manually)
- [ ] Expo dev server running (start manually)
- [ ] Android emulator booted (start via Device Manager)
- [ ] App visible on emulator screen
- [ ] WebSocket connection established
- [ ] Can send/receive messages
- [ ] Encryption working (check Logcat)

---

## 🛠️ MONITORING TOOLS

### View Docker Logs
```powershell
docker-compose -f infra/docker-compose.yml logs -f postgres
docker-compose -f infra/docker-compose.yml logs -f scylla
docker-compose -f infra/docker-compose.yml logs -f redis
```

### View Backend Logs (Terminal where server runs)
```
Watch the terminal where you ran: go run ./cmd/server/main.go
```

### View App Logs (Android Studio Logcat)
1. In Android Studio: Alt+6 or View > Tool Windows > Logcat
2. Filter by: "CipherChat" or "ReactNative" or "WebSocket"
3. Or filter: "package:mobile OR tag:Signal"

### View Network Traffic (Android Emulator)
```powershell
# From emulator terminal
adb logcat | findstr WebSocket
adb logcat | findstr "HTTP\|API"
```

---

## ✨ FEATURES TO TEST

Once app is running:

1. **Authentication**
   - [ ] OTP registration
   - [ ] OTP login
   - [ ] Session persistence

2. **Messaging**
   - [ ] Send message
   - [ ] Receive message
   - [ ] Message history sync

3. **Encryption**
   - [ ] End-to-End encryption (Signal protocol)
   - [ ] Message key exchange
   - [ ] Group encryption (if available)

4. **Media**
   - [ ] Upload image/file
   - [ ] Download media
   - [ ] Media preview

5. **Contacts & Groups**
   - [ ] View contact list
   - [ ] Create/join group
   - [ ] Group messaging

6. **Settings**
   - [ ] User profile
   - [ ] Security settings
   - [ ] Notification preferences

---

## 📝 NOTES

- This startup session was automated
- All timestamps are in IST (Indian Standard Time)
- Docker containers will persist until explicitly stopped
- Expo dev server runs in hot-reload mode
- Changes to mobile code auto-refresh on emulator
- Backend changes require server restart

---

## 🆘 SUPPORT RESOURCES

Located in project root:
- `SETUP_CHECKLIST.md` - Initial setup guide
- `ANDROID_SETUP.md` - Android Studio configuration
- `DEVELOPMENT_WORKFLOW.md` - Daily development guide
- `TECHNICAL_REQUIREMENTS.md` - Architecture and requirements
- `IDE_CONFIGURATION.md` - IDE setup details
- `QUICK_START_VISUAL.md` - Visual quick start guide

---

**Status: Ready for Testing** ✅
*Last Updated: 2025-12-03 | Automated Startup*

---

