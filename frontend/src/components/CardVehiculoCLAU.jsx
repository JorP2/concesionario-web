import React from "react";

const CardVehiculoCLAU = ({ vehiculo }) => {
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={vehiculo.imagen || "/placeholder.jpg"}
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
              <p className="card-text">
                <small className="text-body-secondary">
                  Último update hace 3 mins
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardVehiculoCLAU;
