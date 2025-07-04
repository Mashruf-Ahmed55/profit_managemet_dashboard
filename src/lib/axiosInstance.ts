import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
