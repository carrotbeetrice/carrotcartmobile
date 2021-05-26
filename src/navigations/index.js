import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '_scenes/splash';
import LoginScreen from '_scenes/login';
import RegisterScreen from '_scenes/register';
import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';

const Stack = createStackNavigator();
const noHeaderOption = {headerShown: false};

const Auth = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={noHeaderOption}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={noHeaderOption}
    />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={noHeaderOption}
      />
      <Stack.Screen name="Auth" component={Auth} options={noHeaderOption} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
