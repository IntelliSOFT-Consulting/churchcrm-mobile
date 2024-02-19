import {BASE_URL} from './HandleApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRef} from 'react';

const useAuth = () => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let token = null;
  let userId = null;
  let stored_userId = null;
  let stored_token = null;
  let retrieved_userId = null;
  let retrieved_token = null;

  const storeUserData = async (token, userId) => {
    try {
      await AsyncStorage.setItem('userId', userId.toString());
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: config,
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        const data = await response.json();
        token = data.access_token;
        userId = data.user_id;

        storeUserData(token, userId);

        const my_id = await AsyncStorage.getItem('userId');

        return {my_id};
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');

      return {
        userId,
        token,
      };
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getStoredUserData = async () => {
    try {
      retrieved_userId = await AsyncStorage.getItem('userId');
      retrieved_token = await AsyncStorage.getItem('userToken');

      return {retrieved_userId, retrieved_token};
    } catch (error) {
      console.error('Error getting stored user data:', error);
      return null;
    }
  };
  // Password Change
  const handleChangePassword = async (
    currentpassword,
    newpassword,
    confirmpassword,
  ) => {
    try {
      let user = await AsyncStorage.getItem('userId');
      const response = await fetch(`${BASE_URL}/api/passwordchange/${user}`, {
        method: 'POST',
        headers: config,
        body: JSON.stringify({
          currentpassword,
          newpassword,
          confirmpassword,
        }),
      });
      await response.json();
      return response;
    } catch (error) {
      throw error;
    }
  };
  const handleResetPassword = async (newpassword, confirmpassword) => {
    try {
      let code = await AsyncStorage.getItem('resetCode');
      const response = await fetch(`${BASE_URL}/api/resetpassword/${code}`, {
        method: 'POST',
        headers: config,
        body: JSON.stringify({
          newpassword,
          confirmpassword,
        }),
      });
      await response.json();
      return response;
    } catch (error) {
      throw error;
    }
  };
  const HandleDeletion = async () => {
    try {
      userId = await AsyncStorage.getItem('userId');

      const response = await fetch(`${BASE_URL}/api/login/${userId}`, {
        method: 'POST',
        headers: config,
        body: JSON.stringify({userId}),
      });

      if (response.ok) {
        let del = null;
        return {del};
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting stored user data:', error);
      return null;
    }
  };
  return {
    handleLogin,
    handleLogout,
    getStoredUserData,
    handleChangePassword,
    handleResetPassword,
    HandleDeletion,
  };
};

export default useAuth;
