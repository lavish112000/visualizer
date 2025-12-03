# CipherChat Quick Commands Reference
**Last Updated:** December 3, 2025

## 🚀 Quick Start Commands

### Start Everything (Docker Only - Manual Steps After)
```powershell
# Run in PowerShell
cd C:\Users\Lavish\visualizer\CipherChat
.\start-all.ps1
```

---

## 🔧 Individual Service Commands

### 1️⃣ **Backend Server** (Terminal 1)
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\backend
go run ./cmd/server/main.go
```
**Port:** 8080
**Status Indicator:** "Starting CipherChat Server on port 8080"

---

### 2️⃣ **Expo Dev Server** (Terminal 2)
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm start
```
**Port:** 19000
**Status Indicator:** "Expo DevTools running at http://localhost:19000"
**Launch Options:** Press 'a' for Android, 'i' for iOS

---

### 3️⃣ **Android Emulator** (Terminal 3 or Android Studio)
```powershell
# Option A: Via command line
emulator -avd Pixel_8_API_34

# Option B: Via Android Studio
# Tools > Device Manager > Select device > Play button
```
**Recommended Device:** Pixel 8 / Pixel 8 Pro
**Android Version:** 14 (API 34)

---

### 4️⃣ **Docker Services** (Runs in Background)
```powershell
# Start all services
cd C:\Users\Lavish\visualizer\CipherChat
docker-compose -f infra/docker-compose.yml up -d

# Stop all services
docker-compose -f infra/docker-compose.yml down

# View status
docker-compose -f infra/docker-compose.yml ps

# View logs
docker-compose -f infra/docker-compose.yml logs -f postgres
docker-compose -f infra/docker-compose.yml logs -f scylla
```

**Services Running:**
- PostgreSQL (5432)
- ScyllaDB (9042)
- Redis (6379)
- MinIO (9000, 9001)

---

## 📋 Service Health Checks

### Check if Port is In Use
```powershell
netstat -ano | findstr :8080
netstat -ano | findstr :19000
netstat -ano | findstr :5432
netstat -ano | findstr :9042
```

### Check Docker Container Health
```powershell
docker ps
docker logs cipherchat_postgres
docker logs cipherchat_scylla
docker exec cipherchat_postgres psql -U postgres -c "SELECT version();"
```

### Check Emulator Status
```powershell
adb devices
adb shell getprop ro.build.version.release
```

---

## 🔄 Common Workflows

### Complete Fresh Start
```powershell
# 1. Stop everything
docker-compose -f C:\Users\Lavish\visualizer\CipherChat\infra\docker-compose.yml down
pkill -f "go run"
pkill -f "npm start"

# 2. Wait 5 seconds
Start-Sleep -Seconds 5

# 3. Start fresh
cd C:\Users\Lavish\visualizer\CipherChat
.\start-all.ps1

# 4. In separate terminals:
# Terminal 1: cd backend && go run ./cmd/server/main.go
# Terminal 2: cd mobile && npm start
# Terminal 3: Open emulator from Android Studio
```

### Rebuild App
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile

# Clear cache and rebuild
npm install --legacy-peer-deps
npm start -- --reset-cache
```

### Reset Database
```powershell
cd C:\Users\Lavish\visualizer\CipherChat

# Stop services
docker-compose -f infra/docker-compose.yml down -v

# Remove volumes (deletes data)
docker volume prune -f

# Restart
docker-compose -f infra/docker-compose.yml up -d
```

---

## 🔍 Debugging Commands

### View App Logs (Android Studio Logcat)
```powershell
# From Android Studio: Alt+6
# Filter: "CipherChat" or "ReactNative" or "WebSocket"

# Or via command line:
adb logcat | findstr CipherChat
adb logcat | findstr WebSocket
adb logcat | findstr "HTTP"
```

### View Backend Logs
```powershell
# In the terminal running backend server, watch output for:
# - "Starting CipherChat Server"
# - "Connected to PostgreSQL"
# - "Connected to ScyllaDB"
# - Error messages
```

### Test API Endpoint
```powershell
# From host machine
curl -X POST http://localhost:8080/auth/register/init `
  -H "Content-Type: application/json" `
  -d '{"username":"testuser"}'

# Or from emulator
adb shell curl -X POST http://10.0.2.2:8080/auth/register/init
```

