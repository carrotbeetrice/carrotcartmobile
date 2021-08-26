import createAxiosInstance from '../utils/axios';
import {SHOPPING_API} from '../constants/api-services';

const results = {
  success: false,
};

export const getCart = async () => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get('/cart')
      .then(response => {
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
        } else {
          results.success = false;
          results.message = response.statusText;
        }
        return resolve(results);
      })
      .catch(err => reject(err));
  });
};

export const addToCart = async (productId, quantity) => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.post(`/cart/${productId}/${quantity}`)
      .then(response => {
        if (response.status === 200) {
          results.success = true;
        } else {
          results.success = false;
          results.message = response.statusText;
        }
        return resolve(results);
      })
      .catch(err => reject(err));
  });
};
