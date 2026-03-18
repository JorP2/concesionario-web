import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehiculoById } from "../api/vehiculoApi";

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
    <div className="container my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={`https://picsum.photos/600/400?random=${vehiculo.id}`}
              className="img-fluid rounded-start"
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            />
            <p className="card-text text-center mt-3"><strong>Descripción:</strong> {vehiculo.descripcion}</p>
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
              
              <p className="card-text"><strong>Extras:</strong> {vehiculo.extras}</p>
              <button className="btn btn-primary mt-3" onClick={() => window.history.back()}>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculoDetalle;