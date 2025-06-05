// src/pages/Carrito.js
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../styles/style.css'; // Asegúrate de que aquí definiste .btn-eliminar, .btn-comprar y .etiqueta-pagado

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    marcarPendientesComoPagados,
    // vaciarCarrito  // <-- ya no lo usaremos para el flujo “pagado”
  } = useCarrito();

  // Estado para mostrar/ocultar el formulario de pago
  const [mostrarFormularioPago, setMostrarFormularioPago] = useState(false);

  // Datos del formulario de pago
  const [datosPago, setDatosPago] = useState({
    nombreTitular: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: '',
    metodo: 'tarjeta',
  });

  // Filtrar: artículos pendientes de pago (pagado === false)
  const pendientes = carrito.filter((p) => p.pagado === false);
  // Filtrar: artículos ya pagados (pagado === true)
  const pagados = carrito.filter((p) => p.pagado === true);

  // Calcular total solo de los pendientes
  const totalPendientes = pendientes.reduce((acum, p) => acum + p.precio, 0);

  // Manejar cambios en los inputs del formulario
  const handleCambioPago = (e) => {
    const { name, value } = e.target;
    setDatosPago((prev) => ({ ...prev, [name]: value }));
  };

  // Al enviar el formulario de pago:
  const handlePagoSubmit = (e) => {
    e.preventDefault();

    // Simulación de pago de todos los pendientes:
    alert(
      `Pago simulado:\n\nMétodo: ${
        datosPago.metodo === 'tarjeta'
          ? 'Tarjeta de crédito/débito'
          : datosPago.metodo === 'paypal'
          ? 'PayPal'
          : 'SPEI (Transferencia)'
      }\nNombre Titular: ${datosPago.nombreTitular}\nMonto total: $${totalPendientes}`
    );

    // Marcamos todos los pendientes como pagados (no los eliminamos)
    marcarPendientesComoPagados();

    // Reiniciamos el formulario y ocultamos la sección
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

      {/* === sección 1: artículos pendientes de pago === */}
      {pendientes.length === 0 ? (
        <p>No tienes artículos pendientes de pago.</p>
      ) : (
        <>
          <h2>Artículos en el carrito (pendientes)</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pendientes.map((producto) => (
              <li
                key={producto.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span style={{ flexGrow: 1 }}>
                  {producto.nombre} — ${producto.precio}
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

          <p style={{ fontWeight: 'bold' }}>Total pendiente: ${totalPendientes}</p>

          {/* Botón para mostrar/ocultar formulario de pago */}
          <button
            className="btn-comprar"
            onClick={() => setMostrarFormularioPago((prev) => !prev)}
          >
            {mostrarFormularioPago ? '✖ Cancelar Pago' : 'Pagar Carrito'}
          </button>

          {/* Formulario de pago SOLO para los pendientes */}
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
              <h3>Formulario de Pago</h3>

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

              {/* Si eligió “tarjeta”, mostramos campos adicionales */}
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

              {/* Mensajes para PayPal o SPEI (simulados) */}
              {datosPago.metodo === 'paypal' && (
                <p>
                  Al hacer clic en “Pagar”, se simulará redirección a PayPal.
                </p>
              )}
              {datosPago.metodo === 'spei' && (
                <p>
                  Tras “Pagar”, recibirás instrucciones por correo para SPEI.
                </p>
              )}

              <button
                type="submit"
                className="btn-comprar"
                style={{ marginTop: '12px' }}
              >
                Pagar ${totalPendientes}
              </button>
            </form>
          )}
        </>
      )}

      <hr style={{ margin: '30px 0', borderColor: '#ddd' }} />

      {/* === sección 2: artículos ya pagados === */}
      {pagados.length > 0 && (
        <>
          <h2>Artículos ya pagados</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pagados.map((producto) => (
              <li
                key={producto.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span style={{ flexGrow: 1 }}>
                  {producto.nombre} — ${producto.precio}
                </span>
                {/* Etiqueta “Pagado” (sin botón) */}
                <span className="etiqueta-pagado">Pagado</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Carrito;
