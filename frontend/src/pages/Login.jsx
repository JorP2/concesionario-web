import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { loginConTokens } from "../api/authApi";
import { guardarSesion } from "../utils/auth";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llama al nuevo endpoint /api/auth/login
      // Devuelve { accessToken, refreshToken, username, role }
      const sesion = await loginConTokens(username, password);

      // Guarda todo en localStorage con el nuevo formato
      guardarSesion(sesion);

      window.location.href = "/administrador";
    } catch {
      setError("Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <div className="login-header">
          <FaUserCircle size={70} />
          <h2>Iniciar sesión</h2>
          <p>¿Trabajas aquí? Accede como empleado</p>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {/*
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="remember" />
          <label className="form-check-label">Recordarme</label>
        </div> 
        */}
        

        {error && <p className="text-danger small">{error}</p>}

        <button type="submit" className="btn btn-success w-100 fw-bold">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
