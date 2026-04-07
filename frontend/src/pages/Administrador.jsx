import React from "react";
// API
import { deleteVehiculo, getVehiculos } from "../api/vehiculoApi";
// Componentes
import VehiculosLista from "../components/admin/VehiculosLista";
import { Link } from "react-router-dom";
// Styles
import "../styles/admin/administrador.css";

function Administrador() {
  // Constante del usuario logueado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Vehiculos
  const [vehiculos, setVehiculos] = React.useState([]);
  const [busqueda, setBusqueda] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Cargar vehículos al montar el componente
  const cargar = async () => {
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
    cargar();
  }, []);

  // Si no hay usuario, mostrar mensaje de no autorizado
  if (!usuario) {
    return (
      <div className="container mt-5">
        No estás autorizado para ver esta página. Por favor, inicia sesión.
      </div>
    );
  }

  // Filtrar vehículos según la búsqueda
  const vehiculosFiltrados = vehiculos.filter(
    (vehiculo) =>
      vehiculo.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // Funcion eliminar un vehículo de la lista (se llama desde CardVehiculoAdmin)
  const handleEliminar = async (vehiculoId) => {
    try {
      await deleteVehiculo(vehiculoId);

      // Actualizar la lista local sin recargar toda la página
      setVehiculos((prev) => prev.filter((v) => v.id !== vehiculoId));
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* IZQUIERDA */}
          <div>
            <h1 className="mb-0">Panel de Administración</h1>
            <small className="text-muted">Bienvenido, {usuario.nombre}</small>
          </div>

          {/* DERECHA */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">
              {vehiculosFiltrados.length} vehículos
            </span>

            <Link to="/administrador/vehiculo-form" className="btn btn-success">
              + Añadir vehículo
            </Link>
          </div>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Buscar vehículo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* LISTA */}
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
      </div>
    </>
  );
}

export default Administrador;
