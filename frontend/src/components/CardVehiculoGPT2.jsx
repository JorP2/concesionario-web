import React from "react";
import "../styles/vehiculos.css";
import { useNavigate } from "react-router-dom";
// Icono
import { FaSearchPlus } from "react-icons/fa";

const CardVehiculoGPT = ({ vehiculo }) => {
  // Constante para mostrar u ocultar la galería de imágenes
  const [showGallery, setShowGallery] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="vehiculo-card">
        {/* Imagen */}
        <div className="vehiculo-img" onClick={() => setShowGallery(true)}>
          <img
            src={`https://picsum.photos/300/200?random=${vehiculo.id}`}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          />

          <div className="vehiculo-overlay">
            <FaSearchPlus size={30} className="overlay-icon" />
          </div>
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

          <button
            className="btn btn-outline-success w-100 mt-2"
            onClick={() => navigate(`/vehiculos/${vehiculo.id}`)}
          >
            Ver detalles
          </button>
        </div>
      </div>

      {/* Galería Modal */}
      {showGallery && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              {/* cerrar */}
              <button
                className="btn-close m-2 ms-auto"
                onClick={() => setShowGallery(false)}
              ></button>

              {/* carrusel */}
              <div id={`carousel-${vehiculo.id}`} className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={`https://picsum.photos/800/400?random=${vehiculo.id}`}
                      className="d-block w-100"
                      alt=""
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src={`https://picsum.photos/800/400?random=${vehiculo.id + 1}`}
                      className="d-block w-100"
                      alt=""
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src={`https://picsum.photos/800/400?random=${vehiculo.id + 2}`}
                      className="d-block w-100"
                      alt=""
                    />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  data-bs-target={`#carousel-${vehiculo.id}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                  className="carousel-control-next"
                  data-bs-target={`#carousel-${vehiculo.id}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardVehiculoGPT;
