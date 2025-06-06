import axios from "axios";
import store from "../StoreIndex";
import { handlerefreshToken } from "Views/Common/Action/Common_action";
import { aesDecrypt, encryptData } from "Security/Crypto/Crypto";


const axiosInstance = axios.create({
  baseURL: /localhost/.test(window.location.hostname) ? process.env.REACT_APP__LOCAL_API_URL : process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.REACT_APP_ENVIRONMENT === "production") return { ...response, data: aesDecrypt(response.data) };
    else return response;
  },
  async (error) => {
    try {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (error.response.data.message === "Token expired") {
          await store.dispatch(handlerefreshToken());
          return axiosInstance(originalRequest);
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);


axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state?.commonState?.token;

  if (process.env.REACT_APP_ENVIRONMENT === "production") {
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 1000).toISOString();

    // Encrypt the URL
    const encrypted_url = encryptData({ endpoint: '/api/v1' + config.url, validating_time: future });
    config.url = `${encrypted_url}`;

    // Encrypt the request body
    if (config.data && !(config.data instanceof FormData)) {
      const encrypted = encryptData(config.data);
      config.data = { payload: encrypted };
    }
  }
  else config.url = '/api/v1' + config.url;

  // Headers
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) config.headers['Content-Type'] = 'multipart/form-data';
  else config.headers['Content-Type'] = 'application/json';

  return config;
});


export default axiosInstance;