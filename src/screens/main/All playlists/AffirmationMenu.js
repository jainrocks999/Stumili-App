import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../components/atoms/responsive';
import {fonts} from '../../../Context/Conctants';
import Buttun from '../../Auth/compoents/Buttun';

const AffirmationMenu = ({affirmations, visible, onClose, onSelect}) => {
  return (
    <Modal visible={visible} animationType="fade">
      <View style={{flex: 1, backgroundColor: '#191919'}}>
        <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#fff',
              marginTop: '5%',
              marginBottom: '5%',
              fontSize: wp(6),
              fontFamily: fonts.bold,
            }}>
            Select affermation
          </Text>
          <View style={{height: '85%'}}>
            <FlatList
              data={affirmations}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp(7),
                    width: wp(90),
                    marginVertical: hp(1),
                    backgroundColor: '#4A4949',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(4),
                  }}>
                  <Text style={styles.text}>
                    {item.affirmation_text.substring(0, 40)}
                  </Text>

                  <View style={{justifyContent: 'center'}}>
                    <AntDesign
                      onPress={() => {
                        onSelect(item);
                      }}
                      name={!false ? 'pluscircleo' : 'minuscircleo'}
                      size={22}
                      color={!false ? '#fff' : 'red'}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <Buttun
          style={{
            alignSelf: 'center',
            marginTop: '-6%',
            width: '60%',
          }}
          title={'Add'}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

export default AffirmationMenu;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: wp(4.5),
    fontFamily: fonts.regular,
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
});
