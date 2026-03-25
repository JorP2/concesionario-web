import React from "react";
// API
import { getVehiculos } from "../api/vehiculoApi";
// Componentes
import VehiculosLista from "../components/admin/VehiculosLista";
import { Link } from "react-router-dom";

function Administrador() {
  // Constante del usuario logueado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

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

  return (
    <>
      <div className="container mt-5">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {usuario.nombre}.</p>
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
          <VehiculosLista vehiculos={vehiculosFiltrados} />
        )}

        {/* BOTON LOGOUT */}
        <div className="d-flex">
          <Link
            to="/administrador/vehiculo-form"
            className="btn btn-success mt-4 w-25 d-block mx-auto"
          >
            Añadir
          </Link>
          <button
            onClick={logout}
            className="btn btn-danger mt-4 w-25 d-block mx-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Administrador;
