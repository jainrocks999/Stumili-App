import React, { useRef, useState } from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SIDE_SPACING = 20; // screen padding
const ITEM_GAP = 10;
const VISIBLE_NEXT_ITEM = 20; // how much of next image should peek

const CARD_WIDTH = width - SIDE_SPACING * 2 - VISIBLE_NEXT_ITEM; // reduced width for peek effect

export default function Carousel({ images }: { images: any[] }) {
  const flatRef = useRef<FlatList<any>>(null);
  const [index, setIndex] = useState(0);

  return (
    <View style={{ alignItems: 'center' }}>
      <FlatList
        ref={flatRef}
        data={images}
        keyExtractor={(_, i) => `img-${i}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + ITEM_GAP} // 👈 enables paging feel
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: SIDE_SPACING,
        }}
        onMomentumScrollEnd={e => {
          const idx = Math.round(
            e.nativeEvent.contentOffset.x / (CARD_WIDTH + ITEM_GAP)
          );
          setIndex(idx);
        }}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="cover"
            style={{
              width: CARD_WIDTH,
              aspectRatio: 1,
              borderRadius: 20,
              marginRight: ITEM_GAP,
            }}
          />
        )}
      />

      {/* Pagination Dots */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}
      >
        {images.map((_, i) => (
          <View
            key={i}
            style={{
              width: index === i ? 10 : 8,
              height: index === i ? 10 : 8,
              borderRadius: 5,
              backgroundColor: index === i ? '#22C55E' : '#D1D5DB',
              marginHorizontal: 3,
            }}
          />
        ))}
      </View>
    </View>
  );
}
