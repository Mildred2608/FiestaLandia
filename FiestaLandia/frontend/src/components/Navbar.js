import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Fiestalandia</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        {user.user_type === 'admin' && (
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                        )}
                        <Link to="/profile">Perfil</Link>
                        <button onClick={logout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <Link to="/login">Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;