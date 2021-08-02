import axios from 'axios';
import {getItem} from './encrypted-storage';

const createAxiosInstance = async baseUrl => {
  const accessToken = await getItem('accessToken');
  if (!accessToken) throw new Error('Access token missing!');

  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    validateStatus: status => status < 500,
  });
};

export default createAxiosInstance;
