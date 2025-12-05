import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
import Buttun from '../../Auth/compoents/Buttun';
import {fonts} from '../../../Context/Conctants';
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
const Remindmodal4 = ({onPressClose}) => {
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentTime, setCurrentTime] = useState('9:00');
  // const handleSelectedDay = items => {

  //   if (selectedDay.includes(items.id)) {
  //     const filter = [...selectedDay].filter((item, index) => item != items.id);
  //     console.log(filter);
  //     setSelectedDay(filter);
  //   } else {
  //     setSelectedDay([...selectedDay, items.id]);
  //   }
  // };
  const handleSelectedDay = (dayId) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(dayId)
        ? prevSelected.filter((id) => id !== dayId)
        : [...prevSelected, dayId]
    );
  };
  const updateTime = increment => {
    let [hour, minute] = currentTime.split(':');
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

    setCurrentTime(hour + ':' + minute);
  };

  const handleSave = () => {
    console.log('Saved Days:', selectedDays);
    console.log('Selected Time:', currentTime);
    // API call ya state update ke liye logic add karein
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: '500',
            color: 'white',
            fontFamily: fonts.bold,
          }}>
          Daily Practice
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '3.3%',
        }}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '6%',
          paddingHorizontal: '5%',
          alignItems: 'center',
        }}>
        <Text
          style={{color: 'white', fontSize: wp(5), fontFamily: fonts.medium}}>
          When
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '55%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => updateTime(false)}
            style={styles.cicrcle}>
            <Entypo name="minus" style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={{color: 'white', fontSize: wp(6), fontFamily: fonts.medium}}>
            {currentTime}
          </Text>
          <TouchableOpacity
            onPress={() => updateTime(true)}
            style={styles.cicrcle}>
            <Entypo name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '6.3%',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6%',
          paddingHorizontal: '4.8%',
        }}>
        <Text
          style={{color: 'white', fontSize: wp(5), fontFamily: fonts.medium}}>
          {' '}
          Repeat{' '}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: hp(2),
        }}>
        {/* <FlatList
          data={Img}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.listCircle}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: '#B72658',
                  fontWeight: '500',
                  fontFamily: fonts.bold,
                }}>
                {item.title}
              </Text>
            </View>
          )}
        /> */}
         <FlatList
          data={Img}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = selectedDays.includes(item.id);
            return (
              <TouchableOpacity
                onPress={() => handleSelectedDay(item.id)}
                style={[
                  styles.listCircle,
                  { backgroundColor: isSelected ? "#B72658" : "#fff" } // Selected: Pink, Unselected: White
                ]}
              >
                <Text
                  style={{
                    marginLeft: wp(1.5),
                    color: isSelected ? "#fff" : "#B72658", 
                    fontWeight: "500",
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
      {/* <View
        style={{
          alignSelf: 'center',
          bottom: hp(6),
          width: '100%',
          position: 'absolute',
        }}> */}
        {/* <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(60),
            borderRadius: 10,
          }}
          // onPress={() => {
          //   navigation.navigate('saveplaylist');
          // }}
        >
          <Text style={styles.loginText}>Close</Text>
        </TouchableOpacity> */}
        {/* <Buttun
          style={{
            alignSelf: 'center',
            height: hp(7),
            width: '60%',
            borderRadius: wp(2),
            elevation: 4,
          }}
          onPress={onPressClose}
          title="Close"
        />
      </View> */}
       <View style={{ alignSelf: 'center', bottom: hp(6), width: '100%', position: 'absolute', flexDirection: 'row', justifyContent: 'space-around' , paddingHorizontal:wp(2)}}>
        <Buttun
          style={{
            marginLeft: wp(1),
            height: hp(7),
            width: '47%',
            borderRadius: wp(2),
            elevation: 4,
          }}
          onPress={onPressClose}
          title="Close"
        />
        <Buttun
          style={{
            height: hp(7),
            width: '47%',
            borderRadius: wp(2),
            elevation: 4,
            backgroundColor: '#B72658',
          }}
          onPress={handleSave}
          title="Save"
        />
      </View>
    </SafeAreaView>
  );
};

export default Remindmodal4;

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
  cicrcle: {
    height: hp(5.5),
    width: hp(5.5),
    backgroundColor: '#fff',
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#B72658',
    fontSize: wp(7),
    textAlign: 'center',
    // marginTop: '-5%',
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
