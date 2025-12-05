import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckIcon from '@assets/svg/RightIcon.svg';
// import LockIcon from '@assets/svg/lock.svg'
import LockBG from '@assets/images/Auth/lock2.jpg'; // large lock image
import { Fonts, FontSize } from '@constants';
import CommonButton from '@components/CommonButton';
import ArrowRight from '@assets/svg/lockIconwhite.svg';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  bg: '#FFFFFF',
  text: '#0B0B0B',
  subtext: '#6B7280',
  card: '#FFFFFF',
  border: '#E5E7EB',
  black: '#111111',
  green: '#22C55E',
};

export default function PasswordSentScreen() {
  const insets = useSafeAreaInsets();
  const email = 'elementary221b@gmail.com';
  const navigation=useNavigation()

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={StyleSheet.absoluteFill}>
        <Image source={LockBG} resizeMode="cover" style={styles.bgLock} />
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFFFF']}
          start={{ x: 0.5, y: 0.2 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View
        style={[
          styles.cardWrap,
          { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.card}>
          <View style={styles.badge}>
            <CheckIcon />
          </View>

          <Text style={styles.title}>Password Sent!</Text>
          <Text style={styles.caption}>
            We’ve sent the password to{'\n'}
            <Text style={styles.bold}>{maskEmail(email)}</Text>. Resend if the
            {'\n'}
            password is not received! 🔥
          </Text>

          <CommonButton
            title="Resend Password"
            RightIcon={() => <ArrowRight height={25} width={25} />}
            onPress={() => {navigation.reset({index:0,routes:[{name:"App"}]})}}
            style={{ marginTop: 22, zIndex: 100, width: '100%' }}
          />
        </View>
      </View>
      <Pressable
        style={[styles.dismiss, { marginBottom: insets.bottom + 30 }]}
        onPress={() => {}}
      >
        <Text style={styles.dismissX}>✕</Text>
      </Pressable>
    </View>
  );
}

/* ---- helpers ---- */
function maskEmail(email: string) {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  const visible = user.slice(-4);
  return `**${visible}@${domain}`;
}

/* ---- styles ---- */
const RADIUS = 22;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  bgLock: {
    width: '120%',
    height: '120%',
    position: 'absolute',
    right: -120,
    bottom: -180,
    transform: [{ scale: 1.5 }],
  },

  cardWrap: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS,
    paddingVertical: 25,
    paddingHorizontal: 15,
    // subtle floating shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    alignItems: 'center',
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ECFCCB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 2,
  },
  caption: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.FOURTEEN,
    color: COLORS.subtext,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },
  bold: {
    fontFamily: Fonts.WorkSans.SemiBold,
    color: COLORS.text,
  },

  cta: {
    marginTop: 16,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.black,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    alignSelf: 'stretch',
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: 15,
  },
  ctaLock: { color: '#FFFFFF', fontSize: 16 },

  dismiss: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignSelf: 'center',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // soft shadow like mock
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  dismissX: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: Fonts.WorkSans.SemiBold,
  },
});
