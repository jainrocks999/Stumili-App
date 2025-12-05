import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
export const heightPercent = (percent ) => {
  return (height * percent) / 100;
};
export const widthPrecent = (percent) => {
  return (width * percent) / 100;
};
