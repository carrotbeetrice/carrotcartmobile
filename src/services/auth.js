import axios from 'axios';
import {AUTH_API} from '_constants/api-services';
import * as EncryptedStorage from '_utils/encrypted-storage';

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

export const loginUser = async (email, password) => {
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
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          // Save tokens
          // const jwt = response.data.jwt;
          // EncryptedStorage.setItem('authToken', JSON.stringify(jwt.accessToken));
          // EncryptedStorage.setItem(
          //   'refreshToken',
          //   JSON.stringify(jwt.refreshToken),
          // );
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
