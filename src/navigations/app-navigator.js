import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';

/**
 * Navigation for internal screens
 */

const tabNavigatorConfig = {
  initalRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const routeConfigs = {
  Home: {
    screen: HomeScreen,
  },
  About: {
    screen: AboutScreen,
  },
};

const AppNavigator = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

export default AppNavigator;
