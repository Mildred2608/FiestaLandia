// src/pages/Carrito.js
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../styles/style.css';

const Carrito = () => {
  // Extraemos vaciarCarrito además de las funciones que ya usábamos
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito
  } = useCarrito();

  const [mostrarFormularioPago, setMostrarFormularioPago] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombreTitular: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: '',
    metodo: 'tarjeta',
  });

  // Calcula el total acumulado de los precios
  const total = carrito.reduce((acum, p) => acum + p.precio, 0);

  // Actualiza los campos del formulario
  const handleCambioPago = (e) => {
    const { name, value } = e.target;
    setDatosPago((prev) => ({ ...prev, [name]: value }));
  };

  // Al enviar el formulario de pago:
  const handlePagoSubmit = (e) => {
    e.preventDefault();

    // Simulación de procesamiento de pago:
    alert(
      `Pago simulado:\n\nMétodo: ${
        datosPago.metodo === 'tarjeta'
          ? 'Tarjeta de crédito/débito'
          : datosPago.metodo === 'paypal'
          ? 'PayPal'
          : 'SPEI (Transferencia)'
      }\nNombre Titular: ${datosPago.nombreTitular}\nMonto total: $${total}`
    );

    // Después del "pago", vaciamos el carrito:
    vaciarCarrito();

    // Reiniciamos el formulario:
    setDatosPago({
      nombreTitular: '',
      numeroTarjeta: '',
      expiracion: '',
      cvv: '',
      metodo: 'tarjeta',
    });
    setMostrarFormularioPago(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrito.map((producto) => (
              <li
                key={producto.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span style={{ flexGrow: 1 }}>
                  {producto.nombre} - ${producto.precio}
                </span>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarDelCarrito(producto.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <p style={{ fontWeight: 'bold' }}>Total: ${total}</p>

          {/* Botón para mostrar/ocultar el formulario de pago */}
          <button
            className="btn-comprar"
            onClick={() => setMostrarFormularioPago((prev) => !prev)}
          >
            {mostrarFormularioPago ? '✖ Cancelar Pago' : 'Comprar Carrito'}
          </button>

          {/* Formulario de pago */}
          {mostrarFormularioPago && (
            <form
              onSubmit={handlePagoSubmit}
              style={{
                marginTop: '20px',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h2>Formulario de Pago</h2>

              {/* Selección de método de pago */}
              <label htmlFor="metodo">Método de pago:</label>
              <select
                id="metodo"
                name="metodo"
                value={datosPago.metodo}
                onChange={handleCambioPago}
                style={{ marginBottom: '12px', padding: '8px' }}
              >
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="paypal">PayPal</option>
                <option value="spei">SPEI (Transferencia)</option>
              </select>

              {/* Si el método es “tarjeta”, pedimos datos específicos */}
              {datosPago.metodo === 'tarjeta' && (
                <>
                  <input
                    type="text"
                    name="nombreTitular"
                    placeholder="Nombre en la tarjeta"
                    value={datosPago.nombreTitular}
                    onChange={handleCambioPago}
                    required
                    style={{ marginBottom: '12px', padding: '8px' }}
                  />
                  <input
                    type="text"
                    name="numeroTarjeta"
                    placeholder="Número de tarjeta (16 dígitos)"
                    value={datosPago.numeroTarjeta}
                    onChange={handleCambioPago}
                    pattern="\d{16}"
                    maxLength="16"
                    required
                    style={{ marginBottom: '12px', padding: '8px' }}
                  />
                  <input
                    type="text"
                    name="expiracion"
                    placeholder="Expiración (MM/AA)"
                    value={datosPago.expiracion}
                    onChange={handleCambioPago}
                    pattern="\d{2}/\d{2}"
                    maxLength="5"
                    required
                    style={{ marginBottom: '12px', padding: '8px' }}
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV (3 dígitos)"
                    value={datosPago.cvv}
                    onChange={handleCambioPago}
                    pattern="\d{3}"
                    maxLength="3"
                    required
                    style={{ marginBottom: '12px', padding: '8px' }}
                  />
                </>
              )}

              {/* Si es PayPal o SPEI, mostramos un mensaje informativo */}
              {datosPago.metodo === 'paypal' && (
                <p>
                  Serás redirigido a PayPal para completar tu pago. (Simulado)
                </p>
              )}
              {datosPago.metodo === 'spei' && (
                <p>
                  Para pagos por SPEI, recibirás instrucciones por correo.
                  (Simulado)
                </p>
              )}

              <button
                type="submit"
                className="btn-comprar"
                style={{ marginTop: '12px' }}
              >
                Pagar ${total}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Carrito;
