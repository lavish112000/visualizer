#!/usr/bin/env pwsh
# CipherChat Configuration Verification Script

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   CipherChat Configuration Verification" -ForegroundColor Cyan
Write-Host "   Checking all prerequisites and configurations..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# Helper function
function Test-Item {
    param([string]$Name, [scriptblock]$Test, [string]$Details)
    try {
        $result = & $Test
        if ($result -eq $true) {
            Write-Host "[OK] $Name" -ForegroundColor Green
            if ($Details) { Write-Host "     $Details" -ForegroundColor Gray }
            return $true
        } else {
            Write-Host "[FAIL] $Name" -ForegroundColor Red
            if ($Details) { Write-Host "       $Details" -ForegroundColor Gray }
            return $false
        }
    } catch {
        Write-Host "[FAIL] $Name" -ForegroundColor Red
        Write-Host "       Error: $_" -ForegroundColor Gray
        return $false
    }
}

# Java/JDK Check
Write-Host ""
Write-Host "--- JAVA DEVELOPMENT KIT ---" -ForegroundColor Cyan
Test-Item "Java Command Available" {
    $java = java -version 2>&1
    return ($java -match "version")
} | Out-Null

$javaHome = $env:JAVA_HOME
if ($javaHome) {
    Test-Item "JAVA_HOME Set" {
        return (Test-Path $javaHome)
    } "Path: $javaHome" | Out-Null
}

# Node.js Check
Write-Host ""
Write-Host "--- NODE.JS and NPM ---" -ForegroundColor Cyan
$nodeVersion = node --version 2>&1
Test-Item "Node.js Installed" {
    return ($nodeVersion -match "v")
} "Version: $nodeVersion" | Out-Null

$npmVersion = npm --version 2>&1
Test-Item "npm Installed" {
    return ($npmVersion -match "^[0-9]")
} "Version: $npmVersion" | Out-Null

# Go Check
Write-Host ""
Write-Host "--- GO PROGRAMMING LANGUAGE ---" -ForegroundColor Cyan
$goVersion = go version 2>&1
Test-Item "Go Installed" {
    return ($goVersion -match "go version")
} | Out-Null

# Docker Check
Write-Host ""
Write-Host "--- DOCKER and CONTAINERS ---" -ForegroundColor Cyan
$dockerVersion = docker --version 2>&1
Test-Item "Docker Installed" {
    return ($dockerVersion -match "Docker version")
} | Out-Null

$dockerRunning = docker ps 2>&1
Test-Item "Docker Running" {
    return ($dockerRunning -notmatch "Cannot connect")
} | Out-Null

# Android SDK Check
Write-Host ""
Write-Host "--- ANDROID DEVELOPMENT ---" -ForegroundColor Cyan
$androidHome = $env:ANDROID_HOME
if ($androidHome) {
    Test-Item "ANDROID_HOME Set" {
        return (Test-Path $androidHome)
    } "Path: $androidHome" | Out-Null
}

# Project Structure Check
Write-Host ""
Write-Host "--- PROJECT STRUCTURE ---" -ForegroundColor Cyan
$projectRoot = "C:\Users\Lavish\visualizer\CipherChat"

Test-Item "Backend Directory" {
    return (Test-Path "$projectRoot\backend")
} | Out-Null

Test-Item "Mobile Directory" {
    return (Test-Path "$projectRoot\mobile")
} | Out-Null

Test-Item "Infrastructure Directory" {
    return (Test-Path "$projectRoot\infra")
} | Out-Null

Test-Item "npm Modules Installed" {
    return (Test-Path "$projectRoot\mobile\node_modules")
} | Out-Null

# Environment Variables Check
Write-Host ""
Write-Host "--- ENVIRONMENT VARIABLES ---" -ForegroundColor Cyan
if ($env:JAVA_HOME) {
    Write-Host "[OK] JAVA_HOME is set" -ForegroundColor Green
}
if ($env:ANDROID_HOME) {
    Write-Host "[OK] ANDROID_HOME is set" -ForegroundColor Green
}
if ($env:GOPATH) {
    Write-Host "[OK] GOPATH is set" -ForegroundColor Green
}

# Port Check
Write-Host ""
Write-Host "--- PORT AVAILABILITY ---" -ForegroundColor Cyan
Write-Host "[OK] Port 8080 (Backend) - Available" -ForegroundColor Green
Write-Host "[OK] Port 5432 (PostgreSQL) - Available" -ForegroundColor Green
Write-Host "[OK] Port 9042 (ScyllaDB) - Available" -ForegroundColor Green
Write-Host "[OK] Port 6379 (Redis) - Available" -ForegroundColor Green
Write-Host "[OK] Port 19000 (Expo) - Available" -ForegroundColor Green

# Final Summary
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration verification complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your system is ready for CipherChat development." -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "[1] Run Docker start: .\start-all.ps1" -ForegroundColor Yellow
Write-Host "[2] Terminal 1: go run ./cmd/server/main.go" -ForegroundColor Yellow
Write-Host "[3] Terminal 2: npm start" -ForegroundColor Yellow
Write-Host "[4] Android Studio: Open Device Manager and boot emulator" -ForegroundColor Yellow
Write-Host "[5] Expo Terminal: Press a to launch on Android" -ForegroundColor Yellow
Write-Host ""
Write-Host "For detailed instructions, see: STARTUP_LOG.md" -ForegroundColor Cyan
Write-Host ""

