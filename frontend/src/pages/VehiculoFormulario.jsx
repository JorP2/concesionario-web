import React from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// API
import { getVehiculoById } from "../api/vehiculoApi";

function VehiculoFormulario() {
  // Obtener el ID del vehículo de la URL
  const { id } = useParams();
  const esEdicion = Boolean(id); // Si hay ID, es edición; si no, es creación
  const navigate = useNavigate();

  // Función para cargar los datos del vehículo si estamos editando
  React.useEffect(() => {
    if (esEdicion) {
      const cargarVehiculo = async () => {
        try {
          const data = await getVehiculoById(id);
          setVehiculo(data);
        } catch (error) {
          console.error("Error al cargar el vehículo:", error);
        }
      };
      cargarVehiculo();
    }
  }, [id, esEdicion]);

  // Función para manejar el estado del formulario
  const [vehiculo, setVehiculo] = React.useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    kilometros: "",
    combustible: "",
    marchas: "",
    motor: "",
    color: "",
    puertas: "",
    asientos: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setVehiculo({
      ...vehiculo,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // QuE No recargue

    try {
      console.log("Enviadndo:", vehiculo);
      // Futuro manejo de la API
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    }
  };

  return (
    <>
      <div>
        <button
          className="btn btn-light btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
          onClick={() => navigate(-1)}
          style={{ width: "45px", height: "45px" }}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-center mb-4">
          {id ? "Editar Vehículo" : "Agregar Vehículo"}
        </h2>
        <form
          className=" mt-5 w-50 mx-auto p-4 border rounded shadow"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="InputMarca" className="form-label">
              Marca
            </label>
            <input
              type="text"
              className="form-control"
              name="marca"
              id="InputMarca"
              value={vehiculo.marca}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputModelo" className="form-label">
              Modelo
            </label>
            <input
              type="text"
              className="form-control"
              name="modelo"
              id="InputModelo"
              value={vehiculo.modelo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputAnio" className="form-label">
              Año
            </label>
            <input
              type="number"
              className="form-control"
              name="anio"
              id="InputAnio"
              value={vehiculo.anio}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputPrecio" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              name="precio"
              id="InputPrecio"
              value={vehiculo.precio}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputKilometros" className="form-label">
              Kilometros
            </label>
            <input
              type="number"
              className="form-control"
              name="kilometros"
              id="InputKilometros"
              value={vehiculo.kilometros}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputCombustible" className="form-label">
              Combustible
            </label>
            <input
              type="text"
              className="form-control"
              name="combustible"
              id="InputCombustible"
              value={vehiculo.combustible}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputMarchas" className="form-label">
              Marchas
            </label>
            <input
              type="number"
              className="form-control"
              name="marchas"
              id="InputMarchas"
              value={vehiculo.marchas}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputMotor" className="form-label">
              Motor
            </label>
            <input
              type="text"
              className="form-control"
              name="motor"
              id="InputMotor"
              value={vehiculo.motor}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputColor" className="form-label">
              Color
            </label>
            <input
              type="text"
              className="form-control"
              name="color"
              id="InputColor"
              value={vehiculo.color}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputPuertas" className="form-label">
              Puertas
            </label>
            <input
              type="number"
              className="form-control"
              name="puertas"
              id="InputPuertas"
              value={vehiculo.puertas}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputAsientos" className="form-label">
              Asientos
            </label>
            <input
              type="number"
              className="form-control"
              name="asientos"
              id="InputAsientos"
              value={vehiculo.asientos}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}

export default VehiculoFormulario;