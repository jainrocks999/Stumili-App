import { Colors, FontSize } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import fonts from 'src/constants/fonts';
import { useAuth } from 'src/context/AuthContext';
import { appStorage } from 'src/storage/AppStorage';
import { STORAGE_KEYS } from 'src/storage/storageKeys';



const Splash: React.FC = () => {
  const navigation:any=useNavigation()
 
 
  useEffect(()=>{
     setTimeout(async() => {
      const token=await appStorage.getString(STORAGE_KEYS.TOKEN)
      console.log("thththht",token);
      
      if(!token){
      navigation.replace("Intro")
      }else{
        navigation.reset({index:0,routes:[{name:"App"}]})
      }
     }, 2000);
  },[])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: FontSize.TWENTY_FIVE,
          fontFamily: fonts.WorkSans.Bold,
          color: Colors.HEADING_COLOR,
        }}
      >
        Welcome To
      </Text>
      <Text
        style={{
          fontSize: FontSize.TWENTY_FIVE,
          fontFamily: fonts.WorkSans.Bold,
          color: Colors.HEADING_COLOR,
        }}
      >
        EatEase AI
      </Text>
    </View>
  );
};
export default Splash;
