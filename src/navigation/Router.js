import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {LoginStack} from './LoginStack';
import {DrawerNav} from './DrawerNavigation';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const Router = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.userDetails.token);
  const login = useSelector(state => state.status.loginState);

  useEffect(() => {
    // setTimeout(async () => {
    //   const token = useSelector(state => state.userDetails.token);
    //   try {
    //     if (token !== null) {
    //       const res = await getVerifiedKeys(token);
    //       dispatch(setToken(res));
    //     } else {
    //       dispatch(setToken(token));
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   if (token !== null) dispatch(setToken(res));
    //   else dispatch(setToken(token));
    // }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login === 0 && (
          <Stack.Screen
            name="LoginStack"
            component={LoginStack}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}

        {login === 1 && (
          <Stack.Screen
            name="Drawer"
            component={DrawerNav}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}

        {login === 2 && (
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
