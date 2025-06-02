// src/pages/InicioDecoradores.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const tiposDecoradores = ['Globos', 'Flores', 'Temáticos', 'Luces', 'Otros'];

const InicioDecoradores = () => {
  const navigate = useNavigate();

  const manejarClick = (tipo) => {
    const tipoRuta = tipo.toLowerCase().replace(/\s+/g, '-');
    navigate(`/decoradores/${tipoRuta}`);
  };

  return (
    <div className="pagina-container inicio-container">
      <BotonRegresar />
      <h1 className="titulo-generos">Tipos de Decoradores</h1>
      <div className="contenedor-generos">
        {tiposDecoradores.map((tipo, index) => (
          <button
            key={index}
            className="genero-btn"
            onClick={() => manejarClick(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InicioDecoradores;
