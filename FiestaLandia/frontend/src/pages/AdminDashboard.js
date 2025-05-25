import React from 'react';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user?.nombre || 'Administrador'}!</p>
      <button onClick={logout}>Cerrar Sesión</button>
      {/* Aquí puedes agregar más funcionalidades de admin */}
    </div>
  );
}

export default AdminDashboard;