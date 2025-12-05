import { Image, ImageBackground, StatusBar, Text, View } from 'react-native';
import Cross from '@assets/svg/crosscircle.svg';
import Bell from './svg/bell.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from './images/bgimage.jpg';
import { Colors, Dimensions, Fonts, FontSize } from '@constants';
import UserIcon from './svg/user.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '@components/AppTextInput';
import { useState } from 'react';
import EmailIcon from '@assets/svg/email.svg';
import LockIcon from '@assets/svg/lock.svg';
import CommonButton from '@components/CommonButton';

const MyAccountScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex: 1 }}>
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
        <Bell height={25} width={25} />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={[{ paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={24} // lifts fields a bit more
        extraHeight={24}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ImageBackground
          style={{
            height: Dimensions.height * 0.35,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={Images}
        >
          <UserIcon height={70} width={70} />
          <Text
            style={{
              fontFamily: Fonts.Poppins.Bold,
              color: Colors.WHITE,
              fontSize: FontSize.EIGHTEEN,
            }}
          >
            Krish Vastav
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins.SemiBold,
              color: Colors.WHITE,
              fontSize: FontSize.THIRTEEN,
            }}
          >
            Birthday:{' '}
            <Text style={{ fontFamily: Fonts.Poppins.Regular }}>
              July 05, 2004
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins.Regular,
              color: Colors.WHITE,
              fontSize: FontSize.THIRTEEN,
            }}
          >
            krish14@example.com
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#4FAF5A',
              position: 'absolute',
              bottom: '-10%',
              width: '75%',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: FontSize.FIFTEEN,
                  color: Colors.WHITE,
                  fontWeight: '600',
                }}
              >
                75 Kg
              </Text>
              <Text
                style={{
                  fontSize: FontSize.FIFTEEN,
                  color: Colors.WHITE,
                  fontWeight: '300',
                }}
              >
                Weight
              </Text>
            </View>
            <Text
              style={{
                fontSize: FontSize.TWENTY_FIVE,
                color: Colors.WHITE,
                fontWeight: '600',
              }}
            >
              |
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: FontSize.FIFTEEN,
                  color: Colors.WHITE,
                  fontWeight: '600',
                }}
              >
                21
              </Text>
              <Text
                style={{
                  fontSize: FontSize.FIFTEEN,
                  color: Colors.WHITE,
                  fontWeight: '300',
                }}
              >
                year old
              </Text>
            </View>
            <Text
              style={{
                fontSize: FontSize.TWENTY_FIVE,
                color: Colors.WHITE,
                fontWeight: '600',
              }}
            >
              |
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: FontSize.FIFTEEN,
                  color: Colors.WHITE,
                  fontWeight: '600',
                }}
              >
                1.65 CM
              </Text>
              <Text
                style={{
                  fontSize: FontSize.FIFTEEN,
                  color: Colors.WHITE,
                  fontWeight: '300',
                }}
              >
                Height
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ marginTop: 50, paddingHorizontal: 16 }}>
          <AppTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="John Smith"
            keyboardType="email-address"
            // LeftIcon={() => <EmailIcon />}
          />
          <View style={{ height: 20 }} />
          <AppTextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="elementary221b@gmail.co"
            keyboardType="email-address"
            LeftIcon={() => <EmailIcon />}
          />
          <View style={{ height: 20 }} />
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="*************"
            secureTextEntry
            LeftIcon={() => <LockIcon />}
          />
          <CommonButton
            title="Update"
            onPress={() => {}}
            style={{ marginTop: 22 }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default MyAccountScreen;
