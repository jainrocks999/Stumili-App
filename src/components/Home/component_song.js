import React, {useState} from 'react';
import {FlatList, View, Text, Animated, Button} from 'react-native';

const YourComponent = () => {
  const [data, setData] = useState([
    {id: '1', text: 'Item 1'},
    {id: '2', text: 'Item 2'},
    {id: '3', text: 'Item 3'},
    // Add more items as needed
  ]);

  const translateY = new Animated.Value(0);

  const handleDataChange = newData => {
    // You can customize the animation duration and easing function
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setData(newData);
      // Trigger animation after data change
      Animated.timing(translateY, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderItem = ({item}) => (
    <Animated.View
      style={{
        padding: 20,
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -50], // Change the value according to the animation distance
            }),
          },
        ],
      }}>
      <Text style={{color: 'white'}}>{item.text}</Text>
    </Animated.View>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      />
      <View style={{alignItems: 'center'}}>
        <Button
          title="Change Content"
          onPress={() => handleDataChange(/* new data */)}
        />
      </View>
    </View>
  );
};

export default YourComponent;
