import { useToast } from '@components/ToastProvider';
import { Fonts, FontSize } from '@constants';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GoalModal({
  visible,
  onClose,
  onSave,
  initialGoal,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialGoal: any;
}) {
  const [goalName, setGoalName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    if (initialGoal&&visible) {
      setGoalName(initialGoal.goalType || '');
      setCalories(String(initialGoal.dailyCalories));
      setProtein(String(initialGoal.macros.protein));
      setCarbs(String(initialGoal.macros.carbs));
      setFats(String(initialGoal.macros.fats));
    } else {
      setGoalName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    }
  }, [initialGoal]);

  const handleSave = () => {
    // ----- VALIDATION -----

    if (!goalName.trim()) {
      showToast('Please enter a goal name', 'warning');
      return;
    }

    if (!calories || Number(calories) <= 0) {
      showToast('Please enter valid daily calories', 'warning');
      return;
    }

    if (!protein || !carbs || !fats) {
      showToast('Please fill all macro fields', 'warning');
      return;
    }

    const p = Number(protein);
    const c = Number(carbs);
    const f = Number(fats);

    if (p < 0 || c < 0 || f < 0 || p > 100 || c > 100 || f > 100) {
      showToast('Macros must be between 0% and 100%', 'warning');
      return;
    }

    // if (p + c + f !== 100) {
    //   showToast('Protein + Carbs + Fats total must equal 100%', 'warning');
    //   return;
    // }

    const payload = {
      goalType: goalName,
      dailyCalories: Number(calories),
      macros: {
        protein: p,
        carbs: c,
        fats: f,
      },
      source: 'manual',
      goalId:initialGoal?.["_id"]??false    };

    onSave(payload);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {initialGoal ? 'Update Goal' : 'Create Goal'}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Goal Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Weight Loss, Maintenance"
            placeholderTextColor="#9CA3AF"
            value={goalName}
            onChangeText={setGoalName}
          />

          <Text style={styles.label}>Daily Calories</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            placeholder="Enter calories"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>
            Macro Breakdown (%)
          </Text>

          <View style={styles.row}>
            <View style={styles.miniBox}>
              <Text style={styles.miniLabel}>Protein</Text>
              <TextInput
                style={styles.miniInput}
                placeholderTextColor="#9CA3AF"
                placeholder="e.g. 20%"
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein}
              />
            </View>

            <View style={styles.miniBox}>
              <Text style={styles.miniLabel}>Carbs</Text>
              <TextInput
                style={styles.miniInput}
                placeholderTextColor="#9CA3AF"
                placeholder="e.g. 50%"
                keyboardType="numeric"
                value={carbs}
                onChangeText={setCarbs}
              />
            </View>

            <View style={styles.miniBox}>
              <Text style={styles.miniLabel}>Fats</Text>
              <TextInput
                style={styles.miniInput}
                placeholderTextColor="#9CA3AF"
                placeholder="e.g. 30%"
                keyboardType="numeric"
                value={fats}
                onChangeText={setFats}
              />
            </View>
          </View>

          {/* Save Button */}
          <LinearGradient
            colors={['#2563EB', '#3B82F6']}
            style={styles.saveBtn}
          >
            <TouchableOpacity onPress={handleSave} style={{ width: '100%' }}>
              <Text style={styles.saveText}>
                {initialGoal ? 'Update Goal' : 'Save Goal'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  headerStrip: {
    height: 5,
    borderRadius: 20,
    marginHorizontal: -20,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  close: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    // fontWeight: '700',
    color: '#1F2937',
    fontFamily: Fonts.WorkSans.SemiBold,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginTop: 12,
    marginBottom: 2,
    fontWeight: '600',
    fontFamily: Fonts.WorkSans.SemiBold,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#111827',
    fontFamily: Fonts.WorkSans.Regular,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  miniBox: {
    width: '32%',
  },
  miniLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 3,
    fontFamily: Fonts.WorkSans.Medium,
    marginLeft: 5,
  },
  miniInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    textAlign: 'center',
    fontSize: FontSize.THIRTEEN,
    color: '#111827',
    fontFamily: Fonts.WorkSans.Medium,
  },
  saveBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#FFFFFF',
    // fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.WorkSans.SemiBold,
  },
  cancelBtn: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelText: {
    textAlign: 'center',
    color: '#374151',
    // fontWeight: '600',
    fontSize: 15,
    fontFamily: Fonts.WorkSans.SemiBold,
  },
});
