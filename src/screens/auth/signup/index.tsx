import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Reuse your components/assets
import AuthBackground from '@components/AuthBackgound';
import AppTextInput from '@components/AppTextInput';
import CommonButton from '@components/CommonButton';
import { Fonts, FontSize } from '@constants';

import EmailIcon from '@assets/svg/email.svg';
import LockIcon from '@assets/svg/lock.svg';
import Eye from '@assets/svg/eye.svg'; // optional, if you have
import EyeOff from '@assets/svg/eye-off.svg'; // optional, if you have
import AlertIcon from '@assets/svg/AlertIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'src/context/AuthContext';
import { useToast } from '@components/ToastProvider';

const COLORS = {
  text: '#111111',
  subtext: '#6B7280',
  accent: '#F97316',
  bg: '#FFFFFF',
  inputBg: '#F4F4F5',
  border: '#E5E7EB',
  error: '#EF4444',
  errorBg: '#FEE2E2',
  black: '#0B0B0B',
};

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const navigation: any = useNavigation();
  const [error, setError] = useState('');

  const isMismatch = useMemo(
    () => confirm.length > 0 && password !== confirm,
    [password, confirm],
  );

  const doRegister = async () => {
    if (!name.trim()) {
      return setError('Please enter your name');
    }
    if (!email.trim()) {
      return setError('Please enter email');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return setError('Please enter a valid email');
    }
    if (!password.trim()) {
      return setError('Please enter password');
    }

    const passRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passRegex.test(password)) {
      return setError(
        'Password must contain 6+ characters, 1 number & 1 special character',
      );
    }
    if (!confirm) {
      return setError('Please enter confirm password');
    }
    if (password.trim() !== confirm.trim()) {
      return setError("Password dosen't match");
    }
    setLoading(true);

    try {
      const res = await register({ name, email, password });

      showToast('Registration successful!', 'success');
    navigation.goBack()

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <AuthBackground />
      {/* soft white fade over hero to match mock */}
      <View style={styles.heroFade} />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 96, paddingBottom: insets.bottom + 32 },
        ]}
      >
        <Text style={styles.title}>Sign Up For Free</Text>
        <Text style={styles.subtitle}>
          Quickly make your account in 1 minute
        </Text>

        <View style={{ marginTop: 28, gap: 14 }}>
          <AppTextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="john smith"
            keyboardType="default"
            // LeftIcon={() => <EmailIcon />}
          />
          <AppTextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="elementary221b@gmail.com"
            keyboardType="email-address"
            LeftIcon={() => <EmailIcon />}
          />

          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="*************"
            secureTextEntry={true}
            LeftIcon={() => <LockIcon />}
          />

          <View>
            <AppTextInput
              label="Confirm Password"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="*************"
              secureTextEntry={true}
              LeftIcon={() => <LockIcon />}
              // style={[
              //   error && {
              //     borderColor: COLORS.error,
              //     backgroundColor: COLORS.bg,
              //   },
              // ]}
            />
            {error && (
              <View style={styles.errorCard}>
                <AlertIcon width={18} height={18} />
                <Text numberOfLines={2} style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
        </View>

        {/* CTA */}
        <CommonButton
          loading={loading}
          title="Sign Up"
          onPress={() => {
            setError("")
            doRegister();
            // navigation.navigate('ResetPassword');
          }}
          style={[styles.cta]}
        />

        {/* Footer links */}
        <Pressable onPress={()=>{navigation.goBack()}} style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.link}>Sign In.</Text>
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const RADIUS = 16;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingHorizontal: 20 },
  heroFade: {
    ...StyleSheet.absoluteFillObject,
    // white gradient-ish fade from mid to bottom
    // simple fallback block to keep it light at bottom
    backgroundColor: '#FFFFFFCC',
    top: '40%',
  },
  title: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.FOURTEEN,
    color: COLORS.subtext,
    textAlign: 'center',
    marginTop: 8,
  },
  errorCard: {
    marginTop: 8,
    borderRadius: RADIUS,
    backgroundColor: COLORS.errorBg,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    color: COLORS.error,
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: 13,
    width:'95%'
  },
  cta: {
    marginTop: 22,
    height: 56,
    borderRadius: 20,
  },
  footer: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.subtext,
    fontFamily: 'WorkSans-Medium',
    fontSize: 13,
  },
  link: {
    color: COLORS.accent,
    textDecorationLine: 'underline',
    fontFamily: 'WorkSans-SemiBold',
  },
});
