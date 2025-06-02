import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { FaUser } from 'react-icons/fa';


function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src="/logo.png" alt="Fiestalandia Logo" className="logo" />
          </Link>
        </div>

        <ul className="menu">
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/sobre-nosotros">SOBRE NOSOTROS</Link></li>
          <li><Link to="/grupos">PRODUCTOS</Link></li>
          <li><Link to="/contacto">CONTACTO</Link></li>
        </ul>

        <div className="navbar-right">
          <button className="carrito-btn">
            <img src="/carrito.png" alt="Carrito" className="carrito-icon" />
            <div className="carrito-contador">0</div>
          </button>

          {!user ? (
            <button className="usuario-btn" onClick={() => setModalOpen(true)}>
              <FaUser className="usuario-icon" />
              <span className="usuario-texto">Iniciar Sesión / Registrarse</span>
            </button>
          ) : (
            <>
              {user.user_type === 'admin' && (
                <Link to="/admin">Admin Dashboard</Link>
              )}
              <Link to="/perfil">Perfil</Link>
              <button onClick={logout}>Cerrar Sesión</button>
            </>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Navbar;
