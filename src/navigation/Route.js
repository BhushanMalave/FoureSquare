import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {OnboardingStack} from './OnboardingStack';
import {WelcomeStack} from './WelcomeStack';
import {DrawerNav} from './DrawerNav';
import {setToken} from '../redux/ReduxPersist/UserDetails';
import {getVerifiedKeys} from '../authorization/RefreshToken';
import RNBootSplash from 'react-native-bootsplash';


import { CardStyleInterpolators ,createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const Router = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.userDetails.token);
  const newUser = useSelector(state => state.userDetails.newUser);

  useEffect(() => {
    setTimeout(async () => {
      const token = useSelector(state => state.userDetails.token);
      try {
        if (token !== null) {
          const res = await getVerifiedKeys(token);
          dispatch(setToken(res));
        } else {
          dispatch(setToken(token));
        }
      } catch (e) {
        console.log(e);
      }
      if (token !== null) dispatch(setToken(res));
      else dispatch(setToken(token));
    }, 1000);
  }, []);

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        {newUser !== false && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingStack}
            options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
          />
        )}
        {token === null ? (
          <Stack.Screen
            name="WelcomeStack"
            component={WelcomeStack}
            options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
          />
        ) : (
          <Stack.Screen
            name="Drawer"
            component={DrawerNav}
            options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
