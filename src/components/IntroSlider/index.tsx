import { Colors, Fonts, FontSize } from '@constants';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrow from '@assets/svg/BackButtonArrow.svg';
import FoprwordArrow from '@assets/svg/FowordButton.svg';
import LinearGradient from 'react-native-linear-gradient';
type IntroSlideProps = {
  image: any;
  title: string;
  subtitle: string;
  onNext: () => void;
  onPrev: () => void;
  showPrev: boolean;
};
const IntroSlide: React.FC<IntroSlideProps> = ({
  image,
  title,
  subtitle,
  onNext,
  onPrev,
  showPrev,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground style={styles.container} source={image}>
      <View style={styles.bottomFade} />
      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 70 },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex:10
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!showPrev}
            onPress={onPrev}
            style={[styles.button, { opacity: showPrev ? 1 : 0.5 }]}
          >
            <BackArrow color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNext}
            style={styles.button}
          >
            <FoprwordArrow color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
     <LinearGradient
               colors={['#00000000', '#000000E6']} // darker fade
             start={{ x: 0.5, y: 0 }}
             end={{ x: 0.5, y: 1 }}
             style={{
               height: '100%',
               width: '100%',
               position: 'absolute',
               bottom: 0,
             }}
           />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  bottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
  },
  textContainer: {
    marginBottom: 40,
    alignItems: 'center',
    zIndex:10
  },
  title: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: '#FFFFFF',
    lineHeight: Math.round(FontSize.TWENTY_FIVE * 1.2),
    textAlign: 'center',
  },
  brand: {
    fontFamily: Fonts.WorkSans.Bold,
    fontSize: FontSize.TWENTY_FIVE,
    color: '#FFFFFF',
    marginTop: 4,
    lineHeight: Math.round(FontSize.TWENTY_FIVE * 1.2),
  },
  subtitle: {
    fontFamily: Fonts.WorkSans.Medium,
    fontSize: FontSize.FOURTEEN,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 12,
    lineHeight: Math.round(FontSize.FOURTEEN * 1.35),
  },
  button: {
    width: 130,
    height: 70,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 280,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  gradientLayer: {
    flex: 1,
    backgroundColor: '#000',
  },
});
export default IntroSlide;
