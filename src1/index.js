import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {MusicPlayerProvider} from './Context/MusicPlayerConstaxt';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from './components/atoms/responsive';

const Root = () => {
  const {affirmations, screens} = useSelector(state => state.home);
  const dispatch = useDispatch();
  console.log('this sicr', screens);
  return (
    <MusicPlayerProvider>
      <NavigationContainer
        onStateChange={state => {
          const name = state?.routes[state.index].name;
          dispatch({
            type: 'home/setPageChange',
            payload: {prev: screens.current, current: name},
          });
        }}>
        <AppNavigator />
      </NavigationContainer>
      {/* {affirmations.length > 0 && screens.current != 'playsong' ? (
        <View
          style={{
            height: 60,
            width: '100%',
            position: 'absolute',
            bottom: hp(11),
            zIndex: 1,
            backgroundColor: '#fff',
          }}></View>
      ) : null} */}
    </MusicPlayerProvider>
  );
};

export default Root;

const styles = StyleSheet.create({});
