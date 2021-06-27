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
import AuthNavigator from './navigations/AuthStack';
import AppNavigator from '_navigations/AppNavigator';

import * as Colours from './styles/colours';
import * as Storage from './utils/encrypted-storage';
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
        Storage.getItem('accessToken').then(accessToken => {
          console.log('Access token:', accessToken);
          if (accessToken == null) throw Error('Token failed to save');
          dispatch({
            type: 'LOGIN',
            id: foundUser,
            accessToken: accessToken,
          });
        });
      },
      signOut: () => {
        Storage.clearStorage().then(success => {
          if (success) dispatch({type: 'LOGOUT'});
          else console.log('Sign out failed');
        });
      },
      signUp: () => {},
      toggleTheme: () => setIsDarkTheme(isDarkTheme => !isDarkTheme),
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      const accessToken = await Storage.getItem('accessToken');
      console.log(
        'Retrieved access token from encrypted storage:',
        accessToken,
      );

      checkAccessToken(accessToken)
        .then(async isValidToken => {
          if (isValidToken) {
            dispatch({
              type: 'RETRIEVE_TOKEN',
              accessToken: accessToken,
            });
          } else {
            console.log('Invalid access token, requesting a new one...');
            const refreshToken = await Storage.getItem('refreshToken');

            requestNewToken(refreshToken)
              .then(newToken => {
                dispatch(
                  newToken != null
                    ? {
                        type: 'RETRIEVE_TOKEN',
                        accessToken: newToken,
                      }
                    : {
                        type: 'LOGOUT',
                      },
                );
              })
              .catch(err => {
                console.error(err);
                dispatch({type: 'LOGOUT'});
              });
          }
        })
        .catch(err => {
          console.error(err);
          dispatch({type: 'LOGOUT'});
        });
    }, 1000);
  }, []);

  return loginState.isLoading ? (
    <SplashScreen />
  ) : (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.accessToken !== null ? (
            <AppNavigator />
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
