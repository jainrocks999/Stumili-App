import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/Home';
import Reminder from '../screens/main/Reminder';
import Setting from '../screens/main/Setting';
import LinearGradient from 'react-native-linear-gradient';
import {BottomSheet} from 'react-native-btr';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {useTabMenu} from '../Context/context';
import Addbutton from '../screens/main/Addbutton';
import TopTabs from './Toptab';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fonts} from '../Context/Conctants';
import storage from '../utils/StorageService';

const Tab = createBottomTabNavigator();
const getIconColor = focused => ({
  tintColor: focused ? '#D485D1' : '#fff',
});
const getTextColor = focused => ({
  color: focused ? '#D485D1' : '#ffff',
});
const MyTabs = () => {
  const navigation = useNavigation();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const {opened, toggleOpened} = useTabMenu();
  const dispatch = useDispatch();
  const getAffetMations = async () => {
    setBottomSheetVisible(false);
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/affirmation_fetch_request',
      token,
      user_id: user,
      navigation,
      url: 'affirmation',
      page: 'createplaylist',
    });
    // navigation.navigate('createplaylist');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={require('../assets/home.png')}
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="library"
          component={TopTabs}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={require('../assets/heart.png')}
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Library
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="add"
          component={Addbutton}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <TouchableOpacity
                style={styles.addIconContainer}
                onPress={() => setBottomSheetVisible(true)}>
                <Image
                  source={require('../assets/plus.png')}
                  resizeMode="contain"
                  vfffff34w3e
                  style={styles.addIcon}
                />
              </TouchableOpacity>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />
        <Tab.Screen
          name="reminder"
          component={Reminder}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={require('../assets/clock.png')}
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Reminder
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={require('../assets/setting.png')}
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Setting
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>

      <BottomSheet
        visible={bottomSheetVisible}
        onBackButtonPress={() => setBottomSheetVisible(false)}
        onBackdropPress={() => setBottomSheetVisible(false)}
        style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('audiorecorder');
            }}>
            <View style={styles.card}>
              <Image
                source={require('../assets/music.jpg')}
                style={{height: hp(13), width: wp(25), borderRadius: 20}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: wp(30),
                  marginHorizontal: '10%',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  }}>
                  Record your affirmations
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getAffetMations();
            }}>
            <View style={styles.card}>
              <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 5, y: 0.0}}
                locations={[0, 0.5, 0.3]}
                colors={['#D485D1', '#B72658']}
                style={styles.linearGradient}>
                <Image
                  source={require('../assets/music.jpg')}
                  style={{height: hp(13), width: wp(25), borderRadius: 20}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                    width: wp(30),
                    marginHorizontal: '10%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#ffffff',
                      backgroundColor: 'transparent',
                    }}>
                    Create your playlist
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: wp(100),
    height: hp(10),
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    paddingTop: '2%',
    zIndex: 4,
  },
  tabIconContainer: {
    width: wp(17),
    height: hp(8),
    top: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addIconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // backgroundColor: '#426e56',
    backgroundColor: '#B72658',
    borderRadius: 50,
    elevation: 5,
    zIndex: 5,
  },
  addIcon: {
    width: 25,
    height: 35,
    borderRadius: 50,
  },
  tabIcon: {
    width: 24,
    height: 32,
    elevation: 5,
  },
  textIcon: {
    color: '#89FFBF',
    elevation: 5,
    fontFamily: fonts.regular,
  },
  bottomSheetContainer: {
    backgroundColor: '#191919',
    height: hp(50),
  },
  bottomSheetContent: {
    backgroundColor: '#191919',
    padding: 20,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetText: {
    fontSize: 18,
    color: 'black',
  },
  card: {
    height: hp(13),
    width: wp(80),
    borderColor: 'black',
    alignSelf: 'center',
    margin: '2%',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#D485D1',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },
});

export default MyTabs;
