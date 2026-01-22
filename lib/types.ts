/**
 * Fitness Tracker App - Type Definitions
 */

export type ExerciseType = "cardio" | "strength" | "flexibility" | "sports";
export type IntensityLevel = "easy" | "moderate" | "intense";
export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type EnergyLevel = "low" | "medium" | "high";

export interface Workout {
  id: string;
  exerciseType: ExerciseType;
  duration: number; // in minutes
  intensity: IntensityLevel;
  calories: number;
  notes: string;
  timestamp: number; // Unix timestamp
}

export interface CheckIn {
  id: string;
  mood: MoodLevel;
  energy: EnergyLevel;
  notes: string;
  timestamp: number; // Unix timestamp
}

export interface DailyGoal {
  targetMinutes: number;
  targetCalories: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
  averageDuration: number;
  currentStreak: number;
  exerciseBreakdown: Record<ExerciseType, number>;
}

export const EXERCISE_TYPES: Record<ExerciseType, string> = {
  cardio: "Cardio",
  strength: "Strength",
  flexibility: "Flexibility",
  sports: "Sports",
};

export const INTENSITY_COLORS: Record<IntensityLevel, string> = {
  easy: "#22C55E", // green
  moderate: "#F59E0B", // amber
  intense: "#EF4444", // red
};

export const INTENSITY_LABELS: Record<IntensityLevel, string> = {
  easy: "Easy",
  moderate: "Moderate",
  intense: "Intense",
};

export const MOOD_EMOJIS: Record<MoodLevel, string> = {
  1: "😞",
  2: "😐",
  3: "🙂",
  4: "😊",
  5: "🤩",
};

export const ENERGY_LABELS: Record<EnergyLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// Calorie estimates per minute by exercise type and intensity
export const CALORIE_ESTIMATES: Record<ExerciseType, Record<IntensityLevel, number>> = {
  cardio: {
    easy: 4,
    moderate: 8,
    intense: 12,
  },
  strength: {
    easy: 3,
    moderate: 6,
    intense: 9,
  },
  flexibility: {
    easy: 2,
    moderate: 3,
    intense: 4,
  },
  sports: {
    easy: 5,
    moderate: 10,
    intense: 15,
  },
};
