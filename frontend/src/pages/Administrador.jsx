import React from "react";

function Administrador() {
  // Constante del usuario logueado
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  if (!usuario) {
    return (
      <div className="container mt-5">
        No estás autorizado para ver esta página. Por favor, inicia sesión.
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {usuario.nombre}.</p>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </>
  );
}

export default Administrador;
