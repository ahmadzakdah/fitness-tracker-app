/**
 * Tests for Storage Utilities
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { workoutStorage, checkInStorage, dailyGoalStorage } from "./storage";
import { Workout, CheckIn } from "./types";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    multiRemove: vi.fn(),
  },
}));

describe("Storage Utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("workoutStorage", () => {
    it("should get all workouts", async () => {
      const mockWorkouts: Workout[] = [
        {
          id: "1",
          exerciseType: "cardio",
          duration: 30,
          intensity: "moderate",
          calories: 240,
          notes: "Good run",
          timestamp: Date.now(),
        },
      ];

      (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(mockWorkouts));

      const workouts = await workoutStorage.getAll();
      expect(workouts).toEqual(mockWorkouts);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@fitness_tracker/workouts");
    });

    it("should return empty array if no workouts", async () => {
      (AsyncStorage.getItem as any).mockResolvedValue(null);

      const workouts = await workoutStorage.getAll();
      expect(workouts).toEqual([]);
    });

    it("should add a workout", async () => {
      (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify([]));
      (AsyncStorage.setItem as any).mockResolvedValue(undefined);

      const newWorkout = {
        exerciseType: "cardio" as const,
        duration: 30,
        intensity: "moderate" as const,
        calories: 240,
        notes: "Good run",
        timestamp: Date.now(),
      };

      const result = await workoutStorage.add(newWorkout);

      expect(result.id).toBeDefined();
      expect(result.exerciseType).toBe("cardio");
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it("should delete a workout", async () => {
      const mockWorkouts: Workout[] = [
        {
          id: "1",
          exerciseType: "cardio",
          duration: 30,
          intensity: "moderate",
          calories: 240,
          notes: "",
          timestamp: Date.now(),
        },
        {
          id: "2",
          exerciseType: "strength",
          duration: 20,
          intensity: "easy",
          calories: 60,
          notes: "",
          timestamp: Date.now(),
        },
      ];

      (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(mockWorkouts));
      (AsyncStorage.setItem as any).mockResolvedValue(undefined);

      const result = await workoutStorage.delete("1");

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalled();

      // Verify the saved data contains only the second workout
      const savedData = (AsyncStorage.setItem as any).mock.calls[0][1];
      const parsed = JSON.parse(savedData);
      expect(parsed.length).toBe(1);
      expect(parsed[0].id).toBe("2");
    });
  });

  describe("checkInStorage", () => {
    it("should get all check-ins", async () => {
      const mockCheckIns: CheckIn[] = [
        {
          id: "1",
          mood: 4,
          energy: "high",
          notes: "Feeling great",
          timestamp: Date.now(),
        },
      ];

      (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(mockCheckIns));

      const checkIns = await checkInStorage.getAll();
      expect(checkIns).toEqual(mockCheckIns);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@fitness_tracker/check_ins");
    });

    it("should add a check-in", async () => {
      (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify([]));
      (AsyncStorage.setItem as any).mockResolvedValue(undefined);

      const newCheckIn = {
        mood: 4 as const,
        energy: "high" as const,
        notes: "Feeling great",
        timestamp: Date.now(),
      };

      const result = await checkInStorage.add(newCheckIn);

      expect(result.id).toBeDefined();
      expect(result.mood).toBe(4);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("dailyGoalStorage", () => {
    it("should get daily goal", async () => {
      const mockGoal = { targetMinutes: 30, targetCalories: 500 };

      (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(mockGoal));

      const goal = await dailyGoalStorage.get();
      expect(goal).toEqual(mockGoal);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("@fitness_tracker/daily_goal");
    });

    it("should set daily goal", async () => {
      (AsyncStorage.setItem as any).mockResolvedValue(undefined);

      const goal = { targetMinutes: 45, targetCalories: 600 };
      await dailyGoalStorage.set(goal);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "@fitness_tracker/daily_goal",
        JSON.stringify(goal)
      );
    });
  });
});
