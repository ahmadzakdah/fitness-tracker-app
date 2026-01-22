/**
 * Workouts Screen - List of all logged workouts
 */

import { ScrollView, Text, View, Pressable, FlatList, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFitness } from "@/lib/fitness-context";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Workout, ExerciseType, EXERCISE_TYPES } from "@/lib/types";
import { WorkoutCard } from "@/components/workout-card";

export default function WorkoutsScreen() {
  const router = useRouter();
  const { workouts, deleteWorkout } = useFitness();
  const [selectedFilter, setSelectedFilter] = useState<ExerciseType | "all">("all");
  const [sortedWorkouts, setSortedWorkouts] = useState<Workout[]>([]);

  useFocusEffect(
    useCallback(() => {
      // Sort workouts by date (newest first)
      const sorted = [...workouts].sort((a, b) => b.timestamp - a.timestamp);

      // Filter by exercise type if selected
      if (selectedFilter !== "all") {
        setSortedWorkouts(sorted.filter((w) => w.exerciseType === selectedFilter));
      } else {
        setSortedWorkouts(sorted);
      }
    }, [workouts, selectedFilter])
  );

  const handleDelete = (id: string) => {
    Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteWorkout(id);
          } catch (error) {
            Alert.alert("Error", "Failed to delete workout");
          }
        },
      },
    ]);
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4 border-b border-border">
          <View className="gap-2 mb-4">
            <Text className="text-3xl font-bold text-foreground">Workouts</Text>
            <Text className="text-sm text-muted">{sortedWorkouts.length} logged</Text>
          </View>

          {/* Filter Buttons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
            <Pressable
              onPress={() => setSelectedFilter("all")}
              style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              className={`px-4 py-2 rounded-full border ${
                selectedFilter === "all"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  selectedFilter === "all" ? "text-white" : "text-foreground"
                }`}
              >
                All
              </Text>
            </Pressable>

            {(Object.keys(EXERCISE_TYPES) as ExerciseType[]).map((type) => (
              <Pressable
                key={type}
                onPress={() => setSelectedFilter(type)}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                className={`px-4 py-2 rounded-full border ${
                  selectedFilter === type
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedFilter === type ? "text-white" : "text-foreground"
                  }`}
                >
                  {EXERCISE_TYPES[type]}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Workouts List */}
        {sortedWorkouts.length > 0 ? (
          <FlatList
            data={sortedWorkouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <WorkoutCard
                workout={item}
                onDelete={() => handleDelete(item.id)}
              />
            )}
            contentContainerStyle={{ padding: 24, gap: 12 }}
            scrollEnabled={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-lg font-semibold text-foreground mb-2">No workouts</Text>
            <Text className="text-sm text-muted text-center mb-6">
              {selectedFilter === "all"
                ? "Start logging workouts to see them here"
                : `No ${EXERCISE_TYPES[selectedFilter]} workouts yet`}
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/log-workout")}
              style={({ pressed }) => [pressed && { transform: [{ scale: 0.97 }] }]}
              className="bg-primary rounded-lg px-6 py-3"
            >
              <Text className="text-white font-semibold">Log Your First Workout</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
