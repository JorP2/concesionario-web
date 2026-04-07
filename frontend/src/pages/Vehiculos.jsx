import React from "react";
import { getVehiculosEnVenta } from "../api/vehiculoApi";
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
import FiltroVehiculo from "../components/FiltroVehiculo";

// Valores iniciales para los filtros
const FILTROS_INICIALES = { busqueda: "", marca: "", anio: "", precio: "" };

function Vehiculos() {
  const [vehiculos, setVehiculos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [filtros, setFiltros] = React.useState(FILTROS_INICIALES);

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

  // 🔹 Estados UX (tu parte)
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

  // 🔹 Filtros (parte de desarrollo)
  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleReset = () => setFiltros(FILTROS_INICIALES);

  const marcas = [...new Set(vehiculos.map((v) => v.marca))].sort();
  const anios = [...new Set(vehiculos.map((v) => v.anio))].sort(
    (a, b) => b - a
  );

  const vehiculosFiltrados = vehiculos.filter((v) => {
    const textoMatch =
      v.marca.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      v.modelo.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const marcaMatch = filtros.marca ? v.marca === filtros.marca : true;
    const anioMatch = filtros.anio ? String(v.anio) === filtros.anio : true;
    const precioMatch = filtros.precio
      ? v.precio <= Number(filtros.precio)
      : true;

    return textoMatch && marcaMatch && anioMatch && precioMatch;
  });

  return (
    <div className="container mt-4">
      <FiltroVehiculo
        filtros={filtros}
        onChange={handleFiltroChange}
        onReset={handleReset}
        marcas={marcas}
        anios={anios}
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mt-1 mb-0">
          Vehículos disponibles ({vehiculosFiltrados.length})
        </p>
      </div>

      <div className="row g-3">
        {vehiculosFiltrados.length > 0 ? (
          vehiculosFiltrados.map((vehiculo) => (
            <div key={vehiculo.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <CardVehiculoGPT2 vehiculo={vehiculo} />
            </div>
          ))
        ) : (
          <p className="text-center">
            Lo sentimos, no hay vehículos con esas características.
          </p>
        )}
      </div>
    </div>
  );
}

export default Vehiculos;