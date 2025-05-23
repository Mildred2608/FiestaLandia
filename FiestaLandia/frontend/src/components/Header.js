import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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

      {/* Botón del carrito agregado aquí */}
      <button 
        className="carrito-btn"
        onClick={() => navigate('/carrito')}
        aria-label="Carrito de compras"
      >
        <img 
          src="/Carrito.png" 
          alt="Ícono de carrito" 
          className="carrito-icon" 
        />
        {/* Contador opcional - puedes conectarlo a tu estado */}
        <span className="carrito-contador">0</span>
      </button>
    </header>
  );
};

export default Header;
