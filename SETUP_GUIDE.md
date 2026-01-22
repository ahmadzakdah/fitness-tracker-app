# Fitness Tracker App - Setup & Installation Guide

This guide walks you through cloning the fitness tracker app from GitHub and running it on your machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Clone Using Git](#method-1-clone-using-git)
3. [Method 2: Download as ZIP](#method-2-download-as-zip)
4. [Install Dependencies](#install-dependencies)
5. [Run the App](#run-the-app)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, ensure you have the following installed on your computer:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (for cloning)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

3. **Code Editor** (Optional but recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - WebStorm: https://www.jetbrains.com/webstorm/
   - Sublime Text: https://www.sublimetext.com/

### For iOS Testing (macOS only)

- **Xcode** (for iOS Simulator)
  - Install from App Store or: https://developer.apple.com/download/

### For Android Testing

- **Android Studio** (for Android Emulator)
  - Download from: https://developer.android.com/studio

### For Physical Device Testing

- **Expo Go App**
  - iOS: Download from App Store
  - Android: Download from Google Play Store

---

## Method 1: Clone Using Git

This is the recommended method as it keeps your local copy connected to GitHub.

### Step 1: Open Terminal/Command Prompt

**On Windows:**
- Press `Win + R`, type `cmd`, and press Enter
- Or search for "Command Prompt" in Start menu

**On macOS/Linux:**
- Press `Cmd + Space`, type `terminal`, and press Enter
- Or open Terminal from Applications > Utilities

### Step 2: Navigate to Your Desired Directory

```bash
# Go to your home directory
cd ~

# Or go to a specific folder (example)
cd Documents
cd Projects
```

### Step 3: Clone the Repository

```bash
git clone https://github.com/ahmadzakdah/fitness-tracker-app.git
```

This creates a folder called `fitness-tracker-app` with all the code.

### Step 4: Navigate into the Project

```bash
cd fitness-tracker-app
```

### Step 5: Verify the Contents

```bash
# List files to confirm
ls -la

# You should see:
# - app/
# - components/
# - lib/
# - package.json
# - app.config.ts
# - etc.
```

---

## Method 2: Download as ZIP

If you prefer not to use Git, you can download the code as a ZIP file.

### Step 1: Go to GitHub Repository

Visit: https://github.com/ahmadzakdah/fitness-tracker-app

### Step 2: Download ZIP

1. Click the green **"Code"** button
2. Select **"Download ZIP"**
3. Wait for the download to complete

### Step 3: Extract the ZIP File

**On Windows:**
- Right-click the downloaded ZIP file
- Select "Extract All..."
- Choose a destination folder
- Click "Extract"

**On macOS/Linux:**
- Double-click the ZIP file to extract it
- Or use terminal: `unzip fitness-tracker-app-main.zip`

### Step 4: Open the Folder

Navigate to the extracted folder:

```bash
cd fitness-tracker-app-main
```

---

## Install Dependencies

After cloning or extracting, you need to install the project dependencies.

### Step 1: Install Node Packages

```bash
npm install
```

This command:
- Reads `package.json`
- Downloads all required packages
- Creates `node_modules` folder
- Takes 2-5 minutes depending on your internet speed

### Step 2: Verify Installation

```bash
npm run check
```

This verifies that TypeScript and all dependencies are correctly installed.

---

## Run the App

You can run the app in multiple ways depending on your preference.

### Option 1: Run on Web (Fastest)

Perfect for quick testing and development.

```bash
npm run dev
```

**What happens:**
1. Metro bundler starts
2. Web server starts on `http://localhost:8081`
3. Browser automatically opens (or manually open it)
4. You'll see the Home screen

**To stop:** Press `Ctrl + C` in the terminal

### Option 2: Run on iOS Simulator (macOS only)

```bash
npm run dev
```

In a **new terminal window**, run:

```bash
npm run ios
```

**What happens:**
1. iOS Simulator opens automatically
2. App loads in the simulator
3. You can interact with it like a real iPhone

### Option 3: Run on Android Emulator

First, ensure Android Emulator is running:

```bash
npm run dev
```

In a **new terminal window**, run:

```bash
npm run android
```

**What happens:**
1. App builds for Android
2. Loads in the Android Emulator
3. You can interact with it like a real Android phone

### Option 4: Run on Physical Device

**Prerequisites:**
- Install Expo Go app on your phone
- Phone and computer on same WiFi network

**Steps:**

1. Start the development server:
   ```bash
   npm run dev
   ```

2. A QR code appears in the terminal

3. On your phone:
   - Open Expo Go app
   - Tap the camera icon (iOS) or QR code icon (Android)
   - Scan the QR code
   - App loads on your device

---

## Testing the App

### Run Unit Tests

```bash
npm test
```

Expected output:
```
✓ lib/storage.test.ts (8 tests)
✓ lib/fitness-utils.test.ts (16 tests)

Test Files  2 passed (2)
Tests  24 passed (24)
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

This reruns tests whenever you modify files.

---

## Project Structure

After cloning, here's what you'll see:

```
fitness-tracker-app/
├── app/                          # App screens and navigation
│   ├── (tabs)/                   # Tab-based screens
│   │   ├── index.tsx            # Home screen
│   │   ├── workouts.tsx         # Workouts list
│   │   ├── progress.tsx         # Progress analytics
│   │   ├── settings.tsx         # Settings
│   │   ├── log-workout.tsx      # Log workout form
│   │   └── check-in.tsx         # Check-in form
│   ├── _layout.tsx              # Root layout
│   └── oauth/                    # OAuth callback
├── components/                   # Reusable components
│   ├── workout-card.tsx         # Workout display card
│   ├── progress-ring.tsx        # Circular progress indicator
│   ├── screen-container.tsx     # Safe area wrapper
│   └── ui/                      # UI components
├── lib/                         # Utilities and state
│   ├── types.ts                 # TypeScript types
│   ├── storage.ts               # AsyncStorage operations
│   ├── fitness-context.tsx      # Global state management
│   ├── fitness-utils.ts         # Utility functions
│   ├── fitness-utils.test.ts    # Tests for utilities
│   └── storage.test.ts          # Tests for storage
├── assets/                      # Images and icons
│   └── images/
│       ├── icon.png             # App icon
│       ├── splash-icon.png      # Splash screen
│       └── favicon.png          # Web favicon
├── package.json                 # Project dependencies
├── app.config.ts                # Expo configuration
├── tailwind.config.js           # Tailwind CSS config
├── theme.config.js              # Theme colors
├── TESTING_GUIDE.md             # Testing instructions
├── SETUP_GUIDE.md               # This file
├── design.md                    # Design specifications
└── README.md                    # Project overview
```

---

## Common Commands

Here are useful commands you'll use frequently:

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Check TypeScript errors
npm run check

# Format code
npm run format

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Generate QR code for mobile
npm run qr
```

---

## Editing the Code

### Using VS Code (Recommended)

1. Open VS Code
2. File → Open Folder
3. Select the `fitness-tracker-app` folder
4. Click "Open"
5. Start editing files

### File Locations for Common Changes

**Change app name:**
- Edit `app.config.ts` → `appName` field

**Change colors/theme:**
- Edit `theme.config.js` → `themeColors` object

**Add new screen:**
- Create new file in `app/(tabs)/`
- Add to tab navigation in `app/(tabs)/_layout.tsx`

**Modify home screen:**
- Edit `app/(tabs)/index.tsx`

**Add new utility function:**
- Edit `lib/fitness-utils.ts`

---

## Troubleshooting

### Issue: "npm: command not found"

**Solution:**
- Node.js is not installed
- Download from: https://nodejs.org/
- Restart your terminal after installation
- Verify: `node --version`

### Issue: "git: command not found"

**Solution:**
- Git is not installed
- Download from: https://git-scm.com/
- Restart your terminal after installation
- Verify: `git --version`

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Port 8081 already in use

**Solution:**
```bash
# Use a different port
EXPO_PORT=8082 npm run dev

# Or kill the process using port 8081
# On macOS/Linux:
lsof -ti:8081 | xargs kill -9

# On Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

### Issue: Metro bundler crashes

**Solution:**
```bash
# Clear cache and restart
npm run dev -- --reset-cache
```

### Issue: App won't load on physical device

**Solution:**
1. Ensure phone and computer are on same WiFi
2. Restart Expo Go app
3. Restart development server
4. Try scanning QR code again

### Issue: Tests fail

**Solution:**
```bash
# Run tests with more details
npm test -- --reporter=verbose

# Run specific test file
npm test -- lib/fitness-utils.test.ts
```

---

## Getting Help

If you encounter issues:

1. **Check the TESTING_GUIDE.md** for detailed testing instructions
2. **Check the design.md** for design specifications
3. **Review the README.md** for project overview
4. **Check Expo Documentation:** https://docs.expo.dev
5. **Check React Native Documentation:** https://reactnative.dev

---

## Next Steps

After successfully running the app:

1. **Explore the code** - Open files and understand the structure
2. **Run tests** - Execute `npm test` to verify everything works
3. **Test on different platforms** - Try web, iOS, and Android
4. **Make changes** - Edit files and see hot reload in action
5. **Read documentation** - Check TESTING_GUIDE.md and design.md

---

## Quick Start Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] Git installed (`git --version` works)
- [ ] Repository cloned or ZIP extracted
- [ ] Navigated to project folder (`cd fitness-tracker-app`)
- [ ] Dependencies installed (`npm install` completed)
- [ ] App runs (`npm run dev` works)
- [ ] Can see Home screen in browser
- [ ] Tests pass (`npm test` shows 24 passed)

Congratulations! You're ready to develop and test the fitness tracker app! 🎉
