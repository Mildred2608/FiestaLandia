import React from 'react';
import BotonRegresar from '../components/BotonRegresar';

const Decoradores = () => {
  return (
    <div className="pagina-container">
      <BotonRegresar />
      <h1 className="titulo">Decoradores disponibles</h1>
      <div className="cards">
        {/* Aquí puedes renderizar los decoradores */}
      </div>
    </div>
  );
};

export default Decoradores;
