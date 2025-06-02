// src/pages/InicioSalones.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const tiposSalones = ['Jardín', 'Techado', 'Infantil', 'Lujo', 'Rústico'];

const InicioSalones = () => {
  const navigate = useNavigate();

  const manejarClick = (tipo) => {
    const tipoRuta = tipo.toLowerCase().replace(/\s+/g, '-');
    navigate(`/salones/${tipoRuta}`);
  };

  return (
    <div className="pagina-container inicio-container">
      <BotonRegresar />
      <h1 className="titulo-generos">Tipos de Salones</h1>

      <div className="contenedor-generos">
        {tiposSalones.map((tipo, index) => (
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

export default InicioSalones;
