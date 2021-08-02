import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '_scenes/auth/login';
import RegisterScreen from '_scenes/auth/register';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthStack;
