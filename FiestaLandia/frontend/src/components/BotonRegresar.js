import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonRegresar = () => {
  const navigate = useNavigate();

  return (
    <button className="boton-regresar" onClick={() => navigate(-1)}>
      ⬅ Regresar
    </button>
  );
};

export default BotonRegresar;
