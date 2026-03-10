import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>🚗 Nohales Automóviles</h1>
        </Link>
      </div>
      <nav className="nav-menu">
        <Link to="/">Inicio</Link>
        <Link to="/coches">Coches</Link>
        <Link to="/coches?filtro=proximo">Próximos</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/login" className="btn-login">Admin</Link>
      </nav>
    </header>
  );
}

export default Header;