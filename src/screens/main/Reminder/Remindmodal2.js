import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Buttun from '../../Auth/compoents/Buttun';
import { fonts } from '../../../Context/Conctants';
import Api from '../../../redux/api';
import storage from '../../../utils/StorageService';
import Toast from 'react-native-simple-toast';
const Img = [
  {
    id: '1',

    title: 'M  ',
  },
  {
    id: '2',

    title: 'T ',
  },
  {
    id: '3',

    title: 'W ',
  },
  {
    id: '4',

    title: 'T ',
  },
  {
    id: '5',

    title: 'F  ',
  },
  {
    id: '6',

    title: 'S ',
  },
  {
    id: '7',

    title: 'S',
  },
];

const Remindmodal2 = ({ onPress }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const handleDaySelection = dayId => {
    setSelectedDays(prevSelected =>
      prevSelected.includes(dayId)
        ? prevSelected.filter(id => id !== dayId)
        : [...prevSelected, dayId],
    );
  };
  const [currentTime1, setCurrentTime1] = useState('9:00');
  const [currentTime2, setCurrentTime2] = useState('9:00');
  const updateTime1 = increment => {
    let [hour, minute] = currentTime1.split(':');
    hour = parseInt(hour);
    minute = parseInt(minute);

    if (increment) {
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour = (hour + 1) % 24;
      }
    } else {
      minute -= 30;
      if (minute < 0) {
        minute = 30;
        hour = (hour - 1 + 24) % 24;
      }
    }

    hour = (hour < 10 ? '0' : '') + hour;
    minute = (minute < 10 ? '0' : '') + minute;

    setCurrentTime1(hour + ':' + minute);
  };
  const updateTime2 = increment => {
    let [hour, minute] = currentTime2.split(':');
    hour = parseInt(hour);
    minute = parseInt(minute);

    if (increment) {
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour = (hour + 1) % 24;
      }
    } else {
      minute -= 30;
      if (minute < 0) {
        minute = 30;
        hour = (hour - 1 + 24) % 24;
      }
    }

    hour = (hour < 10 ? '0' : '') + hour;
    minute = (minute < 10 ? '0' : '') + minute;

    setCurrentTime2(hour + ':' + minute);
  };
  const [reapeat, setRepeat] = useState(7);

  const prepareApiData = async () => {
    const [token, user_id] = await Promise.all([
      storage.getItem(storage.TOKEN),
      storage.getItem(storage.USER_ID),
    ]);
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const dayMap = {
      0: 'sun',
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
    };

    const dayData = {};
    Object.keys(dayMap).forEach(dayId => {
      dayData[dayMap[dayId]] = selectedDays.includes(dayId.toString());
    });

    const apiData = {
      token,
      data: {
        user_id: 1,
        affirmation_id: 1,
        playlist_id: 1,
        start_at: `${dateStr} ${currentTime1}:00`,
        end_at: `${dateStr} ${currentTime2}:00`,
        r_status: 1,
        ...dayData,
        reminder_id: 0,
        repeat: reapeat,
      },
    };

    return apiData;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#191919' }}>
      <View style={{ height: '2%' }} />
      <Text
        style={{
          alignSelf: 'center',
          color: 'white',
          fontSize: wp(6),
          fontWeight: 'bold',
          fontFamily: fonts.bold,
        }}
      >
        Affirmations
      </Text>
      <View style={{ height: '2%' }} />
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.sec_container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => {
              if (reapeat != 0) {
                setRepeat(reapeat - 1);
              } else {
                setRepeat(30);
              }
            }}
            style={styles.cicrcle}
          >
            <Entypo name="minus" style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              marginTop: '-5%',
              fontFamily: fonts.medium,
            }}
          >
            {reapeat}X
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (reapeat != 30) {
                setRepeat(reapeat + 1);
              } else {
                setRepeat(0);
              }
            }}
            style={styles.cicrcle}
          >
            <Entypo name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#eee',
            marginTop: '3%',
            fontSize: wp(5),
            fontFamily: fonts.medium,
          }}
        >
          How many
        </Text>
      </View>
      <View style={{ height: '2%' }} />
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.playlisttime}>
        <Text style={styles.txt2}>Select the playlist</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txt2}>Genral </Text>
          <Feather
            name="chevron-right"
            style={[styles.txt2, { fontSize: wp(6.5), marginTop: '5%' }]}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '5%',
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.playlisttime}>
        <Text style={styles.txt2}>Start at</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => updateTime1(false)}
            style={styles.cicrcle2}
          >
            <Entypo name="minus" style={styles.icon2} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: wp(4),
              fontFamily: fonts.medium,
            }}
          >
            {currentTime1}
          </Text>
          <TouchableOpacity
            onPress={() => updateTime1(true)}
            style={styles.cicrcle2}
          >
            <Entypo name="plus" style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '5%',
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.playlisttime}>
        <Text style={styles.txt2}>Finish at</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => updateTime2(false)}
            style={styles.cicrcle2}
          >
            <Entypo name="minus" style={styles.icon2} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: wp(4),
              fontFamily: fonts.medium,
            }}
          >
            {currentTime2}
          </Text>
          <TouchableOpacity
            onPress={() => updateTime2(true)}
            style={styles.cicrcle2}
          >
            <Entypo name="plus" style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '5%',
        }}
      />
      <View style={{ height: '0%' }} />
      <View
        style={{
          marginTop: hp(2),
          alignItems: 'center',
        }}
      >
        <Text style={styles.txt2}>Repeat</Text>
        <View
          style={{
            marginTop: '2%',
            borderColor: 'white',
            height: hp(7),
          }}
        >
          <FlatList
            data={Img}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedDays.includes(item.id); // Check if selected

              return (
                <TouchableOpacity
                  onPress={() => handleDaySelection(item.id)}
                  style={[
                    styles.listCircle,
                    { backgroundColor: isSelected ? '#B72658' : '#fff' }, // Selected: Pink, Unselected: White
                  ]}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginLeft: wp(1),
                      color: isSelected ? '#fff' : '#B72658', // Selected text: White, Unselected: Pink
                      fontWeight: '500',
                      fontFamily: fonts.bold,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={{ height: '2%' }} />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            width: '65%',
            fontFamily: fonts.medium,
          }}
        >
          Remind yourself on selected Affirmations
        </Text>
      </View>
      <View style={{ height: '1%' }} />
      <Buttun
        style={{
          alignSelf: 'center',
          height: hp(7),
          width: '60%',
          borderRadius: wp(2),
          elevation: 4,
        }}
        onPress={async () => {
          try {
            const data = await prepareApiData();
            const response = await Api.API_POST_JSON({
              token: data.token,
              body: data.data,
              url: 'createReminder',
            });
            onPress();
          } catch (err) {}
        }}
        title="Create"
      />
    </View>
  );
};

export default Remindmodal2;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: hp(2),
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
  sec_container: {
    backgroundColor: '#121212',
    height: '22%',

    width: '90%',
    alignSelf: 'center',
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cicrcle: {
    height: hp(4.5),
    width: hp(4.5),
    backgroundColor: '#fff',
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cicrcle2: {
    height: hp(4),
    width: hp(4),
    backgroundColor: '#fff',
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#B72658',
    fontSize: wp(5),
    textAlign: 'center',
    // marginTop: '-5%',
  },
  icon2: {
    color: '#B72658',
    fontSize: wp(3.5),
    textAlign: 'center',
    // marginTop: '-5%',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '47%',
    justifyContent: 'space-between',
    marginTop: '0%',
    alignItems: 'center',
  },
  playlisttime: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  txt2: {
    color: 'white',
    fontSize: wp(4.5),
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: fonts.medium,
  },
  listCircle: {
    height: hp(5.5),
    width: hp(5.5),
    backgroundColor: '#fff',
    marginHorizontal: wp(1),
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
