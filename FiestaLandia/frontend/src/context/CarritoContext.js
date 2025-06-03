// src/context/CarritoContext.js
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

 
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  
  const eliminarDelCarrito = (productoId) => {
    setCarrito(prev => prev.filter(p => p.id !== productoId));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
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
