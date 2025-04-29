import axios from 'axios';

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000' });

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const serviceToken = localStorage.getItem('serviceToken');

      if (serviceToken) {
        config.headers.Authorization = `Bearer ${serviceToken}`;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(new Error(error instanceof Error ? error.message : String(error)))
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const data = error.response.data;
      if (data.error && data.message === 'Invalid token') {
        localStorage.clear();

        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;