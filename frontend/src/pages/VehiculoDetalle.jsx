import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/vehiculoDetalle.css";
import { FaGasPump, FaCogs, FaTachometerAlt } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { getVehiculoByIdPublic } from "../api/vehiculoApi";

function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getVehiculoByIdPublic(id)
      .then((data) => setVehiculo(data))
      .catch(() => setError(true));
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
    <div className="container-fluid px-3 px-md-5 py-3">
      {/* HERO */}
      <div className="position-relative mb-4 rounded-4 overflow-hidden shadow">
        <div className="ratio ratio-21x9">
          <img
            src={vehiculo.imagenPortada}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-100 h-100 object-fit-cover"
          />
        </div>

        {/* Overlay degradado */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Texto (título + descripción) */}
        <div className="position-absolute top-0 start-0 p-4 text-white">
          {/* Título */}
          <h2 className="fw-bold fs-4 m-0">
            {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
          </h2>

          {/* Descripción */}
          {vehiculo.descripcion && (
            <p className="text-light mt-2 mb-0 opacity-75">
              {vehiculo.descripcion}
            </p>
          )}
        </div>
      </div>

      {/* PRECIO */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
          <small className="text-muted">
            ✔ Garantía 12 meses · ✔ Financiación disponible
          </small>

          {vehiculo.precioOferta ? (
            <div className="text-end">
              <div className="text-decoration-line-through text-muted">
                {vehiculo.precio}€
              </div>
              <div className="fw-bold fs-3 text-primary">
                {vehiculo.precioOferta}€
              </div>
            </div>
          ) : (
            <div className="fw-bold fs-3 text-primary">{vehiculo.precio}€</div>
          )}
        </div>
      </div>

      {/* Mini-cards con iconos */}
      <div className="d-flex text-center my-3" style={{ gap: 0 }}>
        <div
          className="card bg-dark text-light flex-fill"
          style={{
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <div className="card-body d-flex flex-column align-items-center">
            <FaGasPump size={40} className="mb-1" />
            <p className="mb-1">Combustible</p>
            <h3 className="card-title">{vehiculo.combustible}</h3>
          </div>
        </div>

        <div className="card bg-dark text-light flex-fill rounded-0 border-start border-end">
          <div className="card-body d-flex flex-column align-items-center">
            <FaCogs size={40} className="mb-1" />
            <p className="mb-1">Motor</p>
            <h3 className="card-title">{vehiculo.motor}</h3>
          </div>
        </div>

        <div className="card bg-dark text-light flex-fill rounded-0 border-start border-end">
          <div className="card-body d-flex flex-column align-items-center">
            <FaTachometerAlt size={40} className="mb-1" />
            <p className="mb-1">Kilómetros</p>
            <h3 className="card-title">
              {vehiculo.kilometros.toLocaleString()} km
            </h3>
          </div>
        </div>

        <div
          className="card bg-dark text-light flex-fill"
          style={{
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <div className="card-body d-flex flex-column align-items-center">
            <GiGearStick size={40} className="mb-1" />
            <p className="mb-1">Cambio</p>
            <h3 className="card-title">{vehiculo.cambio}</h3>
          </div>
        </div>
      </div>

      {/* SLIDER */}
      {vehiculo.imagenes &&
        vehiculo.imagenes.length > 0 &&
        (vehiculo.imagenes.length > 1 ? (
          <div
            id="vehiculoCarousel"
            className="carousel slide mb-4"
            data-bs-ride="carousel"
          >
            {/* Indicadores */}
            <div className="carousel-indicators">
              {vehiculo.imagenes.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#vehiculoCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                ></button>
              ))}
            </div>

            {/* Imágenes */}
            <div className="carousel-inner rounded-3 overflow-hidden">
              {vehiculo.imagenes.map((img, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                >
                  <img
                    src={img}
                    alt={`${vehiculo.marca} ${vehiculo.modelo} imagen ${i + 1}`}
                    className="d-block w-100"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Controles */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#vehiculoCarousel"
              data-bs-slide="prev"
            >
              <span className="bg-dark rounded-circle d-flex align-items-center justify-content-center p-2">
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#vehiculoCarousel"
              data-bs-slide="next"
            >
              <span className="bg-dark rounded-circle d-flex align-items-center justify-content-center p-2">
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </span>
            </button>
          </div>
        ) : (
          <img
            src={vehiculo.imagenes[0]}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-100 rounded mb-4"
            style={{ height: "400px", objectFit: "cover" }}
          />
        ))}

      {/* Stats */}
      <h2 className="text-center my-5 fw-bold fs-4">
        Conoce más sobre este vehículo
      </h2>

      <div className="stats-container my-4">
        <div className="stats-row flex-row">
          <div className="stat-circle">
            <p>Puertas</p>
            <h5>{vehiculo.puertas}</h5>
          </div>

          <div className="stat-circle">
            <p>Asientos</p>
            <h5>{vehiculo.asientos}</h5>
          </div>

          <div className="stat-circle">
            <p>Pegatina</p>
            <h5>{vehiculo.pegatina}</h5>
          </div>
        </div>

        <div className="stats-row flex-row">
          <div className="stat-circle">
            <p>Color</p>
            <h5>{vehiculo.colorExterior}</h5>
          </div>

          <div className="stat-circle">
            <p>Interior</p>
            <h5>{vehiculo.interior}</h5>
          </div>
        </div>
      </div>

      {/* Extras */}
      <div>
        <h3>Extras:</h3>
        {vehiculo.extras && (
          <div className="mt-2 d-flex flex-wrap gap-2">
            {vehiculo.extras.split(",").map((extra, idx) => (
              <span key={idx} className="badge bg-primary">
                {extra.trim().charAt(0).toUpperCase() + extra.trim().slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VehiculoDetalle;
