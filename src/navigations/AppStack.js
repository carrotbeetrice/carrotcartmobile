import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';

const Tab = createBottomTabNavigator();
const noHeaderOption = {headerShown: false};

const App = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
    }}
    headerMode="none">
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="About" component={AboutScreen} />
  </Tab.Navigator>
);

export default App;
