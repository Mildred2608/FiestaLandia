// src/pages/Carrito.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom'; // Importar hook de navegación
// También asumo que tienes definidos estos hooks para el usuario y el carrito
// import { useAuth } from '../context/AuthContext';
// import { useCarrito } from '../context/CarritoContext';

function Carrito() {
  const { carrito } = useCarrito();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Carrito;
