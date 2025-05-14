import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="fondo">
    <div className="contenido">
      <h1>¡BIENVENIDOS A FIESTALANDIA!</h1>

      <div className="botones">
        <button>Grupos Musicales</button>
        <button>Banquetes</button>
        <button>Salones de Eventos</button>
        <button>Mobiliario</button>
        <button>Decoradores</button>
      </div>

      {/* Ejemplo de link a contacto */}
      <p style={{ marginTop: 30 }}>
        <Link to="/contacto">Contacto</Link>
      </p>
    </div>
  </div>
);

export default Home;
