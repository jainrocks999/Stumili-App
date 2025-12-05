import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, FontSize } from '@constants';
import colors from 'src/constants/colors';
import ArrowDown from '@assets/svg/HomeArrowDown.svg';
import Location from '@assets/svg/Location.svg';
import Bell from '@assets/svg/bell.svg';
import WeekProgressStrip from '@components/WeekProgressStrip';
import FeatureGrid from './FeatureGrid';
import MyFoodList, { FabMenu } from '@components/MyFoodList.index';
import { getAPI } from 'src/api/userApi';
import CustomLoader from '@components/CustomeLoader';

const COLORS = {
  bg: '#FFFFFF',
  text: '#111111',
  subtext: '#6B7280',
  green: '#22C55E',
  card: '#F3F4F6',
  border: '#E5E7EB',
  tabIcon: '#9CA3AF',
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [daillyfood, setDaillyFood] = useState<any>(null);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const callApis = async () => {
    try {
      setLoading(true);
      const parms = { page: 1, limit: 10 };
      const [foodList, weekyProgress,daillyfood] = await Promise.all([
        getAPI(`/users/food-list`, parms),
        getAPI('/users/weekly-progress'),
        getAPI('/users/daily-food'),
      ]);
      if (foodList.status) {
        setFoodList(foodList.foods);
      }
      if (weekyProgress?.status) {
        setWeeklyProgress(weekyProgress?.week);
      }
      if(daillyfood){
        setDaillyFood(daillyfood)
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callApis();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <CustomLoader label="Loading" visible={loading} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#4FAF5A',
          paddingTop: insets.top + 10,
          paddingBottom: 10,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Location height={25} width={25} />
          <View
            style={{
              alignItems: 'flex-start',
              marginLeft: 10,
              width: '75%',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: colors.WHITE,
                  fontFamily: Fonts.WorkSans.Regular,
                  fontSize: FontSize.FOURTEEN,
                }}
              >
                Current location
              </Text>
              <ArrowDown style={{ marginLeft: 4 }} height={12} width={12} />
            </View>
            <Text
              style={{
                color: colors.WHITE,
                fontFamily: Fonts.WorkSans.SemiBold,
                fontSize: FontSize.EIGHTEEN,
              }}
            >
              Jl. Soekarno Hatta 15A Malang
            </Text>
          </View>
        </View>
        <Pressable
          style={{
            backgroundColor: '#fff',
            height: 45,
            width: 45,
            borderStartColor: '#fff',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell height={25} width={25} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
          flexGrow: 1,
        }}
      >
        <LinearGradient
          colors={['#4FAF5A', '#4FAF5A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.headerBG]}
        >
          <View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
            <View style={styles.streakWrap}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakNum}>
                {
                  weeklyProgress.filter((item: any) => item.status == 'done')
                    .length
                }
                x
              </Text>
            </View>
            <Text style={styles.streakLabel}>days streaks</Text>
          </View>

          <WeekProgressStrip week={weeklyProgress} />
          <Text
            style={{
              color: '#fff',
              fontFamily: Fonts.WorkSans.Regular,
              fontSize: FontSize.EIGHTEEN,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            You’re on Fire! 🔥{' '}
          </Text>
        </LinearGradient>
        <View style={{ marginTop: -8 }}>
          <FeatureGrid daillyfood={daillyfood} />
        </View>
        <MyFoodList foodList={foodList} />
      </ScrollView>
      <FabMenu />
    </View>
  );
}


const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  headerBG: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    // height: '65%',
  },

  streakWrap: {
    flexDirection: 'row',
    alignItems: 'center',

    alignSelf: 'center',
  },
  streakIcon: { fontSize: FontSize.TWENTY_FIVE + 8, color: '#fff' },
  streakNum: {
    color: '#fff',
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE + 8,
  },
  streakLabel: {
    color: '#7AE46C',
    fontFamily: Fonts.WorkSans.Regular,
    fontSize: FontSize.EIGHTEEN,
  },
});
