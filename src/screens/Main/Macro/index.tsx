import { Colors, Fonts, FontSize } from '@constants';
import {
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FeatureGrid from './FeaturedGrid';
import Contribution from './Contribution';
import LinearGradient from 'react-native-linear-gradient';
import GaolSvg from '@assets/svg/Golas.svg';
import Header from '@components/Header';
import { getAPI, postAPI } from 'src/api/userApi';
import { useEffect, useState } from 'react';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import GoalModal from './goalModal';
import { useToast } from '@components/ToastProvider';
const goalsData = {
  goals: [
    {
      macros: {
        protein: 20,
        carbs: 50,
        fats: 30,
      },
      _id: '69305f00a38411d04afed403',
      user: '692dad11c4dbb7dac0fe9930',
      goalType: 'maintenance',
      dailyCalories: 2100,
      isActive: true,
      autoCalculated: false,
      source: 'manual',
      createdAt: '2025-12-03T16:02:08.576Z',
      updatedAt: '2025-12-03T16:02:08.576Z',
      __v: 0,
    },
    {
      macros: {
        protein: 35,
        carbs: 45,
        fats: 20,
      },
      _id: '692fe1bbaf0dc71fa64f7011',
      user: '692dad11c4dbb7dac0fe9930',
      goalType: 'maintenance',
      dailyCalories: 1200,
      isActive: false,
      autoCalculated: false,
      source: 'manual',
      createdAt: '2025-12-03T07:07:39.749Z',
      updatedAt: '2025-12-03T07:30:40.207Z',
      __v: 0,
    },
    {
      macros: {
        protein: 35,
        carbs: 45,
        fats: 20,
      },
      _id: '692fe1a0af0dc71fa64f6ff5',
      user: '692dad11c4dbb7dac0fe9930',
      goalType: 'maintenance',
      dailyCalories: 1200,
      isActive: false,
      autoCalculated: false,
      source: 'manual',
      createdAt: '2025-12-03T07:07:12.833Z',
      updatedAt: '2025-12-03T07:07:39.704Z',
      __v: 0,
    },
    {
      macros: {
        protein: 20,
        carbs: 20,
        fats: 10,
      },
      _id: '692fd36226628421f30ebf78',
      user: '692dad11c4dbb7dac0fe9930',
      goalType: 'maintenance',
      dailyCalories: 100,
      isActive: false,
      autoCalculated: false,
      source: 'manual',
      createdAt: '2025-12-03T06:06:26.398Z',
      updatedAt: '2025-12-03T07:07:12.782Z',
      __v: 0,
    },
    {
      macros: {
        protein: 20,
        carbs: 50,
        fats: 30,
      },
      _id: '692f303f9892e7287942a738',
      user: '692dad11c4dbb7dac0fe9930',
      goalType: 'maintenance',
      dailyCalories: 2100,
      isActive: false,
      autoCalculated: false,
      source: 'manual',
      createdAt: '2025-12-02T18:30:23.811Z',
      updatedAt: '2025-12-03T06:06:26.321Z',
      __v: 0,
    },
    {
      macros: {
        protein: 20,
        carbs: 50,
        fats: 30,
      },
      _id: '692f2a208bab2f985d710110',
      user: '692dad11c4dbb7dac0fe9930',
      goalType: 'maintenance',
      dailyCalories: 2100,
      isActive: false,
      autoCalculated: false,
      source: 'manual',
      createdAt: '2025-12-02T18:04:16.529Z',
      updatedAt: '2025-12-02T18:30:23.723Z',
      __v: 0,
    },
    {
      macros: {
        protein: 20,
        carbs: 50,
        fats: 30,
      },
      isActive: true,
      _id: '692ee5a753dd9d7326d4626f',
      user: '692dad11c4dbb7dac0fe9930',
      __v: 0,
      createdAt: '2025-12-02T13:12:07.471Z',
      dailyCalories: 2100,
      updatedAt: '2025-12-02T17:56:10.553Z',
      autoCalculated: false,
      goalType: 'maintenance',
      source: 'manual',
    },
  ],
  activeGoal: {
    macros: {
      protein: 20,
      carbs: 50,
      fats: 30,
    },
    _id: '69305f00a38411d04afed403',
    user: '692dad11c4dbb7dac0fe9930',
    goalType: 'maintenance',
    dailyCalories: 2100,
    isActive: true,
    autoCalculated: false,
    source: 'manual',
    createdAt: '2025-12-03T16:02:08.576Z',
    updatedAt: '2025-12-03T16:02:08.576Z',
    __v: 0,
  },
  activeGrams: {
    proteinGrams: 105,
    carbsGrams: 263,
    fatsGrams: 70,
  },
};

const MacroScreen = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [topContributors, setTopContributores] = useState(null);
  const [goalsData, setGoalsData] = useState<any>(null);
  const [selectGoal, setSelecetdGoal] = useState(null);
  const callApis = async () => {
    try {
      setLoading(true);
      const [dailyFoodRes, topContributorsRes, goalsRes] =
        await Promise.allSettled([
          getAPI('/users/daily-food'),
          getAPI('/users/top-contributors'),
          getAPI('/users/goals/list'),
        ]);
      const weekyProgress =
        dailyFoodRes.status === 'fulfilled' ? dailyFoodRes.value : null;

      const topContributors =
        topContributorsRes.status === 'fulfilled'
          ? topContributorsRes.value
          : [];
      const golasData = goalsRes.status === 'fulfilled' ? goalsRes.value : [];

      if (weekyProgress?.status) {
        setWeeklyProgress(weekyProgress);
      }
      if (topContributorsRes?.status) {
        setTopContributores(topContributors?.data);
      }
      if (golasData?.status) {
        setGoalsData(golasData?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callApis();
  }, []);
  const RebderMarcoPecent = ({
    title,
    percent,
  }: {
    title: string;
    percent: number;
  }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: FontSize.FOURTEEN,
            fontWeight: '400',
            color: '#6B7280',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: '#111827',
            fontSize: FontSize.SIXTEEN,
            fontWeight: '700',
          }}
        >
          {`${Number(percent).toFixed(0)}%`}
        </Text>
      </View>
    );
  };
  const handeGoalSave = async (data: any) => {
    try {
      const response = await postAPI('users/goals/create', data);
      if (response.status) {
        callApis();
        setSelecetdGoal(null);
        showToast(response.message, 'success');
        setVisible(false);
      }
    } catch (error: any) {
      showToast(error?.message || 'errrr');
    }
  };

  const goals =
    goalsData?.goals?.length > 0
      ? goalsData?.goals.filter((item: any) => !item?.isActive)
      : [];
  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header title="Marcos" />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <View>
          <FeatureGrid weeklyProgress={weeklyProgress} />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 25 }}>
          <Contribution data={topContributors} />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 25 }}>
          <LinearGradient
            colors={['#EFF6FF', '#FAF5FF']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 20,
              // marginTop: 15,
              borderRadius: 12,
            }}
          >
            <View style={{ paddingHorizontal: 6, marginTop: 0 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.EIGHTEEN,
                    color: '#111827',
                    fontWeight: '700',
                  }}
                >
                  Goals
                </Text>

                {/* Right Buttons */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    onPress={() => {
                      setVisible(true);
                    }}
                    style={{
                      backgroundColor: '#10B98120',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: '#10B981',
                        fontWeight: '600',
                        fontSize: 13,
                      }}
                    >
                      + Add
                    </Text>
                  </Pressable>

                  {goalsData?.activeGoal ? (
                    <Pressable
                      onPress={() => {
                        setSelecetdGoal(goalsData?.activeGoal);
                        setVisible(true);
                      }}
                      style={{
                        backgroundColor: '#2563EB20',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: '#2563EB',
                          fontWeight: '600',
                          fontSize: 13,
                        }}
                      >
                        Edit
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>

              {goalsData?.activeGoal ? (
                <View
                  style={{
                    marginTop: 18,
                    borderRadius: 14,
                    backgroundColor: '#EEF2FF',
                    borderWidth: 1,
                    borderColor: '#E0E7FF',
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 4,
                    elevation: 2,
                    padding: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 8,
                      paddingBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: 'green',
                        fontSize: FontSize.THIRTEEN,
                        fontFamily: fonts.Poppins.SemiBold,
                        textTransform: 'capitalize',
                      }}
                    >
                      {goalsData?.activeGoal?.goalType}
                    </Text>
                    <Text
                      style={{
                        color: colors.SECONDARY_COLOR,
                        fontSize: FontSize.THIRTEEN,
                        fontFamily: fonts.Poppins.SemiBold,
                      }}
                    >
                      Active
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 8,
                    }}
                  >
                    <RebderMarcoPecent
                      title="Carbs"
                      percent={goalsData?.activeGoal?.macros?.carbs}
                    />
                    <RebderMarcoPecent
                      title="Fats"
                      percent={goalsData?.activeGoal?.macros?.fats}
                    />
                    <RebderMarcoPecent
                      title="Protein"
                      percent={goalsData?.activeGoal?.macros?.protein}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: Colors.TEXT_COLOR,
                      fontSize: FontSize.SIXTEEN,
                      fontFamily: fonts.WorkSans.SemiBold,
                    }}
                  >
                    You have not any active goal
                  </Text>
                </View>
              )}

              {goals?.length > 0 ? (
                <Text
                  style={{
                    marginTop: 25,
                    fontSize: FontSize.SIXTEEN,
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  Previous Goals
                </Text>
              ) : null}

              {goals?.length > 0
                ? goals.map((i: any, index: number) => (
                    <View
                      key={i._id}
                      style={{
                        padding: 8,
                        backgroundColor: '#F9FAFB',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        marginTop: index == 0 ? 8 : 15,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 8,
                          paddingBottom: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#10B981',
                            fontSize: FontSize.THIRTEEN,
                            fontFamily: fonts.Poppins.SemiBold,
                            textTransform: 'capitalize',
                          }}
                        >
                          {i?.goalType}
                        </Text>
                        <Pressable
                          onPress={async () => {
                            try{
                            const response = await getAPI(
                              `users/goals/delete/${i?._id}`,
                            );
                            if(response?.status){
                              showToast(response?.message||"Goal deleted")
                             callApis()
                            }
                          }catch(err:any){
                            showToast(err?.message||"something went wrong",'error')
                          }
                          }}
                          style={{
                            backgroundColor: '#EF444420',
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 8,
                          }}
                        >
                          <Text
                            style={{
                              color: '#EF4444',
                              fontWeight: '600',
                              fontSize: 13,
                            }}
                          >
                            Delete
                          </Text>
                        </Pressable>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 8,
                        }}
                      >
                        <RebderMarcoPecent
                          title="Carbs"
                          percent={i?.macros?.carbs}
                        />
                        <RebderMarcoPecent
                          title="Fats"
                          percent={i?.macros?.fats}
                        />
                        <RebderMarcoPecent
                          title="Protein"
                          percent={i?.macros?.protein}
                        />
                      </View>
                    </View>
                  ))
                : null}
            </View>
          </LinearGradient>
        </View>
        <GoalModal
          visible={visible}
          onClose={() => {
            setVisible(false);
            setSelecetdGoal(null);
          }}
          onSave={handeGoalSave}
          initialGoal={selectGoal}
        />
      </ScrollView>
    </View>
  );
};
export default MacroScreen;
const GoalsData = [
  {
    title: 'Protein',
    pr: '20%',
  },
  {
    title: 'Carbs',
    pr: '30%',
  },
  {
    title: 'Fats',
    pr: '35%',
  },
];
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: FontSize.EIGHTEEN,
    color: Colors.BLACK,
    fontWeight: '600',
  },
});
