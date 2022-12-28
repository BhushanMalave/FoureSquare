import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import store from './src/redux/Store/Store';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Router} from './src/navigation/Router';
import SplashScreen from 'react-native-splash-screen';

let persistor = persistStore(store);

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
const App = () => {
  const splashScreen = () => {
    setTimeout(() => {
      SplashScreen.hide();
    },600);
  };

  useEffect(() => {
    splashScreen();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
