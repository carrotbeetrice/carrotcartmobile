import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as Colors from '../styles/colours';

import AppNavigator from './AppNavigator';
import ShopScreen from '../scenes/shop/shop';
import ProductScreen from '../scenes/shop/product';
import AddressFormScreen from '../scenes/app/user/address_form';
import CartFormScreen from '../scenes/shop/cart_form';

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
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={({route}) => ({
          presentation: route.params.isPreview ? 'modal' : 'card',
          headerBackTitle: 'Back',
        })}
      />
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
        name="CartForm"
        component={CartFormScreen}
        options={({route}) => ({
          headerTitle: route.params.headerTitle,
        })}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default ShopStack;
