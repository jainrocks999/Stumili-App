// screens/home/FeatureGrid.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import FeatureCard from '@components/FeatureCard';
import RingGauge from '@components/RingGauge';
import { Colors, Dimensions, Fonts, FontSize } from '@constants';
import FirstGirdIcon from '@assets/svg/HomeGridIcon1.svg';
import SecondGridIcon from '@assets/svg/HomeGridIcon2.svg';
import MobileImage from '@assets/images/home/MobileImagew.png';
import Bhomga from '@assets/images/home/Bhomga.png';
import UserMacro from '@assets/svg/UserMacro.svg';
import DonutChart from '../TrackCircle';

// import your assets here:
// import QRPhone from '@assets/images/qr-phone.png';
// import Megaphone from '@assets/images/megaphone.png';
// import CoinIcon from '@assets/svg/coin.svg';
const Lists = [
  {
    tile: 'Protine',
    color: '#04BFDA',
  },
  {
    tile: 'Carb',
    color: '#9B88ED',
  },
  {
    tile: 'Fat',
    color: '#FB67CA',
  },
  // {
  //   tile: 'Oil',
  //   color: '#FFA84A',
  // },
];

export default function FeatureGrid({weeklyProgress}:{weeklyProgress:any}) {
  const {totals,limits}=weeklyProgress||{}
const proteinCalories = totals?.protein * 4;
const carbCalories = totals?.carbs * 4;
const fatCalories = totals?.fats * 9;
const totalMacroCalories =
proteinCalories + carbCalories + fatCalories;

// Normalized distribution
const proteinPct = (proteinCalories / totalMacroCalories) * 100;
const carbPct = (carbCalories / totalMacroCalories) * 100;
const fatPct = (fatCalories / totalMacroCalories) * 100;
  const totalCalory=totals?.calories;
  const limittofCalory=limits?.dailyCalories
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.grid}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row-reverse',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#FF844B',
              borderRadius: 15,
              paddingVertical: 15,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  height: 30,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                }}
              >
                <SecondGridIcon height={12} width={12} />
              </View>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: Fonts.WorkSans.Regular,
                  fontSize: FontSize.NINE,
                  marginTop: 5,
                }}
              >
                Scan Your Macros
              </Text>
            </View>

            <Image
              source={MobileImage}
              style={{ height: 75, width: 35, resizeMode: 'contain' }}
            />
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#FFA84A',
              borderRadius: 15,
              paddingVertical: 15,
              paddingHorizontal: 16,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: Colors.BLACK,
                fontFamily: Fonts.WorkSans.SemiBold,
                fontSize: FontSize.SIXTEEN,
                marginBottom: 4,
              }}
            >
              Daily Breakdown
            </Text>
            <Text
              style={{
                color: Colors.BLACK,
                fontFamily: Fonts.WorkSans.SemiBold,
                fontSize: FontSize.TWENTY_FIVE,
                marginBottom: 2,
              }}
            >
              {totalCalory? totalCalory.toLocaleString('en-Us'):null}
            </Text>
            <Text
              style={{
                color: '#6B7280',
                fontFamily: Fonts.WorkSans.Regular,
                fontSize: FontSize.FIFTEEN,
              }}
            >
              {`of ${limittofCalory? limittofCalory.toLocaleString("en-US"):""} kcal`}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#7F36F7',
            width: '100%',
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 15,
          
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}
            >
              <UserMacro height={10} width={10} />
            </View>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: Fonts.WorkSans.Regular,
                fontSize: FontSize.NINE,
                marginTop: 5,
              }}
            >
              Notified Maker
            </Text>
            <FlatList
              data={Lists}
              scrollEnabled={false}
              keyExtractor={item => item.tile}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      marginTop: 6,
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: 10,
                        width: 15,
                        borderWidth: 2,
                        borderColor: item.color,
                        borderRadius: 100,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts.WorkSans.Medium,
                        color: Colors.WHITE,
                        fontSize: FontSize.TWELVE,
                      }}
                    >
                      {item.tile}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              width: '70%',
              justifyContent: 'center',
            }}
          >
            <DonutChart
              size={160}
              thickness={28}
              gap={0}
              data={[
                // { value: oilPct, color: '#F7A540' }, // orange
                { value: fatPct, color: '#FF66A6' }, // pink
                { value: carbPct, color: '#9B85F4' }, // violet
                { value: proteinPct, color: '#06C1CE' }, // teal
              ]}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          position: 'absolute',
          height: '25%',
          bottom: 0,
          zIndex:-1
        }}
      />
      <View
        style={{
          backgroundColor: '#4FAF5A',
          width: '100%',
          position: 'absolute',
          height: '75%',
          top: 0,
          zIndex:-1
        }}
      />
    </View>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendDot,
          { borderColor: color, borderWidth: 2, backgroundColor: '#fff' },
        ]}
      />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 16,
    paddingTop: 12,
    justifyContent: 'space-between',
    // backgroundColor: '#4FAF5A',
    position:'relative',
    gap: 10,
  },
  ringRow: {
    marginTop: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  legendRow: { flexDirection: 'row', gap: 18, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 6, marginRight: 6 },
  legendText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: FontSize.EIGHT,
    color: '#fff',
  },

  coinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F5D29C',
  },
  smallDot: { width: 12, height: 12, borderRadius: 6 },
});
