/**
 * Progress Ring Component
 * Displays a circular progress indicator
 */

import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface ProgressRingProps {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
  label?: string;
  value?: string;
  color?: string;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  label,
  value,
  color,
}: ProgressRingProps) {
  const colors = useColors();
  const ringColor = color || colors.primary;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      {/* SVG-like circle using View and border */}
      <View
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: strokeWidth,
          borderColor: colors.border,
        }}
      />

      {/* Progress circle (simplified with View rotation) */}
      <View
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: strokeWidth,
          borderColor: ringColor,
          borderTopColor: ringColor,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          transform: [{ rotate: `${progress * 360}deg` }],
        }}
      />

      {/* Center content */}
      <View className="items-center justify-center">
        {value && (
          <Text className="text-2xl font-bold text-foreground">{value}</Text>
        )}
        {label && (
          <Text className="text-xs text-muted mt-1">{label}</Text>
        )}
      </View>
    </View>
  );
}
