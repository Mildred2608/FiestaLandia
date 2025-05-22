// src/pages/Inicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const generos = ['Sonideros', 'Rancheros', 'Cumbias', 'Mariachis', 'Baldas'];

const Inicio = () => {
  const navigate = useNavigate();

  const manejarClick = (genero) => {
    // Redirige a /grupos/sonideros, /grupos/rancheros, etc.
    navigate(`/grupos/${genero.toLowerCase()}`);
  };

  return (
    <div className="inicio-container">
      <h1 className="titulo">Géneros Musicales</h1>
      <div className="botones-generos">
        {generos.map((genero, index) => (
          <button
            key={index}
            className="boton-genero"
            onClick={() => manejarClick(genero)}
          >
            {genero}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
