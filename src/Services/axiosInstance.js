import axios from "axios";
import store from "../StoreIndex";
import { handlerefreshToken } from "Views/Common/Action/Common_action";
import { aesDecrypt, encryptData } from "Security/Crypto/Crypto";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.REACT_APP_ENVIRONMENT === "production") {
      return { ...response, data: aesDecrypt(response.data) };
    }
    else {
      return response;
    }
  },
  async (error) => {
    if (process.env.REACT_APP_ENVIRONMENT === "production") console.log("Error:", aesDecrypt(error.response.data))
    else console.log("Error:", error.response.data)

    try {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (error.response.data.message === "Token expired") {
          await store.dispatch(handlerefreshToken());
          return axiosInstance(originalRequest);
        }
      } else {
        return Promise.reject(error?.response?.data || {});
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);


axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state?.commonState?.token;

  // Split URL into path and query parameters
  const [baseUrl, queryParams] = config.url?.split('?') || [];

  if (process.env.REACT_APP_ENVIRONMENT === "production") {
    const fullEndpoint = '/api/v1' + (baseUrl || '');

    const now = new Date();
    const future = new Date(now.getTime() + 45 * 1000).toISOString();

    // Include query params in encryption payload
    const encrypted_url = encryptData({ endpoint: fullEndpoint, validating_time: future });
    const encryptedQuery = encryptData({ query_string: queryParams });
    config.url = queryParams ? `${encrypted_url}?${encryptedQuery}` : encrypted_url;

    // Encrypt the request body
    if (config.data && !(config.data instanceof FormData)) {
      const encrypted = encryptData(config.data);
      config.data = { payload: encrypted };
    }
  }
  else config.url = '/api/v1' + config.url;

  // Headers
  if (!['/get_registration_roles', '/register_candidate'].includes(baseUrl)) {
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) config.headers['Content-Type'] = 'multipart/form-data';
  else config.headers['Content-Type'] = 'application/json';
  return config;
});


export default axiosInstance;