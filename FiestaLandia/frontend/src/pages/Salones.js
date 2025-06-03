import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';
<<<<<<< HEAD
import { useCarrito } from '../context/CarritoContext';
=======
import { useCarrito } from '../context/CarritoContext'; // <-- AÑADIDO

>>>>>>> 2f0cfc5a6ce5b563424abaadb116a1b1a2f7dd07
const salonesIniciales = [];

const Salones = () => {
  const { tipo } = useParams();
  const tipoNormalizado = tipo?.trim().toLowerCase() || '';

  const { agregarProducto } = useCarrito(); // <-- AÑADIDO

  const [salones, setSalones] = useState(() => {
    const guardados = localStorage.getItem('salones');
    return guardados ? JSON.parse(guardados) : salonesIniciales;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [nuevoSalon, setNuevoSalon] = useState({
    nombre: '',
    direccion: '',
    capacidad: '',
    precio: '',
    imagen: '',
    contacto: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoSalon((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campos = Object.values(nuevoSalon);
    if (campos.some((campo) => campo.trim() === '')) {
      alert('Completa todos los campos.');
      return;
    }

    const salonNuevo = {
      ...nuevoSalon,
      id: modoEdicion ? idEditando : Date.now(),
      tipo: tipoNormalizado,
    };

    const nuevosSalones = modoEdicion
      ? salones.map((s) => (s.id === idEditando ? salonNuevo : s))
      : [...salones, salonNuevo];

    setSalones(nuevosSalones);
    localStorage.setItem('salones', JSON.stringify(nuevosSalones));
    resetFormulario();
  };

  const resetFormulario = () => {
    setNuevoSalon({
      nombre: '',
      direccion: '',
      capacidad: '',
      precio: '',
      imagen: '',
      contacto: '',
    });
    setMostrarFormulario(false);
    setModoEdicion(false);
    setIdEditando(null);
  };

  const eliminarSalon = (id) => {
    const nuevos = salones.filter((s) => s.id !== id);
    setSalones(nuevos);
    localStorage.setItem('salones', JSON.stringify(nuevos));
  };

  const editarSalon = (salon) => {
    setNuevoSalon({ ...salon });
    setModoEdicion(true);
    setIdEditando(salon.id);
    setMostrarFormulario(true);
  };
  

  const salonesFiltrados = salones.filter((s) => s.tipo === tipoNormalizado);

  return (
    <div className="grupos-container">
      <BotonRegresar customClass="boton-regresar" />
      <h1 className="titulo">Salones tipo: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="boton-anadir">
        + {modoEdicion ? 'Editar' : 'Añadir'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="formulario-grupo">
          <input type="text" name="nombre" placeholder="Nombre del salón" value={nuevoSalon.nombre} onChange={handleInputChange} required />
          <input type="text" name="direccion" placeholder="Dirección" value={nuevoSalon.direccion} onChange={handleInputChange} required />
          <input type="text" name="capacidad" placeholder="Capacidad (personas)" value={nuevoSalon.capacidad} onChange={handleInputChange} required />
          <input type="text" name="precio" placeholder="Precio" value={nuevoSalon.precio} onChange={handleInputChange} required />
          <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevoSalon.imagen} onChange={handleInputChange} required />
          <input type="text" name="contacto" placeholder="Teléfono del proveedor" value={nuevoSalon.contacto} onChange={handleInputChange} required />
          <button type="submit" className="btn btn-primary">
            {modoEdicion ? 'Guardar Cambios' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-cancelar" onClick={resetFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <div className="cards">
        {salonesFiltrados.length > 0 ? (
          salonesFiltrados.map((s) => (
            <div className="grupo-card" key={s.id}>
              {s.imagen && (
                <img
                  src={s.imagen.startsWith('http') ? s.imagen : `${s.imagen}`}
                  alt={s.nombre}
                  className="grupo-imagen"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                  }}
                />
              )}
              <h2>{s.nombre}</h2>
              <p><strong>Dirección:</strong> {s.direccion}</p>
              <p><strong>Capacidad:</strong> {s.capacidad} personas</p>
              <p><strong>Precio:</strong> {s.precio}</p>
              <p><strong>Contacto:</strong> {s.contacto}</p>

              <button className="btn-eliminar" onClick={() => eliminarSalon(s.id)}>Eliminar</button>
              <button className="btn-editar" onClick={() => editarSalon(s)}>Editar</button>

              <button
                className="btn-anadir-carrito"
                onClick={() =>
                  agregarProducto({
                    nombre: s.nombre,
                    precio: parseFloat(s.precio.replace(/[^0-9.]/g, '')) || 0,
                    cantidad: 1,
                  })
                }
              >
                Añadir al carrito
              </button>
            </div>
          ))
        ) : (
          <p>No hay salones disponibles en este tipo.</p>
        )}
      </div>
    </div>
  );
};

export default Salones;
