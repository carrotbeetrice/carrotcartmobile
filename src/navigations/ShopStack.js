import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '_scenes/app/home';
import ShopScreen from '_scenes/shop/shop';

const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Shop" component={ShopScreen} />
  </Stack.Navigator>
);

export default ShopStack;
