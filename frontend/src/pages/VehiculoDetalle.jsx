import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/VehiculoDetalle.css";
import {
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { getVehiculoByIdPublic } from "../api/vehiculoApi";

function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
    <div className="container my-3">
      {/* Título */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <button
          className="btn btn-light btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
          onClick={() => navigate(-1)}
          style={{ width: "45px", height: "45px" }}
        >
          <FaArrowLeft />
        </button>
        <h2 className="fw-bold fs-4 m-0">
          {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
        </h2>
        <div className="ms-auto">
          {vehiculo.precioOferta ? (
            <>
              <h2 className="text-decoration-line-through text-muted me-2">
                {vehiculo.precio}€
              </h2>
              <h1 className="fw-bold text-success">{vehiculo.precioOferta}€</h1>
            </>
          ) : (
            <h1 className="fw-bold text-primary">{vehiculo.precio}€</h1>
          )}
        </div>
      </div>

      {/* Imagen principal */}
      <div className="mb-4 text-center">
        <img
          src={`https://picsum.photos/1200/500?random=${vehiculo.id}`}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          className="img-fluid rounded"
        />
        {vehiculo.descripcion && (
          <p className="text-muted fst-italic mt-2">{vehiculo.descripcion}</p>
        )}
      </div>

      {/* Mini-cards con iconos pegadas */}
      <div className="d-flex text-center my-3" style={{ gap: 0 }}>
        <div
          className="card bg-dark text-light flex-fill overflow-hidden"
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

        <div
          className="card bg-dark text-light flex-fill border-start border-end border-start-secondary border-end-secondary"
          style={{ borderRadius: 0 }}
        >
          <div className="card-body d-flex flex-column align-items-center">
            <FaCogs size={40} className="mb-1" />
            <p className="mb-1">Motor</p>
            <h3 className="card-title">{vehiculo.motor}</h3>
          </div>
        </div>

        <div
          className="card bg-dark text-light flex-fill border-end"
          style={{ borderRadius: 0 }}
        >
          <div className="card-body d-flex flex-column align-items-center">
            <FaTachometerAlt size={40} className="mb-1" />
            <p className="mb-1">Kilómetros</p>
            <h3 className="card-title">
              {vehiculo.kilometros.toLocaleString()} km
            </h3>
          </div>
        </div>

        <div
          className="card bg-dark text-light flex-fill overflow-hidden"
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

      {/* Galeria de videos */}

      {/* Detalles */}
      <h2 className="text-center my-5 fw-bold fs-4 m-0">
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
          <div className="mt-2">
            <div className="mt-1 d-flex flex-wrap gap-2">
              {vehiculo.extras?.split(",").map((extra, idx) => (
                <span key={idx} className="badge bg-primary">
                  {extra.trim().charAt(0).toUpperCase() + extra.trim().slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehiculoDetalle;
