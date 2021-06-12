import EncryptedStorage from 'react-native-encrypted-storage';

export const getItem = async key => {
  try {
    const item = await EncryptedStorage.getItem(key);

    if (item !== undefined) return JSON.parse(item);
    else return null;
  } catch (e) {
    console.error(e);
  }
};

export const setItem = async (key, item) => {
  if (!key) throw Error('Key cannot be null');

  try {
    await EncryptedStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.error(err);
  }
};

export const removeItem = key => {
  const removePromise = new Promise(resolve => {
    EncryptedStorage.removeItem(key)
      .then(() => resolve(true))
      .catch(err => {
        console.error(err);
        return resolve(false);
      });
  });
  return Promise.resolve(removePromise);
};

export const clearStorage = () => {
  const clearPromise = new Promise(resolve => {
    EncryptedStorage.clear()
      .then(() => resolve(true))
      .catch(err => {
        console.error(err);
        return resolve(false);
      });
  });
  return Promise.resolve(clearPromise);
};
