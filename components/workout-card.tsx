/**
 * Workout Card Component
 * Displays a single workout entry
 */

import { View, Text, Pressable } from "react-native";
import { Workout, EXERCISE_TYPES, INTENSITY_COLORS, INTENSITY_LABELS } from "@/lib/types";
import { formatDate, formatTime, formatDuration } from "@/lib/fitness-utils";
import { cn } from "@/lib/utils";

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
  onDelete?: () => void;
}

export function WorkoutCard({ workout, onPress, onDelete }: WorkoutCardProps) {
  const intensityColor = INTENSITY_COLORS[workout.intensity];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      className="mb-3"
    >
      <View className="bg-surface rounded-lg p-4 border border-border">
        {/* Header with exercise type and intensity */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-lg font-semibold text-foreground">
            {EXERCISE_TYPES[workout.exerciseType]}
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: intensityColor + "20" }}
          >
            <Text className="text-xs font-semibold" style={{ color: intensityColor }}>
              {INTENSITY_LABELS[workout.intensity]}
            </Text>
          </View>
        </View>

        {/* Workout details */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-1">
            <Text className="text-sm text-muted mb-1">Duration</Text>
            <Text className="text-base font-semibold text-foreground">
              {formatDuration(workout.duration)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-muted mb-1">Calories</Text>
            <Text className="text-base font-semibold text-foreground">{workout.calories}</Text>
          </View>
        </View>

        {/* Date and time */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xs text-muted">{formatDate(workout.timestamp)}</Text>
          <Text className="text-xs text-muted">{formatTime(workout.timestamp)}</Text>
        </View>

        {/* Notes if present */}
        {workout.notes && (
          <View className="mt-3 pt-3 border-t border-border">
            <Text className="text-sm text-muted italic">{workout.notes}</Text>
          </View>
        )}

        {/* Delete button if provided */}
        {onDelete && (
          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
            className="mt-3 pt-3 border-t border-border"
          >
            <Text className="text-sm font-semibold text-error">Delete</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
