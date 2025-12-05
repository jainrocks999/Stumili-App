import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Text, View } from 'react-native';
import {
  RootStackParamList,
  AuthStackParamList,
  AppTabsParamList,
} from '../types/navigation';
import { Fonts, FontSize } from '@constants';

// Screens (map to your files)
import Splash from '@screens/intro/splash';
import Quote from '@screens/intro/Quote';
import Welcome from '@screens/welcome';
import Login from '@screens/auth/login';
import SignUp from '@screens/auth/signup';
import ResetPassword from '@screens/auth/resetPassword';
import PasswordSent from '@screens/auth/passwordSent';
import QAuts from '@assets/svg/quotes.svg'; // example
import Lock from '@assets/svg/lock.svg';
import WecomrCarousel from '@screens/welcome/WelcomeCarousel';
import HomeScreen from '@screens/Main/Home';
import MacroScreen from '@screens/Main/Macro';
import AiScannerScreen from '@screens/Main/AiScanner';
import InventoryScreen from '@screens/Main/Inventory';
import ChatScreen from '@screens/Main/Chat';
import AssementScreen from '@screens/Main/Assesment';
import CameraShowScreen from '@screens/Main/CameraShow';
import FoodCardScreen from '@screens/Main/FoodDetails';
import SettingsScreen from '@screens/Main/settings';
import MyAccountScreen from '@screens/Main/MyAccount';
import AboutusScreen from '@screens/Main/Aboutus';
import AddGroupList from '@screens/Main/AddGroupList';
import CreateNewGroup from '@screens/Main/CreateNewGroup';

//tab icons

import HomeSelected from './svg/homeSelected.svg';
import HomeUnSelected from './svg/HomeUnSelected.svg';
import IomeSelected from './svg/inventory.svg';
import Inventoryselected from './svg/Inventoryselected.svg';
import Macroselected from './svg/macroselected.svg';
import Macrounselected from './svg/macrounselected.svg';
import ScannerIcon from './svg/scanner.svg';
import ChatIcon from './svg/smilyy.svg';
import { useAuth } from 'src/context/AuthContext';
import { appStorage } from '../storage/AppStorage';
const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tabs = createBottomTabNavigator<AppTabsParamList>();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="PasswordSent" component={PasswordSent} />
    </AuthStack.Navigator>
  );
}
function AppTabs() {
  const RenderTabarLable = ({
    title,
    focused,
  }: {
    title: string;
    focused: boolean;
  }) => {
    return (
      <Text
        style={{
          color: focused ? '#4FAF5A' : '#878787',
          fontSize: FontSize.ELEVEN,
        }}
      >
        {title}
      </Text>
    );
  };
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontFamily: Fonts.WorkSans.Medium, fontSize: 11 },
        tabBarStyle: {
          height: 64,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
          display:
            route?.name === 'ChatScreen' || route?.name == 'Profile'
              ? 'none'
              : 'flex', // 👈 hide for ChatScreen
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              {focused ? (
                <HomeSelected height={size - 5} width={size - 5} />
              ) : (
                <HomeUnSelected height={size - 5} width={size - 5} />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => {
            return <RenderTabarLable title="Home" focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="Activity"
        component={MacroScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              {focused ? (
                <Macroselected width={size - 5} height={size - 5} />
              ) : (
                <Macrounselected width={size - 5} height={size - 5} />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => {
            return <RenderTabarLable title="Daily Macros" focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={AiScannerNavigator}
        listeners={{
          tabPress: async ({ preventDefault }) => {
            // preventDefault();
            // const clear = appStorage.clearAll();
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ScannerIcon width={size - 5} height={size - 5} fill={color} />
          ),
          tabBarLabel: ({ focused }) => {
            return <RenderTabarLable title="AI Scanner" focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <>
              {focused ? (
                <Inventoryselected
                  width={size - 5}
                  height={size - 5}
                  fill={color}
                />
              ) : (
                <IomeSelected width={size - 5} height={size - 5} fill={color} />
              )}
            </>
          ),
          tabBarLabel: ({ focused }) => {
            return <RenderTabarLable title="Inventory" focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="ChatScreen"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChatIcon width={size - 5} height={size - 5} fill={color} />
          ),
          tabBarLabel: ({ focused }) => {
            return <RenderTabarLable title="Chat" focused={focused} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#FFFFFF' },
};

export default function RootNavigator() {
  const { token } = useAuth();
  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="Intro" component={Quote} />
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="WecomrCarousel" component={WecomrCarousel} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="App" component={AppTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AiScannerNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AiScannerScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AiScannerScreen" component={AiScannerScreen} />
      <Stack.Screen name="AssementScreen" component={AssementScreen} />
      <Stack.Screen name="CameraShowScreen" component={CameraShowScreen} />
      <Stack.Screen name="FoodCardScreen" component={FoodCardScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      <Stack.Screen name="AboutusScreen" component={AboutusScreen} />
    </Stack.Navigator>
  );
};

const ChatNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen1" component={ChatScreen} />
      <Stack.Screen name="AddGroupList" component={AddGroupList} />
      <Stack.Screen name="CreateNewGroup" component={CreateNewGroup} />
    </Stack.Navigator>
  );
};
