# CipherChat Android Studio Setup Checklist

## Pre-Setup Requirements
- [ ] Windows 10/11 with 8GB RAM (16GB+ recommended)
- [ ] Administrator access on the machine
- [ ] Internet connection (for downloading tools and dependencies)
- [ ] 50GB free disk space
- [ ] SSD storage (for faster builds)

---

## Step 1: Install Required Software

### JDK (Java Development Kit)
- [ ] Download JDK 17+ (or let Android Studio bundle it)
- [ ] Verify: `java -version` in PowerShell
- [ ] Set JAVA_HOME environment variable
- [ ] Test: Run `echo %JAVA_HOME%`

### Node.js & npm
- [ ] Download Node.js 18+ from nodejs.org
- [ ] Install with npm bundled
- [ ] Verify Node: `node --version` (should be v18+)
- [ ] Verify npm: `npm --version` (should be v9+)
- [ ] Run: `npm install -g npm@latest` (update npm)

### Go
- [ ] Download Go 1.25.4+ from golang.org
- [ ] Add Go to PATH
- [ ] Verify: `go version`
- [ ] Set GOPATH environment variable
- [ ] Verify: `echo %GOPATH%`

### Docker Desktop
- [ ] Download Docker Desktop for Windows
- [ ] Install with WSL 2 backend
- [ ] Enable Hyper-V (if not using WSL 2)
- [ ] Restart computer if needed
- [ ] Verify: `docker --version`
- [ ] Verify Docker is running: `docker ps`

### Git (Optional but Recommended)
- [ ] Download Git for Windows
- [ ] Add to PATH
- [ ] Verify: `git --version`
- [ ] Configure: `git config --global user.name "Your Name"`
- [ ] Configure: `git config --global user.email "your@email.com"`

### Android Studio
- [ ] Download Android Studio 2024.1+ from developer.android.com
- [ ] Run installer with Administrator privileges
- [ ] Accept license agreements
- [ ] Choose "Custom" setup
- [ ] Continue through setup wizard

---

## Step 2: Android Studio Initial Configuration

### Android SDK Installation
During Android Studio's first launch wizard:
- [ ] Install Android SDK Platform 34
- [ ] Install Android SDK Platform 33 (minimum support)
- [ ] Install Android SDK Build Tools 34.0.0+
- [ ] Install Android Emulator
- [ ] Install Android Virtual Device
- [ ] Install Google Play services

### JDK Configuration
- [ ] In setup wizard: Select "Use Android Studio's bundled JDK" (recommended)
- [ ] OR: Select JDK 17+ installation manually
- [ ] Verify in: File > Project Structure > SDK Location

### Android SDK Path
- [ ] SDK Location: Check that it points to Android SDK
- [ ] Default: `C:\Users\Lavish\AppData\Local\Android\Sdk`
- [ ] Verify path exists
- [ ] Do NOT move or rename this folder

---

## Step 3: Configure Environment Variables

### Set Environment Variables (Windows)

Open PowerShell as Administrator:

```powershell
# Set ANDROID_HOME
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", 
  "$env:APPDATA\Local\Android\Sdk", "User")

# Set JAVA_HOME (if using bundled JDK)
$androidStudioPath = "C:\Program Files\Android\Android Studio"
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", 
  "$androidStudioPath\jbr", "User")

# Add to PATH (Android tools)
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
$newPaths = @(
  "$env:APPDATA\Local\Android\Sdk\tools",
  "$env:APPDATA\Local\Android\Sdk\tools\bin",
  "$env:APPDATA\Local\Android\Sdk\platform-tools",
  "$env:APPDATA\Local\Android\Sdk\emulator"
)
$newPath = ($currentPath, ($newPaths -join ";")) -join ";"
[System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")

# Add Node to PATH (if not already present)
$nodePath = "C:\Program Files\nodejs"
if (-not $currentPath.Contains($nodePath)) {
  $newPath = ($currentPath, $nodePath) -join ";"
  [System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
}
```

