# Fitness Tracker App - Design Plan

## Overview
A mobile fitness tracking application designed for iOS-style simplicity and one-handed usage. The app enables users to log daily workouts, check in with their fitness goals, and visualize progress over time.

## Screen List

1. **Home Screen** - Daily dashboard with today's summary and quick actions
2. **Workout Log Screen** - List of all logged workouts with filtering and search
3. **Log Workout Screen** - Form to add a new workout entry
4. **Progress Screen** - Charts and statistics showing fitness progress over time
5. **Check-in Screen** - Quick daily check-in with mood and energy level
6. **Settings Screen** - App configuration and preferences

## Primary Content and Functionality

### Home Screen
- **Content**: Today's date, workout summary (exercises completed, calories burned), upcoming goals
- **Functionality**: 
  - Display today's total workout time and calorie estimate
  - Show last workout logged
  - Quick action buttons to "Log Workout" and "Check In"
  - Visual indicator of daily goal progress (circular progress ring)

### Workout Log Screen
- **Content**: Scrollable list of all logged workouts (date, exercise type, duration, intensity)
- **Functionality**:
  - Display workouts in reverse chronological order
  - Tap workout to view/edit details
  - Swipe to delete workouts
  - Filter by exercise type (cardio, strength, flexibility, sports)
  - Search by date or exercise name

### Log Workout Screen
- **Content**: Form with input fields for workout details
- **Functionality**:
  - Exercise type selector (dropdown or segmented control)
  - Duration input (minutes)
  - Intensity level (easy, moderate, intense)
  - Calorie estimate (auto-calculated or manual)
  - Notes field (optional)
  - Save and Cancel buttons

### Progress Screen
- **Content**: Charts and statistics
- **Functionality**:
  - Weekly workout frequency chart (bar chart)
  - Total calories burned this week/month
  - Workout streak counter
  - Average workout duration
  - Exercise type breakdown (pie chart)
  - Time period selector (week, month, all-time)

### Check-in Screen
- **Content**: Quick daily check-in form
- **Functionality**:
  - Mood selector (emoji or scale 1-5)
  - Energy level selector (low, medium, high)
  - Optional notes
  - Timestamp auto-populated
  - Save button

### Settings Screen
- **Content**: Configuration options
- **Functionality**:
  - Daily goal setting (minutes or calories)
  - Notification preferences
  - Theme toggle (light/dark)
  - Clear all data option
  - App version display

## Key User Flows

### Flow 1: Log a Workout
1. User taps "Log Workout" button on Home Screen
2. Navigates to Log Workout Screen
3. Selects exercise type (e.g., Running)
4. Enters duration (30 minutes)
5. Selects intensity (Moderate)
6. Taps Save
7. Returns to Home Screen with updated summary

### Flow 2: View Progress
1. User taps Progress tab
2. Sees weekly workout frequency chart
3. Swipes to view monthly statistics
4. Taps on a specific bar to see details for that day
5. Returns to Progress Screen

### Flow 3: Daily Check-in
1. User taps "Check In" on Home Screen
2. Selects mood and energy level
3. Optionally adds notes
4. Taps Save
5. Check-in recorded with timestamp

### Flow 4: Review Workout History
1. User taps Workout Log tab
2. Scrolls through list of past workouts
3. Taps a workout to view details
4. Can edit or delete the workout
5. Returns to Workout Log list

## Color Choices

**Primary Brand Colors:**
- **Primary**: `#0a7ea4` (Teal blue) - Used for buttons, highlights, and active states
- **Success**: `#22C55E` (Green) - Used for completed goals and positive metrics
- **Warning**: `#F59E0B` (Amber) - Used for moderate intensity and alerts
- **Error**: `#EF4444` (Red) - Used for high intensity and destructive actions

**Neutral Colors:**
- **Background**: `#ffffff` (Light) / `#151718` (Dark)
- **Surface**: `#f5f5f5` (Light) / `#1e2022` (Dark)
- **Foreground**: `#11181C` (Light) / `#ECEDEE` (Dark)
- **Muted**: `#687076` (Light) / `#9BA1A6` (Dark)
- **Border**: `#E5E7EB` (Light) / `#334155` (Dark)

## Layout Principles

- **Portrait Orientation**: All screens designed for 9:16 aspect ratio
- **One-Handed Usage**: Primary actions placed in lower half of screen
- **Safe Area**: Content respects notch and home indicator
- **Tab Navigation**: Bottom tab bar with Home, Workouts, Progress, Settings
- **Spacing**: Consistent 16px padding and 8px gaps between elements
- **Typography**: Clear hierarchy with bold headings and readable body text
