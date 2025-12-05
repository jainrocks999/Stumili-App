import { Colors, Fonts, FontSize } from '@constants';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
type buttonProps = {
  title: string;
  Icon?: any;
  color: string;
  isBorder?:boolean
  onPress:()=>void
};
const ModalButtons: React.FC<buttonProps> = ({ title, Icon, color,isBorder=false,onPress=()=>{} }) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        backgroundColor: color,
        width: '90%',
        height: 48,
        borderRadius: 20,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth:isBorder?1.5:0,
        borderColor:"#4FAF5A"
      }}
    >
      <Text
        style={{
          fontSize: FontSize.FOURTEEN,
          fontFamily: Fonts.Poppins.SemiBold,
          color:isBorder?Colors.BLACK: Colors.WHITE,
        }}
      >
        {title}
      </Text>
      {Icon ? <Icon height={15} width={15} /> : null}
    </TouchableOpacity>
  );
};
export default ModalButtons;
