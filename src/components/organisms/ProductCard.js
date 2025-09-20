import React from 'react';
import { View, Text, Image } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View>
      <Image source={product.image} />
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
    </View>
  );
};

export default ProductCard;
