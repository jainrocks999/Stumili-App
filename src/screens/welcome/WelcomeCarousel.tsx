// WecomrCarousel.tsx
import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, StatusBar } from 'react-native';
import IntroSlide from '@components/IntroSlider';
import BG from '@assets/images/welcome/Welocome2.jpg';
import BG1 from '@assets/images/welcome/Wecome3.jpg';
import BG2 from '@assets/images/welcome/Wecome4.jpg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    image: BG,
    title: 'Track Your\nNutrition',
    subtitle: 'Monitor your health profile with ease. 📈',
    smallIcon: '',
  },
  {
    key: '2',
    image: BG1,
    title: 'Nutrition & Diet\nGuidance',
    subtitle: 'Lose weight and get fit with EatEase 🥒',
    smallIcon: '',
  },
  {
    key: '3',
    image: BG2,
    title: 'AI-Powered\nScanner',
    subtitle: 'Say goodbye to manual Nutritionist! 👋',
  },
];

const WecomrCarousel = () => {
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const navigation:any=useNavigation()

  const goTo = (i: number) => {
    if(index==2){
       navigation.replace("Auth")
       return
    }
    const safe = Math.max(0, Math.min(slides.length - 1, i));
    listRef.current?.scrollToIndex({ index: safe, animated: true });
    setIndex(safe);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent" // Android
        barStyle="light-content" // or 'dark-content' as needed
      />
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item, index: i }) => (
          <View style={{ width }}>
            <IntroSlide
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              showPrev={i !== 0}
              onPrev={() => goTo(i - 1)}
              onNext={() => goTo(i + 1)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default WecomrCarousel;
