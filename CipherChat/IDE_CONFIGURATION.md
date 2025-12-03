# Android Studio Configuration for CipherChat

This directory contains Android Studio IDE configuration guides for CipherChat development.

## Files in This Configuration

### 1. **Android Studio Settings**
Location: `File > Settings` in Android Studio

#### Code Style Configuration
- **Path**: Settings > Editor > Code Style
- **Language**: TypeScript
- **Settings**:
  - Indent: 2 spaces
  - Line length: 100 characters
  - Trailing comma: ES5
  - Quotes: Single quotes
  - Semicolon: Always

#### Run Configurations
- **Program**: expo start --android
- **Working Directory**: mobile/
- **Environment Variables**:
  ```
  EXPO_DEBUG=true
  NODE_ENV=development
  ```

#### Key Bindings (Optional)
Recommended shortcuts:
- Reformat Code: Ctrl+Alt+L
- Find in Files: Ctrl+Shift+F
- Run App: Shift+F10

### 2. **Project Structure**
```
CipherChat (Project Root)
├── mobile/ (Module - Primary Development)
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── model/
│   ├── navigation/
│   ├── proto/
│   ├── assets/
│   ├── package.json
│   ├── tsconfig.json
│   └── App.tsx
├── backend/ (Reference only - separate Go project)
├── infra/ (Docker configuration)
└── proto/ (Shared protobuf definitions)
```

### 3. **SDK and JDK Settings**
- **Project SDK**: Android 34 (API 34)
- **JDK**: Use Android Studio's bundled JDK (recommended)
- **Build Tools**: 34.0.0+
- **NDK**: Optional (only if using native modules)

### 4. **Android Emulator Configuration**

#### Recommended AVD Setup
**Device**: Pixel 8 Pro
- **API Level**: 34 (Android 14)
- **ABI**: arm64-v8a (or x86_64 if using Intel)
- **RAM**: 4GB
- **VM Heap**: 512MB
- **Internal Storage**: 2GB
- **SD Card**: 512MB

#### Launch Configuration
```powershell
# PowerShell command
$ANDROID_HOME\emulator\emulator -avd Pixel_8_API_34 -no-snapshot-load -gpu on
```

### 5. **Terminal Configuration in Android Studio**

Path: Settings > Tools > Terminal

Recommended settings:
- Shell path: `powershell.exe`
- Tab size: 4
- Enable mouse events: Enabled
- Audible bell: Disabled
- Override IDE shortcuts: Disabled

### 6. **Version Control (Git) Configuration**

Path: Settings > Version Control > Git

- **Git executable**: Auto-detect
- **GitHub integration**: (Optional) Add your GitHub account
- **SSH executable**: Built-in SSH

#### .gitignore entries (mobile directory):
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
.env.local
__pycache__/
*.pyc
.DS_Store
.idea/
*.swp
*.swo
```

### 7. **Plugins to Install**

Path: Settings > Plugins > Marketplace

**Essential**:
- ✅ TypeScript (may be built-in)
- ✅ Kotlin (built-in)
- ✅ Android (built-in)
- ✅ Git (built-in)

**Recommended**:
- ✅ Prettier Code Formatter
- ✅ ESLint
- ✅ Protocol Buffers
- ✅ DartPad/Flutter (optional)
- ✅ GitHub Copilot (optional)

**Installation command**:
```powershell
# Plugins can be installed through the UI or via command line
# Using IDE's plugin manager is recommended
```

### 8. **Debugger Configuration**

#### Logcat Filters
Create filters in: Tools > Device Manager > Logcat

**Filter 1: App Logs**
```
package:mobile | package:expo | package:react
Level: Verbose
```

**Filter 2: Crypto/Signal**
```
tag:Signal | tag:Crypto | tag:Encryption
Level: Debug
```

**Filter 3: Network**
```
tag:WebSocket | tag:Network | tag:HTTP
Level: Verbose
```

#### Remote JavaScript Debugging
- **URL**: http://localhost:8081/debugger-ui/
- **Source Maps**: Enabled
- **Breakpoints**: Enabled

### 9. **Gradle Configuration**

Path: Settings > Build, Execution, Deployment > Gradle

```properties
# gradle.properties (if in mobile root)
org.gradle.jvmargs=-Xmx2048m
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
```

### 10. **Editor Preferences**

Path: Settings > Editor

**General**:
- Show line numbers: ✓
- Show breadcrumbs: ✓
- Show parameter hints: ✓
- Highlight identifier under cursor: ✓

**Font**:
- Font: Jetbrains Mono (recommended)
- Size: 12pt
- Line spacing: 1.2

**Color Scheme**: 
- Built-in Darcula (recommended for eye comfort)
- Or Intellij Light for day work

### 11. **File Watches (for auto-formatting)**

Path: Settings > Tools > File Watchers

**Prettier Watch** (optional):
- Program: `$ProjectFileDir$/node_modules/.bin/prettier`
- Arguments: `--write $FilePath$`
- File type: JavaScript, TypeScript, JSON
- On save: ✓

### 12. **Inspection Profile Configuration**

Path: Settings > Editor > Inspections

**Disable these (if using ESlint)**:
- ✓ Suppress: JavaScript > Unused variable
- ✓ Suppress: JavaScript > Missing semicolon
- ✓ Suppress: TypeScript > Type mismatch

(ESlint will handle these)

### 13. **Performance Tuning**

Path: Settings > Appearance & Behavior > System Settings

```
Memory:
  - IDE: 2048 MB
  - Gradle: 2048 MB
  - Filesystem cache: Maximum allowed

