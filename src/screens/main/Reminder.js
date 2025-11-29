import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import Modal2 from '../../components/molecules/Modal2';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../Context/Conctants';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from '../../utils/StorageService';
import Api from '../../redux/api';
import Toast from 'react-native-simple-toast';
const data = [
  {
    id: '1',
    title: 'Daily Practice',
    time: '09:00',
    frequency: '1x Every Day',
  },
  {
    id: '2',
    title: 'Daily Practice',
    time: '09:00',
    frequency: '1x Every Day',
  },
  {
    id: '3',
    title: 'Daily Practice',
    time: '09:00',
    frequency: '1x Every Day',
  },
  {
    id: '4',
    title: 'Daily Practice',
    time: '09:00',
    frequency: '1x Every Day',
  },
];
const Reminder = () => {
  const navigation = useNavigation();
  const [reminders, setReminders] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);

  const getTimeRange = (start_at, end_at) => {
    if (!start_at && !end_at) {
      return 'Invalid time';
    }
    const startTime = start_at.split(' ')[1].slice(0, 5); // "09:00"
    const endTime = end_at.split(' ')[1].slice(0, 5); // "11:30"
    const startFormatted = startTime.replace(/^0/, '');
    const endFormatted = endTime.replace(/^0/, '');

    return `${startFormatted} to ${endFormatted}`;
  };

  const getAllReminders = async bool => {
    const user_id = await storage.getItem(storage.USER_ID);
    const token = await storage.getItem(storage.TOKEN);
    try {
      const params = {
        user_id,
      };
      const url = 'reminderList';
      const response = await Api.API_GET({ url, token, params });
      if (response.status) {
        setReminders(Array.isArray(response?.data) ? response.data : []);
      } else {
        Toast.show('No remiders please create');
      }
    } catch (error) {
      Toast.show('No remiders please create');
    }
  };
  const deleteReminder = async id => {
    const user_id = await storage.getItem(storage.USER_ID);
    const token = await storage.getItem(storage.TOKEN);
    try {
      const params = {
        user_id,
        reminder_id: id,
      };
      const url = 'reminderDelete';
      const response = await Api.API_GET({ url, token, params });

      if (response.status) {
        getAllReminders();
      } else {
        Toast.show('Error');
      }
    } catch (error) {
      Toast.show('Error');
    }
  };
  useEffect(() => {
    getAllReminders(true);
  }, []);
  const [toggleLoading, setToggleLoading] = useState(false);

  const handleToggle = async item => {
    try {
      setToggleLoading(true);
      const token = await storage.getItem(storage.TOKEN);
      const response = await Api.API_POST_JSON({
        token: token,
        body: {
          ...item,
          reminder_id: item.id,
          r_status: item?.r_status == 1 ? 0 : 1,
        },
        url: 'createReminder',
      });
      await getAllReminders();
    } catch (err) {
      console.log('this is eorroro');
    } finally {
      setTimeout(() => {
        setToggleLoading(false);
      }, 1000);
    }
  };

  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();
  const [selectedToggles, setSelectedToggles] = useState({});
  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191919' }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ height: hp(5), marginLeft: '15%' }}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{ height: hp(5), width: wp(100) }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal: '8%',
              color: 'white',
              fontFamily: fonts.bold,
            }}
          >
            Set your reminders
          </Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        <FlatList
          data={reminders}
          pagingEnabled={false}
          keyExtractor={item => item?.id}
          renderItem={({ item }) => {
            const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            const selectedDays = dayKeys.filter(day => item[day] == 1);
            return (
              <TouchableOpacity
                onLongPress={() => {
                  deleteReminder(item.id);
                }}
                onPress={() => {
                  handleModalPress('Remindmodal4');
                }}
              >
                <View
                  style={{
                    height: hp(10),
                    width: wp(90),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#4A4949',
                    borderRadius: wp(2),
                    marginVertical: 10,
                    padding: '0%',
                    // alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: '8%',
                      marginTop: '3%',
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: '500',
                        fontFamily: fonts.bold,
                      }}
                    >
                      {'Dailly Practice'}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '400',
                        fontFamily: fonts.medium,
                      }}
                    >
                      {getTimeRange(item?.start_at, item?.end_at)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 30,
                      marginVertical: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '300',
                        fontFamily: fonts.medium,
                        textTransform: 'capitalize',
                      }}
                    >
                      {`${item?.repeat}X ${
                        selectedDays?.length == 7
                          ? 'Every Day'
                          : selectedDays.join(', ')
                      }`}
                    </Text>
                    {toggleLoading ? (
                      <ActivityIndicator size={'small'} color={'#B72658'} />
                    ) : (
                      <ToggleSwitch
                        isOn={item.r_status}
                        onColor="#DEDEDE"
                        circleColor={item?.r_status ? '#B72658' : '#191919'}
                        offColor="#DEDEDE"
                        size="medium"
                        onToggle={() => handleToggle(item)}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <View
        style={{ alignSelf: 'center', position: 'absolute', bottom: hp(8) }}
      >
        <TouchableOpacity
          style={{
            height: hp(6.5),
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(90),
            overflow: 'hidden',
            borderRadius: 8,
          }}
          onPress={() => handleModalPress('Remindermodal1')}
        >
          <LinearGradient
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // start={{x: 0.0, y: 0.0}}
            // end={{x: 5, y: 0.0}}
            // locations={[0, 0.4, 0.2]}
            // colors={['#B72658', '#D485D1']}
            start={{ x: 1.4, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 1]}
            colors={['#D485D1', '#B72658']}
          >
            <Text style={styles.loginText}>Add New Reminder</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Modal2
        title={selectedModal}
        onClose={() => {
          setVisible(false);
          getAllReminders();
          setSelectedModal('');
        }}
        visible={visible}
        titles={selectedModal}
      />
    </SafeAreaView>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },
});
