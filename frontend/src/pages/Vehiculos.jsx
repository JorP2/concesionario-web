import React from "react";
// API
import {
  getVehiculosEnVenta,
  getVehiculosVendidos,
  serchVehiculos,
} from "../api/vehiculoApi";
// Componentes
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
import FiltroVehiculo from "../components/FiltroVehiculo";
import "../styles/vehiculos.css";
// Iconos
import { FaFilter } from "react-icons/fa";
// Estilo
import "../styles/vehiculos.css";

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
  tipo: "",
};

function Vehiculos() {
  const [vehiculos, setVehiculos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [filtros, setFiltros] = React.useState(FILTROS_INICIALES);
  const [filtroAbierto, setFiltroAbierto] = React.useState(false);
  const [pestana, setPestana] = React.useState("en_venta");
  const [vehiculosVendidos, setVehiculosVendidos] = React.useState([]);
  const [loadingVendidos, setLoadingVendidos] = React.useState(false);
  const [loadingInicial, setLoadingInicial] = React.useState(true);

  const loadVehiculos = React.useCallback(async (filtrosActuales = filtros) => {
    setLoading(true);
    setError(false);
    try {
      const usarBusqueda =
        filtrosActuales.marca || filtrosActuales.precio || filtrosActuales.tipo;
      const data = usarBusqueda
        ? await serchVehiculos(
            filtrosActuales.marca || null,
            null,
            filtrosActuales.precio ? Number(filtrosActuales.precio) : null,
            filtrosActuales.tipo || null,
          )
        : await getVehiculosEnVenta();
      setVehiculos(data);
      setError(false);
    } catch (error) {
      console.error("Error al cargar los vehículos:", error);
      setError(true);
    } finally {
      setLoading(false);
      setLoadingInicial(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    loadVehiculos();
  }, [loadVehiculos]);

  React.useEffect(() => {
    if (pestana !== "en_venta") return;
    loadVehiculos(filtros);
  }, [filtros.marca, filtros.precio, filtros.tipo]); // eslint-disable-line react-hooks/exhaustive-deps

  // UX estados
  if (loadingInicial) {
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

  // Filtros
  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleReset = () => setFiltros(FILTROS_INICIALES);

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

  const precioMax = vehiculos.length
    ? Math.ceil(Math.max(...vehiculos.map((v) => v.precio)) / 1000) * 1000
    : 50000;

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
    const pegatinaMatch = filtros.pegatina
      ? v.pegatina?.toLowerCase() === filtros.pegatina.toLowerCase()
      : true;
    const colorMatch = filtros.color
      ? v.colorExterior?.toLowerCase() === filtros.color.toLowerCase()
      : true;
    const tipoMatch = filtros.tipo ? v.tipo === filtros.tipo : true;

    return (
      textoMatch &&
      marcaMatch &&
      anioMatch &&
      precioMatch &&
      combustibleMatch &&
      transmisionMatch &&
      kmMatch &&
      pegatinaMatch &&
      colorMatch &&
      tipoMatch
    );
  });

  return (
    <div className="vehiculos-page">
      {/* ── HERO ── */}
      <section className="vehiculos-hero">
        <div className="vehiculos-hero-inner">
          <span className="vehiculos-kicker">Selección disponible</span>
          <div className="vehiculos-hero-top">
            <div>
              <h1>Encuentra tu próximo coche</h1>
              <p>Vehículos revisados y listos para entrega.</p>
            </div>
            <div className="vehiculos-hero-stats">
              <div>
                <strong>{vehiculos.length}</strong>
                <span>en venta</span>
              </div>
              <div>
                <strong>{vehiculosVendidos.length}</strong>
                <span>vendidos</span>
              </div>
            </div>
          </div>

          {/* ── PESTAÑAS (dentro del hero) ── */}
          <div className="vehiculos-tabs">
            <button
              className={`tab-btn ${pestana === "en_venta" ? "activo" : ""}`}
              onClick={() => setPestana("en_venta")}
            >
              En venta
            </button>
            <button
              className={`tab-btn ${pestana === "vendidos" ? "activo" : ""}`}
              onClick={() => {
                setPestana("vendidos");
                if (vehiculosVendidos.length === 0) {
                  setLoadingVendidos(true);
                  getVehiculosVendidos()
                    .then(setVehiculosVendidos)
                    .catch(console.error)
                    .finally(() => setLoadingVendidos(false));
                }
              }}
            >
              Vendidos
            </button>
          </div>
        </div>
      </section>

      {/* ── PESTAÑA: EN VENTA ── */}
      {pestana === "en_venta" && (
        <>
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
                    precioMax={precioMax}
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
                    Disponibles
                    <span className="fs-6 text-muted ms-2">
                      ({vehiculosFiltrados.length} resultados)
                    </span>
                  </h2>

                  {/* Overlay de recarga — solo aparece en refiltrados */}
                  {loading && (
                    <div className="vehiculos-recargando">
                      <div
                        className="spinner-border text-success"
                        role="status"
                      />
                    </div>
                  )}

                  {vehiculosFiltrados.length > 0 ? (
                    <div
                      className={`vehiculos-grid${loading ? " vehiculos-grid--cargando" : ""}`}
                    >
                      {vehiculosFiltrados.map((vehiculo) => (
                        <CardVehiculoGPT2
                          key={vehiculo.id}
                          vehiculo={vehiculo}
                        />
                      ))}
                    </div>
                  ) : (
                    !loading && (
                      <p className="ms-3">
                        Lo sentimos, no hay vehículos con esas características
                        aún.
                      </p>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* ── PESTAÑA: VENDIDOS ── */}
      {pestana === "vendidos" && (
        <div className="vehiculos-layout">
          <div className="vehiculos-content">
            <h2 className="vehiculos-titulo d-none d-md-block">
              VENDIDOS
              <span className="fs-6 text-muted ms-2">
                ({vehiculosVendidos.length} vehículos)
              </span>
            </h2>
            {loadingVendidos && <SkeletonVehiculo />}
            {!loadingVendidos && vehiculosVendidos.length === 0 && (
              <p className="ms-3">No hay vehículos vendidos aún.</p>
            )}
            {!loadingVendidos && vehiculosVendidos.length > 0 && (
              <div className="vehiculos-grid">
                {vehiculosVendidos.map((v) => (
                  <CardVehiculoGPT2 key={v.id} vehiculo={v} vendido />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehiculos;
