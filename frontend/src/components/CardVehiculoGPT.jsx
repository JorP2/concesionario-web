import React from "react";

const CardVehiculoGPT = ({ vehiculo }) => {
  return (
    <div className="card mb-3 shadow-sm" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        {/* Imagen */}
        <div className="col-md-4">
          {/* <img
            src={vehiculo.imagen || "/placeholder.jpg"}
            className="img-fluid rounded-start h-100 object-fit-cover"
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          /> */}
          <img
            src={`https://picsum.photos/300/200?random=${vehiculo.id}`}
            className="img-fluid rounded-start h-100 object-fit-cover"
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          />
        </div>

        {/* Info */}
        <div className="col-md-8">
          <div className="card-body">
            {/* Título */}
            <h5 className="card-title fw-bold">
              {vehiculo.marca} {vehiculo.modelo}
            </h5>

            {/* Datos */}
            <p className="card-text mb-1">
              <strong>Año:</strong> {vehiculo.anio}
            </p>

            <p className="card-text mb-1">
              <strong>Kilómetros:</strong> {vehiculo.kilometros}
            </p>

            <p className="card-text text-primary fw-semibold">
              €{vehiculo.precio}
            </p>

            {/* Botón */}
            {/* Boton */}
            <button className="btn btn-outline-success w-100 mt-2">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVehiculoGPT;
