# Android Studio Configuration Guide for CipherChat

## Project Overview
**CipherChat** is a multi-platform encrypted messaging application with:
- **Frontend**: React Native + Expo (TypeScript)
- **Backend**: Go with WebSocket support
- **Databases**: PostgreSQL, ScyllaDB (Cassandra), Redis, MinIO
- **Crypto**: Signal Protocol for E2E encryption
- **Mobile**: Expo-based React Native app with protocol buffers

---

## 1. System Requirements

### Minimum Requirements:
- **Android Studio**: 2024.1 or higher
- **JDK**: Java 17+ (Android Studio includes Temurin JDK)
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 50GB free space (for SDK, emulator, and caches)
- **Node.js**: v18+ (for Expo/React Native)
- **Go**: 1.25.4+ (for backend development)

### Recommended Setup:
- Android Studio Electric Eel (2024.1) or Flamingo (2023.2)
- Intel/AMD CPU with virtualization enabled
- SSD storage
- USB 3.0 port for physical device testing

---

## 2. Android Studio Installation & Configuration

### 2.1 Initial Setup Wizard
When launching Android Studio for the first time:

1. **Install Android SDK (CipherChat Requirements)**
   - ✅ SDK Platform: Android 14 (API 34) - **REQUIRED - Target API**
   - ✅ SDK Platform: Android 13 (API 33) - **REQUIRED - Minimum support**
   - ✅ SDK Build Tools: 34.0.0+ - **REQUIRED**
   - ✅ SDK Emulator: Latest - **REQUIRED**
   - ✅ Android Virtual Device (AVD): Create device with API 34 - **REQUIRED**
   
   **⚠️ IMPORTANT**: Do **NOT** install API 36 or higher for CipherChat. Only install API 34 and 33.

2. **Install Additional Components**
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ Android SDK Build-Tools 34.0.0+
   - ✅ Android SDK Tools
   - ✅ Intel x86 Emulator Accelerator (HAXM) - Windows only (optional)
   - ✅ Google Play Services (recommended)

### 2.2 Java/JDK Configuration
```
File > Project Structure > SDK Location
  - JDK Location: (Use Android Studio's bundled JDK - recommended)
  - Android SDK Location: C:\Users\Lavish\AppData\Local\Android\Sdk
  - NDK Version: (optional, needed only if using native code)
```

---

## 3. Environment Variables Setup

Add to your Windows System Environment Variables:

```powershell
# JAVA_HOME
JAVA_HOME=C:\Users\Lavish\AppData\Local\JetBrains\Toolbox\apps\AndroidStudio\ch-0\243.xxxxxxx\jbr

# ANDROID_HOME
ANDROID_HOME=C:\Users\Lavish\AppData\Local\Android\Sdk

# Add to PATH
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator

# NODE_HOME (for React Native/Expo)
NODE_HOME=C:\Program Files\nodejs

# Add to PATH
%NODE_HOME%

# GOPATH (for backend development)
GOPATH=C:\Users\Lavish\go
GOROOT=C:\Program Files\Go (or where Go is installed)
```

**To verify setup:**
```powershell
java -version
node --version
npm --version
go version
```

---

## 4. Project Structure Recognition in Android Studio

### 4.1 Opening the Project
1. **Open Android Studio**
2. **File > Open** → Select `C:\Users\Lavish\visualizer\CipherChat\mobile`
3. **Trust Project** when prompted
4. Wait for Gradle sync and indexing to complete

### 4.2 Mark Directories
```
Right-click on folder > Mark Directory As:

/mobile/src/main          → Sources Root (if created)
/mobile/components        → Resource Root
/mobile/assets            → Resource Root
/mobile/proto             → Generated Sources Root
/mobile/node_modules      → Excluded (not a source root)
/.expo                    → Excluded
```

### 4.3 Project Structure Settings
```
File > Project Structure:

Project:
  - Name: CipherChat
  - Location: C:\Users\Lavish\visualizer\CipherChat\mobile
  - Project SDK: Android API 34

Modules:
  - Add mobile module if not auto-detected
  - Dependencies: Link to package.json via npm integration
```

