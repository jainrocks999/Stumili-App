import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
import {fonts} from '../../../Context/Conctants';
const Remindermodal1 = ({onPress}) => {
  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();

  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };
  console.log('thiss vidzxc', visible);
  return (
    <View style={{flex: 1, backgroundColor: '#111'}}>
      <View style={styles.bottomSheetContent}>
        <TouchableOpacity
          onPress={() => {
            handleModalPress('Remindmodal2');
          }}>
          <View style={styles.card}>
            <LinearGradient
              start={{x: 1.4, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0, 1]}
              colors={['#D485D1', '#B72658']}
              style={styles.linearGradient}>
              <Image
                source={require('../../../assets/music.jpg')}
                style={{height: hp(15), width: wp(30), borderRadius: 20}}
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
                    fontFamily: fonts.bold,
                  }}>
                  Affirmations Notifications
                </Text>
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleModalPress('Remindmodal3');
          }}>
          <View style={styles.card}>
            <LinearGradient
              start={{x: 1.4, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0, 1]}
              colors={['#D485D1', '#B72658']}
              style={styles.linearGradient}>
              <Image
                source={require('../../../assets/music.jpg')}
                style={{height: hp(15), width: wp(30), borderRadius: 20, }}
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
                    fontFamily: fonts.bold,
                  }}>
                  Daily Practice Reminders
                </Text>
              </View>
            </LinearGradient>
          </View>
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

export default Remindermodal1;

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    height: hp(15),
    width: wp(80),
    borderColor: 'black',
    alignSelf: 'center',
    margin: '5%',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'orange',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },
});
