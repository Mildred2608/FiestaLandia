// src/pages/Grupos.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/style.css';

import soniderosImg from '../assets/sonideros.jpg';
import mariachiImg from '../assets/mariachi.jpg';
import karabaliImg from '../assets/karabali.jpg';
import nelsonImg from '../assets/Nelson.jpg';
import juniorKlanImg from '../assets/juniorklan.jpg';
import sociosImg from '../assets/socios.jpg';
import BotonRegresar from '../components/BotonRegresar'; // Ruta corregida

const gruposMusicales = [
  {
    nombre: 'Los Sonideros',
    genero: 'sonideros',
    trayectoria: '10 años',
    musicos: 6,
    costos: 'Desde $8,000 MXN',
    equipo: 'Bocinas JBL, luces robóticas, escenario móvil',
    extra: '$1,000 MXN por hora',
    imagen: soniderosImg,
  },
  {
    nombre: 'Mariachi Real',
    genero: 'mariachis',
    trayectoria: '15 años',
    musicos: 8,
    costos: 'Desde $6,500 MXN',
    equipo: 'Micrófonos inalámbricos, trajes típicos',
    extra: '$900 MXN por hora',
    imagen: mariachiImg,
  },
  {
    nombre: 'Super Grupo Karabali',
    genero: 'cumbias',
    trayectoria: '12 años',
    musicos: 8,
    costos: 'Desde $10,500 MXN',
    equipo: 'Bocinas (medias, graves, aéreas), luces de ambiente',
    extra: '$1000 MXN por hora',
    imagen: karabaliImg,
  },
  {
    nombre: 'Nelson Kansela',
    genero: 'cumbias',
    trayectoria: '30 años',
    musicos: 5,
    costos: 'Desde $180,000 MXN',
    equipo: 'Equipo Grande para bailes',
    extra: '$20,000 MXN por hora',
    imagen: nelsonImg,
  },
  {
    nombre: 'Junior Klan',
    genero: 'cumbias',
    trayectoria: '40 años',
    musicos: 14,
    costos: 'Desde $250,000 MXN',
    equipo: 'Equipo Grande para bailes',
    extra: '$50,000 MXN por hora',
    imagen: juniorKlanImg,
  },
  {
    nombre: 'Socios del Ritmo',
    genero: 'cumbias',
    trayectoria: '60 años',
    musicos: 11,
    costos: 'Desde $150,000 MXN',
    equipo: 'Equipo Grande para bailes',
    extra: '$20,000 MXN por hora',
    imagen: sociosImg,
  },
];

const Grupos = () => {
  const { genero } = useParams();
  const [grupos, setGrupos] = useState(gruposMusicales);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Campos del formulario
  const [nuevoGrupo, setNuevoGrupo] = useState({
    nombre: '',
    trayectoria: '',
    musicos: '',
    costos: '',
    equipo: '',
    extra: '',
    imagen: '',
  });

  const gruposFiltrados = grupos.filter(
    (grupo) => grupo.genero.toLowerCase() === genero.toLowerCase()
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoGrupo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const campos = Object.values(nuevoGrupo);
    if (campos.some((campo) => campo.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const grupoNuevo = {
      ...nuevoGrupo,
      genero: genero.toLowerCase(),
      musicos: parseInt(nuevoGrupo.musicos),
    };

    setGrupos([...grupos, grupoNuevo]);
    setMostrarFormulario(false);
    setNuevoGrupo({
      nombre: '',
      trayectoria: '',
      musicos: '',
      costos: '',
      equipo: '',
      extra: '',
      imagen: '',
    });
  };

  return (
  <div className="grupos-container">
    {/* Botón Regresar */}
    <BotonRegresar customClass="boton-regresar" />
    
    {/* Título */}
    <h1 className="titulo">
      Grupos de {genero.charAt(0).toUpperCase() + genero.slice(1)}
    </h1>

    {/* Botón Añadir - MODIFICADO */}
    <button 
      onClick={() => setMostrarFormulario(!mostrarFormulario)} 
      className="boton-anadir"  // Cambiado a clase personalizada
    >
    + AÑADIR
    </button>

      {/* Formulario (condicional) */}
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="formulario-grupo">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del grupo"
            value={nuevoGrupo.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="trayectoria"
            placeholder="Años de trayectoria"
            value={nuevoGrupo.trayectoria}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="musicos"
            placeholder="Número de músicos"
            value={nuevoGrupo.musicos}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="costos"
            placeholder="Costos por paquete"
            value={nuevoGrupo.costos}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="equipo"
            placeholder="Equipo"
            value={nuevoGrupo.equipo}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="extra"
            placeholder="Costo extra por hora"
            value={nuevoGrupo.extra}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL de la imagen"
            value={nuevoGrupo.imagen}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Guardar Grupo
          </button>

         <button 
          type="button" 
          className="btn btn-cancelar"
          onClick={() => setMostrarFormulario(false)} // Cierra el formulario
        >
          Cancelar
        </button>

        </form>
      )}

      {/* Listado de grupos */}
      <div className="cards">
        {gruposFiltrados.length > 0 ? (
          gruposFiltrados.map((grupo, index) => (
            <div className="grupo-card" key={index}>
              {grupo.imagen && (
                <img 
                  src={grupo.imagen} 
                  alt={grupo.nombre} 
                  className="grupo-imagen" 
                />
              )}
              <h2>{grupo.nombre}</h2>
              <h3>Género: {grupo.genero}</h3>
              <p><strong>Años de trayectoria:</strong> {grupo.trayectoria}</p>
              <p><strong>Número de músicos:</strong> {grupo.musicos}</p>
              <p><strong>Costos por paquetes:</strong> {grupo.costos}</p>
              <p><strong>Equipo:</strong> {grupo.equipo}</p>
              <p><strong>Costo extra por hora:</strong> {grupo.extra}</p>
            </div>
          ))
        ) : (
          <p>No hay grupos disponibles en este género.</p>
        )}
      </div>
    </div>
  );
};

export default Grupos;
