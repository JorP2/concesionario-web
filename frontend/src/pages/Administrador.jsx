import React from "react";
import { deleteVehiculo, getVehiculos } from "../api/vehiculoApi";
import VehiculosLista from "../components/admin/VehiculosLista";
import GestionUsuarios from "../components/admin/GestionUsuarios";
import GestionGaleria from "../components/admin/GestionGaleria";
import { Link } from "react-router-dom";
import { getSesion } from "../utils/auth";
import "../styles/admin/administrador.css";

function Administrador() {
  // Nuevo formato: { accessToken, refreshToken, username, role }
  const sesion = getSesion();

  // esSuperUsuario ahora se comprueba por el role
  const esSuperUsuario = sesion?.role === "ADMIN";

  const [pestana, setPestana] = React.useState("vehiculos");
  const [vehiculos, setVehiculos] = React.useState([]);
  const [busqueda, setBusqueda] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [subPestanaVehiculos, setSubPestanaVehiculos] =
    React.useState("en_stock");
  const [error, setError] = React.useState(false);
  const [filtroTipo, setFiltroTipo] = React.useState("todos");

  const cargar = async () => {
    try {
      const data = await getVehiculos();
      setVehiculos(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cargar();
  }, []);

  if (!sesion) {
    return (
      <div className="container mt-5">
        No estás autorizado para ver esta página. Por favor, inicia sesión.
      </div>
    );
  }

  const vehiculosFiltrados = vehiculos.filter((v) => {
    const coincideBusqueda =
      v.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo =
      filtroTipo === "todos" ||
      v.tipo?.toLowerCase() === filtroTipo.toLowerCase();
    return coincideBusqueda && coincideTipo;
  });

  const handleEliminar = async (vehiculoId) => {
    try {
      await deleteVehiculo(vehiculoId);
      setVehiculos((prev) => prev.filter((v) => v.id !== vehiculoId));
    } catch {
      console.error("Error al eliminar el vehículo:");
    }
  };

  const totalVehiculos = vehiculos.length;
  const vehiculosVisibles = vehiculos.filter((v) => v.visible).length;
  const vehiculosEnOferta = vehiculos.filter((v) => v.enOferta).length;
  const vehiculosVendidos = vehiculos.filter(
    (v) => v.estadoVenta === "vendido",
  ).length;

  const vehiculosEnStockFiltrados = vehiculosFiltrados.filter(
    (v) => v.estadoVenta !== "vendido",
  );
  const vehiculosVendidosFiltrados = vehiculosFiltrados.filter(
    (v) => v.estadoVenta === "vendido",
  );

  return (
    <div className="admin-page">
      <div className="container py-5">
        <section className="admin-hero mb-4">
          <div>
            <span className="admin-kicker">Gestión interna</span>
            <h1 className="mb-1">Panel de Administración</h1>
            <p className="admin-subtitle mb-1">
              Controla el stock, las ofertas y los accesos desde un único sitio.
            </p>
            <small className="text-muted">Bienvenido, {sesion.username}</small>
          </div>

          {pestana === "vehiculos" && (
            <div className="admin-hero-actions">
              <div className="admin-pill">
                {subPestanaVehiculos === "vendidos"
                  ? `${vehiculosVendidosFiltrados.length} vendidos en la lista`
                  : `${vehiculosEnStockFiltrados.length} vehículos en stock`}
              </div>
              <Link
                to="/administrador/vehiculo-form"
                className="btn btn-success"
              >
                + Añadir vehículo
              </Link>
            </div>
          )}
        </section>

        <section className="admin-summary-grid mb-4">
          <article className="admin-summary-card">
            <span className="admin-summary-label">Stock total</span>
            <strong>{totalVehiculos}</strong>
          </article>
          <article className="admin-summary-card">
            <span className="admin-summary-label">Publicados</span>
            <strong>{vehiculosVisibles}</strong>
          </article>
          <article className="admin-summary-card">
            <span className="admin-summary-label">En oferta</span>
            <strong>{vehiculosEnOferta}</strong>
          </article>
          <article className="admin-summary-card">
            <span className="admin-summary-label">Vendidos</span>
            <strong>{vehiculosVendidos}</strong>
          </article>
        </section>

        <section className="admin-panel">
          <div className="vehiculos-tabs mb-4">
            <button
              className={`tab-btn ${pestana === "vehiculos" ? "activo" : ""}`}
              onClick={() => setPestana("vehiculos")}
            >
              Vehículos
            </button>

            {esSuperUsuario && (
              <button
                className={`tab-btn ${pestana === "usuarios" ? "activo" : ""}`}
                onClick={() => setPestana("usuarios")}
              >
                Usuarios
              </button>
            )}

            {esSuperUsuario && (
              <button
                className={`tab-btn ${pestana === "galeria" ? "activo" : ""}`}
                onClick={() => setPestana("galeria")}
              >
                Galería
              </button>
            )}
          </div>

          {pestana === "vehiculos" && (
            <>
              <div className="admin-toolbar mb-4 d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar vehículo..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <select
                  className="form-select w-auto"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="todos">🚗🏍️ Todos</option>
                  <option value="turismo">🚗 Turismo</option>
                  <option value="motocicleta">🏍️ Moto</option>
                  <option value="furgoneta">🚐 Furgoneta</option>
                </select>
              </div>
              <div className="vehiculos-tabs mb-4">
                <button
                  className={`tab-btn ${subPestanaVehiculos === "en_stock" ? "activo" : ""}`}
                  onClick={() => setSubPestanaVehiculos("en_stock")}
                >
                  En stock ({vehiculosEnStockFiltrados.length})
                </button>
                <button
                  className={`tab-btn ${subPestanaVehiculos === "vendidos" ? "activo" : ""}`}
                  onClick={() => setSubPestanaVehiculos("vendidos")}
                >
                  Vendidos ({vehiculosVendidosFiltrados.length})
                </button>
              </div>
              {loading && (
                <p className="text-center mt-4">Cargando vehículos...</p>
              )}
              {!loading && error && (
                <p className="text-center mt-4 text-danger">
                  Error al cargar los vehículos.
                </p>
              )}
              {!loading && !error && (
                <VehiculosLista
                  vehiculos={
                    subPestanaVehiculos === "vendidos"
                      ? vehiculosVendidosFiltrados
                      : vehiculosEnStockFiltrados
                  }
                  onEliminar={handleEliminar}
                />
              )}
            </>
          )}

          {pestana === "usuarios" && esSuperUsuario && <GestionUsuarios />}
          {pestana === "galeria" && esSuperUsuario && <GestionGaleria />}
        </section>
      </div>
    </div>
  );
}

export default Administrador;
