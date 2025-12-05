// screens/home/FeatureGrid.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FeatureCard from '@components/FeatureCard';
import RingGauge from '@components/RingGauge';
import { Colors, Dimensions, Fonts, FontSize } from '@constants';
import FirstGirdIcon from '@assets/svg/HomeGridIcon1.svg';
import SecondGridIcon from '@assets/svg/HomeGridIcon2.svg';
import MobileImage from '@assets/images/home/MobileImagew.png';
import Bhomga from '@assets/images/home/Bhomga.png';

// import your assets here:
// import QRPhone from '@assets/images/qr-phone.png';
// import Megaphone from '@assets/images/megaphone.png';
// import CoinIcon from '@assets/svg/coin.svg';

export default function FeatureGrid({ daillyfood }: { daillyfood: any }) {
  const percentage = daillyfood?.percentage;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.grid}>
        <View
          style={{
            backgroundColor: '#F7BB36',
            width: '50%',
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
              // justifyContent: 'space-between',
              // paddingRight:20
            }}
          >
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
              <FirstGirdIcon height={12} width={12} />
            </View>
            {/* <Text
              style={{
                color: Colors.BLACK,
                fontFamily: Fonts.WorkSans.SemiBold,
                fontSize: FontSize.EIGHTEEN,
                marginTop: 5,
              }}
            >
              <Text>
                {daillyfood?.totals?.calories}
                <Text style={{ fontSize: 12, color: '#666' }}> kcal</Text>
              </Text>
            </Text> */}
          </View>

          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: Fonts.WorkSans.Regular,
              fontSize: FontSize.EIGHT,
              marginTop: 5,
            }}
          >
            Daily Gola Tracker
          </Text>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <RingGauge
              size={120}
              spacing={5}
              trackColor="#FFFFFF"
              rings={[
                {
                  value: Math.min(percentage?.protein / 100, 1),
                  color: percentage?.protein > 100 ? 'red' : '#FB67CA',
                },
                {
                  value: Math.min(percentage?.fats / 100, 1),
                  color: percentage?.fats > 100 ? 'red' : '#4FAF5A',
                },
                {
                  value: Math.min(percentage?.carbs / 100, 1),
                  color: percentage?.carbs > 100 ? 'red' : '#04BFDA',
                },
              ]}
            />
          </View>
          <View style={styles.legendRow}>
            <Legend
              color={percentage?.protein > 100 ? 'red' : '#FB67CA'}
              label="Protein"
            />
            <Legend
              color={percentage?.fats > 100 ? 'red' : '#4FAF5A'}
              label="Fats"
            />
            <Legend
              color={percentage?.carbs > 100 ? 'red' : '#04BFDA'}
              label="Carbs"
            />
          </View>
        </View>
        <View style={{ width: '45%' }}>
          <View
            style={{
              backgroundColor: '#FF844B',
              width: '100%',
              borderRadius: 15,
              paddingVertical: 15,
              paddingHorizontal: 15,
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
                Scan Your Marcos
              </Text>
            </View>
            <Image
              source={MobileImage}
              style={{ height: 70, width: 35, marginTop: 10 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#7F36F7',
              width: '100%',
              borderRadius: 15,
              paddingVertical: 15,
              paddingLeft: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              height: 'auto',
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
                Scan Your Marcos
              </Text>
            </View>
            <Image
              source={Bhomga}
              style={{ height: 70, width: 60, marginTop: 10 }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          position: 'absolute',
          height: '48%',
          bottom: 0,
          zIndex: -1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: '#4FAF5A',
          width: '100%',
          position: 'absolute',
          height: '52%',
          top: 0,
          zIndex: -1,
        }}
      ></View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#4FAF5A',
    position: 'relative',
    zIndex: 1,
  },
  ringRow: {
    marginTop: 8,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  legendRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 6, marginRight: 6 },
  legendText: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: FontSize.TEN,
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
