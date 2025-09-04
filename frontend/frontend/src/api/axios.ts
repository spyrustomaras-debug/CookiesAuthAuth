import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // your Django API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ send cookies

});

// Add a request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get access token from localStorage
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
