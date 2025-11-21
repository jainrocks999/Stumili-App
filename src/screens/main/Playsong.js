import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Playlistdetails from '../Tab/Playlistdetails';
import Feather from 'react-native-vector-icons/Feather';
import Tts from 'react-native-tts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Mymodal from '../../components/molecules/Modal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {} from 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch} from 'react-redux';
import {setupPlayer} from '../../utils/Setup';
// import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import {fonts} from '../../Context/Conctants';
import storage from '../../utils/StorageService';
import {MusicPlayerContext} from '../../Context/MusicPlayerConstaxt';
const data = [
  {
    id: '1',
    title: 'Voice',
    image: require('../../assets/profilepic/profile2.jpg'),
  },
  {id: '2', title: 'Time', image: require('../../assets/timer.jpg')},
  {id: '3', title: 'Music', image: require('../../assets/music1.jpg')},
];

const Playsong = ({route}) => {
  const indexxxx = route.params.index;
  const {screens} = useSelector(state => state.home);

  const {
    currentTrack,
    setCurrentTrack,
    maxTimeInMinutes,
    setMaxTimeInMinutes,
    progress,
    setProgress,
    isPaused,
    setIsPaused,
    voices,
    ttsStatus,
    selectedVoice,
    setSelectedVoice,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
    affirmations,
    readText,
    player,
    setVolume,
    updateSpeechRate,
    updateSpeechPitch,
    onVoicePress,
    handlePlayPauseClick,
    visibleIndex,
    setVisibleIndex,
    flatListRef,
    reset,
  } = useContext(MusicPlayerContext);
  useEffect(() => {
    reset();
  }, []);
  const dispatch = useDispatch();
  // const flatListRef = useRef(null);
  const [bgVolume, setBgVolume] = useState(0.1);

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();

  const getAffirmation = async () => {
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
      navigation: false,
      url: 'affirmation',
      item: false,
      page: '',
    });
  };

  const handleTabPress = async title => {
    setSelectedTab(title);
    setVisible(true);
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    if (title == 'Music') {
      dispatch({
        type: 'home/bg_sound_request',
        token,
        url: 'bgSound',
        user_id: user,
      });
      dispatch({
        type: 'home/bg_categories_request',
        token,
        url: 'bgCategories',
        user_id: user,
      });
    }
  };

  const currentTimeRef = useRef(0);

  useEffect(() => {
    player('Sleeping.wav');
    Tts.setDefaultPitch(1)
    Tts.setDefaultRate(0.35); 
    setIsPaused(false);
  }, []);

  const path = Platform.select({
    android: 'asset:/files/',
    ios: RNFS.MainBundlePath + '/files/',
  });

  const setVovluem = async value => {
    // await TrackPlayer.setVolume(value);
    setBgVolume(value);
  };
  const getmodified = (array, indexs, bool) => {
    return array.map((item, index) => {
      if (index == indexs) {
        return {...item, is_favorite: bool};
      } else {
        return item;
      }
    });
  };
  const handleHeartPress = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const modified = getmodified(affirmations, index, true);
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: '',
      affirmation_id: item.id,
      url: 'createFavoriteList',
      navigation,
      token,
      data: modified,
    });
  };
  const removeFavroit = async (item, index) => {
  
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const modified = getmodified(affirmations, index, false);
    dispatch({
      type: 'home/removeFavriout_request',
      url: 'removeFavoriteList',
      user_id: user,
      favorite_id: item?.favorite_id,
      category_id: item?.id,
      token,
      isCat: false,
      data: modified,
    });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/music.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            backgroundColor: '#191919',
            height: hp(100),
            zIndex: 1,
            opacity: 0.93,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{height: hp(5), marginLeft: '5%'}}>
              <Icon
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={30}
                color="white"
              />
            </View>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: 'black',
                elevation: 3,
                shadowColor: '#fff',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: wp(50),
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  fontSize: hp(2.5),
                  fontWeight: '600',
                  marginHorizontal: 10,
                  // fontFamily: 'Poppins-Medium',
                  color: 'white',
                  fontFamily: fonts.medium,
                }}>
                Affirmations
              </Text>
            </View>
            <View
              style={{
                elevation: 5,
                shadowColor: '#fff',
                height: hp(6),
                width: hp(6),
                borderWidth: 1,
                borderRadius: hp(3.5),
                overflow: 'hidden',
                // borderColor: '#fff',
                backgroundColor: '#fff',
              }}>
              <Image
                source={require('../../assets/music.jpg')}
                style={{
                  height: '100%',
                  width: '100%',
                  marginLeft: '5%',
                  borderRadius: hp(3),
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(15),
              alignSelf: 'center',
              marginTop: hp(60),
              right: wp(10),
              position: 'absolute',
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{zIndex: 2}}
              onPress={() => {
                !affirmations[visibleIndex].is_favorite
                  ? handleHeartPress(affirmations[visibleIndex], visibleIndex)
                  : removeFavroit(affirmations[visibleIndex], visibleIndex);
              }}>
              <FontAwesome
                name={
                  affirmations[visibleIndex]?.is_favorite ? 'heart' : 'heart-o'
                }
                size={30}
                color={
                  affirmations[visibleIndex]?.is_favorite ? '#B72658' : 'white'
                }
              />
            </TouchableOpacity>

            <FontAwesome
              name="repeat"
              size={30}
              color="white"
              marginHorizontal="22%"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu');
              }}>
              <Entypo name="dots-three-horizontal" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{height: hp(100)}}>
            <FlatList
              ref={flatListRef}
              pagingEnabled
              initialScrollIndex={0}
              showsVerticalScrollIndicator={false}
              data={affirmations}
              renderItem={({item, index}) =>
                true ? (
                  <View style={{height: hp(100)}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: wp(70),
                        position: 'absolute',
                        top: '10%',
                      }}>
                      <Text style={styles.text}>{item?.affirmation_text}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={{height: hp(100)}} />
                )
              }
              keyExtractor={(item, index) => index.toString()}
              onViewableItemsChanged={async ({viewableItems, changed}) => {
                const newIndex = viewableItems[0].index;
                readText(affirmations[newIndex].affirmation_text); // Read text when view changes
                setVisibleIndex(newIndex);
                setIsPaused(false);
                if (isPaused & (progress >= 100)) {
                  console.log('here');
                  setProgress(0);
                  currentTimeRef.current = 0;
                }
              }}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => handlePlayPauseClick()}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '20%',
            }}>
            <Image
              source={
                isPaused
                  ? require('../../assets/flaticon/play.png')
                  : require('../../assets/flaticon/pause.png')
              }
              style={{
                height: hp(2.5),
                width: hp(2.5),
                tintColor: !isPaused ? '#fff' : '#fff',
                position: 'absolute',
                zIndex: 0,
              }}
            />
            
            <CircularProgress
              value={progress}
              radius={hp(4.5)}
              // progressValueFontSize={wp(1)}
              duration={200}
              progressValueColor={'#ecf0f1'}
              maxValue={100}
              inActiveStrokeColor="#fff"
              showProgressValue={false}
              activeStrokeWidth={wp(0.8)}
              inActiveStrokeWidth={wp(0.8)}
              activeStrokeColor="#B72658"
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',

              height: hp(10),
              width: wp(100),
              position: 'absolute',
              bottom: hp(3),
            }}>
            <FlatList
              data={data}
              horizontal={true}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleTabPress(item.title)}>
                  <View
                    style={{
                      width: wp(30),
                      height: hp(5.5),
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      backgroundColor:
                        selectedTab === item.title ? '#000000' : '#DEDEDE',
                      borderRadius: hp(5),
                      marginHorizontal: wp(1),
                    }}>
                    <Text
                      style={{
                        color: selectedTab === item.title ? 'white' : 'black',
                        fontSize: hp(1.8),
                        // fontWeight: '400',
                        right: wp(3),
                        fontFamily: fonts.medium,
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={item.image}
                      style={{
                        width: hp(5.1),
                        color: selectedTab === item.image ? 'white' : 'black',
                        height: hp(5.1),
                        borderRadius: hp(7),
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <Mymodal
          title={selectedTab}
          onClose={() => setVisible(false)}
          onVolumeChange={setVovluem}
          bgVolume={bgVolume}
          visible={visible}
          voices={voices}
          onVoicePress={onVoicePress}
          selectedVoice={selectedVoice}
          maxTimeInMinutes={maxTimeInMinutes}
          onTimePress={item => {
            setMaxTimeInMinutes(item.title);
          }}
          onMusicPress={player}
        />
      </ImageBackground>
    </View>
  );
};

export default Playsong;

const styles = StyleSheet.create({
  card: {
    height: hp(6),
    width: wp(67),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 26,
    backgroundColor: '#000000',
  },
  text: {
    fontSize: hp(4.0),
    color: '#fff',
    width: wp(70),
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
});
