import React, {useEffect, useMemo, useReducer} from 'react';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import AuthContext from './components/context';
import loginReducer from './config/reducer';

import SplashScreen from './scenes/splash';
import AuthStack from './navigations/AuthStack';
import AppStack from './navigations/AppStack';

import * as Colours from './styles/colours';
import {getItem, clearStorage} from './utils/encrypted-storage';
import {requestNewToken, checkAccessToken} from './services/auth';

const initialLoginState = {
  isLoading: true,
  userName: null,
  accessToken: null,
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      // background: Colours.WHITE,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: Colours.CHARCOAL,
      text: Colours.WHITE,
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: foundUser => {
        getItem('accessToken').then(accessToken => {
          console.debug('Access token:', accessToken);
          if (accessToken == null)
            throw Error('Login error: Token failed to save');
          dispatch({
            type: 'LOGIN',
            id: foundUser,
            accessToken: accessToken,
          });
        });
      },
      signOut: () => {
        clearStorage().then(success => {
          if (success) dispatch({type: 'LOGOUT'});
          else console.debug('Sign out failed');
        });
      },
      signUp: () => {
        getItem('accessToken')
          .then(accessToken => {
            if (accessToken == null)
              throw Error('Registration error: Token failed to save');
            dispatch({
              type: 'REGISTER',
              accessToken: accessToken,
            });
          })
          .catch(err => {
            console.debug(err);
            dispatch({
              type: 'LOGOUT',
            });
          });
      },
      toggleTheme: () => setIsDarkTheme(isDarkTheme => !isDarkTheme),
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      try {
        const accessToken = await getItem('accessToken');
        console.debug(
          'Retrieved access token from encrypted storage:',
          accessToken,
        );

        const isValidToken = await checkAccessToken(accessToken);

        if (isValidToken) {
          dispatch({type: 'RETRIEVE_TOKEN', accessToken: accessToken});
        } else {
          console.debug('Invalid access token, requesting a new one...');
          const refreshToken = await getItem('refreshToken');
          console.debug(
            'Retrieved refresh token from encrypted storage:',
            refreshToken,
          );

          const newAccessToken = await requestNewToken(refreshToken);

          dispatch(
            newAccessToken != null
              ? {
                  type: 'RETRIEVE_TOKEN',
                  accessToken: newAccessToken,
                }
              : {
                  type: 'LOGOUT',
                },
          );
        }
      } catch (err) {
        console.debug(err);
        dispatch({type: 'LOGOUT'});
      }
    }, 1000);
  }, []);

  return loginState.isLoading ? (
    <SplashScreen />
  ) : (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.accessToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
