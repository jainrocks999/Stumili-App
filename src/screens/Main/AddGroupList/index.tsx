import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts, FontSize } from '@constants';

// TODO: Replace with your icons:
import SearchIcon from './svg/backicon.svg';
import DialpadIcon from './svg/kebord.svg';
import CheckIcon from './svg/checked.svg';
import UnchekedIcon from './svg/unchecked.svg';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '@components/CommonButton';

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 4 },
});

type Contact = {
  id: string;
  name: string;
  avatar?: string;
};

const MOCK: Contact[] = [
  { id: '1', name: 'John Porter', avatar: 'https://i.pravatar.cc/120?img=1' },
  { id: '2', name: 'Monu Singh', avatar: 'https://i.pravatar.cc/120?img=2' },
  { id: '3', name: 'Tony Parker', avatar: 'https://i.pravatar.cc/120?img=3' },
  { id: '4', name: 'Piter Stark', avatar: 'https://i.pravatar.cc/120?img=4' },
  { id: '5', name: 'C Porter', avatar: 'https://i.pravatar.cc/120?img=5' },
  { id: '6', name: 'Johny Porter', avatar: 'https://i.pravatar.cc/120?img=6' },
  { id: '7', name: 'Robert Johny', avatar: 'https://i.pravatar.cc/120?img=7' },
];

const Checkbox = ({ checked }: { checked: boolean }) => (
  <>
    {checked ? (
      <CheckIcon height={25} width={25} />
    ) : (
      <UnchekedIcon height={25} width={25} />
    )}
  </>
);

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (t: string) => void;
}) => (
  <View
    style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F8FAFC',
        height: 50,
      },
    ]}
  >
    <SearchIcon width={23} height={23} />
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Search Name or Number..."
      placeholderTextColor="#94A3B8"
      style={{
        flex: 1,
        fontFamily: Fonts.WorkSans.Medium,
        fontSize: FontSize.FOURTEEN,
        color: '#111827',
        paddingVertical: 0,
      }}
    />
    {/* Right icon button (keypad) */}
    <Pressable hitSlop={10}>
      <DialpadIcon width={23} height={23} />
    </Pressable>
  </View>
);

const Row = ({
  item,
  selected,
  onToggle,
}: {
  item: Contact;
  selected: boolean;
  onToggle: () => void;
}) => (
  <Pressable
    onPress={onToggle}
    android_ripple={{ color: '#00000010' }}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingRight: 8,
    }}
  >
    <Image
      source={{ uri: item.avatar || 'https://i.pravatar.cc/120' }}
      style={{ width: 44, height: 44, borderRadius: 22 }}
    />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text
        style={{
          fontFamily: Fonts.WorkSans.SemiBold,
          fontSize: FontSize.EIGHTEEN,
          color: '#111214',
        }}
      >
        {item.name}
      </Text>
    </View>
    <Checkbox checked={selected} />
  </Pressable>
);

const CreateGroupSelectScreen = () => {
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['3', '4', '6']),
  ); // pre-selected like mock

  const data = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return MOCK;
    return MOCK.filter(
      c => c.name.toLowerCase().includes(t) || c.id.includes(t),
    );
  }, [q]);

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const canNext = selected.size > 0;
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16 }}>
        <SearchBar value={q} onChange={setQ} />
        <Text
          style={{
            marginTop: 25,
            marginBottom: 6,
            fontFamily: Fonts.Poppins.SemiBold,
            fontSize: FontSize.SIXTEEN,
            color: '#111214',
          }}
        >
          Frequently Contacted
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        renderItem={({ item }) => (
          <Row
            item={item}
            selected={selected.has(item.id)}
            onToggle={() => toggle(item.id)}
          />
        )}
      />

      {/* Bottom Next button */}
      <View
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: insets.bottom + 18,
        }}
      >
        <CommonButton
          disabled={!canNext}
          onPress={() => {
            navigation.navigate('CreateNewGroup');
          }}
          title="Next"
          style={{
            height: 48,
            backgroundColor: canNext ? '#111214' : '#CBD5E1',
            borderRadius: 14,
          }}
        />
      </View>
    </View>
  );
};

export default CreateGroupSelectScreen;
