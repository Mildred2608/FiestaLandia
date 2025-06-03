// src/pages/InicioBanquetes.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const tiposBanquetes = ['Alta Gama', 'Media Gama', 'Baja Gama', 'Desechables', 'Otros'];

const InicioBanquetes = () => {
  const navigate = useNavigate();

  const manejarClick = (tipo) => {
    const tipoRuta = tipo.toLowerCase().replace(/\s+/g, '-');
    navigate(`/banquetes/${tipoRuta}`);
  };

  return (
    <div className="pagina-container inicio-container">
      <BotonRegresar />

      <h1 className="titulo-generos">Tipos de Banquetes</h1>

      <div className="contenedor-generos">
        {tiposBanquetes.map((tipo, index) => (
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

export default InicioBanquetes;
