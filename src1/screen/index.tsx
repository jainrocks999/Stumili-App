// Example usage: App.tsx or any parent component
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  
  Alert,
} from 'react-native';
import ActionSheet, { ActionSheetOption } from '../components/actionsheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageUploadScreen from './uploadScreen';
import GoalModal from './GoalModa';

const App: React.FC = () => {
  const [actionSheetVisible, setActionSheetVisible] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const cameraOptions: ActionSheetOption[] = [
    {
      label: 'Take Photo',
      icon: '📷',
      value: 'camera',
    },
    {
      label: 'Choose from Gallery',
      icon: '🖼️',
      value: 'gallery',
    },
   
  ];

  const showActionSheet = () => {
    setActionSheetVisible(true);
  };

  const handleClose = () => {
    setActionSheetVisible(false);
  };

  const handleOptionPress = (value: string) => {
    setSelectedOption(value);
    Alert.alert('Option Selected', `You selected: ${value}`);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };


  return (
    <SafeAreaView style={[styles.container, darkTheme && styles.darkContainer]}>
    
    <GoalModal
        visible={false}
        onClose={() => {}}
        onSave={()=>{}}
        initialGoal={null} 
      />
      <ActionSheet
        visible={false}
        onClose={handleClose}
        options={cameraOptions}
        title="Upload Photo"
        cancelText="Cancel"
        destructiveIndex={3}
        theme={darkTheme ? 'dark' : 'light'}
        onOptionPress={handleOptionPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  darkSubtitle: {
    color: '#98989f',
  },
  selectedContainer: {
    backgroundColor: '#e8f4ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  selectedText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#5856d6',
  },
  destructiveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  destructiveButtonText: {
    color: '#ff3b30',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default App;