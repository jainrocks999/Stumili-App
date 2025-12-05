import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChevronRight from '@assets/svg/chevron-right.svg';
import Mail from '@assets/svg/mailButton.svg';
import Shield from '@assets/svg/LockButton.svg';
import GoogleAuth from '@assets/svg/gooleAuth.svg';
import { Fonts, FontSize } from '@constants';
import CommonButton from '@components/CommonButton';
import ArrowRight from '@assets/svg/ArrowRightWith.svg';
import LockImage from '@assets/images/Auth/Lock.jpg';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '@components/AppTextInput';
import EmailIcon from '@assets/svg/email.svg';
import Dimension1 from 'src/constants/Diemensions';
import { forgotPassword } from 'src/api/authApi';
import { useToast } from '@components/ToastProvider';

const COLORS = {
  bg: '#FFFFFF',
  text: '#111111',
  subtext: '#6B7280',
  border: '#E5E7EB',
  black: '#0B0B0B',
  card: '#F3F4F6',
  iconEmail: '#F59E0B',
  icon2FA: '#2563EB',
  iconGAuth: '#8B5CF6',
};

type MethodKey = 'email' | '2fa' | 'gauth';

export default function ResetPasswordScreen() {
  const { showToast } = useToast();
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<MethodKey | null>(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const forgetPassword = async () => {
    try {
      setLoading(true);
      if (!email.trim()) {
        setError('email is requried');
        return;
      }

      await forgotPassword(email.trim());
      showToast('Reset password link set to your email!');
      setError('');
      navigation.replace('PasswordSent');
    } catch (errr: any) {
      console.log("this is oerrrr",errr);
      
      setError(errr.message);
      showToast(errr.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={[styles.header, { paddingTop: insets.top + 30 }]}>
        <Pressable style={styles.backBtn} onPress={() => {}}>
          <ChevronRight />
        </Pressable>
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <View style={{ height: Dimension1.height * 0.15 }} />
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Select what method you’d like to reset.
        </Text>

        {false ? (
          <View style={{ marginTop: 18, gap: 12, zIndex: 100 }}>
            <MethodItem
              Icon={Mail}
              title="Send via Email"
              subtitle="Seamlessly reset your password via email address."
              color={COLORS.iconEmail}
              selected={selected === 'email'}
              onPress={() => setSelected('email')}
            >
              <View
                style={[styles.iconDot, { backgroundColor: COLORS.iconEmail }]}
              />
            </MethodItem>

            <MethodItem
              title="Send via 2FA"
              subtitle="Seamlessly reset your password via 2 Factors."
              color={COLORS.icon2FA}
              selected={selected === '2fa'}
              onPress={() => setSelected('2fa')}
              Icon={Shield}
            >
              <View
                style={[styles.iconDot, { backgroundColor: COLORS.icon2FA }]}
              />
            </MethodItem>

            <MethodItem
              title="Send via Google Auth"
              subtitle="Seamlessly reset your password via gAuth."
              color={COLORS.iconGAuth}
              selected={selected === 'gauth'}
              onPress={() => setSelected('gauth')}
              Icon={GoogleAuth}
            >
              <View
                style={[styles.iconDot, { backgroundColor: COLORS.iconGAuth }]}
              />
            </MethodItem>
          </View>
        ) : null}
        <View style={{ height: 30 }} />

        <AppTextInput
          onFocus={() => {
            setError('');
          }}
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="elementary221b@gmail.co"
          keyboardType="email-address"
          style1={{ zIndex: 100 }}
          LeftIcon={() => <EmailIcon />}
        />

        <CommonButton
        loading={loading}
          title="Reset Password"
          RightIcon={() => <ArrowRight height={25} width={25} />}
          onPress={() => {
            forgetPassword();
          }}
          style={{ marginTop: 22, zIndex: 100 }}
        />
      </View>
      <Image
        source={LockImage}
        style={{
          height: '60%',
          width: '60%',
          position: 'absolute',
          bottom: -150,
          right: 0,
          transform: [{ scale: 1.5 }],
        }}
      />
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          height: '70%',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
    </View>
  );
}

function MethodItem({
  title,
  subtitle,
  color,
  selected,
  onPress,
  children,
  Icon,
}: {
  title: string;
  subtitle: string;
  color: string;
  selected?: boolean;
  onPress: () => void;
  children: React.ReactNode;
  Icon: any;
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#0000000F' }}
      style={[
        styles.item,
        selected && {
          borderColor: color + '55',
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        },
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: color + '22', borderColor: color + '33' },
        ]}
      >
        {Icon ? <Icon height={45} width={45} /> : null}
      </View>

      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.chevWrap}>
        <ChevronRight />
      </View>
    </Pressable>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingHorizontal: 16, paddingBottom: 8 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: { paddingHorizontal: 20 },
  title: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: COLORS.text,
    //    textAlign: 'center',
    marginTop: 15,
  },
  subtitle: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.FOURTEEN,
    color: COLORS.subtext,
    //   textAlign: 'center',
    marginTop: 8,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: CARD_RADIUS,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconDot: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  itemTextWrap: { flex: 1 },
  itemTitle: {
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: 15,
    color: COLORS.text,
  },
  itemSubtitle: {
    marginTop: 4,
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: 12,
    color: COLORS.subtext,
  },
  chevWrap: {
    width: 28,
    height: 28,

    justifyContent: 'center',
    // backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    borderColor: '#E5E7EB',
    transform: [{ rotate: '180deg' }],
  },

  cta: {
    marginTop: 22,
    height: 56,
    borderRadius: 22,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: Fonts.WorkSans.SemiBold,
    fontSize: 15,
  },
  ctaArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 6,
    top: Platform.OS === 'ios' ? 0 : -1,
  },
});
