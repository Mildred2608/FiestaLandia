import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Ejemplo de función para agregar producto
  const agregarProducto = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  // Puedes agregar funciones para eliminar, limpiar carrito, etc.

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto }}>
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
