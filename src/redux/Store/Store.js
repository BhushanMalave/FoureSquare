import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userDetailsReducer from '../ReduxPersist/UserDetails';


const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({

  userDetails: userDetailsReducer,

});

const persistRed = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistRed,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
