import axios from 'axios';
import {INVENTORY_API} from '../constants/api-services';

const createEndpoint = path => `${INVENTORY_API}${path}`;

const inventoryPaths = {
  byCategory: '/products/category/',
  byId: '/products',
};

const results = {
  success: false,
};

export const getAllCategories = () => {
  const url = createEndpoint('/products/categories');

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        // console.log('Response status:', response.status);
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
        } else {
          results.message = 'Unable to load page at the moment';
        }
        return reject(results);
      })
      .catch(err => console.error(err));
  });
};

export const getItemsByCategory = category => {
  const url = `${createEndpoint(inventoryPaths.byCategory)}/${category}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
          return resolve(results);
        } else {
          results.message = 'Error loading products';
          return resolve(results);
        }
      })
      .catch(err => console.error(err));
  });
};

export const getItemById = id => {
  const url = `${createEndpoint(inventoryPaths.byId)}/${id}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
        } else {
          results.message = 'Error loading product information';
        }
        return resolve(results);
      })
      .catch(err => console.error(err));
  });
};
