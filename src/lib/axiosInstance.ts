import axios from 'axios';
// https://greenfba.online
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default axiosInstance;
