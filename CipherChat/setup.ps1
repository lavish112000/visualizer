#Requires -RunAsAdministrator
<#
.SYNOPSIS
CipherChat Development Environment Setup Script for Windows

.DESCRIPTION
This script sets up the complete development environment for CipherChat including:
- Node.js/npm dependencies
- Go backend setup
- Docker verification
- Android SDK configuration
- Environment variables

.NOTES
Run this script as Administrator:
  Right-click PowerShell > Run as Administrator
  Then run: Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
  Then run: .\setup.ps1

.AUTHOR
CipherChat Team
#>

param(
    [switch]$SkipChecks = $false,
    [switch]$SkipDependencies = $false,
    [switch]$Verbose = $false
)

# Define colors
$Green = @{ ForegroundColor = 'Green' }
$Red = @{ ForegroundColor = 'Red' }
$Yellow = @{ ForegroundColor = 'Yellow' }
$Cyan = @{ ForegroundColor = 'Cyan' }

# Project root
$ProjectRoot = "C:\Users\Lavish\visualizer\CipherChat"
$MobileDir = Join-Path $ProjectRoot "mobile"
$BackendDir = Join-Path $ProjectRoot "backend"
$InfraDir = Join-Path $ProjectRoot "infra"

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "================================" @Cyan
    Write-Host "  $Message" @Cyan
    Write-Host "================================" @Cyan
    Write-Host ""
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" @Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" @Red
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "[WARNING] $Message" @Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" @Cyan
}

