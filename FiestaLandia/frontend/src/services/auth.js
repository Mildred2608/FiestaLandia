import axios from 'axios';

// 1. Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth/',
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Interceptor para manejo global de errores
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // Error con respuesta del servidor
      return Promise.reject({
        message: error.response.data?.detail || 'Error de autenticación',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // Error sin respuesta del servidor
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        status: null
      });
    } else {
      // Error en la configuración de la petición
      return Promise.reject({
        message: 'Error al configurar la petición',
        status: null
      });
    }
  }
);

// 3. Definición de las funciones del servicio
const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('login/', { email, password });
      
      if (response.access) {
        localStorage.setItem('user', JSON.stringify(response));
        return response;
      }
      throw new Error('Respuesta inesperada del servidor');
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Error en logout:', error);
      return false;
    }
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  },

  refreshToken: async () => {
    const user = authService.getCurrentUser();
    if (!user?.refresh) return null;
    
    try {
      const response = await api.post('refresh/', { refresh: user.refresh });
      
      if (response.access) {
        const updatedUser = {
          ...user,
          access: response.access,
          refresh: response.refresh || user.refresh
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      authService.logout();
      return null;
    }
  },

  // Función adicional para verificar autenticación
  isAuthenticated: async () => {
    const user = authService.getCurrentUser();
    return !!user?.access;
  }
};

// 4. Exportación nombrada (mejor práctica)
export default authService;