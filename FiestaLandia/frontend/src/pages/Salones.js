import React from 'react';
import BotonRegresar from '../components/BotonRegresar';

const Salones = () => {
  return (
    <div className="pagina-container">
      <BotonRegresar />
      <h1 className="titulo">Salones Disponibles</h1>
      <div className="cards">
        {/* Aquí irán los salones */}
      </div>
    </div>
  );
};

export default Salones;
