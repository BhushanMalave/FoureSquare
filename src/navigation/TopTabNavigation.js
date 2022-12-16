import React from 'react';
import { useWindowDimensions } from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopPicks} from '../screens/TopPicks';
import {NearYou} from '../screens/NearYou';
import {Popular} from '../screens/Popular';
import {Lunch} from '../screens/Lunch';
import {Coffee} from '../screens/Coffee';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const TopTabNav = () => {
  const {height, width} = useWindowDimensions();
  return (
  
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 45, elevation: 0, backgroundColor: '#370F24'},
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#7A7A7A',
          tabBarScrollEnabled: true,
          tabBarIndicatorContainerStyle: {marginLeft: 0, height: 0},
          tabBarItemStyle: {
            width: width<height ? 100 : Platform.OS === 'ios' ?165:178,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            textTransform: 'none',
            fontFamily: 'Avenir Medium',
          },
        }}>
        <Tab.Screen name="Near you" component={NearYou} />
        <Tab.Screen name="Toppicks" component={TopPicks} />
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Lunch" component={Lunch} />
        <Tab.Screen name="Coffee" component={Coffee} />
      </Tab.Navigator>
  
  );
};
export default TopTabNav;
