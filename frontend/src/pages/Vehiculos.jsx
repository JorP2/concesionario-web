import React from "react";
// API
import { getVehiculos } from "../api/vehiculoApi";
// Componentes
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
// Estilo
import "../styles/vehiculos.css";
import FiltroVehiculo from "../components/FiltroVehiculo";

// CARGA DE DATOS

function Vehiculos() {
  const [vehiculos, setVehiculos] = React.useState([]); // Variable para el estado de los vehículos
  const [loading, setLoading] = React.useState(true); // Variable para el estado de carga
  const [error, setError] = React.useState(false); // Variable para el estado de error

  // Función para cargar vehículos desde la API
  const loadVehiculos = async () => {
    try {
      const data = await getVehiculos();
      setVehiculos(data);
    } catch (error) {
      console.error("Error al cargar los vehículos:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al cargar la página
  React.useEffect(() => {
    loadVehiculos();
  }, []);

  // Renderizado
  return (
    <div>
      {loading && <SkeletonVehiculo />}

      {!loading && error && (
        <p className="text-center mt-4"> Error cargando vehículos...</p>
      )}

      {!loading && !error && vehiculos.length === 0 && (
        <p className="text-center mt-4"> No hay vehículos disponibles...</p>
      )}

      {!loading && !error && vehiculos.length > 0 && (
        <>
          <FiltroVehiculo />

          <div className="ms-3 bg-light">
            <h2 className="ms-3 pt-2">COCHES</h2>

            <div className="vehiculos-grid">
              {vehiculos.map((vehiculo) => (
                <CardVehiculoGPT2 key={vehiculo.id} vehiculo={vehiculo} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Vehiculos;
