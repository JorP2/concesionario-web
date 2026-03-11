import React from "react";
import { getVehiculos } from "../api/vehiculoApi";
import CardVehiculo from "../components/CardVehiculo";
import CardVehiculoGPT from "../components/CardVehiculoGPT";
import CardVehiculoDEEP from "../components/CardVehiculoDEEP";
import CardVehiculoCLAU from "../components/CardVehiculoCLAU";

function Vehiculos() {
  // Estado para guardar los vehículos
  const [vehiculos, setVehiculos] = React.useState([]);

  // Estado para loading (cargando)
  const [loading, setLoading] = React.useState(true);

  // Función para cargar vehículos desde la API
  const loadVehiculos = async () => {
    try {
      const data = await getVehiculos();
      setVehiculos(data);
    } catch (error) {
      console.error("Error al cargar los vehículos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al cargar la página
  React.useEffect(() => {
    loadVehiculos();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando vehículos...</p>
      ) : (
        <>
          {vehiculos.map((vehiculo) => (
            <CardVehiculo key={vehiculo.id} vehiculo={vehiculo} />
          ))}
          {/* GPT */}
          {vehiculos.map((vehiculo2) => (
            <CardVehiculoGPT key={vehiculo2.id} vehiculo={vehiculo2} />
          ))}

          <div className="container">
            <div className="row g-3">
              {vehiculos.map((vehiculo2) => (
                <div key={vehiculo2.id} className="col 12 col-md-6 col-lg-4">
                  <CardVehiculoGPT vehiculo={vehiculo2} />
                </div>
              ))}
            </div>
          </div>

          {/* GPT */}
          {vehiculos.map((vehiculo2) => (
            <CardVehiculoGPT key={vehiculo2.id} vehiculo={vehiculo2} />
          ))}
          {/* DEEP */}
          {vehiculos.map((vehiculo3) => (
            <CardVehiculoDEEP key={vehiculo3.id} vehiculo={vehiculo3} />
          ))}
          {/* CLAU */}
          {vehiculos.map((vehiculo4) => (
            <CardVehiculoCLAU key={vehiculo4.id} vehiculo={vehiculo4} />
          ))}
        </>
      )}
    </div>
  );
}

export default Vehiculos;
