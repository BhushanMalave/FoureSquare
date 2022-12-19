import * as React from 'react';
import {ForgotPassword} from '../screens/ForgotPassword';
import { CreateAccount } from '../screens/CreateAccount';
import { Login } from '../screens/LoginScreen';
import { VerifyOtp } from '../screens/VerifyOtp';
import { Home } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { ViewReview } from '../screens/ViewReview';
import { AddReview } from '../screens/AddReview';
import { PhotosGallery } from '../screens/PhotosGallery';
import { ViewPhoto } from '../screens/ViewPhoto';
import {NavigationContainer} from '@react-navigation/native';
import { CardStyleInterpolators ,createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export const LoginStack = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="Verification"
        component={VerifyOtp}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="CreateNewAccount"
        component={CreateAccount}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
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
    </Stack.Navigator>
    </NavigationContainer>
  );
};
