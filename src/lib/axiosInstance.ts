import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://greenfba.online',
  withCredentials: true,
});

export default axiosInstance;
