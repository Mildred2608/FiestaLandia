import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Asegúrate que coincide con tu backend
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.access) {
    config.headers.Authorization = `Bearer ${user.access}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores y refrescar token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 y no es una petición de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.refresh) {
          const response = await axios.post('http://localhost:8000/api/auth/refresh/', {
            refresh: user.refresh
          });
          
          localStorage.setItem('user', JSON.stringify({
            ...user,
            access: response.data.access
          }));
          
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error al refrescar token:', refreshError);
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;