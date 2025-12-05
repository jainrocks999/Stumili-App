import React, { useState, useMemo } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import EyeCut from '@assets/svg/EyeCut.svg'
import EyeShow from '@assets/svg/EyeShow.svg'

type Props = {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  secureTextEntry?: boolean;
  LeftIcon?: React.ComponentType<any>;
  style?: any;
  onFocus?:()=>void
  style1?:any
};

const COLORS = {
  text: '#111111',
  subtext: '#6B7280',
  inputBg: '#F4F4F5',
  border: '#E5E7EB',
  focus: '#F97316', // base accent
  focusTint: '#F9731640', // 25% tint for ring bg
  placeholder: '#9CA3AF',
};

export default function AppTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry,
  LeftIcon,
  style,
  style1,
  onFocus=()=>{}
}: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secureTextEntry);

  const containerStyle = useMemo(
    () => [
      styles.inputWrap,
      { borderColor: focused ? COLORS.focus : 'transparent' },
      style,
    ],
    [focused, style],
  );

  return (
    <View style={[{ width: '100%', },style1]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      {/* Focus ring wrapper */}
      <View
        style={[
          styles.ringWrap,
          { backgroundColor: focused ? COLORS.focusTint : 'transparent',borderRadius:focused?14:0 },
        ]}
      >
        <View style={containerStyle}>
          {LeftIcon ? (
            <View style={styles.iconWrap}>
              <LeftIcon />
            </View>
          ) : null}

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.placeholder}
            keyboardType={keyboardType}
            secureTextEntry={hidden}
            onFocus={() =>{ setFocused(true);onFocus()}}
            onBlur={() => {setFocused(false)}}
            selectionColor={COLORS.focus}
            autoCapitalize="none"
            returnKeyType="done"
            style={styles.input}
          />

          {secureTextEntry ? (
            <Pressable
              onPress={() => setHidden(!hidden)}
              hitSlop={10}
              style={styles.eyeBtn}
            >
            {!hidden?<EyeCut/>:<EyeShow/>}
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'WorkSans-SemiBold',
    color: '#111111',
    marginBottom: 8,
    fontSize: 14,
  },
  ringWrap: {
   
    padding: 2, // space for focus ring tint
    overflow:'hidden'
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    borderWidth: 1.5,
    height: 56,
    paddingHorizontal: 14,
    overflow:'hidden'
  },
  iconWrap: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    paddingVertical: 12, // avoids clipping on Android
  },
  eyeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  eyeText: {
    color: '#9CA3AF',
    fontFamily: 'WorkSans-Medium',
    fontSize: 12,
  },
});