After setting variables:
- [ ] Close and reopen PowerShell
- [ ] Verify JAVA_HOME: `echo $env:JAVA_HOME`
- [ ] Verify ANDROID_HOME: `echo $env:ANDROID_HOME`
- [ ] Verify adb in PATH: `adb --version`

---

## Step 4: Create Android Emulator

### Create Virtual Device (AVD)

In Android Studio:
1. [ ] Tools > Device Manager
2. [ ] Create Virtual Device
3. [ ] Select "Pixel 8" or "Pixel 8 Pro"
4. [ ] Click Next
5. [ ] Select "Android 14" (API 34)
6. [ ] Click Next
7. [ ] Configure:
   - [ ] Device Name: "Pixel_8_API_34"
   - [ ] Startup Options: "Cold Boot"
   - [ ] RAM: 4GB
   - [ ] VM Heap: 512MB
   - [ ] Internal Storage: 2GB
   - [ ] SD Card: 512MB
   - [ ] Enable Snapshots: Yes (optional)
8. [ ] Click Finish
9. [ ] Launch emulator: Select device > Green play button

### Verify Emulator Boot
```powershell
# Wait for emulator to fully boot (2-3 minutes)
# Check with:
adb devices

# Should show:
# emulator-5554         device
```

- [ ] Emulator fully booted (home screen visible)
- [ ] Emulator device shows in `adb devices`
- [ ] Network connectivity works (ping google.com)

---

## Step 5: Clone/Open CipherChat Project

### Open Mobile Project in Android Studio

1. [ ] Close any open projects
2. [ ] File > Open
3. [ ] Navigate to `C:\Users\Lavish\visualizer\CipherChat\mobile`
4. [ ] Click OK
5. [ ] Trust project if prompted
6. [ ] Wait for Gradle sync to complete (2-3 minutes)

### Mark Directories as Source Roots

Right-click on folders > Mark Directory As:
- [ ] mobile/components → Mark as Resource Root (optional)
- [ ] mobile/assets → Mark as Resource Root
- [ ] mobile/proto → Mark as Generated Sources Root (optional)
- [ ] node_modules → Mark as Excluded

### Verify Project Structure

- [ ] Project sidebar shows: mobile > components, screens, services, etc.
- [ ] No red error indicators in Project structure
- [ ] build.gradle or tsconfig.json files visible

---

## Step 6: Install Frontend Dependencies

### Install npm Packages

In Android Studio Terminal (Alt+F12):

```powershell
cd mobile
npm install
```

Or in separate PowerShell:

```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm install
```

Monitor progress:
- [ ] Installation starts (downloading packages)
- [ ] Shows "added X packages"
- [ ] No errors (warnings are usually OK)
- [ ] Completes in 2-5 minutes

### Verify Installation

```powershell
npm ls  # List installed packages
npm list --depth=0  # High-level packages only
```

- [ ] node_modules folder created
- [ ] package-lock.json exists
- [ ] No "unmet dependencies" warnings

---

## Step 7: Install Expo CLI

### Install Globally

```powershell
npm install -g expo-cli
```

### Verify Installation

```powershell
expo --version
expo whoami  # Should prompt for login (optional)
```

- [ ] expo-cli installed successfully
- [ ] expo command available globally

---

## Step 8: Configure Run Configurations in Android Studio

### Create Expo Run Configuration

1. [ ] Run > Edit Configurations
2. [ ] Click + (Add Configuration)
3. [ ] Select "Node.js"
4. [ ] Configure:
   - [ ] Name: "Expo Dev Server"
   - [ ] Node interpreter: Auto-detected
   - [ ] Package manager: npm
   - [ ] JavaScript file: node_modules\expo-cli\bin\expo.js
   - [ ] Arguments: "start --android"
   - [ ] Working directory: mobile/
5. [ ] Apply
6. [ ] OK

### Test Configuration

- [ ] Run > Run 'Expo Dev Server'
- [ ] Should show Expo output in Run panel
- [ ] Shows message about opening Android

---

## Step 9: Start Backend Services

### Start Docker Services

