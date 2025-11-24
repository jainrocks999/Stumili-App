import React, { useEffect } from 'react';
import { Clipboard, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { LogBox, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import SoundPlayer from 'react-native-sound-player';
import { MusicPlayerProvider } from './src/Context/MusicPlayerConstaxt';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from './src/components/atoms/responsive';
import { View } from 'react-native';
import Root from './src';
const App = () => {
  LogBox.ignoreAllLogs();

  const getCrashlyticsDetail = async () => {
    try {
      crashlytics().setUserId('admin@admin.com');

      crashlytics().setAttribute('username', 'admin@admin.com');
    } catch (err) {
      crashlytics().recordError(err);
    }
  };
  // const initiateNotifiction = () => {
  //   PushNotification.deleteChannel('default-channel-id');
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'default-channel-id',
  //       channelName: 'My channel',
  //       soundName: 'notification.mp3',
  //       importance: 4,
  //       vibrate: true,
  //       playSound: true,
  //     },
  //     created => console.log(`Notification channel created '${created}'`),
  //   );
  //   PushNotification.configure({
  //     onRegister: token => {
  //       console.log(token.token);
  //       // Clipboard.setString(token.token);
  //     },
  //     onNotification: notification => {
  //       PushNotification.localNotification({
  //         title: notification.title,
  //         message: notification.message,
  //         actions: ['Open', 'Cancle'],
  //         largeIcon: 'ic_launcher',
  //         largeIconUrl:
  //           'https://cdn.iconscout.com/icon/premium/png-512-thumb/online-url-encoder-decod-5-53646.png?f=webp&w=256',
  //         smallIcon: 'ic_notification',
  //         bigText:
  //           'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)',
  //         ignoreInForeground: true,
  //       });
  //     },
  //   });
  // };
  useEffect(() => {
    // initiateNotifiction();
    // crashlytics().log('analytics just mounted');
    crashlytics().crash();
    // getCrashlyticsDetail();
    return () => {
      crashlytics().log('analitics just unmounted');
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Root />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
