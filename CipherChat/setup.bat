@echo off
REM CipherChat Development Environment Setup Script
REM Run this script to set up your development environment on Windows

echo.
echo ====================================
echo  CipherChat Development Setup Script
echo ====================================
echo.

REM Check for Administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [WARNING] This script should be run as Administrator for optimal setup
    echo [INFO] Please run PowerShell as Administrator
    pause
    exit /b 1
)

setlocal enabledelayedexpansion

REM Define colors for output
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "CYAN=[96m"
set "RESET=[0m"

REM ============================================
REM 1. Check for Required Software
REM ============================================
echo %CYAN%[1/8] Checking for required software...%RESET%
echo.

set "missing_software="

where java >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%[X] Java not found%RESET%
    set "missing_software=1"
) else (
    for /f "tokens=*" %%i in ('java -version 2^>^&1 ^| findstr /R "java version"') do set JAVA_VERSION=%%i
    echo %GREEN%[OK] Java detected: !JAVA_VERSION!%RESET%
)

where node >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%[X] Node.js not found%RESET%
    set "missing_software=1"
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo %GREEN%[OK] Node.js detected: !NODE_VERSION!%RESET%
)

where npm >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%[X] npm not found%RESET%
    set "missing_software=1"
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo %GREEN%[OK] npm detected: !NPM_VERSION!%RESET%
)

where go >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%[X] Go not found%RESET%
    set "missing_software=1"
) else (
    for /f "tokens=*" %%i in ('go version') do set GO_VERSION=%%i
    echo %GREEN%[OK] Go detected: !GO_VERSION!%RESET%
)

where docker >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%[X] Docker not found%RESET%
    set "missing_software=1"
) else (
    for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
    echo %GREEN%[OK] Docker detected: !DOCKER_VERSION!%RESET%
)

if defined missing_software (
    echo.
    echo %RED%[ERROR] Some required software is missing!%RESET%
    echo Please install:
    echo   - Java Development Kit (JDK 17+)
    echo   - Node.js (v18+)
    echo   - Go (v1.25.4+)
    echo   - Docker Desktop
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo.
echo %GREEN%[OK] All required software detected!%RESET%
echo.

REM ============================================
REM 2. Setup Environment Variables
REM ============================================
echo %CYAN%[2/8] Setting up environment variables...%RESET%
echo.

REM Detect ANDROID_HOME
if not defined ANDROID_HOME (
    if exist "%APPDATA%\Local\Android\Sdk" (
        setx ANDROID_HOME "%APPDATA%\Local\Android\Sdk"
        set ANDROID_HOME=%APPDATA%\Local\Android\Sdk
        echo %GREEN%[OK] ANDROID_HOME set to: !ANDROID_HOME!%RESET%
    ) else (
        echo %YELLOW%[WARNING] ANDROID_HOME not found. Android Studio may need to be installed.%RESET%
    )
) else (
    echo %GREEN%[OK] ANDROID_HOME already set: !ANDROID_HOME!%RESET%
)

REM Verify JAVA_HOME
if not defined JAVA_HOME (
    echo %YELLOW%[WARNING] JAVA_HOME not set. Android Studio should set this automatically.%RESET%
) else (
    echo %GREEN%[OK] JAVA_HOME set: !JAVA_HOME!%RESET%
)

echo.

REM ============================================
REM 3. Create Project Directories
REM ============================================
echo %CYAN%[3/8] Setting up project directories...%RESET%
echo.

cd /d C:\Users\Lavish\visualizer\CipherChat 2>nul
if %errorLevel% equ 0 (
    echo %GREEN%[OK] Project directory found%RESET%

    if not exist "mobile" (
        echo %RED%[X] mobile directory not found%RESET%
        exit /b 1
    )

    if not exist "backend" (
        echo %RED%[X] backend directory not found%RESET%
        exit /b 1
    )

    if not exist "infra" (
        echo %RED%[X] infra directory not found%RESET%
        exit /b 1
    )

    echo %GREEN%[OK] All required directories found%RESET%
) else (
    echo %RED%[X] Project directory not found%RESET%
    exit /b 1
)

echo.

REM ============================================
REM 4. Install Frontend Dependencies
REM ============================================
echo %CYAN%[4/8] Installing frontend dependencies...%RESET%
echo.

cd mobile

if not exist "node_modules" (
    echo Installing npm packages...
    call npm install
    if %errorLevel% neq 0 (
        echo %RED%[X] npm install failed%RESET%
        pause
        exit /b 1
    )
) else (
    echo %GREEN%[OK] node_modules already exists%RESET%
    echo Updating dependencies...
    call npm update
)

echo %GREEN%[OK] Frontend dependencies installed%RESET%
echo.

cd ..

REM ============================================
REM 5. Install Global Expo CLI
REM ============================================
echo %CYAN%[5/8] Installing Expo CLI...%RESET%
echo.

where expo >nul 2>&1
if %errorLevel% neq 0 (
    echo Installing expo-cli globally...
    call npm install -g expo-cli
    if %errorLevel% neq 0 (
        echo %YELLOW%[WARNING] expo-cli installation may have issues%RESET%
    ) else (
        echo %GREEN%[OK] expo-cli installed%RESET%
    )
) else (
    echo %GREEN%[OK] expo-cli already installed%RESET%
)

echo.

REM ============================================
REM 6. Verify Docker Setup
REM ============================================
echo %CYAN%[6/8] Verifying Docker setup...%RESET%
echo.

docker version >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%[X] Docker daemon is not running%RESET%
    echo Please start Docker Desktop and run this script again
    pause
    exit /b 1
)

