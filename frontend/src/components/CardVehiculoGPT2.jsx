import React from "react";
import { FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardVehiculoGPT = ({ vehiculo }) => {
  const [showGallery, setShowGallery] = React.useState(false);

  return (
    <>
      <div className="card shadow-sm border-0 h-100">

        {/* Imagen */}
        <div
          className="position-relative overflow-hidden rounded-top"
          style={{ cursor: "pointer" }}
          onClick={() => setShowGallery(true)}
        >
          <img
            src={`https://picsum.photos/300/200?random=${vehiculo.id}`}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="img-fluid w-100"
          />

          {/* Overlay */}
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 hover-opacity-100 transition">
            <FaSearchPlus size={28} className="text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="card-body d-flex flex-column">

          <h5 className="fw-bold mb-1">
            {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
          </h5>

          <p className="text-muted small mb-2">
            {vehiculo.combustible} · {vehiculo.kilometros} km
          </p>

          <div className="mt-auto">
            <span className="fw-bold fs-5">
              €{vehiculo.precio}
            </span>

            <Link
              className="btn btn-outline-primary w-100 mt-2"
              to={`/vehiculos/${vehiculo.id}`}
            >
              Ver detalles
            </Link>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showGallery && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
          onClick={() => setShowGallery(false)}
        >
          <div
            className="bg-white p-3 rounded shadow w-75"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-close ms-auto d-block mb-2"
              onClick={() => setShowGallery(false)}
            ></button>

            {/* Imágenes */}
            <img
              src={`https://picsum.photos/800/400?random=${vehiculo.id}`}
              className="img-fluid rounded mb-2"
              alt=""
            />
            <img
              src={`https://picsum.photos/800/400?random=${vehiculo.id + 1}`}
              className="img-fluid rounded mb-2"
              alt=""
            />
            <img
              src={`https://picsum.photos/800/400?random=${vehiculo.id + 2}`}
              className="img-fluid rounded"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CardVehiculoGPT;