```powershell
cd C:\Users\Lavish\visualizer\CipherChat
docker-compose -f infra/docker-compose.yml up -d
```

Monitor startup:
```powershell
docker-compose ps
# Wait for all services to show "Up"
```

Verify services:
- [ ] PostgreSQL running (port 5432)
- [ ] ScyllaDB running (port 9042)
- [ ] Redis running (port 6379)
- [ ] MinIO running (port 9000, 9001)

### Start Backend Go Server

In separate PowerShell:

```powershell
cd backend
go run ./cmd/server/main.go
```

Monitor output:
- [ ] Shows "Starting CipherChat Server on port 8080"
- [ ] Shows "Connected to PostgreSQL"
- [ ] Shows "Connected to ScyllaDB"
- [ ] Shows "WebSocket server running"

---

## Step 10: Start Expo Dev Server

### Launch Expo

In separate PowerShell (or Android Studio Terminal):

```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm start
```

Monitor output:
- [ ] Shows "Expo DevTools running at http://localhost:19000"
- [ ] Shows "LAN: http://192.168.x.x:19000"
- [ ] Shows options: "Press a to open Android"

---

## Step 11: Run App on Emulator

### Option A: Via Expo CLI

In Expo terminal:
- [ ] Press 'a' to open on Android emulator

Wait for compilation and boot:
- [ ] App starts building (30-60 seconds)
- [ ] Emulator launches app
- [ ] App appears on emulator home screen

### Option B: Via npm script

```powershell
npm run android
```

- [ ] Builds and launches on Android

### Option C: Via Android Studio Device Manager

- [ ] Tools > Device Manager
- [ ] Select emulator > Green play button
- [ ] Wait for boot
- [ ] Expo CLI will auto-detect and launch

### Verify App Launch

Once app is running:
- [ ] Login screen appears
- [ ] No red error overlay
- [ ] Can tap UI elements without crashes
- [ ] Logcat shows app logs

---

## Step 12: Configure Debugging Tools

### Setup Logcat Filters

In Android Studio:
1. [ ] View > Tool Windows > Logcat (or Alt+6)
2. [ ] Create filter named "CipherChat"
3. [ ] Set filter expression:
   ```
   package:mobile | package:expo | tag:ReactNative
   ```
4. [ ] Create filter named "Crypto"
5. [ ] Set filter expression:
   ```
   tag:Signal | tag:Encryption | tag:Crypto
   ```
6. [ ] Create filter named "Network"
7. [ ] Set filter expression:
   ```
   tag:WebSocket | tag:Network
   ```

### Enable Debug Logging

In app code (temporary):
```typescript
// mobile/services/WebSocketClient.ts
console.log('WebSocket:', message);
```

Monitor in Logcat:
- [ ] Filter by "CipherChat"
- [ ] See console.log output in Logcat

### Setup Remote Debugger (Optional)

1. [ ] Run > Attach Debugger to Android Process
2. [ ] Select running app
3. [ ] Chrome DevTools opens automatically
4. [ ] Can set breakpoints and inspect state

---

## Step 13: Test Core Features

### Test 1: App Loads
- [ ] App starts without crashes
- [ ] Login screen displays
- [ ] No TypeScript errors in console

### Test 2: Backend Connection
- [ ] Logcat shows WebSocket messages
- [ ] Check: "WebSocket connected"
- [ ] No connection timeout errors

### Test 3: Encryption
- [ ] Send a test message
- [ ] Logcat shows: "Message encrypted"
- [ ] Message appears in chat

### Test 4: Multiple Devices (Optional)
- [ ] Create second emulator
- [ ] Start both emulators
- [ ] Login with different users
- [ ] Send message between users
- [ ] Verify delivery and decryption

---

## Step 14: Final Verification Checklist

### Development Environment
- [ ] Android Studio opens project without errors
- [ ] Gradle sync completes successfully
- [ ] TypeScript compiles without errors
- [ ] Project structure shows all modules

### Runtime Environment
- [ ] Docker containers running and healthy
- [ ] Backend server running on port 8080
- [ ] Expo dev server accessible
- [ ] Android emulator fully booted
- [ ] App launches on emulator

