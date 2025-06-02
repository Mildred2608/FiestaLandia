import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';

const banquetesIniciales = [];

const Banquetes = () => {
  const { tipo } = useParams();
  const tipoNormalizado = tipo.trim().toLowerCase();

  const [banquetes, setBanquetes] = useState(() => {
    const guardados = localStorage.getItem('banquetes');
    return guardados ? JSON.parse(guardados) : banquetesIniciales;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [nuevoBanquete, setNuevoBanquete] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    contacto: '',
  });

  const banquetesFiltrados = banquetes.filter(
    (b) => b.tipo === tipoNormalizado
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoBanquete((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormulario = () => {
    setNuevoBanquete({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      contacto: '',
    });
    setMostrarFormulario(false);
    setModoEdicion(false);
    setIdEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campos = Object.values(nuevoBanquete);
    if (campos.some((campo) => campo.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (modoEdicion) {
      const actualizados = banquetes.map((b) =>
        b.id === idEditando ? { ...nuevoBanquete, id: idEditando, tipo: tipoNormalizado } : b
      );
      setBanquetes(actualizados);
      localStorage.setItem('banquetes', JSON.stringify(actualizados));
    } else {
      const nuevo = {
        ...nuevoBanquete,
        id: Date.now(),
        tipo: tipoNormalizado,
      };
      const nuevos = [...banquetes, nuevo];
      setBanquetes(nuevos);
      localStorage.setItem('banquetes', JSON.stringify(nuevos));
    }

    resetFormulario();
  };

  const eliminarBanquete = (id) => {
    const nuevos = banquetes.filter((b) => b.id !== id);
    setBanquetes(nuevos);
    localStorage.setItem('banquetes', JSON.stringify(nuevos));
  };

  const editarBanquete = (banquete) => {
    setNuevoBanquete({
      nombre: banquete.nombre,
      precio: banquete.precio,
      descripcion: banquete.descripcion,
      imagen: banquete.imagen,
      contacto: banquete.contacto,
    });
    setModoEdicion(true);
    setIdEditando(banquete.id);
    setMostrarFormulario(true);
  };

  return (
    <div className="grupos-container">
      <BotonRegresar customClass="boton-regresar" />

      <h1 className="titulo">
        Banquetes tipo: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </h1>

      <button
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario);
          setModoEdicion(false);
          setNuevoBanquete({
            nombre: '',
            precio: '',
            descripcion: '',
            imagen: '',
            contacto: '',
          });
        }}
        className="boton-anadir"
      >
        {mostrarFormulario ? '✖ Cerrar' : '+ AÑADIR'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="formulario-grupo">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del banquete"
            value={nuevoBanquete.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            value={nuevoBanquete.precio}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción del banquete"
            value={nuevoBanquete.descripcion}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="imagen"
            placeholder="URL de la imagen"
            value={nuevoBanquete.imagen}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="contacto"
            placeholder="Número de contacto del proveedor"
            value={nuevoBanquete.contacto}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btn btn-primary">
            {modoEdicion ? 'Guardar Cambios' : 'Guardar Banquete'}
          </button>
          <button
            type="button"
            className="btn btn-cancelar"
            onClick={resetFormulario}
          >
            Cancelar
          </button>
        </form>
      )}

      <div className="cards">
        {banquetesFiltrados.length > 0 ? (
          banquetesFiltrados.map((b) => (
            <div className="grupo-card" key={b.id}>
              {b.imagen && (
                <img
                  src={b.imagen}
                  alt={b.nombre}
                  className="grupo-imagen"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                  }}
                />
              )}
              <h2>{b.nombre}</h2>
              <p><strong>Precio:</strong> {b.precio}</p>
              <p>{b.descripcion}</p>
              <p><strong>Contacto:</strong> <a href={`tel:${b.contacto}`}>{b.contacto}</a></p>

              <button
                className="btn-editar"
                onClick={() => editarBanquete(b)}
              >
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={() => eliminarBanquete(b.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay banquetes disponibles en este tipo.</p>
        )}
      </div>
    </div>
  );
};

export default Banquetes;
