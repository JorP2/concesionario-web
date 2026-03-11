import React from "react";

const CardVehiculoDEEP = ({ vehiculo }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          {/* Asegúrate de que vehiculo.imagenUrl contenga la ruta de la imagen */}
          <img
            src={vehiculo.imagenUrl}
            className="img-fluid rounded-start"
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {vehiculo.marca} {vehiculo.modelo}
            </h5>
            <p className="card-text">Año: {vehiculo.anio}</p>
            <p className="card-text">Precio: ${vehiculo.precio}</p>
            {/* Pequeño detalle de Bootstrap que puedes mantener o quitar */}
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVehiculoDEEP;
