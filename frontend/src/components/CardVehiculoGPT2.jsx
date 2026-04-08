import React from "react";
// Iconos
import {
  FaSearchPlus,
  FaGasPump,
  FaTachometerAlt,
  FaCog,
  FaRoad,
  FaCalendarAlt,
  FaLeaf,
} from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { Link } from "react-router-dom";
import sinImagen from "../assets/sin-imagen.svg";
// style
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
      {/* ── TARJETA ── */}
      <div className="vehiculo-card">
        {/* ── IMAGEN ── */}
        <div className="vehiculo-img" onClick={() => setShowGallery(true)}>
          <img
            src={vehiculo.imagenPortada || sinImagen}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          />

          {vendido && <div className="vendido-ribbon">VENDIDO</div>}

          {vehiculo.enOferta && vehiculo.precioOferta && (
            <div className="oferta-ribbon">OFERTA</div>
          )}

          {/* Badges superiores */}
          <div className="vehiculo-badges">
            {vehiculo.ocasion && <span className="badge-ocasion">Ocasión</span>}
            {vehiculo.promocion && (
              <span className="badge-promo">🏷 {vehiculo.promocion}</span>
            )}
          </div>

          {/* Overlay hover */}
          <div className="vehiculo-overlay">
            <FaSearchPlus className="overlay-icon" />
          </div>
        </div>

        {/* ── INFO ── */}
        <div className="vehiculo-info">
          {/* Título + precio */}
          <div className="vehiculo-header">
            <div>
              <h5>
                {vehiculo.marca} {vehiculo.modelo}
              </h5>
              {vehiculo.version && (
                <p className="vehiculo-version">{vehiculo.version}</p>
              )}
            </div>
            <div className="vehiculo-price-block">
              <span className="price-label">Desde</span>
              {vehiculo.enOferta && vehiculo.precioOferta ? (
                <>
                  <span className="precio-tachado">
                    €{Number(vehiculo.precio).toLocaleString("es-ES")}
                  </span>
                  <span className="precio precio-oferta">
                    €{Number(vehiculo.precioOferta).toLocaleString("es-ES")}
                  </span>
                </>
              ) : (
                <span className="precio">
                  €{Number(vehiculo.precio).toLocaleString("es-ES")}
                </span>
              )}
            </div>
          </div>

          {/* Especificaciones con iconos */}
          <div className="vehiculo-specs">
            {vehiculo.combustible && (
              <span className="spec-item">
                {getFuelIcon(vehiculo.combustible)}
                {vehiculo.combustible}
              </span>
            )}
            {vehiculo.cv && (
              <span className="spec-item">
                <FaTachometerAlt size={12} />
                {vehiculo.cv}cv
              </span>
            )}
            {vehiculo.transmision && (
              <span className="spec-item">
                <FaCog size={12} />
                {vehiculo.transmision}
              </span>
            )}
            {vehiculo.kilometros != null && (
              <span className="spec-item">
                <FaRoad size={12} />
                {Number(vehiculo.kilometros).toLocaleString("es-ES")} km
              </span>
            )}
          </div>

          {/* Año */}
          {vehiculo.anio && (
            <div className="vehiculo-anio">
              <FaCalendarAlt size={12} />
              <span>{vehiculo.anio}</span>
            </div>
          )}

          {/* CTA */}
          <Link className="btn-ver" to={`/vehiculos/${vehiculo.id}`}>
            Ver modelo →
          </Link>
        </div>
      </div>

      {/* ── MODAL GALERÍA ── */}
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
