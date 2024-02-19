import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {BASE_URL} from './HandleApis';
export const API_URL = `${BASE_URL}/api/`;
const config = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const withNetwork = (action, onNetworkError) => {
  NetInfo.fetch()
    .then(state => {
      if (state.isConnected) {
        action();
      } else {
        onNetworkError('Could not connect to Internet');
      }
    })
    .catch(error => {
      console.log(error);
      onNetworkError('Could not connect to Internet');
    });
};

/**
 * @param {string} endpoint - API Endpoint
 * @param {Object} formData
 * @param {string} method
 * @returns {Promise} Promise object with response data
 */
export const networkCall = function (endpoint, method = 'GET', formData) {
  let url = API_URL + endpoint;

  return axios({
    url: url,
    headers: config,
    data: formData,
    method: method,
  });
};

/**
 * GET
 * @param token
 * @returns {Promise}
 */
export const get_call = (url, token) => {
  if (token) {
    Object.assign(config, {Authorization: `Bearer ${token}`});
  }

  return networkCall(url);
};

/**
 * POST
 * @param url
 * @param token
 * @param form
 * @returns {Promise}
 */
export const post_call = (url, token, form) => {
  if (token) {
    Object.assign(config, {Authorization: `Bearer ${token}`});
  }

  return networkCall(url, 'POST', form);
};
