// src/pages/InicioMobiliario.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const tiposMobiliario = ['Mesas', 'Sillas', 'Toldos', 'Carpas', 'Otros'];

const InicioMobiliario = () => {
  const navigate = useNavigate();

  const manejarClick = (tipo) => {
    const tipoRuta = tipo.toLowerCase().replace(/\s+/g, '-');
    navigate(`/mobiliario/${tipoRuta}`);
  };

  return (
    <div className="pagina-container inicio-container">
      <BotonRegresar />

      <h1 className="titulo-generos">Tipos de Mobiliario</h1>

      <div className="contenedor-generos">
        {tiposMobiliario.map((tipo, index) => (
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

export default InicioMobiliario;
