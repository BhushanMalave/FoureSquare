import React from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator ,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerContent} from '../components/CustomDrawerComponent';
import { HomeStack } from './HomeStack';
import { Feedback } from '../screens/Feedback';
import { AboutUs } from '../screens/AboutUs';
import { Favourite } from '../screens/FavouriteScreen';
export const Drawer = createDrawerNavigator();

export const DrawerNav = ({navigation}) => {
  return (
  
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get('window').width / 1.25,
        },
      }}
      drawerContent={ (props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerStyle: {
            height: 80,
          },
          headerShown: false,
          drawerIcon: ({color}) => <Icon name="home" size={20} color={color} />,
          drawerActiveBackgroundColor: null,
          drawerActiveTintColor: '#EA2626',
          drawerInactiveTintColor: '#373737',
          drawerLabelStyle: {
            fontSize: 16,
            fontFamily: 'Proxima Nova',
            marginLeft: -13,
            height: Platform.OS === 'ios' ? 18 : 22,
            marginTop: Platform.OS === 'ios' ? 5 : 3,
          },
        }}
      />
        <Drawer.Screen
        name="Favourite"
        component={Favourite}
        options={{
          headerStyle: {
            height: 80,
          },
          headerShown: false,
          drawerIcon: ({color}) => <Icon name="home" size={20} color={color} />,
          drawerActiveBackgroundColor: null,
          drawerActiveTintColor: '#EA2626',
          drawerInactiveTintColor: '#373737',
          drawerLabelStyle: {
            fontSize: 16,
            fontFamily: 'Proxima Nova',
            marginLeft: -13,
            height: Platform.OS === 'ios' ? 18 : 22,
            marginTop: Platform.OS === 'ios' ? 5 : 3,
          },
        }}
      />
        <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerStyle: {
            height: 80,
          },
          headerShown: false,
          drawerIcon: ({color}) => <Icon name="home" size={20} color={color} />,
          drawerActiveBackgroundColor: null,
          drawerActiveTintColor: '#EA2626',
          drawerInactiveTintColor: '#373737',
          drawerLabelStyle: {
            fontSize: 16,
            fontFamily: 'Proxima Nova',
            marginLeft: -13,
            height: Platform.OS === 'ios' ? 18 : 22,
            marginTop: Platform.OS === 'ios' ? 5 : 3,
          },
        }}
      />
       <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerStyle: {
            height: 80,
          },
          headerShown: false,
          drawerIcon: ({color}) => <Icon name="home" size={20} color={color} />,
          drawerActiveBackgroundColor: null,
          drawerActiveTintColor: '#EA2626',
          drawerInactiveTintColor: '#373737',
          drawerLabelStyle: {
            fontSize: 16,
            fontFamily: 'Proxima Nova',
            marginLeft: -13,
            height: Platform.OS === 'ios' ? 18 : 22,
            marginTop: Platform.OS === 'ios' ? 5 : 3,
          },
        }}
      />
    </Drawer.Navigator>
  
  );
};



