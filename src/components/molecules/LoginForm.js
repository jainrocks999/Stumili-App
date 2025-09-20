import React, { useState } from 'react';
import { View } from 'react-native';
import TextInput from '../atoms/TextInput';
import Button from '../atoms/Button';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

export default LoginForm;
