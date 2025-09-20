import {createStackNavigator} from '@react-navigation/stack';

import MyTabs from './Bottomtab';
import Login from '../screens/Auth/login';

import Splash from '../screens/Auth/splash';
import Signup from '../screens/Auth/Signup';
import HomeScreen from '../screens/main/Home';
import Popularplaylist from '../screens/main/PopularPlaylist';
import Createplaylist from '../screens/main/All playlists/Createplaylist';
import Createaffirmation from '../screens/main/All playlists/Createaffiremation';
import Saveplaylist from '../screens/main/All playlists/Saveplaylist';
import Playsong from '../screens/main/Playsong';
import Mymodal from '../components/molecules/Modal';
import Playlistdetails from '../screens/Tab/Playlistdetails';
import Goal from '../screens/Auth/Goal';
import AudioRecorder from '../components/molecules/Audiorecord';
import Welecome from '../screens/Intro_Screens/Welecome';
import Welecome2 from '../screens/Intro_Screens/Welecome2';
import ChooseAfferamtion from '../screens/Intro_Screens/ChooseAfferamtion';
import AksReminder from '../screens/Intro_Screens/AksReminder';
import Intrested from '../screens/Intro_Screens/Intrested';
import Forgot from '../screens/Auth/Forgot';
import Playlistdetails2 from '../screens/Tab/Playlist2';
import EditPlayList from '../screens/main/All playlists/EditPlayList';
import SuggestImprovementScreen from '../screens/main/SuggestImprovement';
import SuggestAffirmationScreen from '../screens/main/SuggestAffirmation';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Popular"
        component={Popularplaylist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createplaylist"
        component={Createplaylist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createaffirmation"
        component={Createaffirmation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="saveplaylist"
        component={Saveplaylist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="playsong"
        component={Playsong}
        options={{headerShown: false}}
        initialParams={{index: -1}}
      />
      <Stack.Screen
        name="modal"
        component={Mymodal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Playlistdetails"
        component={Playlistdetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Playlistdetails2"
        component={Playlistdetails2}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="goal"
        component={Goal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="audiorecorder"
        component={AudioRecorder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welecome"
        component={Welecome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseAfferamtion"
        component={ChooseAfferamtion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AksReminder"
        component={AksReminder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welecome2"
        component={Welecome2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intrested"
        component={Intrested}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPlayList"
        component={EditPlayList}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="SuggestImprovementScreen"
        component={SuggestImprovementScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
      name='SuggestAffirmationScreen'
      component={SuggestAffirmationScreen}
        options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
}
export default MyStack;
