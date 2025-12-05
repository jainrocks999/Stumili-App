import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function CustomModal({ visible, onClose, title = 'Modal Title', children }: Props) {
  if (!visible) return null; // Don't render if not visible

  return (
    <View style={styles.overlay}>
     {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width,
    // height,
    top:0,
    right:0,
    left:0,
    bottom:0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 175, 90, 0.8)', 
    zIndex: 999,
  
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 10, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  content: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#7B3AED',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
