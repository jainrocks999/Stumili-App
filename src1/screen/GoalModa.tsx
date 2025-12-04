import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function GoalModal({ visible, onClose, onSave, initialGoal }:any) {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  useEffect(() => {
    if (initialGoal) {
      setCalories(String(initialGoal.calories));
      setProtein(String(initialGoal.protein));
      setCarbs(String(initialGoal.carbs));
      setFats(String(initialGoal.fats));
    } else {
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
    }
  }, [initialGoal]);

  const handleSave = () => {
    onSave({
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{initialGoal ? "Update Goal" : "Create Goal"}</Text>

          <TextInput
            style={styles.input}
            placeholder="Calories"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />

          <TextInput
            style={styles.input}
            placeholder="Protein (%)"
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />

          <TextInput
            style={styles.input}
            placeholder="Carbs (%)"
            keyboardType="numeric"
            value={carbs}
            onChangeText={setCarbs}
          />

          <TextInput
            style={styles.input}
            placeholder="Fats (%)"
            keyboardType="numeric"
            value={fats}
            onChangeText={setFats}
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>
                {initialGoal ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    padding: 12,
    width: "48%",
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    width: "48%",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: { color: "#000" },
  saveText: { color: "#fff", fontWeight: "700" },
});
