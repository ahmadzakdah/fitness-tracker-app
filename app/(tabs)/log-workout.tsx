/**
 * Log Workout Screen
 */

import { ScrollView, Text, View, Pressable, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFitness } from "@/lib/fitness-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ExerciseType, IntensityLevel, EXERCISE_TYPES, INTENSITY_LABELS } from "@/lib/types";
import { calculateCalories } from "@/lib/fitness-utils";

export default function LogWorkoutScreen() {
  const router = useRouter();
  const { addWorkout } = useFitness();

  const [exerciseType, setExerciseType] = useState<ExerciseType>("cardio");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState<IntensityLevel>("moderate");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!duration || parseInt(duration) <= 0) {
      Alert.alert("Error", "Please enter a valid duration");
      return;
    }

    try {
      setLoading(true);
      const durationNum = parseInt(duration);
      const calories = calculateCalories(exerciseType, intensity, durationNum);

      await addWorkout({
        exerciseType,
        duration: durationNum,
        intensity,
        calories,
        notes,
        timestamp: Date.now(),
      });

      Alert.alert("Success", "Workout logged successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to log workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Log Workout</Text>
            <Text className="text-sm text-muted">Record your exercise</Text>
          </View>

          {/* Exercise Type */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Exercise Type</Text>
            <View className="gap-2">
              {(Object.keys(EXERCISE_TYPES) as ExerciseType[]).map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setExerciseType(type)}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                  className={`p-3 rounded-lg border ${
                    exerciseType === type
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      exerciseType === type ? "text-white" : "text-foreground"
                    }`}
                  >
                    {EXERCISE_TYPES[type]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Duration */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Duration (minutes)</Text>
            <TextInput
              value={duration}
              onChangeText={setDuration}
              placeholder="30"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
            />
          </View>

          {/* Intensity */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Intensity</Text>
            <View className="flex-row gap-2">
              {(Object.keys(INTENSITY_LABELS) as IntensityLevel[]).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setIntensity(level)}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                  className={`flex-1 p-3 rounded-lg border ${
                    intensity === level
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-center font-semibold text-sm ${
                      intensity === level ? "text-white" : "text-foreground"
                    }`}
                  >
                    {INTENSITY_LABELS[level]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Notes (optional)</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="How did it feel?"
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
            />
          </View>

          {/* Estimated Calories */}
          {duration && (
            <View className="bg-surface border border-border rounded-lg p-4">
              <Text className="text-sm text-muted mb-1">Estimated Calories</Text>
              <Text className="text-2xl font-bold text-foreground">
                {calculateCalories(exerciseType, intensity, parseInt(duration))}
              </Text>
            </View>
          )}

          {/* Actions */}
          <View className="gap-3 mt-6">
            <Pressable
              onPress={handleSave}
              disabled={loading}
              style={({ pressed }) => [pressed && { transform: [{ scale: 0.97 }] }]}
              className="bg-primary rounded-lg p-4"
            >
              <Text className="text-center text-white font-semibold text-base">
                {loading ? "Saving..." : "Save Workout"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              className="bg-surface border border-border rounded-lg p-4"
            >
              <Text className="text-center text-foreground font-semibold text-base">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
