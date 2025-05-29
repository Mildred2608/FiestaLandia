import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState('login');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion_envio: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      password: '',
      telefono: '',
      direccion_envio: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (tab === 'login') {
        // LOGIN: usa el contexto
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        // REGISTRO: llama directamente a /api/register/
        const res = await fetch('/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || 'Error al registrar');
        }

        // Después de registro, inicia sesión automáticamente
        await login({
          email: formData.email,
          password: formData.password
        });
      }

      onClose();
      resetForm();
    } catch (err) {
      setError(err.message || 'Error de autenticación.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="tab-selector">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Iniciar Sesión</button>
          <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Registrarse</button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <>
              <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />
              <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
              <input type="text" name="direccion_envio" placeholder="Dirección de envío" value={formData.direccion_envio} onChange={handleChange} required />
            </>
          )}
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />

          {error && <div className="error-message">{error}</div>}
          <button type="submit">{tab === 'login' ? 'Ingresar' : 'Registrarse'}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
