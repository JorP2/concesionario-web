import React from "react";

function CardVehiculoAdmin({ vehiculo }) {
  return (
    <>
      <div className="card shadow-sm">
        <div className="row g-0 align-items-center">
          {/* IMAGEN */}
          <div className="col-md-3">
            <img
              src={`https://picsum.photos/300/200?random=${vehiculo.id}`}
              className="img-fluid rounded-start"
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            />
          </div>

          {/* INFO */}
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">
                {vehiculo.marca} {vehiculo.modelo}
              </h5>

              <p className="card-text mb-1">
                <strong>Año:</strong> {vehiculo.anio}
              </p>

              <p className="card-text mb-1">
                <strong>Precio:</strong> €{vehiculo.precio}
              </p>
            </div>
          </div>

          {/* BOTONES */}
          <div className="col-md-3 text-center">
            <div className="d-flex flex-column gap-2 p-3">
              <button className="btn btn-warning">Editar</button>

              <button className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardVehiculoAdmin;
