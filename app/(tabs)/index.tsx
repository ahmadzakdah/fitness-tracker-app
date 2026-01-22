/**
 * Home Screen - Daily Fitness Summary
 */

import { ScrollView, Text, View, Pressable, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFitness } from "@/lib/fitness-context";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Workout, CheckIn } from "@/lib/types";
import { getDailySummary, getTodayStart, getTodayEnd, formatDate } from "@/lib/fitness-utils";
import { ProgressRing } from "@/components/progress-ring";
import { WorkoutCard } from "@/components/workout-card";

export default function HomeScreen() {
  const router = useRouter();
  const { workouts, checkIns, dailyGoal, addCheckIn } = useFitness();
  const [todayWorkouts, setTodayWorkouts] = useState<Workout[]>([]);
  const [todayCheckIn, setTodayCheckIn] = useState<CheckIn | null>(null);

  useEffect(() => {
    // Get today's workouts
    const today = new Date();
    const todayStart = getTodayStart();
    const todayEnd = getTodayEnd();

    const filtered = workouts.filter(
      (w) => w.timestamp >= todayStart.getTime() && w.timestamp <= todayEnd.getTime()
    );
    setTodayWorkouts(filtered);

    // Get today's check-in
    const checkIn = checkIns.find(
      (c) => c.timestamp >= todayStart.getTime() && c.timestamp <= todayEnd.getTime()
    );
    setTodayCheckIn(checkIn || null);
  }, [workouts, checkIns]);

  const dailySummary = getDailySummary(todayWorkouts);
  const progressPercent = Math.min(dailySummary.totalMinutes / dailyGoal.targetMinutes, 1);

  const handleQuickCheckIn = async () => {
    if (todayCheckIn) {
      Alert.alert("Check-in", "You already checked in today");
      return;
    }
    router.push("/check-in");
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Today</Text>
            <Text className="text-sm text-muted">{formatDate(Date.now())}</Text>
          </View>

          {/* Daily Goal Progress */}
          <View className="items-center gap-4">
            <ProgressRing
              progress={progressPercent}
              size={140}
              strokeWidth={10}
              value={`${dailySummary.totalMinutes}m`}
              label={`of ${dailyGoal.targetMinutes}m`}
            />
            <Text className="text-sm text-muted text-center">
              {dailySummary.totalCalories} calories burned
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Pressable
              onPress={() => router.push("/log-workout")}
              style={({ pressed }) => [pressed && { transform: [{ scale: 0.97 }] }]}
              className="bg-primary rounded-lg p-4"
            >
              <Text className="text-center text-white font-semibold text-base">Log Workout</Text>
            </Pressable>

            <Pressable
              onPress={handleQuickCheckIn}
              style={({ pressed }) => [pressed && { transform: [{ scale: 0.97 }] }]}
              className="bg-surface border border-border rounded-lg p-4"
            >
              <Text className="text-center text-foreground font-semibold text-base">
                {todayCheckIn ? "✓ Check-in Done" : "Quick Check-in"}
              </Text>
            </Pressable>
          </View>

          {/* Today's Workouts */}
          {todayWorkouts.length > 0 && (
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">Today's Workouts</Text>
              {todayWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </View>
          )}

          {/* Empty State */}
          {todayWorkouts.length === 0 && (
            <View className="items-center gap-3 py-8">
              <Text className="text-lg font-semibold text-foreground">No workouts yet</Text>
              <Text className="text-sm text-muted text-center">
                Log your first workout to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
