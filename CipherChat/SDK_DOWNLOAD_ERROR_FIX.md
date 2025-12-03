# Android SDK Download Error - Troubleshooting & Solutions

## Error Details
```
Error: An error occurred while preparing SDK package Google Play Intel x86_64 Atom System Image
Message: Not in GZIP format
Package: system-images;android-36;google_apis_playstore;x86_64
```

This error typically means:
- The downloaded file is corrupted
- The file wasn't fully downloaded
- Network interruption during download
- SDK cache is corrupted

---

## Solution 1: Clear SDK Cache and Retry (Recommended)

### Step 1: Stop Android Studio
- Close Android Studio completely
- Wait 5 seconds for all processes to terminate

### Step 2: Clear SDK Package Cache
```powershell
# PowerShell as Administrator

# Navigate to Android SDK location
cd "$env:APPDATA\Local\Android\Sdk"

# Remove temporary download files
Remove-Item -Path "$env:APPDATA\Local\Android\Sdk\temp" -Recurse -Force -ErrorAction SilentlyContinue

# Clear the specific package if downloaded
Remove-Item -Path "$env:APPDATA\Local\Android\Sdk\system-images\android-36" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 3: Reopen Android Studio and Retry
1. Launch Android Studio
2. Go to: Tools > SDK Manager
3. Navigate to: SDK Platforms tab
4. Try installing API 36 again
5. If still fails, see Solution 2

---

## Solution 2: Use Alternative API Level (Recommended for CipherChat)

Since CipherChat targets API 34, you **don't need API 36**. Use API 34 instead:

### In Android Studio SDK Manager:
```
Tools > SDK Manager > SDK Platforms

✅ Install API 34 (Android 14) - RECOMMENDED
   - Label: "Android 14"
   - API Level: 34
   - System Image: x86_64 (or ARM if on ARM Mac)

