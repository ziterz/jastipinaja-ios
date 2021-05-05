import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {API_URL} from './Service';

export const saveSession = async function (authData) {
  await AsyncStorage.setItem('auth', JSON.stringify(authData));
  await AsyncStorage.setItem('token', authData.token);
};
export const getSession = async function () {
  return await AsyncStorage.getItem('auth');
};
export const getConfig = async function () {
  var authData = await AsyncStorage.getItem('auth');
  authData = JSON.parse(authData);
  return {
    headers: {Authorization: `Bearer ${authData.token}`}};
};
export const apiService = Axios.create({
    baseURL: API_URL
  });

// export const api = axios.create({
//   baseURL: API_URL,
//   timeout: 1000,
//   headers: {Authorization: `Bearer ${getToken._W}`},
// });
