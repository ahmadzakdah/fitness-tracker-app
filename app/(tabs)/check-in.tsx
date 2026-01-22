/**
 * Check-in Screen
 */

import { ScrollView, Text, View, Pressable, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFitness } from "@/lib/fitness-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { MoodLevel, EnergyLevel, MOOD_EMOJIS, ENERGY_LABELS } from "@/lib/types";

export default function CheckInScreen() {
  const router = useRouter();
  const { addCheckIn } = useFitness();

  const [mood, setMood] = useState<MoodLevel>(3);
  const [energy, setEnergy] = useState<EnergyLevel>("medium");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await addCheckIn({
        mood,
        energy,
        notes,
        timestamp: Date.now(),
      });

      Alert.alert("Success", "Check-in saved successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save check-in");
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
            <Text className="text-3xl font-bold text-foreground">Daily Check-in</Text>
            <Text className="text-sm text-muted">How are you feeling today?</Text>
          </View>

          {/* Mood */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Mood</Text>
            <View className="flex-row justify-between gap-2">
              {([1, 2, 3, 4, 5] as MoodLevel[]).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setMood(level)}
                  style={({ pressed }) => [pressed && { transform: [{ scale: 0.9 }] }]}
                  className={`flex-1 p-3 rounded-lg border items-center justify-center ${
                    mood === level ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                >
                  <Text className="text-3xl">{MOOD_EMOJIS[level]}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Energy Level */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Energy Level</Text>
            <View className="gap-2">
              {(["low", "medium", "high"] as EnergyLevel[]).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setEnergy(level)}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                  className={`p-3 rounded-lg border ${
                    energy === level
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      energy === level ? "text-white" : "text-foreground"
                    }`}
                  >
                    {ENERGY_LABELS[level]}
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
              placeholder="Any thoughts or observations?"
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              className="bg-surface border border-border rounded-lg p-3 text-foreground"
            />
          </View>

          {/* Actions */}
          <View className="gap-3 mt-6">
            <Pressable
              onPress={handleSave}
              disabled={loading}
              style={({ pressed }) => [pressed && { transform: [{ scale: 0.97 }] }]}
              className="bg-primary rounded-lg p-4"
            >
              <Text className="text-center text-white font-semibold text-base">
                {loading ? "Saving..." : "Save Check-in"}
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
