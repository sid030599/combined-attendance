import axios from 'axios';

// Backend URLs
const API_BASE_URL = 'http://127.0.0.1:8000';
const REFRESH_TOKEN_URL = `${API_BASE_URL}/api/users/token/refresh/`;

// Function to refresh the access token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(REFRESH_TOKEN_URL, {
      refresh: refreshToken,
    });

    // Update access token in localStorage
    const newAccessToken = response.data.access;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error('Failed to refresh access token:', err);
    // Handle refresh token expiration (e.g., logout the user)
    localStorage.clear();
    window.location.href = '/'; // Redirect to login
    throw err;
  }
};
