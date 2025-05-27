import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const generos = ['Sonideros', 'Rancheros', 'Cumbias', 'Mariachis', 'Baladas'];

const Inicio = () => {
  const navigate = useNavigate();

  const manejarClick = (genero) => {
    navigate(`/grupos/${genero.toLowerCase()}`);
  };

  return (
    <div className="pagina-container inicio-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <BotonRegresar />

      <h1 className="titulo">Géneros Musicales</h1>
      <div className="genero-contenedor">
        <div className="botones-generos">
          {generos.map((genero, index) => (
            <button
              key={index}
              className="genero-btn"
              onClick={() => manejarClick(genero)}
            >
              {genero}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
