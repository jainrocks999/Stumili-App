import { Colors, Fonts, FontSize } from '@constants';
import { StatusBar, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowBack from '../AddGroupList/svg/backicon.svg';
import Camera from './svg/camera.svg';
import Smily from './svg/smily.svg'
import Input from './Input';
import CommonButton from '@components/CommonButton';
import { useNavigation } from '@react-navigation/native';

const CreateNewGroup = () => {
  const insets = useSafeAreaInsets();
  const navigation:any=useNavigation()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={{
          flexDirection: 'row',
          paddingTop: insets.top + 10,
          alignItems: 'center',
          gap: 20,
        }}
      >
        <ArrowBack />
        <Text
          style={{
            fontSize: FontSize.TWENTY_TWO,
            color: Colors.BLACK,
            fontFamily: Fonts.Poppins.Bold,
          }}
        >
          New Group
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', paddingTop: '10%' }}>
        <Camera height={100} width={100} />
        <View style={{height:'5%'}}/>
        <Input placeholder='Enter Group Name' />
        <Input placeholder='Description'  multiline/>
        <CommonButton onPress={()=>{navigation.pop(2)}} title='Create' style={{width:'100%',marginTop:'60%',height:48,borderRadius:12}}/>
      </View>
    </View>
  );
};
export default CreateNewGroup;

