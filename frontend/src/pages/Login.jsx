import React from "react";

// Icono
import { FaUserCircle } from "react-icons/fa";

function Login() {
  return (
    <>
      <form action="" className="mt-5 w-50 mx-auto p-4 border rounded shadow">
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <div className="text-center mb-4">
          <FaUserCircle size={100} color="black" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="ejemplo@gmail.com"
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
            placeholder="************"
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
      </form>
    </>
  );
}

export default Login;
