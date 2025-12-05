import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import Slider from '@react-native-community/slider';
import Voice from '../../screens/Tab/Voice';
import Time from '../../screens/Tab/Time';
import Music from '../../screens/Tab/Music';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Playlistdetails from '../../screens/Tab/Playlistdetails';
const data = [
  {id: '1', title: 'Voice'},
  {id: '2', title: 'Time'},
  {id: '3', title: 'Music'},
  {id: '4', title: 'Playlistdetails'},
];
const Mymodal = ({
  visible,
  onClose,
  title,
  voices,
  onVoicePress,
  selectedVoice,
  maxTimeInMinutes,
  onTimePress,
  ttsVolume,
  onMusicPress,
  onVolumeChange,
  bgVolume,
}) => {
  console.log(title);
  const [selectedTab, setSelectedTab] = useState('Voice');
  const handleTabPress = title => {
    setSelectedTab(title);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'flex-end'}}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={{
            backgroundColor: 'white',
            height: hp(
              title == 'Voice'
                ? 50
                : title == 'Music'
                ? 97
                : title == 'Playlistdetails'
                ? 97
                : 40,
            ),
            borderTopEndRadius: 30,
            overflow: 'hidden',
            borderTopStartRadius: 30,
          }}>
          {title == 'Voice' ? (
            <Voice
              selectedVoice={selectedVoice}
              voice={voices}
              onPress={item => onVoicePress(item)}
            />
          ) : title == 'Music' ? (
            <Music
              bgVolume={bgVolume}
              onVolumeChange={onVolumeChange}
              onPress={onMusicPress}
            />
          ) : title == 'Time' ? (
            <Time
              onPress={item => onTimePress(item)}
              maxTimeInMinutes={maxTimeInMinutes}
            />
          ) : (
            <Playlistdetails />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default Mymodal;
const styles = StyleSheet.create({});