### App Functionality
- [ ] Login/register flow works
- [ ] WebSocket connection established
- [ ] Messages send and receive
- [ ] Encryption/decryption works
- [ ] Logcat shows debug information

### Tools & Debugging
- [ ] Logcat filters working
- [ ] Can view app logs
- [ ] Android Monitor accessible
- [ ] Debugger works (breakpoints respond)
- [ ] Hot reload works (edit → save → auto-refresh)

---

## Common Issues & Solutions

### Issue: "Failed to connect to backend"
```
[ ] Backend server is running: Check terminal 2
[ ] Port 8080 is not blocked: netstat -ano | findstr :8080
[ ] Docker containers are running: docker-compose ps
[ ] Emulator network settings correct
[ ] Use 10.0.2.2 instead of localhost in emulator
```

### Issue: "npm modules not found"
```
[ ] npm install completed: Check node_modules exists
[ ] package.json is valid JSON
[ ] Try: npm ci (clean install)
[ ] Delete node_modules: rm -r node_modules
[ ] Reinstall: npm install
```

### Issue: "Gradle sync failed"
```
[ ] Check Android Studio version: 2024.1+
[ ] JDK version correct: 17+
[ ] File > Invalidate Caches and Restart
[ ] Delete .gradle folder
[ ] File > Sync Now
```

### Issue: "Emulator won't start"
```
[ ] Check Hyper-V or WSL 2 enabled
[ ] Restart Docker
[ ] Restart Android Studio
[ ] Verify in Device Manager emulator exists
[ ] Try: $ANDROID_HOME\emulator\emulator -avd Pixel_8_API_34
```

### Issue: "WebSocket disconnects frequently"
```
[ ] Check backend logs: Look for errors
[ ] Verify backend port: netstat -ano | findstr :8080
[ ] Check emulator network: adb shell netstat
[ ] Increase timeout in WebSocketClient.ts
[ ] Implement reconnection logic
```

---

## Maintenance Checklist (Weekly)

- [ ] Check for npm package updates: `npm outdated`
- [ ] Update critical security packages: `npm audit fix`
- [ ] Check Go dependencies: `go get -u ./...`
- [ ] Update Android SDK if prompted
- [ ] Clean up Docker images: `docker image prune`
- [ ] Review Logcat for persistent warnings
- [ ] Test encryption with various message sizes
- [ ] Verify database isn't growing too large

---

## Performance Tuning (Optional)

### Emulator Performance
- [ ] Allocate 4GB RAM to emulator (not less)
- [ ] Enable GPU acceleration: AVD settings > GPU: Emulation
- [ ] Enable Fast Boot: AVD settings > Boot: Fast
- [ ] Use SSD storage (not HDD)
- [ ] Close unnecessary apps while developing

### Build Performance
- [ ] Enable Gradle parallel compilation
- [ ] Increase Gradle heap: gradle.properties
- [ ] Use incremental builds
- [ ] Enable offline mode if internet is slow

### IDE Performance
- [ ] Disable unnecessary plugins
- [ ] Increase IDE memory: Help > Edit Custom VM Options
- [ ] Enable power save mode if needed
- [ ] Use lightweight IDE theme

---

## Documentation References

- [ ] Read ANDROID_SETUP.md for detailed configuration
- [ ] Read TECHNICAL_REQUIREMENTS.md for architecture
- [ ] Read IDE_CONFIGURATION.md for IDE-specific settings
- [ ] Read DEVELOPMENT_WORKFLOW.md for daily development
- [ ] Keep QUICK_REFERENCE.txt handy for commands

---

## Ready to Development!

Once all checklist items are complete:

✅ **You're ready to start developing!**

### Next Steps:
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make code changes
3. Test on emulator
4. Commit and push
5. Create a pull request

### Support:
- Check documentation files for common issues
- Review Logcat for error messages
- Check backend logs for API issues
- Test with `adb logcat` for deep debugging

---

**Good luck with your CipherChat development! 🚀**

*Last Updated: December 3, 2025*

