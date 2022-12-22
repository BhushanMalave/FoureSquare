import * as React from 'react';
import { DetailScreen } from '../screens/DetailScreen';
import { Favourite } from '../screens/FavouriteScreen';
import {NavigationContainer} from '@react-navigation/native';
import { CardStyleInterpolators ,createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export const FavouriteStack = () => {
  return (

    <Stack.Navigator initialRouteName='HomeStack'>
        <Stack.Screen
        name="Favourite"
        component={Favourite}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
       <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        
      />
    
    </Stack.Navigator>

  );
};
