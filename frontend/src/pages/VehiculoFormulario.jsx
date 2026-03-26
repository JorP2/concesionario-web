import React from "react";
import { Link, useParams } from "react-router-dom";
// Componentes
import GaleriaMultimedia from "../components/admin/GaleriaMultimedia";

// API
import { getVehiculoById } from "../api/vehiculoApi";

function VehiculoFormulario() {
  // Obtener el ID del vehículo de la URL
  const { id } = useParams();
  const esEdicion = Boolean(id); // Si hay ID, es edición; si no, es creación
  const [imagenesNuevas, setImagenesNuevas] = React.useState([]); // Estado para las nuevas imágenes a subir

  // Función para manejar el estado del formulario
  const [vehiculo, setVehiculo] = React.useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    kilometros: "",
    combustible: "",
    colorExterior: "",
    interior: "",
    asientos: "",
    puertas: "",
    motor: "",
    cambio: "",
    pegatina: "",
    descripcion: "",
    extras: "",
    enOferta: false,
    precioOferta: "",
    fechaFinOferta: "",
    visible: true,
    estadoVenta: "en_venta",
  });

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

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehiculo({
      ...vehiculo,
      // si es checkbox usamos checked, si no, value
      [name]: type === "checkbox" ? checked : value,
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
      <div className="container-fluid px-4">
        <Link to="/administrador" className="btn btn-danger mt-4">
          Volver
        </Link>

        <h2 className="text-center my-4">
          {esEdicion ? "Editar Vehículo" : "Agregar Vehículo"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Columna izquierda — galería (solo edición) */}
            {esEdicion && (
              <div className="col-12 col-lg-6">
                <GaleriaMultimedia
                  vehiculoId={id}
                  imagenesNuevas={imagenesNuevas}
                  setImagenesNuevas={setImagenesNuevas}
                />
              </div>
            )}

            {/* Columna derecha — campos */}
            <div
              className={`col-12 ${esEdicion ? "col-lg-6" : "col-lg-8 mx-auto"}`}
            >
              <div className="row g-3">
                {/* Fila: Marca + Modelo */}
                <div className="col-6">
                  <label className="form-label">Marca</label>
                  <input
                    type="text"
                    className="form-control"
                    name="marca"
                    value={vehiculo.marca}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Modelo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="modelo"
                    value={vehiculo.modelo}
                    onChange={handleChange}
                  />
                </div>

                {/* Fila: Año + Precio */}
                <div className="col-6">
                  <label className="form-label">Año</label>
                  <input
                    type="number"
                    className="form-control"
                    name="anio"
                    value={vehiculo.anio}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={vehiculo.precio}
                    onChange={handleChange}
                  />
                </div>

                {/* Fila: Kilómetros + Combustible */}
                <div className="col-6">
                  <label className="form-label">Kilómetros</label>
                  <input
                    type="number"
                    className="form-control"
                    name="kilometros"
                    value={vehiculo.kilometros}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Combustible</label>
                  <input
                    type="text"
                    className="form-control"
                    name="combustible"
                    value={vehiculo.combustible}
                    onChange={handleChange}
                  />
                </div>

                {/* Fila: Color exterior + Interior */}
                <div className="col-6">
                  <label className="form-label">Color exterior</label>
                  <input
                    type="text"
                    className="form-control"
                    name="colorExterior"
                    value={vehiculo.colorExterior}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Interior</label>
                  <input
                    type="text"
                    className="form-control"
                    name="interior"
                    value={vehiculo.interior}
                    onChange={handleChange}
                  />
                </div>

                {/* Fila: Motor + Cambio */}
                <div className="col-6">
                  <label className="form-label">Motor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="motor"
                    value={vehiculo.motor}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Cambio</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cambio"
                    value={vehiculo.cambio}
                    onChange={handleChange}
                  />
                </div>

                {/* Fila: Puertas + Asientos */}
                <div className="col-6">
                  <label className="form-label">Puertas</label>
                  <input
                    type="number"
                    className="form-control"
                    name="puertas"
                    value={vehiculo.puertas}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Asientos</label>
                  <input
                    type="number"
                    className="form-control"
                    name="asientos"
                    value={vehiculo.asientos}
                    onChange={handleChange}
                  />
                </div>

                {/* Fila: Pegatina + Estado venta */}
                <div className="col-6">
                  <label className="form-label">Pegatina</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pegatina"
                    value={vehiculo.pegatina}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Estado de venta</label>
                  <select
                    className="form-select"
                    name="estadoVenta"
                    value={vehiculo.estadoVenta}
                    onChange={handleChange}
                  >
                    <option value="en_venta">En venta</option>
                    <option value="vendido">Vendido</option>
                    <option value="reservado">Reservado</option>
                  </select>
                </div>

                {/* Descripción — ancho completo */}
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    name="descripcion"
                    rows={3}
                    value={vehiculo.descripcion}
                    onChange={handleChange}
                  />
                </div>

                {/* Extras — ancho completo */}
                <div className="col-12">
                  <label className="form-label">Extras</label>
                  <textarea
                    className="form-control"
                    name="extras"
                    rows={2}
                    value={vehiculo.extras}
                    onChange={handleChange}
                  />
                </div>

                {/* Checkboxes */}
                <div className="col-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="visible"
                      id="checkVisible"
                      checked={vehiculo.visible}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="checkVisible">
                      Visible
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="enOferta"
                      id="checkOferta"
                      checked={vehiculo.enOferta}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="checkOferta">
                      En oferta
                    </label>
                  </div>
                </div>

                {/* Precio oferta + Fecha fin — solo si enOferta es true */}
                {vehiculo.enOferta && (
                  <>
                    <div className="col-6">
                      <label className="form-label">Precio oferta</label>
                      <input
                        type="number"
                        className="form-control"
                        name="precioOferta"
                        value={vehiculo.precioOferta}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Fecha fin oferta</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="fechaFinOferta"
                        value={vehiculo.fechaFinOferta}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default VehiculoFormulario;
