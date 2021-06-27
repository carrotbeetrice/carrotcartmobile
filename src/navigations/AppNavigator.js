import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '_scenes/drawer';

import ShopStack from './ShopStack';
import HomeScreen from '_scenes/home';
import ProfileScreen from '_scenes/profile';
import CartScreen from '_scenes/cart';
import WishlistScreen from '_scenes/wishlist';
import SettingsScreen from '_scenes/settings';
import SupportScreen from '_scenes/support';

import * as Colours from '../styles/colours';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: Colours.PERSIAN_GREEN,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <Icon.Button
          name="notifications"
          backgroundColor={Colours.PERSIAN_GREEN}
          onPress={() => {
            alert('Nothing new');
          }}
        />
      ),
    }}
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Shopping Cart" component={CartScreen} />
    <Drawer.Screen name="Wishlist" component={WishlistScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="Support" component={SupportScreen} />
  </Drawer.Navigator>
);

export default AppNavigator;
