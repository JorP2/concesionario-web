import React from "react";
import {
  getVehiculosEnVenta,
  getVehiculosVendidos,
  serchVehiculos,
} from "../api/vehiculoApi";
import CardVehiculoGPT2 from "../components/CardVehiculoGPT2";
import SkeletonVehiculo from "../components/SkeletonVehiculo.jsx";
import FiltroVehiculo from "../components/FiltroVehiculo";
import "../styles/vehiculos.css";
import { FaFilter } from "react-icons/fa";

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
  const [pestana, setPestana] = React.useState("en_venta");
  const [vehiculosVendidos, setVehiculosVendidos] = React.useState([]);
  const [loadingVendidos, setLoadingVendidos] = React.useState(false);
  const [loadingInicial, setLoadingInicial] = React.useState(true);

  const loadVehiculos = React.useCallback(async (filtrosActuales = filtros) => {
    setLoading(true);
    try {
      const usarBusqueda = filtrosActuales.marca || filtrosActuales.precio;
      const data = usarBusqueda
        ? await serchVehiculos(
            filtrosActuales.marca || null,
            null,
            filtrosActuales.precio ? Number(filtrosActuales.precio) : null,
          )
        : await getVehiculosEnVenta();
      setVehiculos(data);
    } catch (loadError) {
      console.error("Error al cargar los vehiculos:", loadError);
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
  }, [filtros.marca, filtros.precio]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <p className="text-danger">Error cargando vehiculos...</p>
      </div>
    );
  }

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

    return (
      textoMatch &&
      marcaMatch &&
      anioMatch &&
      precioMatch &&
      combustibleMatch &&
      transmisionMatch &&
      kmMatch &&
      pegatinaMatch &&
      colorMatch
    );
  });

  return (
    <div className="vehiculos-page">
      <section className="vehiculos-hero">
        <div className="vehiculos-hero-inner">
          <span className="vehiculos-kicker">Seleccion disponible</span>
          <div className="vehiculos-hero-top">
            <div>
              <h1>Encuentra tu proximo coche</h1>
              <p>
                Vehiculos revisados, listos para entrega y organizados para que
                elegir el adecuado sea mas rapido.
              </p>
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

      {pestana === "en_venta" && (
        <>
          {loading && <SkeletonVehiculo />}

          {!loading && error && (
            <p className="text-center mt-4">Error cargando vehiculos...</p>
          )}

          {!loading && !error && vehiculos.length === 0 && (
            <p className="text-center mt-4">No hay vehiculos disponibles...</p>
          )}

          {!loading && !error && vehiculos.length > 0 && (
            <>
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

              <div className="vehiculos-layout">
                <aside
                  className={`vehiculos-sidebar${filtroAbierto ? " abierto" : ""}`}
                >
                  <div className="filtro-drawer-header">
                    <span>Filtro general</span>
                    <button onClick={() => setFiltroAbierto(false)}>X</button>
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
                  <div className="vehiculos-results-bar d-none d-md-flex">
                    <div>
                      <h2 className="vehiculos-titulo mb-1">Disponibles</h2>
                      <span className="text-muted">
                        {vehiculosFiltrados.length} resultados para tu busqueda
                      </span>
                    </div>
                    <div className="vehiculos-results-pills">
                      {filtros.marca && <span>{filtros.marca}</span>}
                      {filtros.combustible && <span>{filtros.combustible}</span>}
                      {filtros.transmision && <span>{filtros.transmision}</span>}
                    </div>
                  </div>

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
                        Lo sentimos, no hay vehiculos con esas caracteristicas
                        aun.
                      </p>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {pestana === "vendidos" && (
        <div className="vehiculos-layout">
          <div className="vehiculos-content">
            <div className="vehiculos-results-bar d-none d-md-flex">
              <div>
                <h2 className="vehiculos-titulo mb-1">Vendidos</h2>
                <span className="text-muted">
                  {vehiculosVendidos.length} vehiculos entregados
                </span>
              </div>
            </div>
            {loadingVendidos && <SkeletonVehiculo />}
            {!loadingVendidos && vehiculosVendidos.length === 0 && (
              <p className="ms-3">No hay vehiculos vendidos aun.</p>
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
