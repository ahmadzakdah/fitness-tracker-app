/**
 * Settings Screen
 */

import { ScrollView, Text, View, Pressable, TextInput, Alert, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFitness } from "@/lib/fitness-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState, useEffect } from "react";
import { useColors } from "@/hooks/use-colors";
import { clearAllData } from "@/lib/storage";

export default function SettingsScreen() {
  const { dailyGoal, setDailyGoal } = useFitness();
  const colorScheme = useColorScheme();
  const colors = useColors();

  const [targetMinutes, setTargetMinutes] = useState(dailyGoal.targetMinutes.toString());
  const [targetCalories, setTargetCalories] = useState(dailyGoal.targetCalories.toString());
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");

  const handleSaveGoals = async () => {
    const minutes = parseInt(targetMinutes);
    const calories = parseInt(targetCalories);

    if (minutes <= 0 || calories <= 0) {
      Alert.alert("Error", "Please enter valid positive numbers");
      return;
    }

    try {
      await setDailyGoal({
        targetMinutes: minutes,
        targetCalories: calories,
      });
      Alert.alert("Success", "Daily goals updated");
    } catch (error) {
      Alert.alert("Error", "Failed to save goals");
    }
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will delete all your workouts and check-ins. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert("Success", "All data cleared");
              // Refresh the app by reloading
              window.location.reload?.();
            } catch (error) {
              Alert.alert("Error", "Failed to clear data");
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Settings</Text>
            <Text className="text-sm text-muted">Customize your fitness tracker</Text>
          </View>

          {/* Daily Goals */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Daily Goals</Text>

            <View className="gap-3">
              <View>
                <Text className="text-sm text-muted mb-2">Target Minutes per Day</Text>
                <TextInput
                  value={targetMinutes}
                  onChangeText={setTargetMinutes}
                  placeholder="30"
                  keyboardType="number-pad"
                  className="bg-surface border border-border rounded-lg p-3 text-foreground"
                />
              </View>

              <View>
                <Text className="text-sm text-muted mb-2">Target Calories per Day</Text>
                <TextInput
                  value={targetCalories}
                  onChangeText={setTargetCalories}
                  placeholder="500"
                  keyboardType="number-pad"
                  className="bg-surface border border-border rounded-lg p-3 text-foreground"
                />
              </View>

              <Pressable
                onPress={handleSaveGoals}
                style={({ pressed }) => [pressed && { transform: [{ scale: 0.97 }] }]}
                className="bg-primary rounded-lg p-3"
              >
                <Text className="text-center text-white font-semibold">Save Goals</Text>
              </Pressable>
            </View>
          </View>

          {/* Appearance */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Appearance</Text>
            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <Text className="text-foreground font-semibold">Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={darkMode ? colors.primary : colors.muted}
              />
            </View>
          </View>

          {/* About */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">About</Text>
            <View className="bg-surface rounded-lg p-4 border border-border">
              <View className="flex-row justify-between mb-3">
                <Text className="text-sm text-muted">App Version</Text>
                <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Built with</Text>
                <Text className="text-sm font-semibold text-foreground">React Native</Text>
              </View>
            </View>
          </View>

          {/* Danger Zone */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-error">Danger Zone</Text>
            <Pressable
              onPress={handleClearData}
              style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              className="bg-error/10 border border-error rounded-lg p-4"
            >
              <Text className="text-center text-error font-semibold">Clear All Data</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
