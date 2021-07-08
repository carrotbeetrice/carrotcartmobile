import createAxiosInstance from '../utils/axios';
import {INVENTORY_API, SHOPPING_API} from '../constants/api-services';

const results = {
  success: false,
};

export const getAllCategories = async () => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get('/category')
      .then(response => {
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
        } else {
          results.message = 'Unable to load page at the moment';
        }
        return resolve(results);
      })
      .catch(err => console.error(err));
  });
};

export const getItemsByCategory = async categoryId => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get(`/products/category/${categoryId}`)
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

export const getItemById = async productId => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get(`/products/${productId}`)
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
