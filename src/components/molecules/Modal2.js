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
import React, { useState } from 'react';
import { heightPercent as hp, widthPrecent as wp } from '../atoms/responsive';
import Remindermodal1 from '../../screens/main/Reminder/Remindermodal1';
import Remindmodal5 from '../../screens/main/Reminder/Remindmodal5';
import Remindmodal4 from '../../screens/main/Reminder/Remindmodal4';
import Remindmodal3 from '../../screens/main/Reminder/Remindmodal3';
import Remindmodal2 from '../../screens/main/Reminder/Remindmodal2';
const data = [
  { id: '1', titles: 'Remindermodal1' },
  { id: '2', titles: 'Remindmodal2' },
  { id: '3', titles: 'Remindmodal3' },
  { id: '4', titles: 'Remindmodal4' },
  { id: '5', titles: 'Remindmodal5' },
];
const Modal2 = ({ visible, onClose, titles }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: 'white',
            height: hp(
              titles == 'Remindermodal1'
                ? 50
                : titles == 'Remindmodal2'
                ? 95
                : titles == 'Remindmodal3'
                ? 90
                : titles == 'Remindmodal4'
                ? 90
                : 90,
            ),
            borderTopEndRadius: 30,
            overflow: 'hidden',
            borderTopStartRadius: 30,
          }}
        >
          {titles == 'Remindermodal1' ? (
            <Remindermodal1 onPress={onClose} />
          ) : titles == 'Remindmodal2' ? (
            <Remindmodal2 onPress={onClose} />
          ) : titles == 'Remindmodal3' ? (
            <Remindmodal4 onPressClose={onClose} />
          ) : titles == 'Remindmodal4' ? (
            <Remindmodal4 onPressClose={onClose} />
          ) : (
            <Remindmodal5 />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Modal2;

const styles = StyleSheet.create({});
