import axios from 'axios';
import { refreshAccessToken } from './auth';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Backend base URL
});

// Request Interceptor: Add Authorization Header
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor: Handle Expired Tokens
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries
      try {
        // Refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Update the authorization header and retry the request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError); // Logout will be handled in `refreshAccessToken`
      }
    }

    return Promise.reject(error); // Pass other errors
  }
);

export default axiosInstance;
