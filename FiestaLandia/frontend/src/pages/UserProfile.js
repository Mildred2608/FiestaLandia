import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div className="user-profile">
      <h1>Mi Perfil</h1>
      <p>Nombre: {user?.nombre}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}

export default UserProfile;