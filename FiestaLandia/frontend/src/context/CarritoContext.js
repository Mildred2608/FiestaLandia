// src/context/CarritoContext.js
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // Ahora guardaremos, en lugar de solo [ {id, nombre, precio}, ... ],
  // un arreglo de objetos { id, nombre, precio, pagado }.
  const [carrito, setCarrito] = useState([]);

  // Agrega un producto al carrito, inicial con pagado = false
  const agregarAlCarrito = (producto) => {
    const itemConEstado = { ...producto, pagado: false };
    setCarrito((prev) => [...prev, itemConEstado]);
  };

  // Elimina un producto por su id (independiente de si está pagado o no)
  const eliminarDelCarrito = (productoId) => {
    setCarrito((prev) => prev.filter((p) => p.id !== productoId));
  };

  // Marca como pagado todos los productos cuyo pagado === false
  const marcarPendientesComoPagados = () => {
    setCarrito((prev) =>
      prev.map((p) => {
        if (!p.pagado) {
          return { ...p, pagado: true };
        }
        return p;
      })
    );
  };

  // (Opcional) Función para vaciar todo el carrito si la necesitas en otro momento
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        marcarPendientesComoPagados,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};
