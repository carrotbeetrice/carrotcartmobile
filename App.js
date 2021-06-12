import React, {useEffect, useMemo, useReducer} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AuthContext from './src/components/context';

import SplashScreen from './src/scenes/splash';

import AuthStack from './src/navigations/AuthStack';
import AppStack from './src/navigations/AppStack';

import * as Storage from './src/utils/encrypted-storage';

const initialLoginState = {
  isLoading: true,
  userName: null,
  accessToken: null,
};

const App = () => {
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          accessToken: action.accessToken,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          accessToken: action.accessToken,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          accessToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          accessToken: action.accessToken,
          isLoading: false,
        };
    }
  };

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
    }),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      Storage.getItem('accessToken')
        .then(accessToken => {
          console.log('Access token:', accessToken);
          if (accessToken != null) {
            dispatch({
              type: 'RETRIEVE_TOKEN',
              accessToken: accessToken,
            });
          } else {
            dispatch({type: 'LOGOUT'});
          }
        })
        .catch(err => {
          console.error(err);
          dispatch({type: 'LOGOUT'});
        });
    }, 1000);
  }, []);

  if (loginState.isLoading) return <SplashScreen />;

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.accessToken !== null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
