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
import store from './src/redux/Store/Store'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'; 

import { LoginStack } from './src/navigation/LoginStack';
import { AboutUs } from './src/screens/AboutUs';
import { Feedback } from './src/screens/Feedback';
import {ViewReview} from './src/screens/ViewReview';
import {DetailScreen} from './src/screens/DetailScreen';


let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
       <DetailScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
