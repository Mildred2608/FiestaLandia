import React from 'react';
import { useNavigate } from 'react-router-dom';

const generos = ['sonideros', 'rancheros', 'cumbias', 'mariachis', 'baladas'];

const SeleccionGenero = () => {
  const navigate = useNavigate();

  const handleSeleccion = (genero) => {
    navigate(`/grupos/${genero}`);
  };

  return (
    <div>
      <h1 className="titulo">Géneros Musicales</h1>

      <div className="genero-contenedor">
        <div className="botones-generos">
          {generos.map((genero) => (
            <button
              key={genero}
              className="genero-btn"
              onClick={() => handleSeleccion(genero)}
            >
              {genero.charAt(0).toUpperCase() + genero.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeleccionGenero;
