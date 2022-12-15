import * as React from 'react';
import {ForgotPassword} from '../screens/ForgotPassword';
import { CreateAccount } from '../screens/CreateAccount';
import { Login } from '../screens/LoginScreen';
import { VerifyOtp } from '../screens/VerifyOtp';

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
    </Stack.Navigator>
    </NavigationContainer>
  );
};
