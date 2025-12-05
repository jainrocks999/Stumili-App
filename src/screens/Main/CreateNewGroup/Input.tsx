import React from 'react';
import { View, TextInput } from 'react-native';
import { Fonts, FontSize } from '@constants';
import Smily from './svg/smily.svg'; // your emoji icon

type InputProps = {
  placeholder: string;
  multiline?: boolean; // 👈 true = long text, false = single line
  value?: string;
  onChangeText?: (text: string) => void;
};

const Input = ({ placeholder, multiline = false, value, onChangeText }: InputProps) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#F3F3F4',
        borderRadius: 18,
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: multiline ? 10 : 0,
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        minHeight: multiline ? 120 : 48,
      }}
    >
      <TextInput
        placeholderTextColor={'#393C43'}
        style={{
          flex: 1,
          fontSize: FontSize.SIXTEEN,
          fontFamily: Fonts.WorkSans.Regular,
          color: '#111214',
          textAlignVertical: multiline ? 'top' : 'center',
          minHeight: multiline ? 100 : undefined,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
      />
    {!multiline?  <Smily height={25} width={25} style={{ marginTop: multiline ? 5 : 0 }} />:null}
    </View>
  );
};

export default Input;
