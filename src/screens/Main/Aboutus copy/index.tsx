import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import Cross from '@assets/svg/crosscircle.svg';
import Bell from './svg/bell.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from './images/Bacoubd.png';
import { Colors, Dimensions, Fonts, FontSize } from '@constants';
import UserIcon from './svg/user.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '@components/AppTextInput';
import { useState } from 'react';
import EmailIcon from '@assets/svg/email.svg';
import LockIcon from '@assets/svg/lock.svg';
import CommonButton from '@components/CommonButton';

const AboutusScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: insets.top + 10,
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}
      >
        <Cross height={35} width={35} />
        <Text
          style={{
            fontSize: FontSize.TWENTY_TWO,
            color: Colors.BLACK,
            fontFamily: Fonts.Poppins.SemiBold,
          }}
        >
          About
        </Text>
        <Bell height={25} width={25} />
      </View>
      <ScrollView
        contentContainerStyle={[
          { paddingBottom: insets.bottom + 24, flexGrow: 1 },
        ]}
      >
        <Image
          style={{
            height: Dimensions.height * 0.35,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={Images}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: FontSize.EIGHTEEN,
              color: Colors.BLACK,
              fontFamily: Fonts.Poppins.SemiBold,
            }}
          >
            About
          </Text>
          <Text style={{fontFamily:Fonts.Poppins.Regular,fontSize:FontSize.TEN,color:'#404040',lineHeight:14}}>{`At Fitness First App, your privacy matters to us. We are committed to protecting your personal information and ensuring a safe fitness experience. This Privacy Policy explains what data we collect, how we use it, and how we keep it secure.
When you create an account, we may collect personal details such as your name, email, age, gender, and profile photo. To provide you with tailored fitness guidance, we also collect activity-related information like steps, calories burned, active minutes, workout history, and progress stats. If you log nutrition, hydration, or connect fitness devices (like Apple Watch, Fitbit, etc.), we may gather this data to give you a complete view of your health. We may also collect technical information such as device type, app usage, and error reports to enhance performance.\n\nWe use this information to personalize workouts, track your progress with charts and reports, display achievements, and send you reminders or motivational notifications. Your data also helps us improve the app and deliver better customer support.
Fitness First App does not sell your personal information. We only share data with trusted third-party services (like cloud storage or fitness integrations) when necessary for the app’s core functions. All sensitive data is protected with secure servers and encryption.
You remain in control of your information at all times. You can update or edit your profile, disable notifications, or request deletion of your account and data. Please note that Fitness First App is not intended for children under 13, and we do not knowingly collect information from them.
From time to time, we may update this Privacy Policy. You will be notified of significant changes within the app. If you have any questions, concerns, or requests about your privacy, please contact us at support@fitnessfirst.com.`}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default AboutusScreen;
