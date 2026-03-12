import React from "react";
import "../styles/vehiculos.css";

const CardVehiculoGPT = ({ vehiculo }) => {
  return (
    <div className="vehiculo-card">
      {/* Imagen */}
      <div className="vehiculo-img">
        <img
          src={`https://picsum.photos/300/200?random=${vehiculo.id}`}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
        />
      </div>

      {/* Info */}
      <div className="vehiculo-info">
        <h5>
          {vehiculo.marca} {vehiculo.modelo}
        </h5>

        <p>
          <strong>Año:</strong> {vehiculo.anio}
        </p>
        <p>
          <strong>Kilómetros:</strong> {vehiculo.kilometros}
        </p>

        <span className="precio">€{vehiculo.precio}</span>

        {/* Boton */}
        <button className="btn btn-outline-success w-100 mt-2">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default CardVehiculoGPT;
