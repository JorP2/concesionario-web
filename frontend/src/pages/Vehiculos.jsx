import React from "react";
// API
import { getVehiculosEnVenta } from "../api/vehiculoApi";
// Componentes
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
// Estilo
import "../styles/vehiculos.css";
import FiltroVehiculo from "../components/FiltroVehiculo";

// Valores iniciales para los filtros
const FILTROS_INICIALES = { busqueda: "", marca: "", anio: "", precio: "" };

// CARGA DE DATOS
function Vehiculos() {
  const [vehiculos, setVehiculos] = React.useState([]); // Variable para el estado de los vehículos
  const [loading, setLoading] = React.useState(true); // Variable para el estado de carga
  const [error, setError] = React.useState(false); // Variable para el estado de error
  const [filtros, setFiltros] = React.useState(FILTROS_INICIALES); // Estado para los filtros

  // Función para cargar vehículos desde la API
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

  // Se ejecuta al cargar la página
  React.useEffect(() => {
    loadVehiculos();
  }, []);

  // Actualiza un campo del filtro por su nombre
  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  // Resetea todos los filtros
  const handleReset = () => setFiltros(FILTROS_INICIALES);

  // Opciones dinámicas extraídas de los datos reales
  const marcas = [...new Set(vehiculos.map((v) => v.marca))].sort();
  const anios = [...new Set(vehiculos.map((v) => v.anio))].sort(
    (a, b) => b - a,
  );

  // Aplicar filtros
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
          <FiltroVehiculo
            filtros={filtros}
            onChange={handleFiltroChange}
            onReset={handleReset}
            marcas={marcas}
            anios={anios}
          />

          <div className="ms-3 bg-light">
            <h2 className="ms-3 pt-2">
              COCHES
              {/* Muestra cuántos resultados hay */}
              <span className="fs-6 text-muted ms-2">
                ({vehiculosFiltrados.length} resultados)
              </span>
            </h2>
            <div className="vehiculos-grid">
              {vehiculosFiltrados.length > 0 ? (
                vehiculosFiltrados.map((vehiculo) => (
                  <CardVehiculoGPT2 key={vehiculo.id} vehiculo={vehiculo} />
                ))
              ) : (
                <p className="ms-3">No hay vehículos con esos filtros.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Vehiculos;
