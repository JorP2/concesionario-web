import React from "react";
import {
  FaSearchPlus,
  FaGasPump,
  FaTachometerAlt,
  FaRoad,
  FaCalendarAlt,
  FaLeaf,
} from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { Link } from "react-router-dom";
import sinImagen from "../assets/sin-imagen.svg";
import "../styles/vehiculoCard.css";

const CardVehiculoGPT = ({ vehiculo, vendido = false }) => {
  const [showGallery, setShowGallery] = React.useState(false);

  const getFuelIcon = (tipo) => {
    if (!tipo) return <FaGasPump size={12} />;
    const t = tipo.toLowerCase();
    if (t.includes("eléctric") || t.includes("electri"))
      return <MdElectricBolt size={13} />;
    if (t.includes("híbrido") || t.includes("hibrido") || t.includes("phev"))
      return <FaLeaf size={12} />;
    return <FaGasPump size={12} />;
  };

  return (
    <>
      <div className="vehiculo-card">
        <div className="vehiculo-img" onClick={() => setShowGallery(true)}>
          <img
            src={vehiculo.imagenPortada || sinImagen}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="img-fluid w-100"
          />

          {vendido && <div className="vendido-ribbon">VENDIDO</div>}

          {vehiculo.enOferta && vehiculo.precioOferta && (
            <div className="oferta-ribbon">OFERTA</div>
          )}

          <div className="vehiculo-overlay">
            <FaSearchPlus className="overlay-icon" />
          </div>
        </div>

        <div className="vehiculo-info">
          <div className="vehiculo-header mb-3 d-flex justify-content-between align-items-baseline">

            <div>
              <h5 className="mb-0">
                {vehiculo.marca} {vehiculo.modelo}
              </h5>

              {vehiculo.version && (
                <p className="vehiculo-version mb-0">
                  {vehiculo.version}
                </p>
              )}
            </div>

            <div className="vehiculo-price-block text-end text-nowrap">
              {vehiculo.enOferta && vehiculo.precioOferta ? (
                <div className="d-flex gap-2 justify-content-end">
                  <span className="text-decoration-line-through text-muted">
                    {Number(vehiculo.precio).toLocaleString("es-ES")} €
                  </span>

                  <span className="text-primary fw-bold">
                    {Number(vehiculo.precioOferta).toLocaleString("es-ES")} €
                  </span>
                </div>
              ) : (
                <span className="text-primary fw-bold">
                  {Number(vehiculo.precio).toLocaleString("es-ES")} €
                </span>
              )}
            </div>

          </div>

          {/* SPECS */}
          <div className="vehiculo-specs mb-3 row g-2">
            {vehiculo.tipo && (
              <span className="spec-item col-6 d-flex align-items-center gap-1">
                <FaTachometerAlt size={12} />
                {vehiculo.tipo.charAt(0) + vehiculo.tipo.slice(1).toLowerCase()}
              </span>
            )}

            {vehiculo.anio && (
              <span className="spec-item col-6 d-flex align-items-center gap-1">
                <FaCalendarAlt size={12} />
                {vehiculo.anio}
              </span>
            )}

            {vehiculo.combustible && (
              <span className="spec-item col-6 d-flex align-items-center gap-1">
                {getFuelIcon(vehiculo.combustible)}
                {vehiculo.combustible}
              </span>
            )}

            {vehiculo.kilometros != null && (
              <span className="spec-item col-6 d-flex align-items-center gap-1">
                <FaRoad size={12} />
                {Number(vehiculo.kilometros).toLocaleString("es-ES")} km
              </span>
            )}
          </div>

          <Link className="btn-ver bg-primary" to={`/vehiculos/${vehiculo.id}`}>
            Ver modelo →
          </Link>
        </div>
      </div>

      {showGallery && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowGallery(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <button
                className="btn-close m-2 ms-auto"
                onClick={() => setShowGallery(false)}
              />

              {/* Sin imágenes */}
              {(!vehiculo.imagenes || vehiculo.imagenes.length === 0) && (
                <img
                  src={sinImagen}
                  className="d-block w-100"
                  alt="Sin imágenes"
                />
              )}

              {/* Con imágenes */}
              {vehiculo.imagenes && vehiculo.imagenes.length > 0 && (
                <div id={`carousel-${vehiculo.id}`} className="carousel slide">
                  <div className="carousel-inner">
                    {vehiculo.imagenes.map((url, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img
                          src={url}
                          className="d-block w-100"
                          alt={`${vehiculo.marca} ${vehiculo.modelo} - foto ${index + 1}`}
                          style={{ maxHeight: "500px", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Controles solo si hay más de 1 imagen */}
                  {vehiculo.imagenes.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        data-bs-target={`#carousel-${vehiculo.id}`}
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" />
                      </button>
                      <button
                        className="carousel-control-next"
                        data-bs-target={`#carousel-${vehiculo.id}`}
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" />
                      </button>

                      {/* Indicadores */}
                      <div className="carousel-indicators">
                        {vehiculo.imagenes.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target={`#carousel-${vehiculo.id}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardVehiculoGPT;
