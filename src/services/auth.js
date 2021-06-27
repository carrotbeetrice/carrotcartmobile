import axios from 'axios';
import {AUTH_API, SHOPPING_API} from '../constants/api-services';
import * as Storage from '../utils/encrypted-storage';

const createEndpoint = path => `${AUTH_API}${path}`;

const authPaths = {
  login: '/login',
  register: '/register',
  token: '/token',
};

const results = {
  success: false,
  message: '',
};

export const loginUser = (email, password) => {
  const resultPromise = new Promise((resolve, reject) => {
    axios
      .post(
        createEndpoint(authPaths.login),
        {
          email: email,
          password: password,
        },
        {validateStatus: status => status < 500},
      )
      .then(async response => {
        if (response.status === 200) {
          // Save tokens
          const jwt = response.data.jwt;
          console.log(jwt);
          await Promise.resolve(
            Storage.setItem('accessToken', jwt.accessToken),
          );
          await Promise.resolve(
            Storage.setItem('refreshToken', jwt.refreshToken),
          );
          results.success = true;
          results.message = 'Login success!';
          return resolve(results);
        } else {
          results.success = false;
          results.message = response.data.reason;
          return resolve(results);
        }
      })
      .catch(err => console.error(err));
  });
  return resultPromise;
};

export const registerUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        createEndpoint(authPaths.register),
        {
          email: email,
          password: password,
        },
        {validateStatus: status => status < 500},
      )
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          results.success = true;
          results.message = 'Please log in to your account';
          return resolve(results);
        } else {
          results.success = false;
          results.message = response.data.reason;
          return resolve(results);
        }
      })
      .catch(err => console.error(err));
  });
};

export const requestNewToken = async refreshToken => {
  return new Promise((resolve, reject) => {
    if (!refreshToken) return resolve(null);

    axios
      .post(
        createEndpoint(authPaths.token),
        {
          accessToken: refreshToken,
        },
        {validateStatus: status => status < 500},
      )
      .then(response => {
        console.log('Result: ', response.data);
        if (response.status === 200) {
          return resolve(response.data);
        } else {
          return resolve(null);
        }
      })
      .catch(err => console.error(err));
  });
};

export const checkAccessToken = accessToken => {
  return new Promise((resolve, reject) => {
    if (accessToken == null) return resolve(false);

    axios
      .get(SHOPPING_API, {
        validateStatus: status => status < 500,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(response => {
        if (response.status === 200) {
          console.log('Check access token result:', response.data);
          return resolve(true);
        } else return resolve(false);
      })
      .catch(err => {
        console.error(err);
        return resolve(false);
      });
  });
};
