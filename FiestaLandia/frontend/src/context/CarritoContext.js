// src/context/CarritoContext.js
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agrega un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  // Elimina un producto por su id
  const eliminarDelCarrito = (productoId) => {
    setCarrito(prev => prev.filter(p => p.id !== productoId));
  };

  // Vacía totalmente el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,  // <-- Exponemos esta función
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
