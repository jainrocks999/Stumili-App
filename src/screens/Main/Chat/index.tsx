import Header from '@components/Header';
import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RightIcon from './svg/righticon.svg';
import Plush from './svg/Plus.svg';
import Send from './svg/send.svg';
import AiChat from './svg/AiCHat.svg';
import AiinModal from './svg/AiInmodel.svg';
import AiinModal2 from './svg/AiInModel2.svg';
import Cross from './svg/cross.svg';
import { Colors, Fonts, FontSize } from '@constants';
import CustomModal from '@components/CustomModal';
import Dimension1 from 'src/constants/Diemensions';
import ModalButtons from '@components/ModalButtons';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Message = {
  id: string;
  text: string;
  time: string; // "10:10"
  fromMe: boolean; // right bubble when true
  status?: 'sent' | 'delivered' | 'read';
};

const COLORS = {
  bg: '#F0F0F3',
  bubbleLeft: '#FFFFFF',
  bubbleRight: '#4FAF5A', // match header family
  bubbleRightText: '#FFFFFF',
  meta: '#9AA0A6',
  send: '#38B267',
  inputBg: '#FFFFFF',
  border: '#E6E8EC',
};

const initialData: Message[] = [
  {
    id: '1',
    text: "This is your delivery driver from Speedy Chow. I'm just around the corner from your place. 😊",
    time: '10:10',
    fromMe: false,
  },
  { id: '2', text: 'Hi!', time: '10:10', fromMe: true, status: 'read' },
  {
    id: '3',
    text: "Awesome, thanks for letting me know!\nCan't wait for my delivery. 🎉",
    time: '10:11',
    fromMe: true,
    status: 'read',
  },
  {
    id: '4',
    text: "No problem at all!\nI'll be there in about 15 minutes.",
    time: '10:11',
    fromMe: false,
  },
  {
    id: '5',
    text: "I'll text you when I arrive.",
    time: '10:11',
    fromMe: false,
  },
  { id: '6', text: 'Great! 😊', time: '10:12', fromMe: true, status: 'read' },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(initialData);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble msg={item} />
  );

  const keyExtractor = (m: Message) => m.id;

  const contentInset = useMemo(
    () => ({ paddingTop: 8, paddingBottom: 12 + Math.max(insets.bottom, 8) }),
    [insets.bottom],
  );

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    const next: Message = {
      id: String(Date.now()),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      fromMe: true,
      status: 'sent',
    };
    setMessages(prev => [...prev, next]);
    setInput('');
    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true }),
    );
  };
  const [visible, setVisible] = useState(false);
  const navigation:any=useNavigation()

  return (
    <View style={styles.safe}>
      <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
      <CustomModal onClose={() => {}} visible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            width: Dimension1.width * 0.95,
            borderRadius: 15,
            alignItems: 'center',
            paddingTop: 30,
          }}
        >
          <Pressable
            onPress={() => setVisible(false)}
            style={{ position: 'absolute', right: 20, top: 20 }}
          >
            <Cross height={20} width={20} />
          </Pressable>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <AiinModal />
            <AiinModal2 style={{ position: 'absolute' }} />
          </View>
          <Text
            style={{
              fontWeight: '600',
              color: Colors.BLACK,
              fontSize: FontSize.TWENTY,
            }}
          >
            Share with AI
          </Text>
          <Text
            style={{
              fontWeight: '400',
              color: '#606268',
              fontSize: FontSize.SIXTEEN,
              width: '60%',
              textAlign: 'center',
              marginTop: 15,
            }}
          >
            Share with our AI to get detailed report
          </Text>
          <View style={{ height: '12%' }} />
          <ModalButtons title="Scan Food" color={'#4FAF5A'} />
          <View style={{ height: '3%' }} />
          <ModalButtons isBorder={true} title="Gellery" color={'#FFF'} />
        </View>
      </CustomModal>
      <Header
        onSecondPress={() => {
          setVisible(true);
        }}
        onPressThird={()=>{navigation.navigate('AddGroupList')}}
        title="Chat"
        SeondIcon={AiChat}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={[styles.listContent, contentInset]}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: false })
          }
          showsVerticalScrollIndicator={false}
        />

        {/* Input bar */}
        <View
          style={[
            styles.inputWrap,
            { paddingBottom: Math.max(insets.bottom, 10) },
          ]}
        >
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.meta}
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={styles.attachBtn}>
              <Plush />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={onSend}
            activeOpacity={0.8}
          >
            <Send />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isMe = msg.fromMe;
  const bubbleStyle = isMe ? styles.bubbleRight : styles.bubbleLeft;
  const textStyle = isMe ? styles.textRight : styles.textLeft;

  return (
    <View style={[styles.row, isMe ? styles.rowRight : styles.rowLeft]}>
      <View style={[styles.bubbleBase, bubbleStyle]}>
        <Text style={[styles.msgText, textStyle]}>{msg.text}</Text>

        <View style={styles.metaRow}>
          <Text
            style={[styles.timeText, isMe ? styles.timeOnGreen : undefined]}
          >
            {msg.time}
          </Text>
          {isMe && <RightIcon />}
        </View>
      </View>
    </View>
  );
}

const RADIUS = 16;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg, },
  flex: { flex: 1 },
  listContent: { paddingHorizontal: 12 },
  row: { marginVertical: 6, flexDirection: 'row' },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },

  bubbleBase: {
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: RADIUS,
    // soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bubbleLeft: {
    backgroundColor: COLORS.bubbleLeft,
    borderTopLeftRadius: 6, // subtle “tail” feel
  },
  bubbleRight: {
    backgroundColor: COLORS.bubbleRight,
    borderTopRightRadius: 6,
  },

  msgText: {
    fontSize: FontSize.SIXTEEN,
    lineHeight: 22,
    fontFamily: Fonts.Roboto.Medium,
  },
  textLeft: { color: '#1F2937' },
  textRight: { color: COLORS.bubbleRightText },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  timeText: { fontSize: 11, color: COLORS.meta },
  timeOnGreen: { color: '#E6F6EA' },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  inputBox: {
    minHeight: 50,
    maxHeight: 120,
    borderRadius: 10,
    backgroundColor: '#F0F0F3',
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '83%',
  },
  input: {
    flex: 1,
    fontSize: FontSize.SIXTEEN,
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontFamily: Fonts.Roboto.Medium,
  },
  attachBtn: { paddingLeft: 8, paddingVertical: 4 },
  sendBtn: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4FAF5A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
