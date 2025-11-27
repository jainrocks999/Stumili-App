import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid, LogBox, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import store from './src/redux/store';
import Root from './src';
import crashlytics from '@react-native-firebase/crashlytics';

async function createNotificationChannel() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'my_sound',
    importance: AndroidImportance.HIGH,
  });
  return channelId;
}

async function requestPermissions() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.log('Android POST_NOTIFICATIONS Permission:', granted);
  }

  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus >= 1) {
    console.log('[Notifee] Permission granted');
  } else {
    console.log('[Notifee] Permission NOT granted');
  }
}

async function getFCMToken() {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    if (token) {
      await AsyncStorage.setItem('fcm_token', token);
      console.log('fcm token ', token);
    }
  } catch (err) {
    console.log('FCM Token Error:', err);
  }
}

async function displayNotification(remoteMessage) {
  const channelId = await createNotificationChannel();
  await notifee.displayNotification({
    title: remoteMessage?.notification?.title || 'New Notification',
    body: remoteMessage?.notification?.body || 'You have a new message.',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: { id: 'default' },
    },
    data: remoteMessage?.data,
  });
}

function initNotifications(manageLogin) {
  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('[Foreground] Notification:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  const unsubscribeBackground = messaging().onNotificationOpenedApp(
    remoteMessage => {
      console.log('[Background] Notification opened:', remoteMessage);
      if (remoteMessage?.notification?.title === 'New Message') {
        manageLogin();
      }
    },
  );

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('[Killed] Notification opened:', remoteMessage);
        if (remoteMessage?.notification?.title === 'New Message') {
          manageLogin();
        }
      }
    });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[BackgroundHandler] Message received:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  return () => {
    unsubscribeForeground();
    unsubscribeBackground();
  };
}

const App = () => {
  LogBox.ignoreAllLogs();

  const manageLogin = () => {
    console.log('Perform app-specific action on notification click');
  };

  useEffect(() => {
    requestPermissions();
    getFCMToken();

    const removeListeners = initNotifications(manageLogin);
    crashlytics().setUserId('admin@admin.com');

    crashlytics().setAttribute('username', 'admin@admin.com');

    return () => {
      removeListeners();
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
