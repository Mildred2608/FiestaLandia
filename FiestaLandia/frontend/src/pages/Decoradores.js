// src/pages/Decoradores.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const decoradoresIniciales = [];

const Decoradores = () => {
  const { tipo } = useParams();
  const tipoNormalizado = tipo?.trim().toLowerCase() || '';

  const [decoradores, setDecoradores] = useState(() => {
    const guardados = localStorage.getItem('decoradores');
    return guardados ? JSON.parse(guardados) : decoradoresIniciales;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [nuevoDecorador, setNuevoDecorador] = useState({
    nombre: '',
    estilo: '',
    precio: '',
    descripcion: '',
    imagen: '',
    contacto: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoDecorador((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const campos = Object.entries(nuevoDecorador);
    if (campos.some(([_, value]) => typeof value === 'string' && value.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevo = {
      ...nuevoDecorador,
      id: modoEdicion ? idEditando : Date.now(),
      tipo: tipoNormalizado,
    };

    let nuevos;
    if (modoEdicion) {
      nuevos = decoradores.map((d) => (d.id === idEditando ? nuevo : d));
    } else {
      nuevos = [...decoradores, nuevo];
    }

    setDecoradores(nuevos);
    localStorage.setItem('decoradores', JSON.stringify(nuevos));
    setMostrarFormulario(false);
    setModoEdicion(false);
    setIdEditando(null);
    setNuevoDecorador({
      nombre: '',
      estilo: '',
      precio: '',
      descripcion: '',
      imagen: '',
      contacto: '',
    });
  };

  const eliminarDecorador = (id) => {
    const nuevos = decoradores.filter((d) => d.id !== id);
    setDecoradores(nuevos);
    localStorage.setItem('decoradores', JSON.stringify(nuevos));
  };

  const editarDecorador = (d) => {
    setNuevoDecorador(d);
    setIdEditando(d.id);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const decoradoresFiltrados = decoradores.filter((d) => d.tipo === tipoNormalizado);

  return (
    <div className="grupos-container">
      <BotonRegresar customClass="boton-regresar" />
      <h1 className="titulo">Decoradores: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="boton-anadir">
        {mostrarFormulario ? '✖ Cerrar' : '+ AÑADIR'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="formulario-grupo">
          <input name="nombre" placeholder="Nombre del decorador" value={nuevoDecorador.nombre} onChange={handleInputChange} required />
          <input name="estilo" placeholder="Estilo de decoración" value={nuevoDecorador.estilo} onChange={handleInputChange} required />
          <input name="precio" placeholder="Precio del servicio" value={nuevoDecorador.precio} onChange={handleInputChange} required />
          <textarea name="descripcion" placeholder="Descripción del servicio" value={nuevoDecorador.descripcion} onChange={handleInputChange} required />
          <input name="imagen" placeholder="URL de la imagen" value={nuevoDecorador.imagen} onChange={handleInputChange} required />
          <input name="contacto" placeholder="Teléfono o WhatsApp" value={nuevoDecorador.contacto} onChange={handleInputChange} required />

          <button type="submit" className="btn btn-primary">
            {modoEdicion ? 'Guardar Cambios' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-cancelar" onClick={() => setMostrarFormulario(false)}>
            Cancelar
          </button>
        </form>
      )}

      <div className="cards">
        {decoradoresFiltrados.length > 0 ? (
          decoradoresFiltrados.map((d) => (
            <div className="grupo-card" key={d.id}>
              {d.imagen && (
                <img
                  src={d.imagen}
                  alt={d.nombre}
                  className="grupo-imagen"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                  }}
                />
              )}
              <h2>{d.nombre}</h2>
              <p><strong>Estilo:</strong> {d.estilo}</p>
              <p><strong>Precio:</strong> {d.precio}</p>
              <p>{d.descripcion}</p>
              <p><strong>Contacto:</strong> <a href={`tel:${d.contacto}`}>{d.contacto}</a></p>

              <button className="btn-editar" onClick={() => editarDecorador(d)}>Editar</button>
              <button className="btn-eliminar" onClick={() => eliminarDecorador(d.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay decoradores registrados en este tipo.</p>
        )}
      </div>
    </div>
  );
};

export default Decoradores;
