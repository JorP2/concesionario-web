import React from "react";
// Style
import "../styles/vehiculoCard.css";
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
            src={
              vehiculo.imagenPortada ||
              `https://picsum.photos/400/225?random=${vehiculo.id}`
            }
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

          {vehiculo.anio && (
            <div className="vehiculo-anio">
              <FaCalendarAlt size={12} />
              <span>{vehiculo.anio}</span>
            </div>
          )}

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
              <div id={`carousel-${vehiculo.id}`} className="carousel slide">
                <div className="carousel-inner">
                  {[0, 1, 2].map((offset) => (
                    <div
                      key={offset}
                      className={`carousel-item ${
                        offset === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={`https://picsum.photos/800/450?random=${
                          vehiculo.id + offset
                        }`}
                        className="d-block w-100"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardVehiculoGPT;