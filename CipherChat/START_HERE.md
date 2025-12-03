# 🚀 CipherChat - START HERE

**Your system is fully configured and ready!**

---

## ⚡ Quick Start (3 Steps, 5 Minutes)

### Step 1: Open PowerShell Terminal #1
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\backend
go run ./cmd/server/main.go
```
✅ Wait for: `Starting CipherChat Server on port 8080`

---

### Step 2: Open PowerShell Terminal #2
```powershell
cd C:\Users\Lavish\visualizer\CipherChat\mobile
npm start
```
✅ Wait for: `Expo DevTools running at http://localhost:19000`

---

### Step 3: Open Android Studio
1. **Tools** → **Device Manager**
2. Select **Pixel_8_API_34**
3. Click **Green Play Button** to boot emulator
4. In Expo Terminal (Terminal #2), press **'a'** to launch app

✅ App appears on emulator screen!

---

## 📋 What You'll See

### Terminal 1 (Backend)
```
Starting CipherChat Server on port 8080
Connected to PostgreSQL at localhost:5432
Connected to ScyllaDB at localhost:9042
WebSocket server running on /ws
```

### Terminal 2 (Expo)
```
Expo DevTools running at http://localhost:19000
LAN: exp://192.168.x.x:19000

Connection to Webpack has been established...
Press a │ open Android Emulator
Press i │ open iOS Simulator
```

### Emulator Screen
```
CipherChat
┌─────────────────────┐
│   Username Input    │
│   [testuser      ]  │
│                     │
│  [Get OTP]          │
└─────────────────────┘
```

---

## ✅ Success Indicators

- [x] Backend runs without errors
- [x] Expo shows "Connection established"
- [x] Emulator boots and shows home screen
- [x] CipherChat login screen appears
- [x] No red error overlays on app

---

## 🧪 Test Now

**In the app:**
1. Enter username: `testuser`
2. Click "Get OTP"
3. Check Logcat (Alt+6 in Android Studio)
4. Look for: `OTP sent to user` or similar message

**Check Connection:**
- Open Android Studio
- View → Tool Windows → Logcat (Alt+6)
- Filter: "WebSocket"
- Should see: `WebSocket connected`

---

## 🆘 Issues?

### Backend won't start?
```powershell
docker-compose -f C:\Users\Lavish\visualizer\CipherChat\infra\docker-compose.yml ps
# Should show 4 containers: postgres, scylla, redis, minio
```

### Expo says "Cannot start server"?
```powershell
# Clear npm cache
npm cache clean --force
# Reinstall
npm install --legacy-peer-deps
# Try again
npm start
```

### Emulator won't boot?
- Close Android Studio completely
- Restart Docker Desktop
- Open Android Studio → Device Manager → Try again

---

## 📚 Need More Details?

| Document | Use When |
|----------|----------|
| **MASTER_TESTING_GUIDE.md** | You want detailed testing procedures |
| **QUICK_COMMANDS.md** | You need command reference |
| **STARTUP_LOG.md** | You want to understand the setup |
| **ANDROID_SETUP.md** | You need Android Studio help |
| **TECHNICAL_REQUIREMENTS.md** | You want architecture details |

---

## 🎯 Next Testing Steps

Once app is running:

1. **Login Test**
   - Input: `testuser`
   - Expected: OTP sent

2. **Send Message**
   - Open chat screen
   - Type message
   - Expected: Encrypted and sent

3. **View Database**
   - Open Terminal
   - Run: `docker exec -it cipherchat_postgres psql -U postgres -d cipherchat`
   - Query: `SELECT * FROM messages;`
   - Expected: Your message is there

4. **Check Encryption**
   - In Logcat, filter "Signal" or "Encryption"
   - Expected: See encryption logs

---

## 🔗 Useful Links (Once Services Running)

- Expo DevTools: http://localhost:19000
- MinIO Console: http://localhost:9001 (admin/admin)
- PostgreSQL: localhost:5432
- Backend API: http://localhost:8080

---

## ⚡ Pro Tips

1. **Keep Logcat open** while testing (Alt+6 in Android Studio)
2. **Check backend logs** for API errors
3. **Use Device Monitor** to view network traffic
4. **Take screenshots** of any errors
5. **Clear app data** between tests: `adb shell pm clear com.cipherchat.mobile`

---

## 🎓 Architecture Overview

```
┌─────────────────┐
│  Android App    │
│  (React Native) │
└────────┬────────┘
         │ WebSocket + REST API
         ↓
┌─────────────────┐
│   Go Backend    │
│   (Port 8080)   │
└────────┬────────┘
         │
    ┌────┼────┬─────────────┐
    ↓    ↓    ↓             ↓
  PostgreSQL ScyllaDB Redis MinIO
  (Users)   (Messages) (Cache) (Media)
```

---

## 📊 Status Check

```powershell
# Check all services
docker-compose -f C:\Users\Lavish\visualizer\CipherChat\infra\docker-compose.yml ps

# Check if backend is running
netstat -ano | findstr :8080

# Check if Expo is running
netstat -ano | findstr :19000

# Check emulator connection
adb devices
```

---

## 💬 What's Happening Behind the Scenes

1. **App launches** → Connects to backend via WebSocket
2. **User enters credentials** → Encrypted and sent to backend
3. **Backend verifies** → Generates OTP
4. **User enters OTP** → Backend creates session
5. **User logged in** → Can send/receive encrypted messages
6. **Message sent** → Encrypted with Signal protocol
7. **Backend stores** → In PostgreSQL and ScyllaDB
8. **Other user receives** → Via WebSocket broadcast
9. **Message decrypted** → Displayed in chat

---

## 🚀 You're Ready!

Everything is set up and working. 

**Start with the 3 steps above and you'll be testing in minutes!**

---

*Generated: December 3, 2025*  
*Status: ✅ Ready for Testing*  
*Questions? Check MASTER_TESTING_GUIDE.md*