---

## 5. Run Configurations

### 5.1 Create Expo Run Configuration
```
Run > Edit Configurations > + (Add New)

Name: Expo Dev Server
Program: C:\Program Files\nodejs\npm.cmd  (or your npm path)
Arguments: start --android
Working directory: C:\Users\Lavish\visualizer\CipherChat\mobile
Environment: 
  - EXPO_DEBUG=true
  - NODE_ENV=development
```

### 5.2 Create Backend Server Configuration (Optional)
```
Run > Edit Configurations > + (Add New)

Name: Go Backend Server
Program: C:\Program Files\Go\bin\go.exe
Arguments: run ./cmd/server/main.go
Working directory: C:\Users\Lavish\visualizer\CipherChat\backend
Environment:
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_USER=postgres
  - DB_PASSWORD=password
  - DB_NAME=cipherchat
  - SCYLLA_HOST=localhost
  - REDIS_URL=redis://localhost:6379
  - MINIO_ENDPOINT=localhost:9000
```

### 5.3 Create Docker Compose Configuration
```
Run > Edit Configurations > + (Add New)

Name: Docker Services (Backend Infrastructure)
Program: docker-compose
Arguments: -f ./infra/docker-compose.yml up
Working directory: C:\Users\Lavish\visualizer\CipherChat
```

---

## 6. Emulator Configuration

### 6.1 Create Android Virtual Device (AVD)
```
Tools > Device Manager > Create Virtual Device

Phone: Pixel 8 (recommended)
System Image: Android 14 (API 34)
  - Variant: ARM64 (or Intel x86 if HAXM enabled)
  - Google APIs: Yes
  
Advanced Settings:
  - RAM: 4GB
  - VM Heap: 512MB
  - Internal Storage: 2GB
  - SD Card: 512MB
  - Front Camera: Emulated
  - Back Camera: Emulated
  - Keyboard: Checked
  - Boot option: Cold Boot
```

### 6.2 Launch Emulator
```powershell
# From PowerShell
$ANDROID_HOME\emulator\emulator -avd Pixel_8_API_34 -no-snapshot-load

# Or use Android Studio's Device Manager
```

### 6.3 Verify Emulator Connection
```powershell
adb devices
# Should show: emulator-5554  device
```

---

## 7. Gradle & Build Configuration

### 7.1 Gradle Configuration (If Needed)
Create or update `gradle.properties` in mobile root:

```properties
# Gradle Settings
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true

# Enable native debugging
android.ndkVersion=25.1.8937393
```

### 7.2 Android Studio Gradle Settings
```
File > Settings > Build, Execution, Deployment > Gradle

Gradle JVM: Use Android Studio's JDK (recommended)
Gradle version: Latest stable
Offline mode: Unchecked
```

---

## 8. Plugins & Extensions Configuration

### 8.1 Essential Plugins
Install these plugins in Android Studio:
```
File > Settings > Plugins > Marketplace

Required:
  ✅ Kotlin (built-in)
  ✅ Android
  ✅ Gradle (built-in)

Recommended:
  ✅ TypeScript
  ✅ Protocol Buffers
  ✅ Prettier
  ✅ ESLint
  ✅ Git Toolbox
  ✅ GitHub Copilot
```

### 8.2 Install Plugins via CLI
```powershell
# Using Android Studio's plugin command line
# Usually automatic during setup
```

---

## 9. Code Style & Formatting

### 9.1 TypeScript/React Native Code Style
```
File > Settings > Editor > Code Style > TypeScript

Scheme: CipherChat (Create custom)
  - Use single quotes: Yes
  - Tab size: 2
  - Indent size: 2
  - Line length: 100
  - Trailing comma: ES5
```

### 9.2 Enable Prettier Integration
```
File > Settings > Languages & Frameworks > TypeScript > Prettier

Enable: Yes
Prettier package: Use local (from node_modules)
On Save: Format code
```

---

## 10. Debugging Configuration

