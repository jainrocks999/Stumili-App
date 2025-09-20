import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const AudioRecorder = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={30}
          color="white"
        />
        <Text style={styles.headerTitle}> Your recordings</Text>
      </View>
      <View style={{marginTop: '35%', alignItems: 'center'}}>
        <Image
          source={require('../../assets/playlist.png')}
          style={{
            height: hp(6),
            width: wp(13),

            tintColor: 'white',
          }}
        />
        <Text style={styles.title}>Here will appear</Text>
        <Text style={[styles.title, {marginTop: '1%'}]}>your recordings</Text>
      </View>
    </View>
  );
};
export default AudioRecorder;
const styles = StyleSheet.create({
  header: {
    height: hp(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '4%',
  },
  headerTitle: {
    marginLeft: '8%',
    color: 'white',
    fontSize: wp(4.5),
    fontWeight: '600',
  },
  title: {
    color: 'white',
    marginTop: '5%',
    fontSize: wp(6),
    width: '50%',
    fontWeight: '800',
    fontFamily: 'AvenirNext-DemiBold',
    marginLeft: '8%',
  },
});
