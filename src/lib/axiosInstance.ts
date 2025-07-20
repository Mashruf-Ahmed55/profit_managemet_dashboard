import axios from 'axios';
// https://greenfba.online
const axiosInstance = axios.create({
  baseURL: 'https://greenfba.online',
  withCredentials: true,
});

export default axiosInstance;
