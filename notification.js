import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

async function createNotificationChannel() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
  return channelId;
}

export async function requestUserPermission() {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus >= 1) {
    console.log('[Notifee] Permission granted');
  } else {
    console.log('[Notifee] Permission NOT granted');
  }
}

export async function displayNotification(remoteMessage) {
  const channelId = await createNotificationChannel();

  await notifee.displayNotification({
    title: remoteMessage?.notification?.title || 'New Notification',
    body: remoteMessage?.notification?.body || 'You have a new message.',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Ensure this icon exists
      pressAction: { id: 'default' },
    },
    data: {
      screen: 'MessageScreen', // Example: pass target screen
      someParam: 'exampleValue', // Optional params
    },
  });
}

let unsubscribeForeground = null;
let unsubscribeBackground = null;

export function initNotifications(manageLogin) {
  // Foreground messages
  unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('[Foreground] Notification received:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  // Background: User taps notification when app is in background
  unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('[Background] Notification opened:', remoteMessage);
    const title = remoteMessage?.notification?.title;

    if (title === 'New Message on ZBWA Group') {
      manageLogin();
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('[Killed] Notification opened:', remoteMessage);
        const title = remoteMessage?.notification?.title;

        if (title === 'New Message on ZBWA Group') {
          manageLogin();
        }
      }
    });

  // Background handler for data-only messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[BackgroundHandler] Message received:', remoteMessage);
    await displayNotification(remoteMessage);
  });
}

export function removeNotificationListeners() {
  if (unsubscribeForeground) unsubscribeForeground();
  if (unsubscribeBackground) unsubscribeBackground();
}
