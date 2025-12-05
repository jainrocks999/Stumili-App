import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, View, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  RightIcon?: any;  // Ionicons name, e.g. 'arrow-forward-outline'
  style?: ViewStyle;
  variant?: 'primary' | 'outline';
};

const COLORS = {
  primary: '#111111',
  white: '#FFFFFF',
  border: '#E5E7EB',
};

export default function CommonButton({
  title,
  onPress,
  loading,
  disabled,
  RightIcon,
  style,
  variant = 'primary',
}: Props) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
    activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        isPrimary ? styles.btnPrimary : styles.btnOutline,
        disabled || loading ? { opacity: 0.6 } : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textOutline]}>
            {title}
          </Text>
          {RightIcon ? (
            <View style={{marginLeft:5}}>
             <RightIcon/>
             </View>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
    
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold',
  },
  textPrimary: { color: COLORS.white },
  textOutline: { color: COLORS.primary },
});
