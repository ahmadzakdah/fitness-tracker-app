/**
 * Progress Screen - Statistics and charts
 */

import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFitness } from "@/lib/fitness-context";
import { useState, useMemo } from "react";
import { Workout, EXERCISE_TYPES } from "@/lib/types";
import {
  calculateStats,
  getWeekStart,
  getWeekEnd,
  getMonthStart,
  getMonthEnd,
  formatDuration,
} from "@/lib/fitness-utils";

type TimePeriod = "week" | "month" | "all";

export default function ProgressScreen() {
  const { workouts } = useFitness();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("week");

  const filteredWorkouts = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (timePeriod) {
      case "week":
        startDate = getWeekStart(now);
        endDate = getWeekEnd(now);
        break;
      case "month":
        startDate = getMonthStart(now);
        endDate = getMonthEnd(now);
        break;
      case "all":
        return workouts;
      default:
        return workouts;
    }

    return workouts.filter(
      (w) => w.timestamp >= startDate.getTime() && w.timestamp <= endDate.getTime()
    );
  }, [workouts, timePeriod]);

  const stats = useMemo(() => calculateStats(filteredWorkouts), [filteredWorkouts]);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Progress</Text>
            <Text className="text-sm text-muted">Your fitness journey</Text>
          </View>

          {/* Time Period Selector */}
          <View className="flex-row gap-2">
            {(["week", "month", "all"] as TimePeriod[]).map((period) => (
              <Pressable
                key={period}
                onPress={() => setTimePeriod(period)}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className={`flex-1 py-2 rounded-lg border ${
                  timePeriod === period
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-center font-semibold text-sm capitalize ${
                    timePeriod === period ? "text-white" : "text-foreground"
                  }`}
                >
                  {period}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Stats Grid */}
          <View className="gap-3">
            {/* Total Workouts */}
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-muted mb-1">Total Workouts</Text>
              <Text className="text-3xl font-bold text-foreground">{stats.totalWorkouts}</Text>
            </View>

            {/* Total Minutes */}
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-muted mb-1">Total Minutes</Text>
              <Text className="text-3xl font-bold text-foreground">
                {formatDuration(stats.totalMinutes)}
              </Text>
            </View>

            {/* Total Calories */}
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-muted mb-1">Calories Burned</Text>
              <Text className="text-3xl font-bold text-foreground">{stats.totalCalories}</Text>
            </View>

            {/* Average Duration */}
            {stats.totalWorkouts > 0 && (
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Average Duration</Text>
                <Text className="text-3xl font-bold text-foreground">
                  {formatDuration(stats.averageDuration)}
                </Text>
              </View>
            )}

            {/* Current Streak */}
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-muted mb-1">Current Streak</Text>
              <Text className="text-3xl font-bold text-success">{stats.currentStreak} days</Text>
            </View>
          </View>

          {/* Exercise Breakdown */}
          {stats.totalWorkouts > 0 && (
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">Exercise Breakdown</Text>
              <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                {(Object.keys(EXERCISE_TYPES) as (keyof typeof EXERCISE_TYPES)[]).map((type) => {
                  const count = stats.exerciseBreakdown[type];
                  const percentage =
                    stats.totalWorkouts > 0
                      ? Math.round((count / stats.totalWorkouts) * 100)
                      : 0;

                  return (
                    <View key={type}>
                      <View className="flex-row justify-between mb-1">
                        <Text className="text-sm font-semibold text-foreground">
                          {EXERCISE_TYPES[type]}
                        </Text>
                        <Text className="text-sm text-muted">
                          {count} ({percentage}%)
                        </Text>
                      </View>
                      <View className="h-2 bg-border rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Empty State */}
          {stats.totalWorkouts === 0 && (
            <View className="items-center gap-3 py-8">
              <Text className="text-lg font-semibold text-foreground">No data yet</Text>
              <Text className="text-sm text-muted text-center">
                Start logging workouts to see your progress
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
