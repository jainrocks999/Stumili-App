import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import Modal2 from '../../components/molecules/Modal2';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../Context/Conctants';
const data = [
  {id: '1', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
  {id: '2', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
  {id: '3', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
  {id: '4', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
];
const data2 = [
  {id: '1', title: 'Affirmations', time: '09:00', frequency: '1x Every Day'},
  {id: '2', title: 'Affirmations', time: '09:00', frequency: '1x Every Day'},
  {id: '3', title: 'Affirmations', time: '09:00', frequency: '1x Every Day'},
];
const Reminder = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggle = itemId => {
    setSelectedToggles(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();
  const [selectedToggles, setSelectedToggles] = useState({});
  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };
  console.log('thiss vidzxc', visible);
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: hp(5), marginLeft: '15%'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{height: hp(5), width: wp(100)}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal: '8%',
              color: 'white',
              fontFamily: fonts.bold,
            }}>
            Set your reminders
          </Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 10}}>
        <FlatList
          data={data}
          pagingEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleModalPress('Remindmodal4');
              }}>
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
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '8%',
                    marginTop: '3%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: '500',
                      fontFamily: fonts.bold,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '400',
                      fontFamily: fonts.medium,
                    }}>
                    {item.time}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '7%',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '300',
                      fontFamily: fonts.medium,
                    }}>
                    {item.frequency}
                  </Text>
                  <ToggleSwitch
                    isOn={selectedToggles[item.id]}
                    onColor="#DEDEDE"
                    circleColor={
                      selectedToggles[item.id] ? '#B72658' : '#191919'
                    }
                    offColor="#DEDEDE"
                    size="medium"
                    onToggle={() => handleToggle(item.id)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleModalPress('Remindmodal5');
              }}>
              <View
                style={{
                  height: hp(10),
                  width: wp(90),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 30,
                  marginVertical: 10,
                  padding: '6%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '10%',
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
                    {item.time}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '10%',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '300'}}>
                    {item.frequency}
                  </Text>
                  <ToggleSwitch
                    isOn={selectedToggles[item.id]}
                    onColor="#426e56"
                    offColor="#434343"
                    size="medium"
                    onToggle={() => handleToggle(item.id)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        /> */}
      </ScrollView>
      <View style={{alignSelf: 'center', position: 'absolute', bottom: hp(8)}}>
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
          onPress={() => handleModalPress('Remindermodal1')}>
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
            start={{x: 1.4, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0, 1]}
            colors={['#D485D1', '#B72658']}>
            <Text style={styles.loginText}>Add New Reminder</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Modal2
        title={selectedModal}
        onClose={() => setVisible(false)}
        visible={visible}
        titles={selectedModal}
      />
    </View>
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
