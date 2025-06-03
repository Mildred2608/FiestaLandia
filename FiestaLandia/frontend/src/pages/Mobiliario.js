// src/pages/Mobiliario.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const mobiliarioInicial = [];

const Mobiliario = () => {
  const { tipo } = useParams();
  const tipoNormalizado = tipo?.trim().toLowerCase() || '';

  const [items, setItems] = useState(() => {
    const guardados = localStorage.getItem('mobiliario');
    return guardados ? JSON.parse(guardados) : mobiliarioInicial;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [nuevoItem, setNuevoItem] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    contacto: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const campos = Object.entries(nuevoItem);
    if (campos.some(([key, value]) => typeof value === 'string' && value.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const itemNuevo = {
      ...nuevoItem,
      id: modoEdicion ? idEditando : Date.now(),
      tipo: tipoNormalizado,
    };

    let nuevosItems;

    if (modoEdicion) {
      nuevosItems = items.map((item) => (item.id === idEditando ? itemNuevo : item));
    } else {
      nuevosItems = [...items, itemNuevo];
    }

    setItems(nuevosItems);
    localStorage.setItem('mobiliario', JSON.stringify(nuevosItems));
    setMostrarFormulario(false);
    setModoEdicion(false);
    setIdEditando(null);
    setNuevoItem({
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
      contacto: '',
    });
  };

  const eliminarItem = (id) => {
    const nuevosItems = items.filter((item) => item.id !== id);
    setItems(nuevosItems);
    localStorage.setItem('mobiliario', JSON.stringify(nuevosItems));
  };

  const editarItem = (item) => {
    setNuevoItem(item);
    setIdEditando(item.id);
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const itemsFiltrados = items.filter((item) => item.tipo === tipoNormalizado);

  return (
    <div className="grupos-container">
      <BotonRegresar customClass="boton-regresar" />
      <h1 className="titulo">Mobiliario: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="boton-anadir">
        + {modoEdicion ? 'Editar' : 'Añadir'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="formulario-grupo">
          <input type="text" name="nombre" placeholder="Nombre del mobiliario" value={nuevoItem.nombre} onChange={handleInputChange} required />
          <input type="text" name="descripcion" placeholder="Descripción" value={nuevoItem.descripcion} onChange={handleInputChange} required />
          <input type="text" name="precio" placeholder="Precio del servicio" value={nuevoItem.precio} onChange={handleInputChange} required />
          <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevoItem.imagen} onChange={handleInputChange} required />
          <input type="text" name="contacto" placeholder="Número de contacto" value={nuevoItem.contacto} onChange={handleInputChange} required />
          <button type="submit" className="btn btn-primary">
            {modoEdicion ? 'Guardar Cambios' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-cancelar" onClick={() => setMostrarFormulario(false)}>
            Cancelar
          </button>
        </form>
      )}

      <div className="cards">
        {itemsFiltrados.length > 0 ? (
          itemsFiltrados.map((item) => (
            <div className="grupo-card" key={item.id}>
              {item.imagen && (
                <img
                  src={item.imagen.startsWith('http') ? item.imagen : `${item.imagen}`}
                  alt={item.nombre}
                  className="grupo-imagen"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                  }}
                />
              )}
              <h2>{item.nombre}</h2>
              <p><strong>Descripción:</strong> {item.descripcion}</p>
              <p><strong>Precio:</strong> {item.precio}</p>
              <p><strong>Contacto:</strong> {item.contacto}</p>
              <button className="btn-eliminar" onClick={() => eliminarItem(item.id)}>Eliminar</button>
              <button className="btn-editar" onClick={() => editarItem(item)}>Editar</button>
            </div>
          ))
        ) : (
          <p>No hay elementos registrados en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default Mobiliario;
