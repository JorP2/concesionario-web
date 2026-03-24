import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehiculoById } from "../api/vehiculoApi";
import { FaArrowLeft } from "react-icons/fa";

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
    <div className="container my-1">
      <button
        className="btn btn-light btn-outline-secondary border border-5 mb-3 rounded-circle d-flex align-items-center justify-content-center"
        onClick={() => window.history.back()}
        style={{ width: "45px", height: "45px" }}
      >
        <FaArrowLeft />
      </button>

      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={`https://picsum.photos/600/400?random=${vehiculo.id}`}
              className="img-fluid rounded-start"
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            />
            <p className="card-text text-center m-3"><strong>Descripción:</strong> {vehiculo.descripcion}</p>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">{vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}</h2>
              <p className="card-text"><strong>Kilómetros:</strong> {vehiculo.kilometros}</p>
              <p className="card-text"><strong>Combustible:</strong> {vehiculo.combustible}</p>
              <p className="card-text"><strong>Marchas:</strong> {vehiculo.marchas}</p>
              <p className="card-text"><strong>Motor:</strong> {vehiculo.motor}</p>
              <p className="card-text"><strong>Color:</strong> {vehiculo.colorExterior}</p>
              <p className="card-text"><strong>Puertas:</strong> {vehiculo.puertas}</p>
              <p className="card-text"><strong>Asientos:</strong> {vehiculo.asientos}</p>
              <p className="card-text"><strong>Precio:</strong> €{vehiculo.precio}</p>

              {/* Extras en lista */}
              {vehiculo.extras && (
                <div className="card-text">
                  <strong>Extras:</strong>
                  <ul>
                    {vehiculo.extras.split(",").map((extra, idx) => (
                      <li key={idx}>{extra.trim().charAt(0).toUpperCase() + extra.trim().slice(1)}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculoDetalle;