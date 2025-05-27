import React from 'react';
import BotonRegresar from '../components/BotonRegresar';

const Banquetes = () => {
  return (
    <div className="pagina-container">
      <BotonRegresar />
      <h1 className="titulo">Banquetes disponibles</h1>
      <div className="cards">
        {/* Aquí irán los banquetes */}
      </div>
    </div>
  );
};

export default Banquetes;