---

## 📱 Android Commands

### List Connected Devices
```powershell
adb devices
```

### Install APK on Emulator
```powershell
# If building APK manually
adb install -r path/to/app.apk
```

### Clear App Data
```powershell
adb shell pm clear com.cipherchat.mobile
```

### Take Screenshot from Emulator
```powershell
adb shell screencap /sdcard/screenshot.png
adb pull /sdcard/screenshot.png C:\Users\Lavish\Downloads\
```

---

## 🔐 Database Access

### PostgreSQL
```powershell
# Connect to PostgreSQL
docker exec -it cipherchat_postgres psql -U postgres -d cipherchat

# Common queries
SELECT * FROM users;
SELECT * FROM messages;
SELECT * FROM conversations;
\dt  # List all tables
\q   # Quit
```

### ScyllaDB (NoSQL)
```powershell
# Connect to ScyllaDB
docker exec -it cipherchat_scylla cqlsh

# Common queries
SELECT * FROM cipherchat.messages LIMIT 10;
SELECT * FROM cipherchat.message_index;
EXIT;
```

### Redis
```powershell
# Connect to Redis
docker exec -it cipherchat_redis redis-cli

# Common commands
KEYS *
GET session:key
HGETALL user:123
QUIT
```

---

## 📦 npm Commands

### Install Dependencies
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm install --legacy-peer-deps
```

### Check for Vulnerabilities
```powershell
npm audit
npm audit fix
```

### Update Packages
```powershell
npm outdated
npm update
```

### Clear Cache
```powershell
npm cache clean --force
rm -r node_modules
npm install --legacy-peer-deps
```

---

## 🛑 Stop Services

### Stop Everything
```powershell
# Stop Docker
docker-compose -f C:\Users\Lavish\visualizer\CipherChat\infra\docker-compose.yml down

# Stop backend (Ctrl+C in terminal)
# Stop Expo (Ctrl+C in terminal)
# Close emulator
```

### Stop Specific Service
```powershell
# Stop PostgreSQL only
docker-compose -f infra/docker-compose.yml down postgres

# Stop and remove volumes
docker-compose -f infra/docker-compose.yml down -v
```

---

## 🐛 Troubleshooting Commands

### Docker Issues
```powershell
# Restart Docker Desktop
# Or via command line:
docker system prune
docker volume prune
```

### Check Go Installation
```powershell
go version
go env
```

### Check Node Installation
```powershell
node --version
npm --version
npx expo --version
```

### Check Android Setup
```powershell
echo $env:ANDROID_HOME
echo $env:JAVA_HOME
adb version
```

### Free Up Resources
```powershell
# Close unnecessary apps
# Stop emulator if not in use
# Restart Docker
# Restart Android Studio
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `SETUP_CHECKLIST.md` | Initial setup guide |
| `ANDROID_SETUP.md` | Android Studio configuration |
| `STARTUP_LOG.md` | Current startup status |
| `DEVELOPMENT_WORKFLOW.md` | Daily development guide |
| `TECHNICAL_REQUIREMENTS.md` | Architecture details |
| `IDE_CONFIGURATION.md` | IDE setup guide |
| `QUICK_COMMANDS.md` | This file |

---

## ⚡ Performance Tips

### Make Build Faster
```powershell
# Enable Gradle parallel builds
# File > Settings > Build, Execution, Deployment > Compiler
# Check: "Compile independent modules in parallel"

# Increase Gradle heap (gradle.properties)
org.gradle.jvmargs=-Xmx4096m
```

### Make Emulator Faster
```powershell
# Allocate more RAM (if available)
# AVD Manager > Edit AVD > RAM: 4GB
# Enable GPU acceleration
# Enable Fast Boot
```

---

## 📞 Support Checklist

Before reporting issues, check:
- [ ] Docker Desktop is running
- [ ] Go is installed and in PATH
- [ ] Node.js and npm are installed
- [ ] Android SDK is properly configured
- [ ] Emulator has internet connectivity
- [ ] Backend is running on port 8080
- [ ] Expo is running on port 19000
- [ ] No port conflicts (netstat check)
- [ ] Firewall isn't blocking ports

---

**Ready to develop! 🚀**

*Use these commands daily for testing and development.*

