import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  PasswordSent: { email: string } | undefined;
};

export type AppTabsParamList = {
  Home: undefined;
  Activity: undefined;
  Profile: undefined;
  Inventory:undefined;
  ChatScreen:undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabsParamList>;
  WecomrCarousel:undefined
};

// Global augmentation for useNavigation/useRoute
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
