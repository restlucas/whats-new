import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WHATSNEW_API_URL,
  timeout: 10000, // 10 seconds timeout
  withCredentials: true,
});

export default axiosInstance;
