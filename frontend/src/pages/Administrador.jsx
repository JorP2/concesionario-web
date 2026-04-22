import React from "react";
import { deleteVehiculo, getVehiculos } from "../api/vehiculoApi";
import VehiculosLista from "../components/admin/VehiculosLista";
import GestionUsuarios from "../components/admin/GestionUsuarios";
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
  const [error, setError] = React.useState(false);

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

  const vehiculosFiltrados = vehiculos.filter(
    (v) =>
      v.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const handleEliminar = async (vehiculoId) => {
    try {
      await deleteVehiculo(vehiculoId);
      setVehiculos((prev) => prev.filter((v) => v.id !== vehiculoId));
    } catch {
      console.error("Error al eliminar el vehículo:");
    }
  };

  return (
    <div className="container mt-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="mb-0">Panel de Administración</h1>
          {/* username en vez de nombre */}
          <small className="text-muted">Bienvenido, {sesion.username}</small>
        </div>
        {pestana === "vehiculos" && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">
              {vehiculosFiltrados.length} vehículos
            </span>
            <Link to="/administrador/vehiculo-form" className="btn btn-success">
              + Añadir vehículo
            </Link>
          </div>
        )}
      </div>

      {/* PESTAÑAS */}
      <div className="vehiculos-tabs mb-4">
        <button
          className={`tab-btn ${pestana === "vehiculos" ? "activo" : ""}`}
          onClick={() => setPestana("vehiculos")}
        >
          Vehículos
        </button>
        {/* Pestaña usuarios solo para superusuario */}
        {esSuperUsuario && (
          <button
            className={`tab-btn ${pestana === "usuarios" ? "activo" : ""}`}
            onClick={() => setPestana("usuarios")}
          >
            Usuarios
          </button>
        )}
      </div>

      {/* PESTAÑA VEHÍCULOS */}
      {pestana === "vehiculos" && (
        <>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Buscar vehículo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {loading && <p className="text-center mt-4">Cargando vehículos...</p>}
          {!loading && error && (
            <p className="text-center mt-4 text-danger">
              Error al cargar los vehículos.
            </p>
          )}
          {!loading && !error && (
            <VehiculosLista
              vehiculos={vehiculosFiltrados}
              onEliminar={handleEliminar}
            />
          )}
        </>
      )}

      {/* PESTAÑA USUARIOS */}
      {pestana === "usuarios" && esSuperUsuario && <GestionUsuarios />}
    </div>
  );
}

export default Administrador;
