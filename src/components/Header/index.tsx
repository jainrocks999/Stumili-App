import { Pressable, Text, View } from 'react-native';
import Bell from '@assets/svg/bell.svg';
import Location from '@assets/svg/BackMainArrow.svg';
import colors from 'src/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts, FontSize } from '@constants';
import { useNavigation } from '@react-navigation/native';
import Grop from './grop.svg'

const 
Header = ({
  title,
  SeondIcon,
  onSecondPress,
  onPressThird
  
}: {
  title: string;
  SeondIcon?: any;
  onSecondPress?: () => void;
  onPressThird?: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const navigation=useNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4FAF5A',
        paddingTop: insets.top+5,
        paddingBottom: 6,
        paddingHorizontal: 16,
      }}
    >
      <Pressable onPress={()=>{navigation.goBack()}} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Location height={25} width={25} />

        <Text
          style={{
            color: colors.WHITE,
            fontFamily: Fonts.WorkSans.SemiBold,
            fontSize: FontSize.EIGHTEEN,
            marginLeft: 10,
          }}
        >
          {title}
        </Text>
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
       {onPressThird? <Pressable onPress={onPressThird}>
        <Grop height={26} width={26}/>
        </Pressable>:null}
        {SeondIcon ? (
          <Pressable onPress={onSecondPress}>
            <SeondIcon height={22} width={22} />
          </Pressable>
        ) : null}
        <Pressable
          style={{
            backgroundColor: '#fff',
            height: 45,
            width: 45,
            borderStartColor: '#fff',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell height={25} width={25} />
        </Pressable>
      </View>
    </View>
  );
};
export default Header;
