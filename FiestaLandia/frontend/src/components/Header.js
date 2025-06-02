import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Carrito from './pages/Carrito';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="FiestaLandia Logo" className="logo" />
      </div>

      <ul className="menu">
        <li><NavLink to="/" end>INICIO</NavLink></li>
        <li><NavLink to="/sobre-nosotros">SOBRE NOSOTROS</NavLink></li>
        <li><NavLink to="/productos">PRODUCTOS</NavLink></li>
        <li><NavLink to="/contacto">CONTACTO</NavLink></li>
      </ul>

      {/* Botón del carrito corregido */}
      <div className="carrito-container">
        <button
          className="carrito-btn"
          onClick={() => navigate('/carrito')}
          aria-label="Carrito de compras"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img
            src="/Carrito.png"
            alt="Ícono de carrito"
            className="carrito-icon"
            style={{ width: '40px', height: '40px' }}
          />
          <span className="carrito-contador">0</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