### 10.1 Remote Debugging Setup
```
Run > Edit Configurations > + (Add New)

Name: React Native Debug
JavaScript Debugger: 
  - URL: http://localhost:8081/debugger-ui/
  - Debugger port: 8081
  
Environment:
  - REACT_NATIVE_TOOLS_ANDROID_HOME=$ANDROID_HOME
```

### 10.2 Logcat Configuration
```
View > Tool Windows > Logcat

Filters:
  + Create new filter: "CipherChat"
  - Filter expression: package:mobile|ReactNative|Signal
  
Configure output:
  - Show non-matching logs: OFF
  - Full project name: ON
  - Show timestamps: ON
```

---

## 11. Database & Backend Setup for Testing

### 11.1 Docker Desktop Prerequisites
- **Docker Desktop for Windows**: 4.0+
- **WSL 2 Backend**: Enabled
- **Hyper-V**: Enabled in Windows

### 11.2 Start Backend Infrastructure
```powershell
# Navigate to project root
cd C:\Users\Lavish\visualizer\CipherChat

# Start all services
docker-compose -f infra/docker-compose.yml up -d

# Verify services
docker-compose -f infra/docker-compose.yml ps

# View logs
docker-compose -f infra/docker-compose.yml logs -f

# Stop services
docker-compose -f infra/docker-compose.yml down
```

### 11.3 Database Connections
```
PostgreSQL (Development):
  - Host: localhost:5432
  - User: postgres
  - Password: password
  - Database: cipherchat

ScyllaDB (NoSQL):
  - Host: localhost:9042
  - Keyspace: cipherchat

Redis (Cache):
  - Host: localhost:6379

MinIO (Object Storage):
  - Endpoint: http://localhost:9000
  - Access Key: minioadmin
  - Secret Key: minioadmin
  - Console: http://localhost:9001
```

---

## 12. Testing Configuration

### 12.1 Unit Testing
```powershell
# Frontend Tests
cd mobile
npm test

# Backend Tests
cd ..\backend
go test ./...
```

### 12.2 Integration Testing
```
Create run configuration for:
- Backend server running
- All Docker services running
- Emulator/device connected
```

### 12.3 End-to-End (E2E) Testing
```powershell
# Using Expo test
cd mobile
npm test -- --coverage
```

---

## 13. Device Testing

### 13.1 Physical Device Setup
```powershell
# Enable Developer Mode on Android device
Settings > About Phone > Build number (tap 7 times)
Settings > Developer options > USB Debugging: ON

# Connect device via USB
adb devices

# Grant permissions
adb shell pm grant com.example.mobile android.permission.WRITE_EXTERNAL_STORAGE
adb shell pm grant com.example.mobile android.permission.READ_EXTERNAL_STORAGE
```

### 13.2 Wireless Debugging (Optional)
```powershell
# Connect device via WiFi
# Enable Wireless debugging on device
adb connect <device-ip>:5555
adb devices
```

---

## 14. Logcat & Debugging Tools

### 14.1 Filter Logs in Logcat
```
View > Tool Windows > Logcat

Add Filters:
  - Tag: "CipherChat"
  - Level: Verbose
  - Show all processes: OFF (select mobile app process)
```

### 14.2 Memory Profiler
```
Run > Profile 'app' (or use Shift+Ctrl+F10)
  - View > Tool Windows > Profiler
  - Memory tab > Check heap dumps
```

### 14.3 Network Profiler
```
Profiler > Network tab
  - Monitor WebSocket traffic to backend
  - Check API calls and response times
```

---

## 15. Firebase & Analytics (Optional Future Setup)

```
Tools > Firebase > Connect to Firebase

(For crash reporting, analytics, and remote config later)
```

---

## 16. Version Control Integration

### 16.1 Configure Git in Android Studio
```
File > Settings > Version Control > Git

Git executable: Auto-detect or C:\Program Files\Git\bin\git.exe
GitHub/GitLab accounts: Configure as needed
```

### 16.2 Configure .gitignore
Ensure mobile/.gitignore includes:
```
node_modules/
.expo/
dist/
build/
.gradle/
local.properties
*.jks
*.keystore
.env
```

