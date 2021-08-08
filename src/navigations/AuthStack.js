import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../scenes/auth/login';
import RegisterScreen from '../scenes/auth/register';
import OnBoardingScreen from '../scenes/auth/onboarding';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
  </Stack.Navigator>
);

export default AuthStack;
