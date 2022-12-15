import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Login} from './src/screens/LoginScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Login />
    </View>
  );
};

export default App;
