import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';
import BotonRegresar from '../components/BotonRegresar';
import { useCarrito } from '../context/CarritoContext';

const gruposMusicales = [];

const Grupos = () => {
  const { genero } = useParams();
  const { agregarProducto } = useCarrito();

  const [grupos, setGrupos] = useState(() => {
    const guardados = localStorage.getItem('gruposMusicales');
    return guardados ? JSON.parse(guardados) : gruposMusicales;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

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
    (grupo) => grupo.genero.toLowerCase() === genero.trim().toLowerCase()
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoGrupo((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormulario = () => {
    setNuevoGrupo({
      nombre: '',
      trayectoria: '',
      musicos: '',
      costos: '',
      equipo: '',
      extra: '',
      imagen: '',
    });
    setMostrarFormulario(false);
    setModoEdicion(false);
    setIdEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const campos = Object.entries(nuevoGrupo);
    if (campos.some(([key, value]) => typeof value === 'string' && value.trim() === '')) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (modoEdicion) {
      const actualizados = grupos.map((g) =>
        g.id === idEditando
          ? {
              ...nuevoGrupo,
              id: idEditando,
              genero: genero.trim().toLowerCase(),
              musicos: parseInt(nuevoGrupo.musicos),
            }
          : g
      );
      setGrupos(actualizados);
      localStorage.setItem('gruposMusicales', JSON.stringify(actualizados));
    } else {
      const grupoNuevo = {
        ...nuevoGrupo,
        id: Date.now(),
        genero: genero.trim().toLowerCase(),
        musicos: parseInt(nuevoGrupo.musicos),
      };
      const nuevosGrupos = [...grupos, grupoNuevo];
      setGrupos(nuevosGrupos);
      localStorage.setItem('gruposMusicales', JSON.stringify(nuevosGrupos));
    }

    resetFormulario();
  };

  const eliminarGrupo = (id) => {
    const nuevosGrupos = grupos.filter((grupo) => grupo.id !== id);
    setGrupos(nuevosGrupos);
    localStorage.setItem('gruposMusicales', JSON.stringify(nuevosGrupos));
  };

  const editarGrupo = (grupo) => {
    setNuevoGrupo({ ...grupo });
    setModoEdicion(true);
    setIdEditando(grupo.id);
    setMostrarFormulario(true);
  };

  return (
    <div className="grupos-container">
      <BotonRegresar customClass="boton-regresar" />

      <h1 className="titulo">
        Grupos de {genero.charAt(0).toUpperCase() + genero.slice(1)}
      </h1>

      <button
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario);
          setModoEdicion(false);
          setNuevoGrupo({
            nombre: '',
            trayectoria: '',
            musicos: '',
            costos: '',
            equipo: '',
            extra: '',
            imagen: '',
          });
        }}
        className="boton-anadir"
      >
        {mostrarFormulario ? '✖ Cerrar' : '+ AÑADIR'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="formulario-grupo">
          <input type="text" name="nombre" placeholder="Nombre del grupo" value={nuevoGrupo.nombre} onChange={handleInputChange} required />
          <input type="text" name="trayectoria" placeholder="Años de trayectoria" value={nuevoGrupo.trayectoria} onChange={handleInputChange} required />
          <input type="number" name="musicos" placeholder="Número de músicos" value={nuevoGrupo.musicos} onChange={handleInputChange} required />
          <input type="text" name="costos" placeholder="Costos por paquete" value={nuevoGrupo.costos} onChange={handleInputChange} required />
          <input type="text" name="equipo" placeholder="Equipo" value={nuevoGrupo.equipo} onChange={handleInputChange} required />
          <input type="text" name="extra" placeholder="Costo extra por hora" value={nuevoGrupo.extra} onChange={handleInputChange} required />
          <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevoGrupo.imagen} onChange={handleInputChange} required />

          <button type="submit" className="btn btn-primary">
            {modoEdicion ? 'Guardar Cambios' : 'Guardar Grupo'}
          </button>
          <button type="button" className="btn btn-cancelar" onClick={resetFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <div className="cards">
        {gruposFiltrados.length > 0 ? (
          gruposFiltrados.map((grupo) => (
            <div className="grupo-card" key={grupo.id}>
              {grupo.imagen && (
                <img
                  src={grupo.imagen.startsWith('http') ? grupo.imagen : `${grupo.imagen}`}
                  alt={grupo.nombre}
                  className="grupo-imagen"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                  }}
                />
              )}
              <h2>{grupo.nombre}</h2>
              <h3>Género: {grupo.genero}</h3>
              <p><strong>Años de trayectoria:</strong> {grupo.trayectoria}</p>
              <p><strong>Número de músicos:</strong> {grupo.musicos}</p>
              <p><strong>Costos por paquetes:</strong> {grupo.costos}</p>
              <p><strong>Equipo:</strong> {grupo.equipo}</p>
              <p><strong>Costo extra por hora:</strong> {grupo.extra}</p>

              <button className="btn-eliminar" onClick={() => eliminarGrupo(grupo.id)}>Eliminar</button>
              <button className="btn-editar" onClick={() => editarGrupo(grupo)}>Editar</button>

              <button
                className="btn-anadir-carrito"
                onClick={() =>
                  agregarProducto({
                    nombre: grupo.nombre,
                    precio: parseFloat(grupo.costos.replace(/[^0-9.]/g, '')) || 0,
                    cantidad: 1,
                  })
                }
              >
                Añadir al carrito
              </button>
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
