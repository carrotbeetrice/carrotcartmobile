import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '_scenes/home';
import ShopScreen from '_scenes/shop';

const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Shop" component={ShopScreen} />
  </Stack.Navigator>
);

export default ShopStack;
