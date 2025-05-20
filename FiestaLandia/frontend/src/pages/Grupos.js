// src/pages/Grupos.js
import React from 'react';
import '../styles/style.css';

import soniderosImg from '../assets/sonideros.jpg';
import mariachiImg from '../assets/mariachi.jpg';
import karabaliImg from '../assets/karabali.jpg';
import nelsonImg from '../assets/Nelson.jpg';
import juniorKlanImg from '../assets/juniorklan.jpg';
import sociosImg from '../assets/socios.jpg';




const gruposMusicales = [
  {
    nombre: 'Los Sonideros',
    genero: 'Sonidero',
    trayectoria: '10 años',
    musicos: 6,
    costos: 'Desde $8,000 MXN',
    equipo: 'Bocinas JBL, luces robóticas, escenario móvil',
    extra: '$1,000 MXN por hora',
    imagen: soniderosImg,
  },
  {
    nombre: 'Mariachi Real',
    genero: 'Ranchero, Bolero etc',
    trayectoria: '15 años',
    musicos: 8,
    costos: 'Desde $6,500 MXN',
    equipo: 'Micrófonos inalámbricos, trajes típicos',
    extra: '$900 MXN por hora',
    imagen: mariachiImg,
  },
  // Puedes agregar más grupos aquí...
  {
    nombre: 'Super Grupo Karabali',
    genero: 'Cumbia, Electrocumbia',
    trayectoria: '12 años',
    musicos: 8,
    costos: 'Desde $10,500 MXN',
    equipo: 'Bocinas (medias, graves, aereas), luces de ambiente',
    extra: '$1000 MXN por hora',
    imagen: karabaliImg,
  },
  {
    nombre: 'Nelson Kansela',
    genero: 'Cumbia Tropical',
    trayectoria: '30 años',
    musicos: 5,
    costos: 'Desde $180,000 MXN',
    equipo: 'Equipo Grande para bailes',
    extra: '$20,000 MXN por hora',
    imagen: nelsonImg,
  },
  {
    nombre: 'Junior Klan',
    genero: 'Cumbia Tropical',
    trayectoria: '40 años',
    musicos: 14,
    costos: 'Desde $250,000 MXN',
    equipo: 'Equipo Grande para bailes',
    extra: '$50,000 MXN por hora',
    imagen: juniorKlanImg,
  },
  {
    nombre: 'Socios del Ritmo',
    genero: 'Cumbia Tropical',
    trayectoria: '60 años',
    musicos: 11,
    costos: 'Desde $150,000 MXN',
    equipo: 'Equipo Grande para bailes',
    extra: '$20,000 MXN por hora',
    imagen: sociosImg,
  },
];

const Grupos = () => {
  return (
    <div className="grupos-container">
      <h1 className="titulo">Grupos Musicales Disponibles</h1>
      <div className="cards">
        {gruposMusicales.map((grupo, index) => (
          <div className="grupo-card" key={index}>
            <img src={grupo.imagen} alt={grupo.nombre} className="grupo-imagen" />
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
