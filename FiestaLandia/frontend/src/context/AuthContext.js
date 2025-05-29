import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://localhost:8000/api'; // Ajusta según tu backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login/`, {
      email,
      password
    });
    setUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  };

  const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/register/`, {
      email,
      password
    });
    setUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
