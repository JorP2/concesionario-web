import React from "react";
// API
import { getVehiculosEnVenta } from "../api/vehiculoApi";
// Componentes
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
// Estilo
import "../styles/vehiculos.css";
import FiltroVehiculo from "../components/FiltroVehiculo";
// Iconos
import { FaFilter } from "react-icons/fa";

// Valores iniciales para los filtros
const FILTROS_INICIALES = {
  busqueda: "",
  marca: "",
  anio: "",
  precio: "",
  combustible: "",
  transmision: "",
  km: "",
  pegatina: "",
  color: "",
};

function Vehiculos() {
  const [vehiculos, setVehiculos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [filtros, setFiltros] = React.useState(FILTROS_INICIALES);
  const [filtroAbierto, setFiltroAbierto] = React.useState(false);

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

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleReset = () => setFiltros(FILTROS_INICIALES);

  // Opciones dinámicas extraídas de los datos reales
  const marcas = [...new Set(vehiculos.map((v) => v.marca))].sort();
  const anios = [...new Set(vehiculos.map((v) => v.anio))].sort(
    (a, b) => b - a,
  );
  const colores = [
    ...new Set(vehiculos.map((v) => v.colorExterior).filter(Boolean)),
  ].sort();
  const kmMax = vehiculos.length
    ? Math.ceil(Math.max(...vehiculos.map((v) => v.kilometros)) / 5000) * 5000
    : 200000;

  // Aplicar filtros
  const vehiculosFiltrados = vehiculos.filter((v) => {
    const texto = filtros.busqueda.toLowerCase();
    const textoMatch =
      v.marca.toLowerCase().includes(texto) ||
      v.modelo.toLowerCase().includes(texto);

    const marcaMatch = filtros.marca ? v.marca === filtros.marca : true;
    const anioMatch = filtros.anio ? String(v.anio) === filtros.anio : true;
    const precioMatch = filtros.precio
      ? v.precio <= Number(filtros.precio)
      : true;
    const combustibleMatch = filtros.combustible
      ? v.combustible?.toLowerCase() === filtros.combustible.toLowerCase()
      : true;
    const transmisionMatch = filtros.transmision
      ? v.cambio?.toLowerCase().includes(filtros.transmision.toLowerCase())
      : true;
    const kmMatch = filtros.km ? v.kilometros <= Number(filtros.km) : true;
    const pegatinMatch = filtros.pegatina
      ? v.pegatina?.toLowerCase() === filtros.pegatina.toLowerCase()
      : true;
    const colorMatch = filtros.color
      ? v.colorExterior?.toLowerCase() === filtros.color.toLowerCase()
      : true;

    return (
      textoMatch &&
      marcaMatch &&
      anioMatch &&
      precioMatch &&
      combustibleMatch &&
      transmisionMatch &&
      kmMatch &&
      pegatinMatch &&
      colorMatch
    );
  });

  return (
    <div>
      {loading && <SkeletonVehiculo />}

      {!loading && error && (
        <p className="text-center mt-4">Error cargando vehículos...</p>
      )}

      {!loading && !error && vehiculos.length === 0 && (
        <p className="text-center mt-4">No hay vehículos disponibles...</p>
      )}

      {!loading && !error && vehiculos.length > 0 && (
        <>
          {/* Barra sticky móvil */}
          <div className="filtro-telefono-bar">
            <button
              className="filtro-telefono-btn"
              onClick={() => setFiltroAbierto((v) => !v)}
            >
              <i className="bi bi-sliders me-2" />
              <FaFilter size={20} />
              {Object.values(filtros).some(Boolean) && (
                <span className="filtro-telefono-badge" />
              )}
            </button>
            <span className="text-muted" style={{ fontSize: "0.85rem" }}>
              {vehiculosFiltrados.length} resultados
            </span>
          </div>

          {/* Layout principal */}
          <div className="vehiculos-layout">
            <aside
              className={`vehiculos-sidebar${filtroAbierto ? " abierto" : ""}`}
            >
              <div className="filtro-drawer-header">
                <span>Filtro General</span>
                <button onClick={() => setFiltroAbierto(false)}>✕</button>
              </div>
              <FiltroVehiculo
                filtros={filtros}
                onChange={handleFiltroChange}
                onReset={handleReset}
                marcas={marcas}
                anios={anios}
                colores={colores}
                kmMax={kmMax}
              />
            </aside>

            {filtroAbierto && (
              <div
                className="filtro-overlay"
                onClick={() => setFiltroAbierto(false)}
              />
            )}

            <div className="vehiculos-content">
              <h2 className="vehiculos-titulo d-none d-md-block">
                COCHES
                <span className="fs-6 text-muted ms-2">
                  ({vehiculosFiltrados.length} resultados)
                </span>
              </h2>
              {vehiculosFiltrados.length > 0 ? (
                <div className="vehiculos-grid">
                  {vehiculosFiltrados.map((vehiculo) => (
                    <CardVehiculoGPT2 key={vehiculo.id} vehiculo={vehiculo} />
                  ))}
                </div>
              ) : (
                <p className="ms-3">
                  Lo sentimos, no hay vehículos con esas características aún.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Vehiculos;
