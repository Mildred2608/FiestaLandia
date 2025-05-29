import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
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

  if (adminOnly && user.user_type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/login" element={<Login />} />

          {/* rutas abiertas al público */}
          <Route path="/grupos" element={<SeleccionGenero />} />
          <Route path="/grupos/:genero" element={<Grupos />} />
          <Route path="/banquetes" element={<Banquetes />} />
          <Route path="/salones" element={<Salones />} />
          <Route path="/mobiliario" element={<Mobiliario />} />
          <Route path="/decoradores" element={<Decoradores />} />

          {/* rutas protegidas */}
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
