import api from './axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('auth/login/', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error de conexión' };
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const refreshToken = async () => {
  const user = getCurrentUser();
  if (!user?.refresh) return null;
  
  try {
    const response = await api.post('auth/refresh/', { refresh: user.refresh });
    return response.data.access;
  } catch (error) {
    logout();
    return null;
  }
};

// Opcional: Servicio para obtener datos de usuario
export const getUserProfile = async () => {
  try {
    const response = await api.get('auth/user/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener perfil' };
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post('auth/register/', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al registrarse' };
  }
};
