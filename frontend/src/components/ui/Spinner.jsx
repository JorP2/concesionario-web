import React from "react";

function Spinner({ message = "Procesando..." }) {
  return (
    <div className="global-spinner">
      <div className="spinner-content">
        <div className="spinner-border text-primary" style={{ width: "2rem", height: "2rem" }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 mb-0 text-muted" style={{ fontSize: "12px" }}>{message}</p>
      </div>
    </div>
  );
}

export default Spinner;