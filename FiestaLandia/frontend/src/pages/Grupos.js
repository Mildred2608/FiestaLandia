// src/pages/Grupos.js
import React from 'react';

import '../styles/Grupos.css';


const gruposMusicales = [
  {
    nombre: 'Los Sonideros',
    genero: 'Cumbia',
    trayectoria: '10 años',
    musicos: 6,
    costos: 'Desde $8,000 MXN',
    equipo: 'Bocinas JBL, luces robóticas, escenario móvil',
    extra: '$1,000 MXN por hora',
  },
  {
    nombre: 'Mariachi Real',
    genero: 'Ranchero',
    trayectoria: '15 años',
    musicos: 8,
    costos: 'Desde $6,500 MXN',
    equipo: 'Micrófonos inalámbricos, trajes típicos',
    extra: '$900 MXN por hora',
  },
  // Puedes agregar más grupos aquí...
];

const Grupos = () => {
  return (
    <div className="grupos-container">
      <h1 className="titulo">Grupos Musicales Disponibles</h1>
      <div className="cards">
        {gruposMusicales.map((grupo, index) => (
          <div className="grupo-card" key={index}>
            <h2>{grupo.nombre}</h2>
            <h3>Género: {grupo.genero}</h3>
            <p><strong>Años de trayectoria:</strong> {grupo.trayectoria}</p>
            <p><strong>Número de músicos:</strong> {grupo.musicos}</p>
            <p><strong>Costos por paquetes:</strong> {grupo.costos}</p>
            <p><strong>Equipo:</strong> {grupo.equipo}</p>
            <p><strong>Costo extra por hora:</strong> {grupo.extra}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grupos;
