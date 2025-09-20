import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import Share from 'react-native-share';
import { FlatList } from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../Context/Conctants';
import Background from '../Auth/compoents/Background';
import storage from '../../utils/StorageService';

const data = [
  {
    id: '1',
    title: 'Get Premium',
    image: require('../../assets/flaticon/lock.png'),
  },
  {
    id: '2',
    title: 'Create reminders',
    image: require('../../assets/flaticon/notification.png'),
  },
  {
    id: '3',
    title: 'Share innertune app',
    image: require('../../assets/flaticon/share.png'),
  },
  {
    id: '4',
    title: 'Rate innertune on Googleplay',
    image: require('../../assets/flaticon/star.png'),
  },
];
const data2 = [
  {
    id: '1',
    title: 'Suggest an affirmation',
    image: require('../../assets/flaticon/frequency.png'),
  },
  {
    id: '2',
    title: 'Suggest an app improvement',
    image: require('../../assets/flaticon/add.png'),
  },
  {
    id: '3',
    title: 'Report a bug',
    image: require('../../assets/flaticon/warning.png'),
  },
];
const data3 = [
  {
    id: '1',
    title: 'Delete an account',
    image: require('../../assets/flaticon/delete.png'),
  },
  {
    id: '2',
    title: 'Sign out',
    image: require('../../assets/flaticon/switch.png'),
  },
];

const handleShare = async () => {
  try {
    const options = {
      message: 'Check out the Innertune app! Download it now: https://innertune.app',
    };
    await Share.open(options);
  } catch (error) {
    console.log('Error sharing:', error);
  }
};
const handleRateApp = async () => {
  console.log('Rate App Clicked');

  const url = 'market://details?id=com.innertune';
  const webUrl = 'https://play.google.com/store/apps/details?id=com.innertune';

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    console.log('Opening Market URL');
    Linking.openURL(url).catch(err => console.error('Error opening Play Store:', err));
  } else {
    console.log('Opening Web URL');
    Linking.openURL(webUrl).catch(err => console.error('Error opening Web URL:', err));
  }
};
const handleManageSubscription = () => {
  const packageName = 'com.stimuli';
  const url = `https://play.google.com/store/account/subscriptions?package=${packageName}`;

  Linking.openURL(url).catch(() =>
    Alert.alert('Error', 'Could not open subscription management page.')
  );
};
const handleReportBug = () => {
  const email = 'support@innertune.com';
  const subject = encodeURIComponent('Bug Report');
  const body = encodeURIComponent('Please describe the issue you faced:');

  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  Linking.openURL(mailtoUrl).catch(() =>
    Alert.alert('Error', 'Could not open email client.')
  );
};

const Setting = ({ }) => {
  const navigation = useNavigation();
  return (
    <Background>
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <Text
          style={{
            fontSize: hp(4),
            color: 'white',
            marginVertical: 10,
            fontFamily: fonts.medium,
          }}>
          Settings
        </Text>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontFamily: fonts.medium,
              marginVertical: 15,
            }}>
            Follow us
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp(3),
            paddingRight: '40%',
            marginVertical: wp(4),
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/')}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../../assets/social_logo/instagram.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/')}>
            <Image
              style={{ height: 30, width: 30 }}
              tintColor="#1877F2"
              source={require('../../assets/social_logo/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com/')}>
            <Image
              style={{ height: 30, width: 30 }}
              tintColor="#B72658"
              source={require('../../assets/social_logo/social-media.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/')}>
            <Image
              style={{ height: 38, width: 38 }}
              source={require('../../assets/social_logo/youtube.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('Button Clicked:', item.title);
                  if (item.title === 'Create reminders') {
                    navigation.navigate('reminder'); 
                  }
                  else if (item.title === 'Share innertune app') {
                    handleShare(); 
                  }
                  else if (item.title.trim() === 'Rate innertune on Googleplay') {
                    handleRateApp(); 
                  }

                }}
              >
                <View
                  style={{
                    height: hp(7),
                    width: wp(94),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#4A4949',
                    borderRadius: 10,
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: '5%',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: '400',
                        fontFamily: fonts.medium,
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      tintColor="#D1CECE"
                      source={item.image}
                      style={styles.image}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginVertical: 10,
              fontFamily: fonts.bold,
            }}>
            Partner Program
          </Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              height: hp(7),
              width: wp(94),
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#4A4949',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: '400',
                  fontFamily: fonts.medium,
                }}>
                Get premium
              </Text>
              <Image
                source={require('../../assets/flaticon/handshake.png')}
                style={{
                  height: hp(5),
                  width: wp(8),
                  borderRadius: 20,
                  tintColor: '#D1CECE',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginVertical: 10,
              fontFamily: fonts.bold,
            }}>
            Suggestion
          </Text>
        </View>
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.title === 'Report a bug') {
                  handleReportBug(); 
                }
               else if (item.title === 'Suggest an app improvement') {
                  navigation.navigate('SuggestImprovementScreen');
                }
                else if (item.title === 'Suggest an affirmation') {
                  navigation.navigate('SuggestAffirmationScreen'); 
                }
              }}
            >
              <View
                style={{
                  height: hp(7),
                  width: wp(94),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#4A4949',
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: '5%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '400',
                      fontFamily: fonts.medium,
                    }}>
                    {item.title}
                  </Text>
                  <Image
                    tintColor="#D1CECE"
                    source={item.image}
                    style={styles.image}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={handleManageSubscription}>
          <View
            style={{
              height: hp(7),
              width: wp(94),
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#4A4949',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: '400',
                  fontFamily: fonts.medium,
                }}>
                Manage subscription
              </Text>
              <Image
                source={require('../../assets/flaticon/star.png')}
                style={{
                  height: hp(3),
                  width: wp(7),
                  borderRadius: 20,
                  tintColor: '#D1CECE',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginVertical: 10,
              fontFamily: fonts.bold,
            }}>
            Account
          </Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={data3}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  height: hp(7),
                  width: wp(94),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#4A4949',
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    if (item.title === 'Sign out') {
                      Alert.alert(
                        'Logout',
                        'Are you sure you want to logout?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Logout',
                            onPress: async () => {
                              await storage.clear();
                              navigation.reset({
                                index: 0,
                                routes: [{ name: 'login' }],
                              });
                            },
                            style: 'destructive',
                          },
                        ],
                        { cancelable: true },
                      );
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: '5%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '400',
                      fontFamily: fonts.medium,
                    }}>
                    {item.title}
                  </Text>
                  <Image
                    tintColor="#D1CECE"
                    source={item.image}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </Background>
  );
};
export default Setting;

const styles = StyleSheet.create({
  image: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
  },
});