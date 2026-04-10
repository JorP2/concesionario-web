import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/VehiculoDetalle.css";
import {
  FaGasPump,
  FaCogs,
  FaTachometerAlt
} from "react-icons/fa";
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
    <div className="container-fluid px-4 px-md-5">
      {/* HERO */}
      <div className="position-relative mb-4">

        {/* Imagen */}
        <div className="ratio ratio-21x9">
          <img
            src={vehiculo.imagenPortada}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-100 h-100 object-fit-cover"
          />
        </div>

        {/* Overlay oscuro */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

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
      <div className="bg-white shadow-sm rounded-2 p-3 mb-4">
        {vehiculo.precioOferta ? (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
            <small className="text-muted">
              Garantía de hasta 12 meses - Posibilidad de financiación
            </small>

            <div className="d-flex align-items-center gap-3">
              <span className="text-decoration-line-through text-muted fs-5">
                {vehiculo.precio}€
              </span>

              <span className="fw-bold text-primary fs-3">
                {vehiculo.precioOferta}€
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-md-end">
            <span className="fw-bold text-primary fs-3">
              {vehiculo.precio}€
            </span>
          </div>
        )}

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

        <div className="card bg-dark text-light flex-fill rounded-0">
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

      {/* Título sección */}
      <h2 className="text-center my-5 fw-bold fs-4">
        Conoce más sobre este vehículo
      </h2>

      {/* Stats */}
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