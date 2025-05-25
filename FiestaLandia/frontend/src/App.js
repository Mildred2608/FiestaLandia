import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/Sobrenosotros';
import SeleccionGenero from './pages/SeleccionGenero';
import Grupos from './pages/Grupos';
import Banquetes from './pages/Banquetes';
import Salones from './pages/Salones';
import Mobiliario from './pages/Mobiliario';
import Decoradores from './pages/Decoradores';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import './styles/style.css';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && (!user.user_type || user.user_type !== 'admin')) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Ruta de login pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta principal protegida */}
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          {/* Otras rutas públicas */}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          
          {/* Rutas protegidas */}
          <Route path="/grupos" element={
            <PrivateRoute>
              <SeleccionGenero />
            </PrivateRoute>
          } />
          <Route path="/grupos/:genero" element={
            <PrivateRoute>
              <Grupos />
            </PrivateRoute>
          } />
          <Route path="/banquetes" element={
            <PrivateRoute>
              <Banquetes />
            </PrivateRoute>
          } />
          <Route path="/salones" element={
            <PrivateRoute>
              <Salones />
            </PrivateRoute>
          } />
          <Route path="/mobiliario" element={
            <PrivateRoute>
              <Mobiliario />
            </PrivateRoute>
          } />
          <Route path="/decoradores" element={
            <PrivateRoute>
              <Decoradores />
            </PrivateRoute>
          } />
          <Route path="/perfil" element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;