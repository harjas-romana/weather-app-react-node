import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      // Debug log
      console.log('Auth service response:', response);
      
      return response;
    } catch (error) {
      console.error('Auth service error:', error.response || error);
      throw error;
    }
  },
  // ... other auth methods ...
}; 