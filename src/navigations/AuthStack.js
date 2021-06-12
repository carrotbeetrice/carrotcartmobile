import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import SplashScreen from '_scenes/splash';
import LoginScreen from '_scenes/login';
import RegisterScreen from '_scenes/register';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => (
  <Stack.Navigator headerMode="none" initialRouteName="Login">
    {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthStack;
