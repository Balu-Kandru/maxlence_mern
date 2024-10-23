import axios from 'axios';
import { BASE_URL, getToken } from './common';
import { handleApiError } from './errorHandling';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);
