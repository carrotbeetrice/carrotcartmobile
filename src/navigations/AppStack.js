import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as Colors from '../styles/colours';

import AppNavigator from './AppNavigator';
import ShopScreen from '_scenes/shop/shop';
import ProductScreen from '_scenes/shop/product';

const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.BURNT_SIENNA,
      },
      headerTintColor: 'white',
    }}>
    <Stack.Screen
      name="Home"
      component={AppNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Shop" component={ShopScreen} />
    <Stack.Screen name="Product" component={ProductScreen} />
  </Stack.Navigator>
);

export default ShopStack;
