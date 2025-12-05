import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '@components/AppTextInput';
import CommonButton from '@components/CommonButton';
import AuthBackground from '@components/AuthBackgound';
import { Fonts, FontSize } from '@constants';
import EmailIcon from '@assets/svg/email.svg';
import LockIcon from '@assets/svg/lock.svg';
import ArrowRight from '@assets/svg/ArrowRightWith.svg';
import Instagram from '@assets/svg/Instagram.svg';
import FaceBook from '@assets/svg/Facebook.svg';
import Lindine from '@assets/svg/LinkDine.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'src/context/AuthContext';
import AlertIcon from '@assets/svg/AlertIcon.svg';
import { useToast } from '@components/ToastProvider';
const COLORS = {
  text: '#111111',
  subtext: '#6B7280',
  accent: '#F97316',
  error: '#EF4444',
  errorBg: '#FEE2E2',
};

const SignInScreen = () => {
  const { showToast } = useToast();

  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation: any = useNavigation();
  const [error, setError] = useState('');
  const doLogin = async () => {
    try {
      setLoading(true);
      if (!email.trim()) {
        setError('email is requried');
        return;
      }
      if (!password.trim()) {
        setError('password is required');
        return;
      }
      await login(email.trim(), password.trim());
      showToast('Login Success!');
      setError('');
      navigation.reset({ index: 0, routes: [{ name: 'App' }] });
    } catch (errr: any) {
      setError(errr.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <AuthBackground />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 100, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={24} // lifts fields a bit more
        extraHeight={24}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.title}>Sign In To Sandow</Text>
        <Text style={styles.subtitle}>
          Let’s personalize your fitness with AI
        </Text>

        <View style={{ marginTop: 30, gap: 15 }}>
          <AppTextInput
            onFocus={() => {
              setError('');
            }}
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="elementary221b@gmail.co"
            keyboardType="email-address"
            LeftIcon={() => <EmailIcon />}
          />
          <AppTextInput
            onFocus={() => {
              setError('');
            }}
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="*************"
            secureTextEntry
            LeftIcon={() => <LockIcon />}
          />
        </View>
        {error && (
          <View style={styles.errorCard}>
            <AlertIcon width={18} height={18} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <CommonButton
          title="Sign In"
          loading={loading}
          RightIcon={() => <ArrowRight height={25} width={25} />}
          onPress={() => {
            doLogin();
            // navigation.replace('SignUp');
          }}
          style={{ marginTop: 22 }}
        />

        <View style={styles.socialRow}>
          {[Instagram, FaceBook, Lindine].map((Icon, i) => (
            <Pressable key={i} style={styles.socialBtn}>
              <Icon height={25} width={25} />
            </Pressable>
          ))}
        </View>

        <Pressable disabled  style={styles.linksWrap}>
          {/* https://video.xmaal.net/khidki/ */}
          <Text onPress={()=>{
           navigation.navigate('SignUp');
        }} style={styles.smallText}>
            Don’t have an account?{' '}
            <Text style={[styles.smallText, styles.link]}>Sign Up.</Text>
          </Text>
          <Text onPress={()=>{
            navigation.navigate("ResetPassword")
          }} style={[styles.smallText, styles.link, { marginTop: 8 }]}>
            Forgot Password
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20 },
  title: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 52,
  },
  subtitle: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.FOURTEEN,
    color: COLORS.subtext,
    textAlign: 'center',
    marginTop: 8,
  },
  socialRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  linksWrap: {
    marginTop: 22,
    alignItems: 'center',
  },
  smallText: {
    color: COLORS.subtext,
    fontFamily: 'WorkSans-Medium',
    fontSize: 13,
  },
  link: {
    color: COLORS.accent,
    textDecorationLine: 'underline',
  },
  errorCard: {
    marginTop: 8,
    borderRadius: 16,
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
  },
});

export default SignInScreen;
