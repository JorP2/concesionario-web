import React from "react";
import { Link } from "react-router-dom";

function CardVehiculoAdmin({ vehiculo, onEliminar }) {
  // Funcion para manejar eliminar
  const handleEliminar = () => {
    onEliminar(vehiculo.id);
  };

  // Id para cada modal, evitamos duplicdos
  const modalId = `eliminarModal-${vehiculo.id}`;

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
              <Link
                to={`/administrador/vehiculo-form/${vehiculo.id}`}
                className="btn btn-warning"
              >
                Editar
              </Link>

              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
              >
                Eliminar
              </button>

              {/* Modal de confirmación */}
              <div
                className="modal fade"
                id={modalId}
                tabIndex={-1}
                aria-labelledby={modalId}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id={modalId}>
                        ¿Seguro desea eliminar este vehículo?
                      </h1>
                      <button
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Esta acción no se puede deshacer.
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      {/* Eliminar realmente */}
                      <button
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={handleEliminar}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardVehiculoAdmin;