---

## 17. Performance Optimization

### 17.1 Gradle Optimization
```properties
# In gradle.properties
org.gradle.jvmargs=-Xmx2048m
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.caching=true
```

### 17.2 Emulator Performance
- Enable Hardware acceleration (HAXM)
- Allocate sufficient RAM (4GB+)
- Use cold boot initially
- Enable snapshot for faster restarts

### 17.3 Indexing & Caching
```
File > Settings > Appearance & Behavior > System Settings

Memory:
  - Gradle: 2048 MB
  - IDE: 2048 MB
  - Filesystem cache: Maximum
```

---

## 18. Debugging Checklist

Before running the app:
- [ ] Android SDK Platform 34+ installed
- [ ] Android Emulator created and working
- [ ] `adb devices` shows connected device/emulator
- [ ] Docker containers running (PostgreSQL, ScyllaDB, Redis, MinIO)
- [ ] Backend server running or accessible
- [ ] `npm install` completed in mobile directory
- [ ] TypeScript compiles without errors
- [ ] Expo CLI installed globally: `npm install -g expo-cli`

---

## 19. Quick Start Commands

```powershell
# 1. Setup environment
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm install

# 2. Start Docker infrastructure
cd ..\
docker-compose -f infra/docker-compose.yml up -d

# 3. Start backend (in separate terminal)
cd backend
go run ./cmd/server/main.go

# 4. Start Expo dev server (in separate terminal)
cd ..\mobile
npm start

# 5. Connect to Android emulator
# Use 'a' in Expo CLI to open on Android
# Or: npm run android
```

---

## 20. Troubleshooting

### Issue: Emulator Won't Start
**Solution:**
```powershell
# Check if virtualization is enabled
# For Windows: Enable Hyper-V or use Android Studio's built-in emulator
# Restart emulator: adb kill-server && adb start-server
```

### Issue: Gradle Sync Failed
**Solution:**
```
File > Sync Now
File > Invalidate Caches > Invalidate and Restart
Delete .gradle folder and re-sync
```

### Issue: npm dependencies error
**Solution:**
```powershell
npm ci  # Clean install
npm install --legacy-peer-deps  # If peer dependency issues
```

### Issue: WebSocket Connection Error
**Solution:**
- Verify backend server is running
- Check emulator network: adb shell netstat
- Backend IP: Use 10.0.2.2 instead of localhost for emulator
- Modify WebSocketClient to use: `ws://10.0.2.2:8080` for emulator

### Issue: Crypto/Signal Protocol Errors
**Solution:**
```powershell
npm install @privacyresearch/libsignal-protocol-typescript --save
npm install protobufjs --save
```

### Issue: SDK Download Error "Not in GZIP format"
**Solution:**
This error occurs when installing API 36 or other unnecessary API levels.

**For CipherChat, you only need API 34.** Do not install API 36.

If you're getting this error:
1. Close Android Studio completely
2. Delete corrupted downloads:
   ```powershell
   Remove-Item -Path "$env:APPDATA\Local\Android\Sdk\temp" -Recurse -Force
   Remove-Item -Path "$env:APPDATA\Local\Android\Sdk\system-images\android-36" -Recurse -Force
   ```
3. Reopen Android Studio
4. **Only install API 34** and API 33 in SDK Manager
5. **Skip API 36** (not needed for CipherChat)

See **SDK_DOWNLOAD_ERROR_FIX.md** for detailed solutions.

---

## 21. Summary

You now have Android Studio configured for CipherChat development with:
- ✅ Full React Native/Expo development environment
- ✅ Android emulator ready for testing
- ✅ Backend infrastructure via Docker
- ✅ Database connections configured
- ✅ Debugging and profiling tools ready
- ✅ Git integration
- ✅ Code style and formatting

**Next Steps:**
1. Open the project in Android Studio
2. Run Docker containers: `docker-compose up -d`
3. Start Expo: `npm start`
4. Launch the emulator and test
5. Monitor logs in Android Studio Logcat

