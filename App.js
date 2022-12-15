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

import { LoginStack } from './src/navigation/LoginStack';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <LoginStack />
    </View>
  );
};

export default App;
