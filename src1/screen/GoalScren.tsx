// GoalScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

interface Macro {
  protein: number;
  carbs: number;
  fats: number;
}

interface Goal {
  _id: string;
  goalType: string;
  dailyCalories: number;
  macros: Macro;
  isActive: boolean;
}

const API_URL = "http://YOUR_BACKEND_URL"; // replace with your backend

const GoalScreen = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalType, setGoalType] = useState("");
  const [dailyCalories, setDailyCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`${API_URL}/goal/list`);
      setGoals(res.data.goals);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const createGoal = async () => {
    try {
      const res = await axios.post(`${API_URL}/goal`, {
        goalType,
        dailyCalories: Number(dailyCalories),
        macros: {
          protein: Number(protein),
          carbs: Number(carbs),
          fats: Number(fats),
        },
        source: "user",
      });
      Alert.alert("Success", "Goal created successfully");
      fetchGoals();
      // reset form
      setGoalType("");
      setDailyCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.error || "Something went wrong");
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      await axios.delete(`${API_URL}/goal/${goalId}`);
      Alert.alert("Deleted", "Goal deleted successfully");
      fetchGoals();
    } catch (err) {
      console.error(err);
    }
  };

  const renderGoal = ({ item }: { item: Goal }) => (
    <View style={styles.goalItem}>
      <Text style={{ fontWeight: "bold" }}>{item.goalType} {item.isActive && "(Active)"}</Text>
      <Text>Calories: {item.dailyCalories}</Text>
      <Text>Protein: {item.macros.protein}%, Carbs: {item.macros.carbs}%, Fats: {item.macros.fats}%</Text>
      <Button title="Delete" color="red" onPress={() => deleteGoal(item._id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create / Update Goal</Text>
      <TextInput placeholder="Goal Type" value={goalType} onChangeText={setGoalType} style={styles.input} />
      <TextInput placeholder="Daily Calories" value={dailyCalories} onChangeText={setDailyCalories} style={styles.input} keyboardType="numeric"/>
      <TextInput placeholder="Protein %" value={protein} onChangeText={setProtein} style={styles.input} keyboardType="numeric"/>
      <TextInput placeholder="Carbs %" value={carbs} onChangeText={setCarbs} style={styles.input} keyboardType="numeric"/>
      <TextInput placeholder="Fats %" value={fats} onChangeText={setFats} style={styles.input} keyboardType="numeric"/>
      <Button title="Save Goal" onPress={createGoal} />

      <Text style={[styles.heading, { marginTop: 20 }]}>Your Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item._id}
        renderItem={renderGoal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  goalItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginVertical: 6,
  },
});

export default GoalScreen;
