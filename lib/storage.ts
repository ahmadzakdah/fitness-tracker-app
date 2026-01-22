/**
 * Local Storage Management for Fitness Tracker
 * Uses AsyncStorage for persistent data storage
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout, CheckIn, DailyGoal } from "./types";

const WORKOUTS_KEY = "@fitness_tracker/workouts";
const CHECK_INS_KEY = "@fitness_tracker/check_ins";
const DAILY_GOAL_KEY = "@fitness_tracker/daily_goal";

// Default daily goal
const DEFAULT_DAILY_GOAL: DailyGoal = {
  targetMinutes: 30,
  targetCalories: 500,
};

/**
 * Workout Storage
 */
export const workoutStorage = {
  async getAll(): Promise<Workout[]> {
    try {
      const data = await AsyncStorage.getItem(WORKOUTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading workouts:", error);
      return [];
    }
  },

  async add(workout: Omit<Workout, "id">): Promise<Workout> {
    try {
      const workouts = await this.getAll();
      const newWorkout: Workout = {
        ...workout,
        id: Date.now().toString(),
      };
      workouts.push(newWorkout);
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
      return newWorkout;
    } catch (error) {
      console.error("Error adding workout:", error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Workout>): Promise<Workout | null> {
    try {
      const workouts = await this.getAll();
      const index = workouts.findIndex((w) => w.id === id);
      if (index === -1) return null;

      const updated = { ...workouts[index], ...updates };
      workouts[index] = updated;
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
      return updated;
    } catch (error) {
      console.error("Error updating workout:", error);
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const workouts = await this.getAll();
      const filtered = workouts.filter((w) => w.id !== id);
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Error deleting workout:", error);
      throw error;
    }
  },

  async getByDate(date: Date): Promise<Workout[]> {
    try {
      const workouts = await this.getAll();
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return workouts.filter(
        (w) => w.timestamp >= startOfDay.getTime() && w.timestamp <= endOfDay.getTime()
      );
    } catch (error) {
      console.error("Error getting workouts by date:", error);
      return [];
    }
  },

  async getByDateRange(startDate: Date, endDate: Date): Promise<Workout[]> {
    try {
      const workouts = await this.getAll();
      const start = startDate.getTime();
      const end = endDate.getTime();

      return workouts.filter((w) => w.timestamp >= start && w.timestamp <= end);
    } catch (error) {
      console.error("Error getting workouts by date range:", error);
      return [];
    }
  },
};

/**
 * Check-in Storage
 */
export const checkInStorage = {
  async getAll(): Promise<CheckIn[]> {
    try {
      const data = await AsyncStorage.getItem(CHECK_INS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading check-ins:", error);
      return [];
    }
  },

  async add(checkIn: Omit<CheckIn, "id">): Promise<CheckIn> {
    try {
      const checkIns = await this.getAll();
      const newCheckIn: CheckIn = {
        ...checkIn,
        id: Date.now().toString(),
      };
      checkIns.push(newCheckIn);
      await AsyncStorage.setItem(CHECK_INS_KEY, JSON.stringify(checkIns));
      return newCheckIn;
    } catch (error) {
      console.error("Error adding check-in:", error);
      throw error;
    }
  },

  async getByDate(date: Date): Promise<CheckIn | null> {
    try {
      const checkIns = await this.getAll();
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const todayCheckIn = checkIns.find(
        (c) => c.timestamp >= startOfDay.getTime() && c.timestamp <= endOfDay.getTime()
      );

      return todayCheckIn || null;
    } catch (error) {
      console.error("Error getting check-in by date:", error);
      return null;
    }
  },
};

/**
 * Daily Goal Storage
 */
export const dailyGoalStorage = {
  async get(): Promise<DailyGoal> {
    try {
      const data = await AsyncStorage.getItem(DAILY_GOAL_KEY);
      return data ? JSON.parse(data) : DEFAULT_DAILY_GOAL;
    } catch (error) {
      console.error("Error reading daily goal:", error);
      return DEFAULT_DAILY_GOAL;
    }
  },

  async set(goal: DailyGoal): Promise<void> {
    try {
      await AsyncStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(goal));
    } catch (error) {
      console.error("Error saving daily goal:", error);
      throw error;
    }
  },
};

/**
 * Clear all data (for testing or reset)
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([WORKOUTS_KEY, CHECK_INS_KEY, DAILY_GOAL_KEY]);
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw error;
  }
}
