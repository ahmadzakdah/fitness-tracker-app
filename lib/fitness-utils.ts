/**
 * Fitness Tracker Utility Functions
 */

import { Workout, WorkoutStats, ExerciseType, CALORIE_ESTIMATES } from "./types";

/**
 * Calculate estimated calories for a workout
 */
export function calculateCalories(
  exerciseType: ExerciseType,
  intensity: "easy" | "moderate" | "intense",
  duration: number
): number {
  const caloriesPerMinute = CALORIE_ESTIMATES[exerciseType][intensity];
  return Math.round(caloriesPerMinute * duration);
}

/**
 * Get today's date at midnight
 */
export function getTodayStart(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Get today's date at end of day
 */
export function getTodayEnd(): Date {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
}

/**
 * Get start of week (Monday)
 */
export function getWeekStart(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of week (Sunday)
 */
export function getWeekEnd(date: Date = new Date()): Date {
  const d = getWeekStart(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get start of month
 */
export function getMonthStart(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of month
 */
export function getMonthEnd(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Format date to readable string (e.g., "Jan 22, 2026")
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format date to short string (e.g., "Jan 22")
 */
export function formatDateShort(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Format time (e.g., "2:30 PM")
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format duration in minutes to readable string (e.g., "1h 30m")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Calculate workout statistics
 */
export function calculateStats(workouts: Workout[]): WorkoutStats {
  if (workouts.length === 0) {
    return {
      totalWorkouts: 0,
      totalMinutes: 0,
      totalCalories: 0,
      averageDuration: 0,
      currentStreak: 0,
      exerciseBreakdown: {
        cardio: 0,
        strength: 0,
        flexibility: 0,
        sports: 0,
      },
    };
  }

  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const averageDuration = Math.round(totalMinutes / workouts.length);

  const exerciseBreakdown = {
    cardio: workouts.filter((w) => w.exerciseType === "cardio").length,
    strength: workouts.filter((w) => w.exerciseType === "strength").length,
    flexibility: workouts.filter((w) => w.exerciseType === "flexibility").length,
    sports: workouts.filter((w) => w.exerciseType === "sports").length,
  };

  // Calculate current streak (consecutive days with workouts)
  const sortedWorkouts = [...workouts].sort((a, b) => b.timestamp - a.timestamp);
  let currentStreak = 0;
  let checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);

  for (const workout of sortedWorkouts) {
    const workoutDate = new Date(workout.timestamp);
    workoutDate.setHours(0, 0, 0, 0);

    if (
      workoutDate.getTime() === checkDate.getTime() ||
      workoutDate.getTime() === checkDate.getTime() - 86400000 // previous day
    ) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalWorkouts: workouts.length,
    totalMinutes,
    totalCalories,
    averageDuration,
    currentStreak,
    exerciseBreakdown,
  };
}

/**
 * Get workouts grouped by date
 */
export function groupWorkoutsByDate(
  workouts: Workout[]
): Map<string, Workout[]> {
  const grouped = new Map<string, Workout[]>();

  for (const workout of workouts) {
    const date = formatDate(workout.timestamp);
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(workout);
  }

  return grouped;
}

/**
 * Get daily workout summary
 */
export function getDailySummary(workouts: Workout[]) {
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const count = workouts.length;

  return {
    count,
    totalMinutes,
    totalCalories,
  };
}

/**
 * Check if date is today
 */
export function isToday(timestamp: number): boolean {
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if date is yesterday
 */
export function isYesterday(timestamp: number): boolean {
  const date = new Date(timestamp);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}
