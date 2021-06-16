import axios from 'axios';
import {INVENTORY_API} from '_constants/api-services';

const createEndpoint = path => `${INVENTORY_API}${path}`;

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
          return resolve(results);
        } else {
          results.message = 'Unable to load page at the moment';
          return reject(results);
        }
      })
      .catch(err => console.error(err));
  });
};
