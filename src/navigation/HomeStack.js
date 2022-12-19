import * as React from 'react';
import { Home } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { ViewReview } from '../screens/ViewReview';
import { AddReview } from '../screens/AddReview';
import { PhotosGallery } from '../screens/PhotosGallery';
import { ViewPhoto } from '../screens/ViewPhoto';
import { Search } from '../screens/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import { CardStyleInterpolators ,createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export const HomeStack = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='HomeStack'>
        <Stack.Screen
        name="Home"
        component={Home}
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
      <Stack.Screen
        name="ViewReviews"
        component={ViewReview}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
       <Stack.Screen
        name="AddReviews"
        component={AddReview}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
       <Stack.Screen
        name="PhotosGallery"
        component={PhotosGallery}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
        <Stack.Screen
        name="ViewPhoto"
        component={ViewPhoto}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
       <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
