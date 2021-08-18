import {SHOPPING_API} from '../constants/api-services';
import createAxiosInstance from '../utils/axios';

const results = {
  success: false,
};

export const getProfile = async () => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get('/customer')
      .then(response => {
        if (response.status === 200) {
          results.success = true;
          results.data = response.data;
        } else {
          console.log(response.data);
          results.message = 'Unable to load page at the moment';
        }
        return resolve(results);
      })
      .catch(err => console.error(err));
  });
};

export const getAddressBook = async () => {
  const ax = await createAxiosInstance(SHOPPING_API);

  return new Promise((resolve, reject) => {
    ax.get("/customer/addresses")
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
}