function Test-Command {
    param([string]$Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

function Get-SoftwareVersion {
    param([string]$Command, [string]$VersionFlag = "--version")
    try {
        $version = & $Command $VersionFlag 2>&1
        return $version[0]
    }
    catch {
        return $null
    }
}

# ============================================
# Main Setup Script
# ============================================

Write-Header "CipherChat Development Environment Setup"

# ============================================
# Step 1: Verify Prerequisites
# ============================================
Write-Header "[1/7] Checking Prerequisites"

$allPresent = $true

Write-Host "Checking for required software..." -ForegroundColor Cyan
Write-Host ""

# Check Java
if (Test-Command java) {
    $javaVersion = Get-SoftwareVersion "java"
    Write-Success "Java detected"
    if ($Verbose) { Write-Host "  Version: $javaVersion" }
} else {
    Write-Error-Custom "Java not found (required: JDK 17+)"
    $allPresent = $false
}

# Check Node.js
if (Test-Command node) {
    $nodeVersion = Get-SoftwareVersion "node"
    Write-Success "Node.js detected: $nodeVersion"
} else {
    Write-Error-Custom "Node.js not found (required: v18+)"
    $allPresent = $false
}

# Check npm
if (Test-Command npm) {
    $npmVersion = Get-SoftwareVersion "npm"
    Write-Success "npm detected: $npmVersion"
} else {
    Write-Error-Custom "npm not found"
    $allPresent = $false
}

# Check Go
if (Test-Command go) {
    $goVersion = Get-SoftwareVersion "go"
    Write-Success "Go detected: $goVersion"
} else {
    Write-Error-Custom "Go not found (required: v1.25.4+)"
    $allPresent = $false
}

# Check Docker
if (Test-Command docker) {
    $dockerVersion = Get-SoftwareVersion "docker"
    Write-Success "Docker detected: $dockerVersion"
} else {
    Write-Error-Custom "Docker not found"
    $allPresent = $false
}

# Check Git
if (Test-Command git) {
    $gitVersion = Get-SoftwareVersion "git"
    Write-Success "Git detected: $gitVersion"
} else {
    Write-Warning-Custom "Git not found (optional for version control)"
}

Write-Host ""

if (-not $allPresent) {
    Write-Error-Custom "Some required software is missing!"
    Write-Host "Please install:" @Red
    Write-Host "  - Java Development Kit (JDK 17+)" @Red
    Write-Host "  - Node.js (v18+)" @Red
    Write-Host "  - Go (v1.25.4+)" @Red
    Write-Host "  - Docker Desktop" @Red
    Write-Host ""
    Write-Host "After installation, run this script again." @Red
    exit 1
}

Write-Success "All required software detected!"

# ============================================
# Step 2: Setup Environment Variables
# ============================================
Write-Header "[2/7] Setting Up Environment Variables"

$androidSdkPath = "$env:APPDATA\Local\Android\Sdk"

# Check and set ANDROID_HOME
if (-not $env:ANDROID_HOME) {
    if (Test-Path $androidSdkPath) {
        [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidSdkPath, "User")
        $env:ANDROID_HOME = $androidSdkPath
        Write-Success "ANDROID_HOME set to: $androidSdkPath"
    } else {
        Write-Warning-Custom "ANDROID_HOME not found. Android Studio may need to be installed."
        Write-Warning-Custom "Expected location: $androidSdkPath"
    }
} else {
    Write-Success "ANDROID_HOME already set: $env:ANDROID_HOME"
}

# Verify JAVA_HOME
if ($env:JAVA_HOME) {
    Write-Success "JAVA_HOME is set: $env:JAVA_HOME"
} else {
    Write-Warning-Custom "JAVA_HOME not explicitly set (Android Studio will set this)"
}

# ============================================
# Step 3: Verify Project Structure
# ============================================
Write-Header "[3/7] Verifying Project Structure"

if (-not (Test-Path $ProjectRoot)) {
    Write-Error-Custom "Project root not found: $ProjectRoot"
    exit 1
}

Write-Success "Project directory found"

$requiredDirs = @("mobile", "backend", "infra")
foreach ($dir in $requiredDirs) {
    $dirPath = Join-Path $ProjectRoot $dir
    if (Test-Path $dirPath) {
        Write-Success "$dir directory found"
    } else {
        Write-Error-Custom "$dir directory not found"
        exit 1
    }
}

# ============================================
# Step 4: Install Frontend Dependencies
# ============================================
if (-not $SkipDependencies) {
    Write-Header "[4/7] Installing Frontend Dependencies"

    Push-Location $MobileDir

    if (-not (Test-Path "node_modules")) {
        Write-Info "Installing npm packages (this may take a few minutes)..."
        & npm install

        if ($LASTEXITCODE -ne 0) {
            Write-Error-Custom "npm install failed"
            Pop-Location
            exit 1
        }
        Write-Success "Frontend dependencies installed"
    } else {
        Write-Success "node_modules already exists"
        Write-Info "Running npm update..."
        & npm update
    }

    Pop-Location
} else {
    Write-Info "Skipping dependency installation"
}

# ============================================
# Step 5: Install Expo CLI
# ============================================
Write-Header "[5/7] Setting Up Expo CLI"

if (Test-Command expo) {
    Write-Success "expo-cli already installed"
} else {
    Write-Info "Installing expo-cli globally..."
    & npm install -g expo-cli

    if ($LASTEXITCODE -ne 0) {
        Write-Warning-Custom "expo-cli installation had issues, but you can continue"
    } else {
        Write-Success "expo-cli installed successfully"
    }
}

# ============================================
# Step 6: Verify Docker
# ============================================
Write-Header "[6/7] Verifying Docker Setup"

try {
    $dockerStatus = docker version 2>&1
    Write-Success "Docker is installed and running"

    # Check if docker-compose works
    if (Test-Command docker-compose) {
        Write-Success "docker-compose is available"
    } else {
        Write-Warning-Custom "docker-compose not found as standalone command (try: docker compose)"
    }
} catch {
    Write-Error-Custom "Docker daemon is not running"
    Write-Host "Please start Docker Desktop and run this script again" @Red
    exit 1
}

# ============================================
# Step 7: Create Configuration Files
# ============================================
Write-Header "[7/7] Creating Configuration Files"

# Create .env file template if needed
$envTemplate = Join-Path $ProjectRoot ".env.example"
if (-not (Test-Path $envTemplate)) {
    Write-Info "Creating .env template..."
    @"
# CipherChat Environment Configuration
# Copy to .env and update values as needed

# Backend Configuration
BACKEND_HOST=localhost
BACKEND_PORT=8080
BACKEND_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=cipherchat

# ScyllaDB
SCYLLA_HOST=localhost
SCYLLA_PORT=9042

# Redis
REDIS_URL=redis://localhost:6379

# MinIO
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# Mobile Configuration
MOBILE_ENV=development
ENABLE_DEBUG=true
"@ | Out-File $envTemplate -Encoding UTF8
    Write-Success "Environment template created"
}

# Create quick command file
$quickCommands = @"
# CipherChat Quick Commands

## Start All Services
docker-compose -f infra/docker-compose.yml up -d

## Backend
cd backend
go run ./cmd/server/main.go

## Frontend
cd mobile
npm start
npm run android  # Run on Android emulator

## Database Check
adb devices      # List Android devices
docker-compose ps # Check running containers

## Logs
docker-compose logs -f
"@

$quickCommandsFile = Join-Path $ProjectRoot "QUICK_COMMANDS.txt"
Set-Content -Path $quickCommandsFile -Value $quickCommands -Encoding UTF8
Write-Success "Quick commands reference created"

# ============================================
# Final Summary
# ============================================
Write-Header "Setup Complete!"

Write-Host @"
$([char]27)[92m✓ SETUP COMPLETED SUCCESSFULLY$([char]27)[0m

Next Steps:
───────────────────────────────────────────────

1. START DOCKER SERVICES
   cd $ProjectRoot
   docker-compose -f infra/docker-compose.yml up -d

2. START BACKEND (in new terminal)
   cd $BackendDir
   go run ./cmd/server/main.go

3. START EXPO DEV SERVER (in new terminal)
   cd $MobileDir
   npm start

4. RUN ON ANDROID
   - In Expo CLI terminal, press 'a'
   - Or: npm run android
   - Or: Select emulator in Android Studio

5. OPEN IN ANDROID STUDIO
   File > Open > $MobileDir

───────────────────────────────────────────────

IMPORTANT SETUP CHECKLIST:
───────────────────────────────────────────────
[ ] Android Studio (2024.1+) installed
[ ] Android SDK API 34+ installed
[ ] Android Emulator created (Pixel 8, API 34+)
[ ] WSL 2 enabled for Docker
[ ] Hyper-V enabled
[ ] Docker Desktop is running
[ ] Project opened in Android Studio
[ ] Logcat configured and filtering

───────────────────────────────────────────────

USEFUL RESOURCES:
───────────────────────────────────────────────
- ANDROID_SETUP.md - Detailed Android Studio configuration
- TECHNICAL_REQUIREMENTS.md - Full technical documentation
- QUICK_REFERENCE.txt - Command reference

───────────────────────────────────────────────
"@

Write-Host ""
Write-Host "For detailed information, see:" -ForegroundColor Cyan
Write-Host "  - $ProjectRoot\ANDROID_SETUP.md" -ForegroundColor White
Write-Host "  - $ProjectRoot\TECHNICAL_REQUIREMENTS.md" -ForegroundColor White
Write-Host ""

Write-Host "Setup script completed. Ready for development!" @Green

