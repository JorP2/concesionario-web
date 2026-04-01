import React from "react";
import { getVehiculosEnVenta } from "../api/vehiculoApi";
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
import FiltroVehiculo from "../components/FiltroVehiculo";

function Vehiculos() {
  const [vehiculos, setVehiculos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const loadVehiculos = async () => {
    try {
      const data = await getVehiculosEnVenta();
      setVehiculos(data);
    } catch (error) {
      console.error("Error al cargar los vehículos:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadVehiculos();
  }, []);

  // 🔥 estados claros (mucho mejor UX)
  if (loading) {
    return (
      <div className="container mt-4">
        <SkeletonVehiculo />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 text-center">
        <p className="text-danger">Error cargando vehículos...</p>
      </div>
    );
  }

  if (vehiculos.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <p>No hay vehículos disponibles...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* Filtro */}
      <FiltroVehiculo />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mt-1 mb-0">
          Vehículos disponibles ({vehiculos.length})
        </p>
      </div>

      {/* Grid */}
      <div className="row g-3">
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <CardVehiculoGPT2 vehiculo={vehiculo} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default Vehiculos;