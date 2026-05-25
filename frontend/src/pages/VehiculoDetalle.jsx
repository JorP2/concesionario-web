import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaGasPump,
  FaCogs,
  FaTachometerAlt
} from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { getVehiculoByIdPublic } from "../api/vehiculoApi";
import { getVideosByVehiculoId } from "../api/videoApi";

function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [videos, setVideos] = useState([]);
  const esMoto = vehiculo?.tipo === "MOTOCICLETA";

  useEffect(() => {
    getVehiculoByIdPublic(id)
      .then((data) => setVehiculo(data))
      .catch(() => setError(true));
    getVideosByVehiculoId(id).then(setVideos);
  }, [id]);

  if (error) {
    return (
      <p className="text-center mt-5 text-danger">
        Error al cargar el vehículo
      </p>
    );
  }

  if (!vehiculo) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p className="mt-2">Cargando vehículo...</p>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="row g-4">
        {/* IZQUIERDA */}
        <div className="col-lg-8 pb-5">
          {/* HERO */}
          <div className="position-relative rounded-4 overflow-hidden shadow mb-4">
            <div className="ratio ratio-16x9 bg-light">
              <img
                src={vehiculo.imagenPortada}
                alt=""
                className="w-100 h-100 object-fit-contain"
              />
            </div>

            <div 
              className="position-absolute bottom-0 start-0 p-3 text-white"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
              }}
            >
              <h2 className="fw-bold m-0">
                {vehiculo.marca} {vehiculo.modelo}
              </h2>
              <small>{vehiculo.descripcion}</small>
            </div>
          </div>

          {/* GALERÍA SIMPLE */}
          {vehiculo.imagenes && vehiculo.imagenes.length > 0 && (
            <div
              className="d-flex gap-3 mb-4 overflow-auto pb-2"
              style={{
                scrollbarWidth: "thin",
              }}
            >
              {vehiculo.imagenes.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="rounded-3 shadow-sm flex-shrink-0"
                  style={{
                    width: "280px",
                    height: "170px",
                    objectFit: "contain",
                    background: "#f5f6f8",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                  onClick={() => setSelectedImg(img)}
                />
              ))}
            </div>
          )}

          { /* GALERÍA VIDEOS */}
          {videos.length > 0 && (
            <div className="mb-4">
              <div className="row g-3">
                {videos.map((video, i) => (
                  <div key={i} className="col-12 col-md-6">
                    <div
                    className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm"
                    style={{ cursor: "pointer" }}
                    >
                      <video
                        src={video.url}
                        controls
                        preload="metadata"
                        controlsList="nodownload"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MINI CARDS */}
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <FaGasPump size={25} />
                  <p className="my-1 small text-muted">Combustible</p>
                  <strong>{vehiculo.combustible}</strong>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <FaCogs size={25} />
                  <p className="my-1 small text-muted">Motor</p>
                  <strong>{vehiculo.motor}</strong>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <FaTachometerAlt size={25} />
                  <p className="my-1 small text-muted">KM</p>
                  <strong>{vehiculo.kilometros.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <GiGearStick size={25} />
                  <p className="my-1 small text-muted">Cambio</p>
                  <strong>{vehiculo.cambio}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* DETALLES */}
          <div className="card shadow-sm rounded-4 border-0 mt-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Detalles de {vehiculo.tipo.toLowerCase()}</h5>

              <div className="row g-2 small">
                <div className="col-6">
                  <div className="p-2 bg-light rounded-3">
                    <strong>Año:</strong> {vehiculo.anio}
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-2 bg-light rounded-3">
                    <strong>Pegatina:</strong> {vehiculo.pegatina}
                  </div>
                </div>

                {!esMoto && (
                  <div className="col-6">
                    <div className="p-2 bg-light rounded-3">
                      <strong>Puertas:</strong> {vehiculo.puertas}
                    </div>
                  </div>
                )}

                <div className="col-6">
                  <div className="p-2 bg-light rounded-3">
                    <strong>Asientos:</strong> {vehiculo.asientos}
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-2 bg-light rounded-3">
                    <strong>Color:</strong> {vehiculo.colorExterior}
                  </div>
                </div>

                {!esMoto && (
                  <div className="col-6">
                    <div className="p-2 bg-light rounded-3">
                      <strong>Interior:</strong> {vehiculo.interior}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EXTRAS */}
          {vehiculo.extras && (
            <div className="card shadow-sm rounded-4 border-0 mt-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Extras</h5>

                <div className="d-flex flex-wrap gap-2">
                  {vehiculo.extras.split(",").map((extra, idx) => (
                    <span
                      key={idx}
                      className="badge bg-light text-dark border rounded-pill px-3 py-2"
                    >
                      {extra.trim().charAt(0).toUpperCase() + extra.trim().slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DERECHA */}
        <div className="col-lg-4">
          <div 
            className="card shadow-sm rounded-4 position-sticky z-3"
            style={{ top: "100px" }}
          >
            <div className="card-body">

              <h4 className="fw-bold">
                {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
              </h4>

              {vehiculo.precioOferta ? (
                <>
                  <div>
                    <span className="display-6 fw-bold text-primary">{vehiculo.precioOferta}€</span>
                  </div>
                </>
              ) : (
                <div className="display-6 fw-bold text-primary">
                  {vehiculo.precio}€
                </div>
              )}

              <hr />

              <ul className="list-unstyled small mb-3">
                <li>✔ Garantía 12 meses</li>
                <li>✔ Financiación disponible</li>
                <li>✔ Entrega inmediata</li>
              </ul>

              <a
                className="btn btn-primary w-100"
                href="/contacto/#contactos">
                Contactar
              </a>
            </div>
          </div>

          {/* COMENTARIOS ANUNCIANTE */}
          <div className="card shadow-sm rounded-4 my-4 position-sticky"
            style={{ top: "390px" }}
          >
            <div className="card-body">
              <h5 className="fw-bold">
                Comentarios del anunciante
              </h5>
              <span>
                {vehiculo.comentarios}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGEN AMPLIADA */}
      {selectedImg && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(3px)"
          }}
          onClick={() => setSelectedImg(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center p-0">
                <img
                  src={selectedImg}
                  alt=""
                  className="img-fluid rounded-3 shadow"
                  style={{ maxHeight: "80vh" }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiculoDetalle;
