import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import * as Colors from '../styles/colours';

import ProfileScreen from '../scenes/app/user/profile';
import AddressScreen from '../scenes/app/user/address';

const Tab = createMaterialTopTabNavigator();

const UserNavigator = () => (
  <Tab.Navigator
    initialRouteName="ProfileMainScreen"
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: Colors.LIGHT_PERIWINKLE,
    //   },
    //   headerTintColor: 'white',
    // }}
  >
    <Tab.Screen
      name="ProfileMainScreen"
      component={ProfileScreen}
      options={{
        title: 'Main Profile',
      }}
      //   options={{headerShown: false}}
    />
    <Tab.Screen
      name="Address"
      component={AddressScreen}
      options={{title: 'Address Book'}}
    />
  </Tab.Navigator>
);

export default UserNavigator;