Features:
  - Disable unused plugins: Yes
  - Enable only needed inspections: Yes
  - Parallel compilation: Enabled
  - Optimize imports on the fly: Disabled
```

### 14. **Hot Reload & Fast Refresh**

For React Native, ensure:
- Fast Refresh: Enabled (in app.json)
- Babel: Configured correctly (babel.config.js)
- Metro Bundler: Running with Expo

### 15. **Useful Keyboard Shortcuts**

| Action | Shortcut |
|--------|----------|
| Build | Ctrl+F9 |
| Run | Shift+F10 |
| Stop | Ctrl+F2 |
| Debug | Shift+F9 |
| Reformat Code | Ctrl+Alt+L |
| Optimize Imports | Ctrl+Alt+O |
| Search Everywhere | Double Shift |
| Go to Class | Ctrl+N |
| Go to File | Ctrl+O |
| Find in Files | Ctrl+Shift+F |
| Replace in Files | Ctrl+Shift+H |
| Open Terminal | Alt+F12 |
| Close Tab | Ctrl+W |
| Recent Files | Ctrl+E |
| Navigate Back | Ctrl+Alt+Left |
| Navigate Forward | Ctrl+Alt+Right |

### 16. **Emulator Commands**

Common emulator commands via Android Studio Terminal:

```powershell
# List AVDs
$ANDROID_HOME\tools\emulator -list-avds

# Start emulator
$ANDROID_HOME\emulator\emulator -avd Pixel_8_API_34

# ADB Commands
adb devices                           # List devices
adb shell                             # Access shell
adb logcat                            # View logs
adb install app.apk                   # Install app
adb uninstall com.package.name        # Uninstall app
adb push <local> <device>             # Push file
adb pull <device> <local>             # Pull file
adb reboot                            # Reboot device
```

### 17. **Web/JavaScript Debug Helper**

For debugging web code (if testing on web):

1. Enable Chrome DevTools integration
2. Open http://localhost:8081/debugger-ui
3. Use browser DevTools for JavaScript debugging

### 18. **Troubleshooting Setup Issues**

#### Issue: Module Not Found Errors
**Solution**: 
```powershell
# In mobile directory
npm install
npm ls  # Check for missing dependencies
```

#### Issue: TypeScript Errors in IDE
**Solution**:
- Settings > Languages & Frameworks > TypeScript
- Recompile: Ctrl+Shift+F9
- Or: invalidate cache: File > Invalidate Caches

#### Issue: Gradle Sync Failed
**Solution**:
- File > Sync Now
- Delete .gradle folder (will rebuild)
- Invalidate Caches and Restart

#### Issue: Emulator Too Slow
**Solution**:
- Allocate more RAM in AVD settings (4GB+)
- Enable hardware acceleration (HAXM)
- Use native code generator

#### Issue: WebSocket Connection Errors
**Solution**:
- Backend must be running: `go run ./cmd/server/main.go`
- Check backend port configuration
- Use `10.0.2.2` instead of `localhost` in emulator
- Verify Docker containers are running

---

## Quick Setup Summary

1. **Install Android Studio** (2024.1+)
2. **Run setup script**: `.\setup.ps1` (as Administrator)
3. **Create Android Virtual Device**: Pixel 8, API 34
4. **Open mobile directory** in Android Studio
5. **Configure run configuration** for Expo
6. **Start Docker services**: `docker-compose up -d`
7. **Start backend**: `go run ./cmd/server/main.go`
8. **Start Expo**: `npm start` (in mobile directory)
9. **Run on emulator**: Press 'a' or click device in Android Studio
10. **Debug**: Use Logcat, breakpoints, and DevTools

---

## Documentation Files

- **ANDROID_SETUP.md** - Complete Android Studio configuration guide
- **TECHNICAL_REQUIREMENTS.md** - Full technical documentation
- **setup.ps1** - PowerShell setup script
- **setup.bat** - Batch setup script

For more details, see the main documentation files.

