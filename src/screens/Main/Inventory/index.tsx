import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  Animated,
  Modal,
} from 'react-native';

import Header from '@components/Header';
import { Colors, FontSize } from '@constants';

import Search from '@assets/svg/search.svg';
import Filter from './svg/Filter.svg';
import Danger from './svg/Danger.svg';
import Expiring from './svg/Expiring.svg';
import LinearGradient from 'react-native-linear-gradient';
import Bell from './svg/Bell.svg';
import Arrow from './svg/Arrow.svg';
import PointsSvg from './svg/Points.svg';
import VerticleDotes from './svg/VerticleDotes.svg';

import CartSvg from './svg/Cart.svg';
import EditSvg from './svg/Edit.svg';

import { getAPI } from 'src/api/userApi';

const InventoryScreen = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editQuantity, setEditQuantity] = useState('');

  const rowTranslateX = useRef<any>({}).current;

  // -------------------------
  // CATEGORY MAPPING
  // -------------------------
  const mapCategory = (category: any) => {
    switch (category) {
      case 'meat':
        return 'proteins';
      case 'beverages':
      case 'carbs':
        return 'carbs';
      case 'fruits':
      case 'veggies':
        return 'fruitsVeg';
      default:
        return 'others';
    }
  };

  // -------------------------
  // MERGE DUPLICATE ITEMS
  // -------------------------
  const mergeItemsByName = (list: any[]) => {
    const map: any = {};

    list.forEach(item => {
      const key = item.name.toLowerCase().trim();
      if (map[key]) {
        map[key].quantity += item.quantity || 1;
      } else {
        map[key] = { ...item };
      }
    });

    return Object.values(map);
  };

  const slideOpen = (name: string) => {
    if (activeId === name) {
      closeSlide(name);
      return;
    }

    if (activeId && activeId !== name) {
      closeSlide(activeId);
    }

    setActiveId(name);

    Animated.timing(rowTranslateX[name], {
      toValue: -150,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeSlide = (name = activeId) => {
    if (!name) return;
    
    // Reset the animation value immediately
    if (rowTranslateX[name]) {
      rowTranslateX[name].setValue(0);
    }
    
    Animated.timing(rowTranslateX[name], {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setActiveId(null);
    });
  };

  // -------------------------
  // EDIT FUNCTIONS
  // -------------------------
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditQuantity(item.quantity.toString());
    setEditModalVisible(true);
    closeSlide(item._id);
  };

  const saveEdit = () => {
    if (!selectedItem || !editQuantity) return;
    
    const qty = parseInt(editQuantity, 10);
    if (isNaN(qty) || qty < 1) {
      Alert.alert('Invalid quantity', 'Please enter a valid number greater than 0');
      return;
    }
    
    updateQuantity(selectedItem.name, qty);
    setEditModalVisible(false);
    setSelectedItem(null);
    setEditQuantity('');
  };

  const deleteItem = (name: string) => {
    const updated = items.filter(i => i.name !== name);
    setItems(updated);
    closeSlide();
  };

  const updateQuantity = (name: string, qty: number) => {
    const updated = items.map(i =>
      i.name === name ? { ...i, quantity: qty } : i,
    );
    setItems(updated);
    closeSlide();
  };

  // -------------------------
  // FETCH RECEIPT DATA
  // -------------------------
  const fetchReceipts = async () => {
    try {
      const json = await getAPI('users/get-recipt');

      if (json.status && json.count > 0) {
        const merged = json.receipts.flatMap((r: any) => r.items);
        const unique = mergeItemsByName(merged);

        // 🔥 Initialize animation BEFORE setting items
        unique.forEach((item: any) => {
          if (!rowTranslateX[item._id]) {
            rowTranslateX[item._id] = new Animated.Value(0);
          }
        });

        const processed = unique.map((item: any) => ({
          ...item,
          uiCategory: mapCategory(item.category),
        }));

        setItems(processed);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to fetch inventory');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  // -------------------------
  // GROUPED CATEGORIES
  // -------------------------
  const sections = [
    { title: 'Proteins', data: items.filter(i => i.uiCategory === 'proteins') },
    { title: 'Carbs', data: items.filter(i => i.uiCategory === 'carbs') },
    {
      title: 'Fruits & Veggies',
      data: items.filter(i => i.uiCategory === 'fruitsVeg'),
    },
    { title: 'Others', data: items.filter(i => i.uiCategory === 'others') },
  ];

  // -------------------------
  // LOADING UI
  // -------------------------
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
      </View>
    );
  }

  // -------------------------
  // MAIN UI
  // -------------------------
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Header title="Inventory" />

      <ScrollView
        scrollEventThrottle={16}
        onScrollBeginDrag={() => closeSlide()}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* SEARCH BAR */}
        <View
          style={{
            marginTop: 30,
            borderWidth: 0.5,
            borderColor: '#E5E7EB',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            height: 50,
            borderRadius: 8,
            marginHorizontal: 16,
          }}
        >
          <Search />
          <TextInput
            placeholder="Search inventory..."
            placeholderTextColor="#ADAEBC"
            style={{
              flex: 1,
              paddingLeft: 10,
              color: Colors.TEXT_COLOR,
              fontSize: FontSize.SIXTEEN,
            }}
          />
        </View>

        {/* HEADER BANNER */}
        <LinearGradient
          colors={['#FFF7ED', '#FEF2F2']}
          style={{
            marginTop: 20,
            paddingHorizontal: 15,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: '#FFEDD5',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}
            >
              <Bell />
            </View>

            <View>
              <Text style={{ fontWeight: '500', color: '#9A3412' }}>
                {items.length} items recently added
              </Text>
              <Text style={{ fontSize: 12, color: '#EA580C' }}>
                Inventory Updated
              </Text>
            </View>
          </View>

          <Arrow />
        </LinearGradient>

        {/* CATEGORY SECTIONS */}
        {sections.map(
          section =>
            section.data.length > 0 && (
              <View
                key={section.title}
                style={{ marginTop: 20, paddingHorizontal: 16 }}
              >
                {/* Section Title */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <PointsSvg />
                    <Text
                      style={{
                        fontSize: FontSize.EIGHTEEN,
                        fontWeight: '600',
                        color: Colors.TEXT_COLOR,
                      }}
                    >
                      {section.title}
                    </Text>
                  </View>

                  <Text style={{ color: '#6B7280' }}>
                    {section.data.length} items
                  </Text>
                </View>

                {section.data.map(item => (
                  <View key={item.name} style={{ height: 70, marginTop: 10 }}>
                    {activeId === item._id && (
                      <View
                        style={{
                          position: 'absolute',
                          right: 0,
                          width: 160,
                          height: '100%',
                          backgroundColor: '#4CAF50',
                          zIndex: 0,
                          borderRadius: 12,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            closeSlide(item._id);
                          }}
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            padding: 5,
                            zIndex: 3,
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                            ×
                          </Text>
                        </Pressable>
                        
                        <Pressable 
                          onPress={(e) => {
                            e.stopPropagation();
                            console.log('Cart pressed for', item.name);
                            closeSlide(item._id);
                          }}
                          style={{ zIndex: 2 }}
                        >
                          <CartSvg width={28} height={28} />
                        </Pressable>

                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                          style={{ zIndex: 2 }}
                        >
                          <EditSvg width={28} height={28} />
                        </Pressable>
                      </View>
                    )}

                    <Animated.View
                      style={{
                        height: '100%',
                        zIndex: activeId === item._id ? 2 : 1,
                        transform: [{ translateX: rowTranslateX[item._id] }],
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          if (activeId !== item._id) {
                            closeSlide();
                          }
                        }}
                        style={{
                          flex: 1,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: '#E5E7EB',
                          paddingHorizontal: 17,
                          paddingVertical: 15,
                          backgroundColor: 'white',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: '500' }}>
                            {item.name}
                          </Text>
                          <Text style={{ color: '#6B7280' }}>
                            Qty: {item.quantity}
                          </Text>
                        </View>

                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            if (activeId === item._id) {
                              closeSlide(item._id);
                            } else {
                              slideOpen(item._id);
                            }
                          }}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <VerticleDotes />
                        </Pressable>
                      </Pressable>
                    </Animated.View>
                  </View>
                ))}
              </View>
            ),
        )}
      </ScrollView>

      {/* EDIT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 25,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '85%',
          }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
              color: Colors.TEXT_COLOR,
            }}>
              Edit {selectedItem?.name}
            </Text>
            
            <View style={{
              width: '100%',
              marginBottom: 25,
            }}>
              <Text style={{
                fontSize: 16,
                color: '#6B7280',
                marginBottom: 8,
              }}>
                Current Quantity: {selectedItem?.quantity}
              </Text>
              
              <TextInput
                style={{
                  height: 50,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  fontSize: 16,
                  backgroundColor: '#F9FAFB',
                }}
                placeholder="Enter new quantity"
                placeholderTextColor="#9CA3AF"
                value={editQuantity}
                onChangeText={setEditQuantity}
                keyboardType="numeric"
                autoFocus={true}
              />
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              gap: 15,
            }}>
              <Pressable
                onPress={() => {
                  setEditModalVisible(false);
                  setSelectedItem(null);
                  setEditQuantity('');
                }}
                style={{
                  flex: 1,
                  height: 50,
                  backgroundColor: '#F3F4F6',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: Colors.TEXT_COLOR,
                }}>
                  Cancel
                </Text>
              </Pressable>
              
              <Pressable
                onPress={saveEdit}
                style={{
                  flex: 1,
                  height: 50,
                  backgroundColor: Colors.PRIMARY_COLOR,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                }}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InventoryScreen;