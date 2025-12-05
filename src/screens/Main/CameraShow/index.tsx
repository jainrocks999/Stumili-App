import React from 'react';
import {
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Bg from '@assets/images/foods/pizza.jpg';
import Scanner from './svg/scanner.svg'; // overlay frame
// replace these with your final icons:
import Heart from './svg/heart.svg';
import Bag from './svg/bag.svg';
import HomeIcon from './svg/home.svg';
import CaptureIcon from './svg/camera.svg';
import SettingsIcon from './svg/settings.svg';
import { Fonts, FontSize } from '@constants';
import { useNavigation } from '@react-navigation/native';

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 6 },
});

const StatCard = ({
  icon,
  value,
  unit,
}: {
  icon: React.ReactNode;
  value: string | number;
  unit: string;
}) => (
  <View
    style={[
      {
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        minWidth: 104,
        width: '28%', // responsive
      },
      shadow,
    ]}
  >
    {icon}
    <Text
      style={{
        fontSize: FontSize.TWENTY_FIVE + 5,
        color: '#111214',
        fontFamily: Fonts.WorkSans.Bold,
        lineHeight: 34,
      }}
      numberOfLines={1}
    >
      {value}
    </Text>
    <Text
      style={{
        fontSize: FontSize.TWELVE + 2,
        color: '#393C43',
        fontFamily: Fonts.WorkSans.Medium,
      }}
      numberOfLines={1}
    >
      {unit}
    </Text>
  </View>
);

const RoundBtn = ({
  children,
  size = 56,
  onPress,
  trr=false,
  radius=20
}: {
  children: React.ReactNode;
  size?: number;
  onPress?: () => void;
  radius?:number
  trr?:boolean
}) => (
  <Pressable
    onPress={onPress}
    style={[
      {
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop:trr?-120:0
      },
      shadow,
    ]}
    android_ripple={{ color: '#00000010', borderless: false }}
  >
    {children}
  </Pressable>
);

const CameraShowScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation:any=useNavigation()

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ImageBackground
        source={Bg}
        resizeMode="cover"
        style={{
          flex: 1,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 8,
          paddingHorizontal: 16,
        }}
        imageStyle={{}}
      >
        {/* Top stat cards */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <StatCard
            icon={<Heart width={22} height={22} />}
            value={76}
            unit="bpm"
          />
          <StatCard
            icon={<Bag width={22} height={22} />}
            value={57.1}
            unit="kilogram"
          />
        </View>

        {/* Scanner overlay (non-blocking) */}
        <View
          pointerEvents="none"
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Scanner width={'78%'} height={'50%'} />
        </View>

        {/* Bottom action bar */}
        <View
          style={{
            paddingHorizontal: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom:10
          }}
        >
          <RoundBtn onPress={()=>{navigation.navigate('FoodCardScreen')}} radius={18}>
            <HomeIcon width={22} height={22} />
          </RoundBtn>

          <RoundBtn onPress={()=>{navigation.navigate('FoodCardScreen')}} radius={25} trr={true} size={74}>
            <CaptureIcon width={24} height={24} />
          </RoundBtn>

          <RoundBtn onPress={()=>{navigation.navigate('SettingsScreen')}} radius={18}>
            <SettingsIcon width={22} height={22} />
          </RoundBtn>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraShowScreen;
