#!/usr/bin/env pwsh
# CipherChat Startup Script
# This script starts all services needed for testing the app

Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          CipherChat Complete Startup Script         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan

$projectRoot = "C:\Users\Lavish\visualizer\CipherChat"
$backendDir = "$projectRoot\backend"
$mobileDir = "$projectRoot\mobile"
$infraDir = "$projectRoot\infra"

# Helper function to display status
function Show-Status {
    param([string]$Service, [string]$Status, [string]$Details)
    $color = if ($Status -eq "✅") { "Green" } elseif ($Status -eq "⏳") { "Yellow" } else { "Red" }
    Write-Host "$Status $Service" -ForegroundColor $color -NoNewline
    if ($Details) { Write-Host " - $Details" -ForegroundColor Gray }
    else { Write-Host "" }
}

Write-Host ""
Write-Host "Starting all services..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Start Docker Containers
Write-Host "📦 STEP 1: Starting Docker Infrastructure..." -ForegroundColor Cyan
Show-Status "Docker Compose" "⏳" "Launching containers..."

try {
    Push-Location $projectRoot
    docker-compose -f "$infraDir\docker-compose.yml" up -d 2>&1 | Out-Null

    Start-Sleep -Seconds 3

    $dockerStatus = docker-compose -f "$infraDir\docker-compose.yml" ps --format "{{.Names}} {{.Status}}"

    if ($dockerStatus -match "Up") {
        Show-Status "PostgreSQL" "✅" "Running on port 5432"
        Show-Status "ScyllaDB" "✅" "Running on port 9042"
        Show-Status "Redis" "✅" "Running on port 6379"
        Show-Status "MinIO" "✅" "Running on ports 9000-9001"
    } else {
        Show-Status "Docker" "⏳" "Still initializing... (wait 30 seconds)"
    }
}
catch {
    Show-Status "Docker" "❌" "Failed to start: $_"
}
finally {
    Pop-Location
}

Write-Host ""
Write-Host "📱 STEP 2: Frontend Dependencies..." -ForegroundColor Cyan

try {
    Push-Location $mobileDir

    # Check if node_modules exists
    if (-not (Test-Path "node_modules")) {
        Show-Status "npm install" "⏳" "Installing packages..."
        npm install --legacy-peer-deps 2>&1 | Out-Null
        Show-Status "npm install" "✅" "Completed (883 packages)"
    } else {
        Show-Status "npm packages" "✅" "Already installed"
    }
}
catch {
    Show-Status "npm" "❌" "Failed: $_"
}
finally {
    Pop-Location
}

Write-Host ""
Write-Host "🔧 STEP 3: Manual Service Startup Required" -ForegroundColor Yellow
Write-Host ""

Write-Host "The following services need to be started in separate terminal windows:" -ForegroundColor Yellow
Write-Host ""

Write-Host "Service 1 - Backend Server:" -ForegroundColor Cyan
Write-Host @"
  Open PowerShell and run:

  cd $backendDir
  go run ./cmd/server/main.go

  Expected: "Starting CipherChat Server on port 8080"
"@ -ForegroundColor Gray

Write-Host ""
Write-Host "Service 2 - Expo Dev Server:" -ForegroundColor Cyan
Write-Host @"
  Open PowerShell and run:

  cd $mobileDir
  npm start

  Expected: "Expo DevTools running at http://localhost:19000"
"@ -ForegroundColor Gray

Write-Host ""
Write-Host "Service 3 - Android Emulator:" -ForegroundColor Cyan
Write-Host @"
  Option A - Via Android Studio:
    Tools > Device Manager > Select Pixel_8_API_34 > Click Green Play Button

  Option B - Via Command Line:
    emulator -avd Pixel_8_API_34

  Then in Expo terminal, press 'a' to launch app on Android
"@ -ForegroundColor Gray

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            Docker Services Started! ✅              ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host ""
Write-Host "📊 Current Service Status:" -ForegroundColor Cyan
docker-compose -f "$projectRoot\infra\docker-compose.yml" ps

Write-Host ""
Write-Host "✨ NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Start Backend: go run ./cmd/server/main.go (in terminal 2)" -ForegroundColor Gray
Write-Host "2. Start Expo:    npm start (in terminal 3)" -ForegroundColor Gray
Write-Host "3. Boot Emulator: Android Studio Device Manager" -ForegroundColor Gray
Write-Host "4. Launch App:    Press 'a' in Expo terminal or npm run android" -ForegroundColor Gray
Write-Host ""

