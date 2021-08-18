import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '_scenes/app/drawer';

import HomeScreen from '_scenes/app/home';
// import ProfileScreen from '_scenes/app/user/profile';
import CartScreen from '_scenes/app/cart';
import WishlistScreen from '_scenes/app/wishlist';
import SettingsScreen from '_scenes/app/settings';
import SupportScreen from '_scenes/app/support';

import UserNavigator from './UserNavigator';

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
    <Drawer.Screen
      name="HomeMainScreen"
      component={HomeScreen}
      options={{title: 'Home'}}
    />
    <Drawer.Screen name="Shopping Cart" component={CartScreen} />
    <Drawer.Screen name="Wishlist" component={WishlistScreen} />
    <Drawer.Screen name="Profile" component={UserNavigator} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="Support" component={SupportScreen} />
  </Drawer.Navigator>
);

export default AppNavigator;
