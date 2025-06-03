// src/pages/Carrito.js
import React from 'react';
import { useCarrito } from '../context/CarritoContext';

function Carrito() {
  const { carrito, eliminarDelCarrito } = useCarrito();

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {carrito.map((producto, index) => (
              <li key={index}>
                {producto.nombre} - ${producto.precio}
                <button onClick={() => eliminarDelCarrito(producto.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total}</p>
        </>
      )}
    </div>
  );
}
<form onSubmit={(e) => {
  e.preventDefault();
  alert('Compra realizada con éxito. Gracias por su pedido.');
}}>
  <h2>Formulario de pago</h2>
  <input type="text" placeholder="Nombre en la tarjeta" required />
  <input type="text" placeholder="Número de tarjeta" required pattern="\d{16}" />
  <input type="text" placeholder="Fecha de expiración (MM/AA)" required pattern="\d{2}/\d{2}" />
  <input type="text" placeholder="CVV" required pattern="\d{3}" />
  <button type="submit">Pagar</button>
</form>

export default Carrito;
