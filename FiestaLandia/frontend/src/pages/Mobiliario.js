import React from 'react';
import BotonRegresar from '../components/BotonRegresar';

const Mobiliario = () => {
  return (
    <div className="pagina-container">
      <BotonRegresar />
      <h1 className="titulo">Muebles Disponibles</h1>
      <div className="cards">
        {/* Aquí se insertarán los muebles */}
      </div>
    </div>
  );
};

export default Mobiliario;
