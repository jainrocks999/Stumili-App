import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import User from './svg/user.svg';
import UserIcon from './svg/userIcon.svg';
import PolicyIcon from './svg/policies.svg';
import AboutUsIcon from './svg/policy.svg';
import LogoutIcon from './svg/logut.svg';
import Cross from '@assets/svg/crosscircle.svg';
import { Colors, Fonts, FontSize } from '@constants';
import Dimension1 from 'src/constants/Diemensions';
import Bg from './svg/Image.svg';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '@components/CustomModal';
import CommonButton from '@components/CommonButton';
import { useState } from 'react';

const SettingsScreen = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const data = [
    { title: 'My Account ', Icon: UserIcon },
    { title: 'About Us ', Icon: PolicyIcon },
    { title: 'Policies ', Icon: AboutUsIcon },
  ];
  const [visible,setVisible]=useState(false)
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 15,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <User height={45} width={45} />
            <View>
              <Text
                style={{
                  color: '#333333',
                  fontSize: FontSize.EIGHTEEN,
                  fontWeight: '700',
                }}
              >
                Muhammad Inam
              </Text>
              <Text
                style={{
                  color: '#333333',
                  fontSize: FontSize.THIRTEEN,
                  fontWeight: '500',
                }}
              >
                03455919179
              </Text>
            </View>
          </View>
          <Cross height={35} width={35} />
        </View>
        <View
          style={{
            height: Dimension1.height * 0.5,
            // borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
        >
          <FlatList
            data={data}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item, index }) => {
              const Icon = item.Icon;
              return (
                <Pressable
                  onPress={() => {
                    let screen = 'MyAccountScreen';
                    switch (index) {
                      case 0:
                        screen = 'MyAccountScreen';
                        break;
                      case 1:
                        screen = 'AboutusScreen';
                        break;
                      case 2:
                        screen = 'AboutusScreen';
                        break;
                    }

                    navigation.navigate(screen);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Icon height={35} width={35} />
                  <Text
                    style={{ fontSize: FontSize.FOURTEEN, color: Colors.BLACK }}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
        <Pressable
        onPress={()=>{setVisible(true)}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 16,
            marginTop: 30,
          }}
        >
          <LogoutIcon height={35} width={35} />
          <Text style={{ fontSize: FontSize.FOURTEEN, color: Colors.BLACK }}>
            {'Logout'}
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: FontSize.TWELVE,
            color: '#333333',
            marginTop: 100,
            marginLeft: 16,
          }}
        >
          Version: <Text style={{ color: '#F7BB36' }}>1.0.0</Text>
        </Text>
      </View>
      <Bg
        style={{
          position: 'absolute',
          right: 0,
          height: Dimension1.height,
          bottom: 0,
        }}
      />
      <CustomModal visible={visible} onClose={() => {}}>
        <View
          style={{
            height: Dimension1.height * 0.3,
            width: '92%',
            backgroundColor: '#fff',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Poppins.SemiBold,
              fontSize: FontSize.TWENTY,
              lineHeight: 28,
              textAlign:'center',
              paddingBottom:'10%'
            }}
          >
           {' Are you sure,\n You want to Log Out ?'}
          </Text>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <CommonButton
              title="Yes, Logout"
              style={{
                backgroundColor: '#4FAF5A',
                height: 44,
                width: '40%',
              }}
              onPress={() => {setVisible(false)}}
            />
            <CommonButton
              title="Cancle"
              style={{
                backgroundColor: '#000',
                height: 44,
                width: '40%',
              }}
            onPress={() => {setVisible(false)}}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};
export default SettingsScreen;
