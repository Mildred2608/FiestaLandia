import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // ✅ Hook dentro del cuerpo del componente

  return (
    <div className="fondo">
      <div className="contenido">
        <h1>¡BIENVENIDOS A FIESTALANDIA!</h1>

        <div className="botones">
          <button onClick={() => navigate('/grupos')}>Grupos Musicales</button>
          <button onClick={() => navigate('/banquetes')}>Banquetes</button>
          <button onClick={() => navigate('/salones')}>Salones de Eventos</button>
          <button onClick={() => navigate('/mobiliario')}>Mobiliario</button>
          <button>Mobiliario</button>
          <button>Decoradores</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

