import {React, useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import CircularProgress from 'react-native-circular-progress-indicator';
import {MusicPlayerContext} from '../../Context/MusicPlayerConstaxt';
import {fonts} from '../../Context/Conctants';
import {useNavigation} from '@react-navigation/native';
const PlayPopup = () => {
  const {
    progress,
    affirmations,
    handlePlayPauseClick,
    isPaused,
    setProgress,
    getNameImage,
  } = useContext(MusicPlayerContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: hp(10.5),
        backgroundColor: '#191919 ',
        borderTopStartRadius: wp(6),
        borderTopEndRadius: wp(6),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: '#fff',
        borderColor: 'lightgrey',
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('playsong')}
        style={{marginLeft: '5%', flexDirection: 'row'}}>
        <View style={{elevation: 2, shadowColor: '#fff'}}>
          <Image
            style={{
              justifyContent: 'center',
              // alignSelf: 'flex-end',
              // alignItems: 'center',
              height: wp(10),
              width: wp(10),
              marginBottom: '2%',
              borderRadius: wp(10),
            }}
            source={{uri: getNameImage().image}}
          />
        </View>
        <View style={{marginLeft: '10%',width:'60%'}}>
          <Text
          numberOfLines={2}
            style={{
              color: '#fff',
              fontSize: wp(3.5),
              fontWeight: fonts.bold,
            }}>
            {getNameImage().name}
          </Text>
          <Text style={{color: '#fff'}}>{getNameImage().title}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePlayPauseClick()}
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-end',
          alignItems: 'center',
          marginBottom: '2%',
          marginRight: '5%',
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
            tintColor: !isPaused ? '#ccc' : '#ccc',
            position: 'absolute',
            zIndex: 0,
          }}
        />
        <CircularProgress
          value={progress}
          radius={hp(3.5)}
          duration={200}
          progressValueColor={'#ecf0f1'}
          maxValue={100}
          inActiveStrokeColor="#ccc"
          showProgressValue={false}
          activeStrokeWidth={wp(0.8)}
          inActiveStrokeWidth={wp(0.8)}
          activeStrokeColor="#B72658"
        />
      </TouchableOpacity>
    </View>
  );
};
export default PlayPopup;
