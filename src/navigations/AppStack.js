import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import * as Colors from '../styles/colours';

import AppNavigator from './AppNavigator';
import ShopScreen from '_scenes/shop/shop';
import ProductScreen from '_scenes/shop/product';

const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerLeft: props => <HeaderBackButton {...props} tintColor="white" />,
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
