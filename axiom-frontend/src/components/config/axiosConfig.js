import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que esta URL sea correcta
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;