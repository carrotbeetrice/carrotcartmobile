import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as Colors from '../styles/colours';

import AppNavigator from './AppNavigator';
import ShopScreen from '_scenes/shop/shop';
import ProductScreen from '_scenes/shop/product';
import AddressFormScreen from '_scenes/app/user/address_form';
import AddToCartScreen from '_scenes/shop/add_to_cart';

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
    <Stack.Group>
      <Stack.Screen
        name="Home"
        component={AppNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Group>
    <Stack.Group
      screenOptions={{presentation: 'modal', headerBackTitle: 'Back'}}>
      <Stack.Screen
        name="AddressForm"
        component={AddressFormScreen}
        options={({route}) => ({
          headerTitle: route.params.headerTitle,
        })}
      />
      <Stack.Screen
        name="AddToCart"
        component={AddToCartScreen}
        options={{
          headerTitle: 'Add Item to Cart',
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default ShopStack;
