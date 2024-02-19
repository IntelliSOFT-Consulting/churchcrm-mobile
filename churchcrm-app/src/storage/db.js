import AsyncStorage from '@react-native-community/async-storage';

export const storeLocalStorage = (key, data) =>
  new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      resolve(true);
    } catch (e) {
      // saving error
      console.log('Store Data in AsyncStorage Error!', e);
      reject(false);
    }
  });

export const fetchLocalStorage = (key) =>
  new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        resolve(JSON.parse(value));
      }
      resolve(null);
    } catch (e) {
      console.log('AsyncStorage Error Fetch Data ', e);
      reject(null);
    }
  });

export const clearData = async () => {
  try {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
  } catch (e) {}
};
