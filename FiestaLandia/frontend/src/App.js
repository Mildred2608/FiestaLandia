import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext'; // <-- Importa el provider carrito
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/Sobrenosotros';
import SeleccionGenero from './pages/SeleccionGenero';
import Grupos from './pages/Grupos';
import Banquetes from './pages/Banquetes';
import InicioBanquetes from './pages/InicioBanquetes';
import InicioSalones from './pages/InicioSalones';
import Salones from './pages/Salones';
import Mobiliario from './pages/Mobiliario';
import InicioMobiliario from './pages/InicioMobiliario';
import InicioDecoradores from './pages/InicioDecoradores';
import Decoradores from './pages/Decoradores';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import Carrito from './pages/Carrito';
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
      <CarritoProvider> {/* Aquí envuelves el carrito */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />

            {/* rutas abiertas al público */}
            <Route path="/grupos" element={<SeleccionGenero />} />
            <Route path="/grupos/:genero" element={<Grupos />} />
            <Route path="/banquetes" element={<InicioBanquetes />} />
            <Route path="/banquetes/:tipo" element={<Banquetes />} />

            <Route path="/salones" element={<InicioSalones />} />
            <Route path="/salones/:tipo" element={<Salones />} />


          
            <Route path="/mobiliario" element={<InicioMobiliario />} />
            <Route path="/mobiliario/:tipo" element={<Mobiliario />} />

            
            <Route path="/decoradores" element={<InicioDecoradores />} />
            <Route path="/decoradores/:tipo" element={<Decoradores />} />


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
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
