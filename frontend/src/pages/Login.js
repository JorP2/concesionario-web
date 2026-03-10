import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('admin', usuario);
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Acceso Admin</h2>
        <p>Panel de administración de Nohales Automóviles</p>
        <input
          type="text"
          placeholder="Tu nombre"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <button type="submit">Entrar al Panel</button>
      </form>
    </div>
  );
}

export default Login;