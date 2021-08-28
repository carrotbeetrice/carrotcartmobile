import createAxiosInstance from '../utils/axios';
import {SHOPPING_API} from '../constants/api-services';

const results = {
  success: false,
};

export const getWishlist = async () => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get('/wishlist')
      .then(response => {
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
        } else {
          results.message = response.statusText;
        }
        return resolve(results);
      })
      .catch(err => {
        console.error(err);
        results.message = err;
        return reject(results);
      });
  });
};

export const addOrDeleteItem = async (productId, inWishlist) => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.post('/wishlist', {
      productId: productId,
      inWishlist: inWishlist,
    })
      .then(response => {
        if (response.status === 200 && inWishlist) {
          results.success = true;
          results.message = 'Item successfully removed from wishlist';
          return resolve(results);
        } else if (response.status === 201 && !inWishlist) {
          results.success = true;
          results.message = 'Item successfully added to wishlist';
          return resolve(results);
        } else {
          results.message = inWishlist
            ? 'Error removing item from wishlist'
            : 'Error adding item to wishlist';
          return reject(results);
        }
      })
      .catch(err => console.error(err));
  });
};

export const removeFromWishlist = async productId => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.delete(`/wishlist/${productId}`)
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
