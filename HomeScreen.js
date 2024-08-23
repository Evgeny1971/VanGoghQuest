import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Van Gogh Quest</Text>
      <Button
        title="Start Quest"
        onPress={() => navigation.navigate('Quest')}
      />
    </View>
  );
}
