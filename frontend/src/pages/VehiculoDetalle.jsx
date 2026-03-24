import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehiculoById } from "../api/vehiculoApi";
import { FaGasPump, FaCogs, FaTachometerAlt, FaArrowLeft } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";

function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    getVehiculoById(id)
      .then(data => setVehiculo(data))
      .catch(error => console.error("Error al cargar vehículo:", error));
  }, [id]);

  if (!vehiculo) {
    return <p className="text-center mt-5">Cargando vehículo...</p>;
  }

  return (
    <div className="container my-3">
      {/* Título */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <button
          className="btn btn-light btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
          onClick={() => window.history.back()}
          style={{ width: "45px", height: "45px" }}
        >
          <FaArrowLeft />
        </button>
        <h2 className="fw-bold fs-4 m-0">
          {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
        </h2>
        <h1 className="fw-bold fs-4 m-0 ms-auto text-primary">
          {vehiculo.precio}€
        </h1>
      </div>

      {/* Imagen principal + descripción */}
      <div>
        <img
          src={`https://picsum.photos/1200/500?random=${vehiculo.id}`}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <p className="mt-2 text-muted text-italic text-center">{vehiculo.descripcion}</p>
      </div>

      {/* Mini-cards con iconos */}
      <div className="d-flex justify-content-around text-center my-3 flex-wrap">

        <div className="card flex-fill me-1 mb-2 border-light bg-dark text-light">
          <div className="card-body d-flex flex-column align-items-center">
            <FaGasPump size={40} className="mb-1" />
            <p className="mb-1">Combustible</p>
            <h3 className="card-title">{vehiculo.combustible}</h3>
          </div>
        </div>

        <div className="card flex-fill mx-1 mb-2 border-light bg-dark text-light">
          <div className="card-body d-flex flex-column align-items-center">
            <FaCogs size={40} className="mb-1" />
            <p className="mb-1">Motor</p>
            <h3 className="card-title">{vehiculo.motor}</h3>
          </div>
        </div>

        <div className="card flex-fill mx-1 mb-2 border-light bg-dark text-light">
          <div className="card-body d-flex flex-column align-items-center">
            <FaTachometerAlt size={40} className="mb-1" />
            <p className="mb-1">Kilómetros</p>
            <h3 className="card-title">{vehiculo.kilometros}</h3>
          </div>
        </div>

        <div className="card flex-fill ms-1 mb-2 border-light bg-dark text-light">
          <div className="card-body d-flex flex-column align-items-center">
            <GiGearStick size={40} className="mb-1" />
            <p className="mb-1">Cambio</p>
            <h3 className="card-title">{vehiculo.cambio}</h3>
          </div>
        </div>
      </div>

      {/* Datos técnicos + extras */}
      <div className="card shadow-sm my-3 p-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Color:</strong> {vehiculo.colorExterior}</li>
          <li className="list-group-item"><strong>Puertas:</strong> {vehiculo.puertas}</li>
          <li className="list-group-item"><strong>Asientos:</strong> {vehiculo.asientos}</li>
          <li className="list-group-item"><strong>Pegatina:</strong> {vehiculo.pegatina}</li>
        </ul>
      </div>

      <div>
        <h3>Extras:</h3>
        {vehiculo.extras && (
          <div className="mt-2">
            <div className="mt-1 d-flex flex-wrap gap-2">
              {vehiculo.extras.split(",").map((extra, idx) => (
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