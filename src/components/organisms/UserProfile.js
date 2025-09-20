import React from 'react';
import { View, Text, Image } from 'react-native';

const UserProfile = ({ username, profileImage }) => {
  return (
    <View>
      <Image source={profileImage} />
      <Text>{username}</Text>
    </View>
  );
};

export default UserProfile;
