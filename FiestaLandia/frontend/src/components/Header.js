import React from 'react';
import { NavLink } from 'react-router-dom';
//import './Header.css';                 // opcional si luego añades estilos propios

const Header = () => (
  <header className="navbar">
    <div className="logo-container">
      <img src="/logo.png" alt="FiestaLandia Logo" className="logo" />
    </div>

    <ul className="menu">
      <li><NavLink to="/" end>INICIO</NavLink></li>
      <li><NavLink to="/productos">PRODUCTOS</NavLink></li>
      <li><NavLink to="/contacto">CONTACTO</NavLink></li>
      <li><NavLink to="/sobre-nosotros">SOBRE NOSOTROS</NavLink></li>
    </ul>
  </header>
);

export default Header;
