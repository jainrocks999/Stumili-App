import React from 'react';
import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import List from '../CategoriesList';
import Loader from '../Loader';
import {widthPrecent as wp, heightPercent as hp} from '../atoms/responsive';
import {fonts} from '../../Context/Conctants';
import Entypo from 'react-native-vector-icons/Entypo';

const CateGoriesModal = ({
  visible,
  title,
  onCLose,
  onCategories,
  data,
  loading,
}) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={{flex: 1, backgroundColor: '#191919'}}>
        <Loader loading={loading} />
        <View
          style={{
            height: hp(8),
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            // borderWidth: 1,
            alignItems: 'center',
            paddingHorizontal: wp(3),
          }}>
          <Entypo
            onPress={onCLose}
            name="chevron-left"
            size={30}
            color={'white'}
          />
          <Text
            style={{
              fontFamily: fonts.bold, // fontFamily: 'Montserrat',
              fontSize: hp(2.5),
              color: 'white',
              marginVertical: 10,
            }}>
            Discover {title}
          </Text>
          <View style={{width: '20%'}} />
        </View>
        <ScrollView>
          <List
            onPress={item => onCategories(item)}
            cate={data}
            onPressPlay={onCategories}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CateGoriesModal;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: '89%',
    borderRadius: wp(1),
    elevation: 5,
    shadowColor: 'green',
  },
  text: {
    marginLeft: '2%',
    fontSize: wp(4),
    fontFamily: fonts.medium,
    color: 'black',
  },
  text2: {
    width: wp(60),
    marginLeft: 5,
    color: 'white',
    fontSize: hp(2.5),
    fontFamily: fonts.regular,
  },
});