Skip API 36 for now (it's optional)
```

### For Emulator Creation:
```
Tools > Device Manager > Create Virtual Device

Phone: Pixel 8
System Image: Android 14 (API 34) - use this, not API 36
ABI: x86_64 (Intel) or arm64-v8a (ARM)
RAM: 4GB
```

---

## Solution 3: Manual Download and Installation

If you specifically need API 36, download manually:

### Step 1: Download File Manually
1. Visit: https://dl.google.com/android/repository/sys-img/google_apis_playstore/
2. Download: `x86_64-36_r07.zip` (or latest version)
3. Save to: `C:\Users\Lavish\Downloads\`

### Step 2: Extract and Place
```powershell
# Create directory structure
$sdkPath = "$env:APPDATA\Local\Android\Sdk"
$imagePath = "$sdkPath\system-images\android-36\google_apis_playstore"

# Create directories if they don't exist
New-Item -ItemType Directory -Path $imagePath -Force | Out-Null

# Extract the zip file
$zipPath = "C:\Users\Lavish\Downloads\x86_64-36_r07.zip"
Expand-Archive -Path $zipPath -DestinationPath $imagePath -Force

# Verify extraction
Get-ChildItem -Path $imagePath
```

### Step 3: Refresh SDK Manager
1. Close Android Studio
2. Reopen Android Studio
3. Tools > SDK Manager should now show API 36 as installed

---

## Solution 4: Network/Firewall Issue

If downloads keep failing, you may have network issues:

### Check Your Network:
```powershell
# Test Google's CDN connectivity
ping dl.google.com

# Test direct download
curl -I https://dl.google.com/android/repository/sys-img/google_apis_playstore/x86_64-36_r07.zip
```

### If Firewall Blocks:
1. Check Windows Defender Firewall
2. Check corporate proxy settings
3. Try using a VPN if geographically restricted
4. Temporarily disable antivirus (if you trust it)

---

## Solution 5: Clean SDK Installation (Nuclear Option)

If nothing else works, completely reinstall SDK:

### WARNING: This removes all downloaded SDKs

```powershell
# BACKUP FIRST
Copy-Item -Path "$env:APPDATA\Local\Android\Sdk" -Destination "$env:APPDATA\Local\Android\Sdk.backup" -Recurse

# Remove SDK
Remove-Item -Path "$env:APPDATA\Local\Android\Sdk" -Recurse -Force

# Close Android Studio
# Reopen Android Studio - it will re-download the default SDK
```

---

## For CipherChat: Recommended Configuration

You **don't need API 36** for CipherChat. Here's what you actually need:

### Minimum Requirements:
```
✅ Android SDK Platform 34 (API 34) - REQUIRED
✅ Android SDK Platform 33 (API 33) - MINIMUM support
✅ Android SDK Build Tools 34.0.0+ - REQUIRED
✅ Android Emulator - REQUIRED
✅ Google Play Services - RECOMMENDED
✅ Intel x86 Emulator Accelerator (HAXM) - OPTIONAL
```

### Skip These (Not Needed):
```
❌ Android SDK Platform 36 (optional, can skip)
❌ Wear OS API
❌ TV API
❌ Automotive API
```

---

## Step-by-Step Fix for CipherChat

### 1. Close Android Studio
```powershell
# Kill all Java processes
Get-Process | Where-Object {$_.ProcessName -like "*java*"} | Stop-Process -Force
```

### 2. Clear Downloads Cache
```powershell
# Remove corrupted downloads
Remove-Item -Path "$env:APPDATA\Local\Android\Sdk\temp" -Recurse -Force -ErrorAction SilentlyContinue

# Remove failed package
Remove-Item -Path "$env:APPDATA\Local\Android\Sdk\system-images\android-36" -Recurse -Force -ErrorAction SilentlyContinue
```

### 3. Reopen and Install Only What You Need
```
1. Open Android Studio
2. Tools > SDK Manager
3. SDK Platforms Tab:
   ✅ Android 14 (API 34)
   ✅ Android 13 (API 33)
4. SDK Tools Tab:
   ✅ Android SDK Build-Tools 34.0.0
   ✅ Android Emulator
   ✅ Android SDK Platform-Tools
5. Apply and Download
```

### 4. Create Emulator
```
Tools > Device Manager > Create Virtual Device

Name: Pixel_8_API_34
Phone: Pixel 8
System Image: Android 14 (API 34)
RAM: 4GB
```

### 5. Launch and Test
```powershell
# Start emulator
$ANDROID_HOME\emulator\emulator -avd Pixel_8_API_34

# Verify connection
adb devices
```

---

## Quick Commands

```powershell
# Check current Android SDK status
$env:APPDATA\Local\Android\Sdk

# List installed packages
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" --list

# List installed system images
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" --list | findstr "system-images"

# Install specific package (API 34)
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" "system-images;android-34;google_apis_playstore;x86_64"

# Accept all licenses
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" --licenses --accept
```

---

## Prevention Tips

1. **Don't install unnecessary API levels** - CipherChat only needs API 34
2. **Use SDK Manager** - Let it handle downloads, don't download manually
3. **Keep good internet** - Wired connection is better than WiFi
4. **Close antivirus temporarily** - Some antivirus blocks downloads
5. **Use latest Android Studio** - 2024.1+ handles downloads better
6. **Regular cleanup** - Clear SDK cache monthly

---

## Still Having Issues?

If problem persists after trying solutions:

1. **Reinstall Android Studio** (don't uninstall, just overwrite)
2. **Use command-line SDK manager** instead of GUI
3. **Try from different network** (mobile hotspot)
4. **Contact Google Support** - This is a Google CDN issue

---

## For Your ANDROID_SETUP.md

You should update your documentation to clarify that API 36 is optional. Here's what to add:

**Section: API Level Selection**

```markdown
## API Level Requirements for CipherChat

### Required (Must Install):
- ✅ Android 14 (API 34) - Target API
- ✅ Android 13 (API 33) - Minimum support
- ✅ Build Tools 34.0.0+

### Optional (Not Required):
- ❌ Android 15 (API 36) - Skip if having issues
- ❌ Wear OS, TV, Automotive APIs

**Recommendation**: Use API 34 for everything. Skip API 36 unless specifically needed.
```

---

## Summary

**For CipherChat Development:**
1. ✅ Use **API 34** (Android 14)
2. ❌ **Skip API 36** (not needed)
3. ✅ Use **x86_64** (if on Intel Mac) or **ARM64** (if on ARM Mac)
4. ✅ Allocate **4GB RAM** to emulator
5. ✅ Clear cache if downloads fail

This should resolve your issue immediately.

---

## Need More Help?

If you're still stuck, provide:
1. Your exact Android Studio version
2. Your Windows/network setup
3. The complete error message
4. What solution you've already tried

