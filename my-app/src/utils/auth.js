// Save token to localStorage
export const saveToken = (token) => localStorage.setItem('token', `Bearer ${token}`);

// Get token from localStorage
export const getToken = () => localStorage.getItem('token');

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem('token');
