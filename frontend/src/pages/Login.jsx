import React from "react";
// API
import { login } from "../api/usuarioApi";

// Icono
import { FaUserCircle } from "react-icons/fa";

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
    <>
      <form
        onSubmit={handleLogin}
        className="mt-5 w-50 mx-auto p-4 border rounded shadow"
      >
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <div className="text-center mb-4">
          <FaUserCircle size={100} color="black" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div id="emailHelp" className="form-text">
          No compartiremos tu email con terceros
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="remember" />
          <label className="form-check-label" htmlFor="remember">
            Recordarme
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          Iniciar Sesión
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </>
  );
}

export default Login;
