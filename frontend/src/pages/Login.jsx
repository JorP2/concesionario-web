import React from "react";
// API
import { login } from "../api/usuarioApi";

// Icono
import { FaUserCircle } from "react-icons/fa";

// Styles
import "../styles/login.css";

function Login() {
  // Constantes para el estado del formulario
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [remember, setRemember] = React.useState(false);
  const [error, setError] = React.useState("");

  // Funcion para manejar el submit del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // la pagina no se recarga

    try {
      const user = await login(username, password); // Obtener usuario desde la API
      alert("Inicio de sesión exitoso");
      // aquí lo redirigimos al futuro paginaAdministrador o algo asi
      localStorage.setItem("usuario", JSON.stringify(user));
      window.location.href = "/administrador"; // Redirige a la página de administrador
    } catch (error) {
      setError(
        "Credenciales incorrectas o Error de servidor al iniciar sesión",
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <div className="login-header">
          <FaUserCircle size={70} />
          <h2>Iniciar sesión</h2>
          <p>Accede a tu panel de administración</p>
        </div>

        {/* USERNAME */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* RECORDAR */}
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="remember" />
          <label className="form-check-label">Recordarme</label>
        </div>

        {/* ERROR */}
        {error && <p className="text-danger small">{error}</p>}

        {/* BOTÓN */}
        <button type="submit" className="btn btn-success w-100 fw-bold">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
