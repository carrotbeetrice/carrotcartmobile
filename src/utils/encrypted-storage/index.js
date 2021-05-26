import EncryptedStorage from 'react-native-encrypted-storage';

export const getItem = key => {
  EncryptedStorage.getItem(key)
    .then(item => {
      if (!item) return null;
      else return JSON.parse(item);
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const setItem = (key, item) => {
  if (!key) throw Error('Key cannot be null');
  if (typeof item !== 'string')
    throw Error('Object to be stored must be stringified first');

  EncryptedStorage.setItem(key, item)
    .then(() => true)
    .catch(err => {
      console.error(err);
      return false;
    });
};

export const removeItem = key => {
  EncryptedStorage.removeItem(key)
    .then(() => true)
    .catch(err => {
      console.error(err);
      return false;
    });
};

export const clearStorage = () => {
  EncryptedStorage.clear()
    .then(() => true)
    .catch(err => {
      console.error(err);
      return false;
    });
};
