import { createContext, useState, useEffect } from 'react';
import { registerUser, loginUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    if (u) {
      try {
        const userData = JSON.parse(u);
        // Validate that the user ID is a MongoDB ObjectId format
        if (userData.id && userData.id.match(/^[0-9a-fA-F]{24}$/)) {
          return userData;
        }
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
    // Clear invalid user data
    localStorage.removeItem('user');
    return null;
  });

  const login = async (username, password) => {
    try {
      const userData = await loginUser(username, password);
      if (userData.error) {
        throw new Error(userData.error);
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (username, email, password) => {
    try {
      const userData = await registerUser(username, email, password);
      if (userData.error) {
        throw new Error(userData.error);
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
