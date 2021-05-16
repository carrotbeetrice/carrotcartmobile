import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';

/**
 * Navigation for login screen
 */

const authNavigatorConfig = {
  initalRouteName: 'Login',
  header: null,
  headerMode: 'none',
};

const routeConfigs = {
  Login: LoginScreen,
};

const AuthNavigator = createStackNavigator(routeConfigs, authNavigatorConfig);

export default AuthNavigator;
