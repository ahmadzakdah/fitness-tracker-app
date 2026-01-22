# Fitness Tracker App - Testing Guide

This guide provides comprehensive instructions for testing the fitness tracker app across different platforms and scenarios.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Testing on Web](#testing-on-web)
3. [Testing on iOS (Simulator)](#testing-on-ios-simulator)
4. [Testing on Android (Emulator)](#testing-on-android-emulator)
5. [Testing on Physical Device](#testing-on-physical-device)
6. [Unit Tests](#unit-tests)
7. [Manual Test Cases](#manual-test-cases)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before testing, ensure you have:

- **Node.js** (v18+) and **npm** installed
- **Expo CLI** installed: `npm install -g expo-cli`
- **Git** for version control
- For iOS testing: **Xcode** installed (macOS only)
- For Android testing: **Android Studio** and **Android SDK** installed
- For physical device testing: **Expo Go** app installed on your phone

### Installation Steps

```bash
# Clone or navigate to the project
cd /home/ubuntu/fitness-tracker-app

# Install dependencies
npm install

# Verify installation
npm run check
```

---

## Testing on Web

The web version is the fastest way to test the app in your browser.

### Start the Development Server

```bash
# Start the Metro bundler and web server
npm run dev

# Or start just the web version
npm run dev:metro
```

The app will be available at: **http://localhost:8081**

### Web Testing Steps

1. **Open in Browser**
   - Navigate to `http://localhost:8081`
   - The app should load with the Home screen visible

2. **Test Responsive Design**
   - Open browser DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test on different screen sizes: iPhone 12, iPhone 14 Pro, iPad

3. **Test Dark Mode**
   - In DevTools, go to Rendering tab
   - Toggle "Emulate CSS media feature prefers-color-scheme"
   - Switch between light and dark modes

4. **Check Console for Errors**
   - Open DevTools Console (F12 → Console tab)
   - Verify no red error messages appear
   - Check for warnings

---

## Testing on iOS Simulator

### Prerequisites

- macOS with Xcode installed
- iOS Simulator (comes with Xcode)

### Steps

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open iOS Simulator**
   ```bash
   # In a new terminal
   npm run ios
   ```

3. **Or Manually Open Simulator**
   ```bash
   # Open Xcode
   open -a Simulator

   # In the Simulator, press Cmd+Shift+H to go home
   # Open Expo Go app (search for it in the app store first)
   # Scan the QR code from the terminal
   ```

4. **QR Code Method**
   - Run `npm run dev`
   - A QR code will appear in the terminal
   - Open Expo Go on the simulator
   - Tap "Scan QR Code"
   - Scan the code from your terminal

### iOS-Specific Testing

- Test Safe Area handling (notch, home indicator)
- Test haptic feedback (should feel subtle vibrations)
- Test keyboard behavior on text inputs
- Verify tab bar appears at the bottom

---

## Testing on Android Emulator

### Prerequisites

- Android Studio installed
- Android SDK (API 30+)
- Android Emulator configured

### Steps

1. **Start Android Emulator**
   ```bash
   # List available emulators
   emulator -list-avds

   # Start an emulator
   emulator -avd Pixel_4_API_30
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open on Android**
   ```bash
   # In a new terminal
   npm run android
   ```

4. **Or Manually Scan QR Code**
   - Open Expo Go app on the emulator
   - Tap "Scan QR Code"
   - Scan the QR code from your terminal

### Android-Specific Testing

- Test navigation bar appearance
- Test keyboard behavior
- Verify back button functionality
- Test status bar styling

---

## Testing on Physical Device

### iOS Device

1. **Install Expo Go**
   - Open App Store
   - Search for "Expo Go"
   - Install the app

2. **Connect to Same Network**
   - Ensure your Mac and iPhone are on the same WiFi network

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Scan QR Code**
   - Open Expo Go on your iPhone
   - Tap the camera icon
   - Scan the QR code shown in the terminal
   - The app will load on your device

### Android Device

1. **Install Expo Go**
   - Open Google Play Store
   - Search for "Expo Go"
   - Install the app

2. **Connect to Same Network**
   - Ensure your computer and Android device are on the same WiFi network

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Scan QR Code**
   - Open Expo Go on your Android device
   - Tap the QR code icon
   - Scan the QR code shown in the terminal
   - The app will load on your device

### Physical Device Testing Checklist

- [ ] App loads without crashes
- [ ] All tabs are accessible
- [ ] Touch interactions are responsive
- [ ] Keyboard appears and disappears correctly
- [ ] Data persists after closing the app
- [ ] Dark mode toggle works
- [ ] All buttons are easily tappable (minimum 44x44 points)

---

## Unit Tests

### Run All Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- lib/fitness-utils.test.ts

# Run with coverage
npm test -- --coverage
```

### Test Files

The app includes comprehensive unit tests:

- **`lib/fitness-utils.test.ts`** - Tests for calorie calculations, date utilities, and statistics
- **`lib/storage.test.ts`** - Tests for AsyncStorage operations (workouts, check-ins, goals)

### Expected Test Output

```
✓ lib/storage.test.ts (8 tests)
✓ lib/fitness-utils.test.ts (16 tests)

Test Files  2 passed (2)
Tests  24 passed (24)
```

---

## Manual Test Cases

### Test Case 1: Log a Workout

**Objective**: Verify workout logging functionality

**Steps**:
1. Navigate to Home screen
2. Tap "Log Workout" button
3. Select "Cardio" as exercise type
4. Enter "30" for duration
5. Select "Moderate" intensity
6. Add note: "Morning run"
7. Tap "Save Workout"

**Expected Result**:
- Workout is saved
- Home screen shows updated progress ring
- Calories are calculated (should be 240 for cardio moderate 30 min)
- Workout appears in Workouts tab

---

### Test Case 2: View Workout History

**Objective**: Verify workout list and filtering

**Steps**:
1. Tap "Workouts" tab
2. Verify all logged workouts appear
3. Tap "Strength" filter
4. Verify only strength workouts show
5. Tap "All" filter
6. Verify all workouts show again

**Expected Result**:
- Workouts display in reverse chronological order (newest first)
- Filters work correctly
- Each workout shows: exercise type, duration, intensity, calories, date, time

---

### Test Case 3: Daily Check-in

**Objective**: Verify check-in functionality

**Steps**:
1. Tap "Log Workout" button on Home screen (or navigate to Check-in)
2. Select mood: 4 (😊)
3. Select energy: "High"
4. Add note: "Feeling energized"
5. Tap "Save Check-in"

**Expected Result**:
- Check-in is saved with timestamp
- Home screen button changes to "✓ Check-in Done"
- Only one check-in per day is allowed

---

### Test Case 4: View Progress Statistics

**Objective**: Verify progress tracking and statistics

**Steps**:
1. Tap "Progress" tab
2. Verify stats display: total workouts, minutes, calories
3. Tap "Week" button
4. Verify stats update for the current week
5. Tap "Month" button
6. Verify stats update for the current month
7. Tap "All" button
8. Verify stats show all-time data

**Expected Result**:
- Stats are calculated correctly
- Exercise breakdown shows percentage breakdown
- Current streak displays correctly
- Time period selector works

---

### Test Case 5: Update Daily Goals

**Objective**: Verify settings functionality

**Steps**:
1. Tap "Settings" tab
2. Change "Target Minutes" to "45"
3. Change "Target Calories" to "600"
4. Tap "Save Goals"
5. Navigate back to Home screen

**Expected Result**:
- Goals are saved
- Progress ring on Home screen updates with new target
- Confirmation message appears

---

### Test Case 6: Delete Workout

**Objective**: Verify workout deletion

**Steps**:
1. Tap "Workouts" tab
2. Find a workout to delete
3. Tap "Delete" button
4. Confirm deletion

**Expected Result**:
- Workout is removed from the list
- Progress stats update
- Home screen summary updates

---

### Test Case 7: Dark Mode Toggle

**Objective**: Verify theme switching

**Steps**:
1. Tap "Settings" tab
2. Toggle "Dark Mode" switch
3. Observe color changes
4. Close and reopen the app

**Expected Result**:
- App switches to dark theme
- All text remains readable
- Theme preference persists after app restart

---

### Test Case 8: Data Persistence

**Objective**: Verify data survives app restart

**Steps**:
1. Log a workout
2. Add a check-in
3. Close the app completely
4. Reopen the app
5. Navigate to Home screen

**Expected Result**:
- Logged workout appears in history
- Progress ring shows updated data
- Check-in status is preserved

---

### Test Case 9: Empty States

**Objective**: Verify empty state messages

**Steps**:
1. Clear all data (Settings → Clear All Data)
2. Navigate to each tab
3. Observe empty state messages

**Expected Result**:
- Home shows "No workouts yet"
- Workouts tab shows "No workouts"
- Progress tab shows "No data yet"
- Each empty state has a helpful message

---

### Test Case 10: Calorie Calculations

**Objective**: Verify calorie estimates are accurate

**Steps**:
1. Log these workouts:
   - Cardio, 30 min, Moderate intensity
   - Strength, 20 min, Easy intensity
   - Sports, 45 min, Intense intensity

2. Check Progress tab

**Expected Result**:
- Cardio: 240 calories (8 cal/min × 30)
- Strength: 60 calories (3 cal/min × 20)
- Sports: 675 calories (15 cal/min × 45)
- Total: 975 calories

---

## Troubleshooting

### App Won't Start

**Problem**: Metro bundler fails to start

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Clear Metro cache
npm run dev -- --reset-cache
```

### QR Code Won't Scan

**Problem**: Expo Go can't scan QR code

**Solution**:
1. Ensure phone and computer are on same WiFi
2. Try typing the URL manually instead
3. Restart Expo Go app
4. Restart development server

### Data Not Persisting

**Problem**: Workouts disappear after app restart

**Solution**:
1. Check browser console for errors (F12)
2. Verify AsyncStorage is working: `npm test`
3. Clear app data and try again

### Keyboard Issues

**Problem**: Keyboard doesn't appear on text inputs

**Solution**:
1. On web: Click the input field
2. On simulator: Ensure keyboard is enabled (Cmd+K on iOS)
3. On physical device: Ensure keyboard is not disabled in accessibility settings

### Performance Issues

**Problem**: App is slow or laggy

**Solution**:
1. Check for console errors
2. Reduce number of logged workouts for testing
3. Close other apps on device
4. Restart the development server

---

## Testing Checklist

Use this checklist to ensure comprehensive testing:

### Functionality
- [ ] Log workout with all fields
- [ ] View workout history
- [ ] Filter workouts by type
- [ ] Delete workout
- [ ] Add daily check-in
- [ ] View progress statistics
- [ ] Update daily goals
- [ ] Toggle dark mode

### UI/UX
- [ ] All buttons are responsive
- [ ] Text is readable in light and dark modes
- [ ] Layout works on different screen sizes
- [ ] Safe area is respected (notch, home indicator)
- [ ] Tab navigation works smoothly

### Data
- [ ] Data persists after app restart
- [ ] Calorie calculations are accurate
- [ ] Dates and times are correct
- [ ] Empty states display properly

### Performance
- [ ] App loads quickly
- [ ] No console errors
- [ ] Smooth scrolling
- [ ] Buttons respond immediately

### Edge Cases
- [ ] Empty workout list
- [ ] Very long workout notes
- [ ] Rapid button clicks
- [ ] Switching between tabs quickly

---

## Reporting Issues

If you find any bugs or issues:

1. **Document the Issue**
   - Note the exact steps to reproduce
   - Screenshot or video if possible
   - Check browser console for errors

2. **Check Existing Issues**
   - Review the todo.md file
   - Check if issue is already known

3. **Test on Different Platforms**
   - Verify if issue occurs on web, iOS, and Android

4. **Provide Details**
   - Device type and OS version
   - App version
   - Steps to reproduce
   - Expected vs actual behavior

---

## Performance Benchmarks

Expected performance metrics:

| Metric | Target | Acceptable |
|--------|--------|-----------|
| App startup time | < 3s | < 5s |
| Screen transition | < 300ms | < 500ms |
| Workout logging | < 1s | < 2s |
| List scroll (50 items) | 60 FPS | 30 FPS |

---

## Next Steps

After testing, consider:

1. **Deployment**: Build and submit to app stores
2. **Analytics**: Add tracking to understand user behavior
3. **Feedback**: Gather user feedback for improvements
4. **Features**: Add new features based on testing results

For questions or issues, refer to the [Expo Documentation](https://docs.expo.dev) or the project README.
