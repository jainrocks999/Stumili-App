// screens/home/MyFoodList.tsx
import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import Scanner from '@assets/svg/ScannerHome.svg';
import Apple from '@assets/svg/AppleHome.svg';
import { MAIN_URl } from '@utils/constants';
import Carbs from '../screens/Main/FoodDetails/svg/Carbs.svg';
import Proteen from '../screens/Main/FoodDetails/svg/ProteenIcon.svg';
import Fat from '../screens/Main/FoodDetails/svg/fireIcon.svg';
import { useNavigation } from '@react-navigation/native';
type Item = {
  id: string;
  title: string;
  distance: string; // "1.0 km"
  rating: string; // "4.8"
  reviews: string; // "4.8 reviews"
  image: any; // require(...) or {uri}
};

export default function MyFoodList({ foodList = [] }: { foodList: any[] }) {
  const navigation: any = useNavigation();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>My Food</Text>
        <Pressable hitSlop={8}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <FlatList
        data={foodList}
        scrollEnabled={false}
        keyExtractor={(item,index)=>index.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 120, gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FoodCard
            onpress={() => {
              navigation.navigate('Profile', {
                screen: 'FoodCardScreen',
                params: { data: item },
              });
            }}
            item={item}
          />
        )}
      />
    </View>
  );
}

function FoodCard({ item, onpress }: { item: any; onpress: any }) {
  return (
    <Pressable onPress={onpress} style={{ flex: 1 }}>
      <Image
        source={{ uri: `${MAIN_URl}${item?.imageUrl}` }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={styles.cardTitle}>
        {item?.food_name}
      </Text>

      <View style={styles.metaRow}>
        {item?.carbs ? (
          <>
            <Carbs height={10} width={10} />
            <Text style={styles.metaText}>{` ${item?.carbs}g`}</Text>
          </>
        ) : null}
        {item?.fats ? (
          <>
            <Fat style={{ marginLeft: 10 }} height={10} width={10} />
            <Text style={styles.metaText}>{` ${item?.fats}g`}</Text>
          </>
        ) : null}
        {item?.protein ? (
          <>
            <Proteen style={{ marginLeft: 10 }} height={15} width={15} />
            <Text style={styles.metaText}>{`${item?.protein}g`}</Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

export const FabMenu = () => {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    setOpen(o => !o);
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const actions = useMemo(
    () => [
      { id: 'a1', bg: '#22C55E', label: 'Scan', Icon: Scanner }, // replace with your icons
      { id: 'a2', bg: '#34D399', label: 'Add Food', Icon: Apple },
      { id: 'a3', bg: '#86EFAC', label: 'Favourite', Icon: Scanner },
    ],
    [],
  );

  return (
    <View pointerEvents="box-none" style={styles.fabWrap}>
      {actions.map((a, idx) => {
        const i = actions.length - idx; // stack upward
        const translate = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, i * 70], // vertical spacing
        });
        const opacity = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });
        const { Icon } = a;

        return (
          <Animated.View
            key={a.id}
            pointerEvents={open ? 'auto' : 'none'}
            style={[
              styles.miniFab,
              {
                backgroundColor: '#FFFFFF',
                transform: [{ translateY: Animated.multiply(translate, -1) }],
                opacity,
              },
            ]}
          >
            <View style={[styles.miniIcon]}>
              <Icon />
              {/* <Text style={{ color: '#fff' }}>◎</Text> */}
            </View>
          </Animated.View>
        );
      })}

      <Pressable style={styles.fab} onPress={toggle}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '45deg'],
                }) as any,
              },
            ],
          }}
        >
          <Text style={styles.fabPlus}>＋</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },

  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#111111',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
  },
  seeAll: {
    color: '#6B7280',
    fontFamily: 'WorkSans-Medium',
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  card: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardTitle: {
    paddingHorizontal: 10,
    paddingTop: 8,
    color: '#111111',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 14,
  },
  metaRow: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#6B7280',
    fontSize: 12,
    fontFamily: 'WorkSans-Medium',
  },
  dot: { marginHorizontal: 6, color: '#9CA3AF' },

  /* FAB */
  fabWrap: {
    position: 'absolute',
    right: 18,
    bottom: 24,
    alignItems: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fabPlus: { color: '#fff', fontSize: 28, lineHeight: 28 },

  miniFab: {
    position: 'absolute',
    right: 0,
    bottom: 30,
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  miniIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