echo %GREEN%[OK] Docker is running%RESET%
echo.

REM ============================================
REM 7. Summary and Next Steps
REM ============================================
echo %CYAN%[7/8] Setup Complete!%RESET%
echo.

echo %GREEN%============================================%RESET%
echo %GREEN% SETUP COMPLETED SUCCESSFULLY%RESET%
echo %GREEN%============================================%RESET%
echo.

echo %CYAN%Next steps:%RESET%
echo.
echo 1. Start Docker Services:
echo    cd C:\Users\Lavish\visualizer\CipherChat
echo    docker-compose -f infra/docker-compose.yml up -d
echo.
echo 2. Start Backend (in new terminal):
echo    cd backend
echo    go run ./cmd/server/main.go
echo.
echo 3. Start Expo Dev Server (in new terminal):
echo    cd mobile
echo    npm start
echo.
echo 4. Run on Android Emulator:
echo    - Press 'a' in Expo CLI terminal, OR
echo    - Run: npm run android
echo.
echo 5. Open in Android Studio:
echo    File > Open > Select mobile directory
echo.

echo %YELLOW%============================================%RESET%
echo %YELLOW% IMPORTANT CONFIGURATION CHECKLIST%RESET%
echo %YELLOW%============================================%RESET%
echo.
echo [ ] Android Studio installed and configured
echo [ ] Android SDK API 34 installed
echo [ ] Android Emulator created (Pixel 8, API 34)
echo [ ] Docker Desktop running
echo [ ] WSL 2 enabled (for Docker on Windows)
echo [ ] Hyper-V enabled
echo [ ] All software installed from requirements
echo [ ] Project opened in Android Studio
echo [ ] Logcat configured and filtering
echo.

REM ============================================
REM 8. Create Quick Reference Card
REM ============================================
echo %CYAN%[8/8] Creating quick reference card...%RESET%
echo.

(
echo # CipherChat Quick Reference
echo.
echo ## Useful Commands
echo.
echo ### Docker
echo docker-compose -f infra/docker-compose.yml up -d        # Start services
echo docker-compose -f infra/docker-compose.yml down         # Stop services
echo docker-compose -f infra/docker-compose.yml logs -f      # View logs
echo docker-compose -f infra/docker-compose.yml ps           # List services
echo.
echo ### Backend (Go^)
echo cd backend
echo go run ./cmd/server/main.go                             # Start server
echo go test ./...                                            # Run tests
echo.
echo ### Frontend (React Native/Expo^)
echo cd mobile
echo npm start                                                # Start Expo dev server
echo npm run android                                          # Run on Android
echo npm test                                                 # Run tests
echo npm install [package-name]                              # Install package
echo.
echo ### ADB Commands
echo adb devices                                              # List connected devices
echo adb shell                                                # Access device shell
echo adb logcat                                               # View device logs
echo adb install *.apk                                        # Install APK
echo.
echo ## Database Connections
echo.
echo PostgreSQL: localhost:5432
echo  - User: postgres
echo  - Password: password
echo  - Database: cipherchat
echo.
echo ScyllaDB: localhost:9042
echo Redis: localhost:6379
echo MinIO: http://localhost:9000 (minioadmin/minioadmin^)
echo MinIO Console: http://localhost:9001
echo.
echo ## Ports
echo.
echo Backend WebSocket: 8080 (or configured port^)
echo PostgreSQL: 5432
echo ScyllaDB: 9042
echo Redis: 6379
echo MinIO API: 9000
echo MinIO Console: 9001
echo.
echo ## Troubleshooting
echo.
echo ### If npm install fails:
echo npm ci
echo npm install --legacy-peer-deps
echo.
echo ### If Docker services won't start:
echo docker system prune
echo docker-compose down -v
echo docker-compose up -d
echo.
echo ### If Emulator won't start:
echo adb kill-server
echo adb start-server
echo # Or restart Android Studio
echo.
echo ### If WebSocket connection fails:
echo # Use 10.0.2.2 instead of localhost in emulator
echo # Check that backend is running on correct port
echo # View backend logs for errors
echo.
) > QUICK_REFERENCE.txt

echo %GREEN%[OK] Quick reference saved to: QUICK_REFERENCE.txt%RESET%
echo.

echo Setup script completed. Press any key to exit.
pause >nul

exit /b 0

