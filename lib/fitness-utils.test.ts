/**
 * Tests for Fitness Utilities
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  calculateCalories,
  calculateStats,
  formatDate,
  formatDuration,
  getDailySummary,
  getTodayStart,
  getTodayEnd,
  isToday,
  isYesterday,
  getWeekStart,
  getWeekEnd,
  getMonthStart,
  getMonthEnd,
} from "./fitness-utils";
import { Workout } from "./types";

describe("Fitness Utils", () => {
  describe("calculateCalories", () => {
    it("should calculate calories for cardio moderate intensity", () => {
      const calories = calculateCalories("cardio", "moderate", 30);
      expect(calories).toBe(240); // 8 cal/min * 30 min
    });

    it("should calculate calories for strength easy intensity", () => {
      const calories = calculateCalories("strength", "easy", 30);
      expect(calories).toBe(90); // 3 cal/min * 30 min
    });

    it("should calculate calories for sports intense intensity", () => {
      const calories = calculateCalories("sports", "intense", 60);
      expect(calories).toBe(900); // 15 cal/min * 60 min
    });

    it("should handle zero duration", () => {
      const calories = calculateCalories("cardio", "moderate", 0);
      expect(calories).toBe(0);
    });
  });

  describe("formatDuration", () => {
    it("should format minutes under 60", () => {
      expect(formatDuration(30)).toBe("30m");
      expect(formatDuration(45)).toBe("45m");
    });

    it("should format hours and minutes", () => {
      expect(formatDuration(90)).toBe("1h 30m");
      expect(formatDuration(120)).toBe("2h");
      expect(formatDuration(125)).toBe("2h 5m");
    });
  });

  describe("formatDate", () => {
    it("should format timestamp to readable date", () => {
      const date = new Date("2026-01-22T12:00:00Z");
      const timestamp = date.getTime();
      const formatted = formatDate(timestamp);
      expect(formatted).toContain("Jan");
      expect(formatted).toContain("2026");
      // Verify it contains a day number
      expect(/\d+/.test(formatted)).toBe(true);
    });
  });

  describe("getDailySummary", () => {
    it("should calculate daily summary correctly", () => {
      const workouts: Workout[] = [
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

      const summary = getDailySummary(workouts);
      expect(summary.count).toBe(2);
      expect(summary.totalMinutes).toBe(50);
      expect(summary.totalCalories).toBe(300);
    });

    it("should return zero values for empty array", () => {
      const summary = getDailySummary([]);
      expect(summary.count).toBe(0);
      expect(summary.totalMinutes).toBe(0);
      expect(summary.totalCalories).toBe(0);
    });
  });

  describe("calculateStats", () => {
    it("should calculate stats correctly", () => {
      const workouts: Workout[] = [
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
          exerciseType: "cardio",
          duration: 20,
          intensity: "easy",
          calories: 80,
          notes: "",
          timestamp: Date.now(),
        },
        {
          id: "3",
          exerciseType: "strength",
          duration: 40,
          intensity: "intense",
          calories: 360,
          notes: "",
          timestamp: Date.now(),
        },
      ];

      const stats = calculateStats(workouts);
      expect(stats.totalWorkouts).toBe(3);
      expect(stats.totalMinutes).toBe(90);
      expect(stats.totalCalories).toBe(680);
      expect(stats.averageDuration).toBe(30);
      expect(stats.exerciseBreakdown.cardio).toBe(2);
      expect(stats.exerciseBreakdown.strength).toBe(1);
    });

    it("should return zero stats for empty array", () => {
      const stats = calculateStats([]);
      expect(stats.totalWorkouts).toBe(0);
      expect(stats.totalMinutes).toBe(0);
      expect(stats.totalCalories).toBe(0);
      expect(stats.averageDuration).toBe(0);
      expect(stats.currentStreak).toBe(0);
    });
  });

  describe("Date utilities", () => {
    it("should get today start and end", () => {
      const start = getTodayStart();
      const end = getTodayEnd();

      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
      expect(end.getHours()).toBe(23);
      expect(end.getMinutes()).toBe(59);
    });

    it("should check if date is today", () => {
      const now = Date.now();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(isToday(now)).toBe(true);
      expect(isToday(yesterday.getTime())).toBe(false);
    });

    it("should check if date is yesterday", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(isYesterday(yesterday.getTime())).toBe(true);
      expect(isYesterday(Date.now())).toBe(false);
    });

    it("should get week boundaries", () => {
      const start = getWeekStart();
      const end = getWeekEnd();

      expect(start.getHours()).toBe(0);
      expect(end.getHours()).toBe(23);
      expect(end.getTime()).toBeGreaterThan(start.getTime());
    });

    it("should get month boundaries", () => {
      const start = getMonthStart();
      const end = getMonthEnd();

      expect(start.getDate()).toBe(1);
      expect(start.getHours()).toBe(0);
      expect(end.getHours()).toBe(23);
      expect(end.getTime()).toBeGreaterThan(start.getTime());
    });
  });
});
