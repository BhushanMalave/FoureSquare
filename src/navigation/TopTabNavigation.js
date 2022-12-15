import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {OverviewScreen} from '../screens/OverviewScreen';
import {ChaptersScreen} from '../screens/ChaptersScreen';
import {Platform} from 'react-native';

const Tab = createMaterialTopTabNavigator();
const TopTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 55, elevation: 0},
        tabBarActiveTintColor: '#EE5C4D',
        tabBarInactiveTintColor: '#7A7A7A',
        tabBarIndicatorContainerStyle: {marginLeft: 20},
        tabBarIndicatorStyle: {
          width: 164,
          backgroundColor: '#EE5C4D',
          height: 1,
          borderRadius: 1,
        },

        tabBarLabelStyle: {
          fontSize: 18,
          marginTop: 17,
          textTransform: 'none',
          fontFamily: Platform.OS === 'ios' ? 'Proxima Nova' : 'ProximaNova',
          lineHeight: 21,
          fontWeight: '400',
        },
      }}>
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Chapters" component={ChaptersScreen} />
    </Tab.Navigator>
  );
};
export default TopTabNav;
