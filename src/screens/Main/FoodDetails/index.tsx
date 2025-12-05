import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts, FontSize } from '@constants';

// TODO: replace with your own images & SVGs
import Pizza from '@assets/images/foods/pizza.jpg';
import Carousel from './Carosol';
import StarIcon from './svg/starIcon.svg';
import FireIcon from './svg/fireIcon.svg';
import TimeIcon from './svg/timerIcon.svg';
import PlusIcon from './svg/plush.svg';
import MinusIcon from './svg/minus.svg';
import fonts from 'src/constants/fonts';
import { MAIN_URl } from '@utils/constants';
import Carbs from './svg/Carbs.svg'
import ProteenIcon from './svg/ProteenIcon.svg'
import FatIcon from './svg/fatsIcon.svg'
import colors from 'src/constants/colors';
import Header from '@components/Header';
const { width } = Dimensions.get('window');
const PADDING_H = 20;
const CARD_W = width - PADDING_H * 2;

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  android: { elevation: 8 },
});

const Pill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    }}
  >
    {icon}
    <Text
      style={{
        fontFamily: Fonts.Poppins.Medium,
        fontSize: FontSize.FIFTEEN,
        color: '#60655C',
      }}
    >
      {label}
    </Text>
  </View>
);

const Stepper = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) => (
  <View
    style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        gap: 8,
      },
      //   shadow,
    ]}
  >
    <Pressable
      onPress={() => onChange(Math.max(1, value - 1))}
      style={{ paddingHorizontal: 15, paddingVertical: 15 }}
    >
      <MinusIcon width={16} height={16} />
    </Pressable>

    <Text style={{fontFamily:fonts.Roboto.Bold,fontSize:FontSize.SEVENTEEN,color:'#60655C'}}>{value}</Text>

    <Pressable
      onPress={() => onChange(value + 1)}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      <PlusIcon width={16} height={16} />
    </Pressable>
  </View>
);

const Dot = ({ active }: { active: boolean }) => (
  <View
    style={{
      width: active ? 10 : 8,
      height: active ? 10 : 8,
      borderRadius: 5,
      backgroundColor: active ? '#22C55E' : '#D1D5DB',
      marginHorizontal: 3,
    }}
  />
);

const FoodCardScreen = ({route}:{route:any}) => {
  const {data}=route?.params||{}
  console.log("this is data",data);
  
  const insets = useSafeAreaInsets();
  const images = useMemo(() => [Pizza, Pizza, Pizza], []);
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const flatRef = useRef<FlatList<any>>(null);
  console.log(`${MAIN_URl}${data?.imageUrl}`);
  

  const description =
    data?.description;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header title='Food Details'/>
      <View style={{marginTop:12}} />

      <Carousel images={[{
        uri:`${MAIN_URl}${data?.imageUrl}`
      }]} />

      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            borderWidth: 1,
            marginHorizontal: 16,
            width: '90%',
            borderColor: '#E8EBE6',
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
   <Pill
    icon={<ProteenIcon width={18} height={18} />}
    label={`${data?.protein}g`}
  />
  <Text style={{ color: "#E8EBE6",fontSize:22 }}>|</Text>

  <Pill
    icon={<Carbs width={15} height={15} />}
    label={`${data?.carbs}g`}
  />
  <Text style={{ color: "#E8EBE6",fontSize:22 }}>|</Text>

  <Pill
    icon={<FatIcon width={22} height={22} />}
    label={`${data?.fats}g`}
  />
  <Text style={{ color: "#E8EBE6",fontSize:22 }}>|</Text>

  <Pill
    icon={<FireIcon width={15} height={15} />}
    label={`${data?.calories} kcal`}
  />
</View>
        </View>
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: PADDING_H, paddingTop: 18 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: FontSize.SEVENTEEN,
                lineHeight: 26,
                color: '#111214',
                fontFamily: Fonts.Poppins.Bold,
                textTransform:'capitalize'
              }}
            >
             {data?.food_name}
            </Text>
          </View>
          <Text style={{color:colors.BLACK,fontSize:FontSize.SIXTEEN,fontFamily:Fonts.WorkSans.SemiBold}}>{data?.serving}</Text>
        </View>

        {/* Description + Read more */}
        <Text
          numberOfLines={expanded ? undefined : 3}
          style={{
            marginTop: 10,
            color: '#5B5F67',
            fontSize: FontSize.TWELVE,
            lineHeight: 20,
            fontFamily: Fonts.Poppins.Medium,
          }}
        >
          {description}
        </Text>
        {/* <Pressable onPress={() => setExpanded(v => !v)} hitSlop={8}>
          <Text
            style={{
              marginTop: 8,
              fontFamily: Fonts.Poppins.SemiBold,
              fontSize: FontSize.FOURTEEN,
              color: '#363A33',
              textDecorationLine: 'underline',
            }}
          >
            {expanded ? 'Show less' : 'Read more...'}
          </Text>
        </Pressable> */}
      </View>

      <View style={{ paddingBottom: insets.bottom + 20 }} />
    </View>
  );
};

export default FoodCardScreen;
