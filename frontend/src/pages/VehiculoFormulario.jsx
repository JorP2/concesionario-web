import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Componentes
import GaleriaMultimedia from "../components/admin/GaleriaMultimedia";
// API
import {
  addVehiculo,
  getVehiculoById,
  updateVehiculo,
  deleteOferta,
  cambiarVisibilidad,
  updateEstadoVehiculo,
  aplicarOfertaPrecioFijo,
} from "../api/vehiculoApi";
import { addImagenes } from "../api/imagenApi";

function VehiculoFormulario() {
  // Obtener el ID del vehículo de la URL
  const { id } = useParams();
  const esEdicion = Boolean(id); // Si hay ID, es edición; si no, es creación
  const [imagenesNuevas, setImagenesNuevas] = React.useState([]); // Estado para las nuevas imágenes a subir
  const navigate = useNavigate();

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
          setVehiculo({
            marca: data.marca ?? "",
            modelo: data.modelo ?? "",
            anio: data.anio ?? "",
            precio: data.precio ?? "",
            kilometros: data.kilometros ?? "",
            combustible: data.combustible ?? "",
            colorExterior: data.colorExterior ?? "",
            interior: data.interior ?? "",
            asientos: data.asientos ?? "",
            puertas: data.puertas ?? "",
            motor: data.motor ?? "",
            cambio: data.cambio ?? "",
            pegatina: data.pegatina ?? "",
            descripcion: data.descripcion ?? "",
            extras: data.extras ?? "",
            enOferta: data.enOferta ?? false,
            precioOferta: data.precioOferta ?? "",
            fechaFinOferta: data.fechaFinOferta
              ? data.fechaFinOferta.slice(0, 16)
              : "",
            visible: data.visible ?? true,
            estadoVenta: data.estadoVenta ?? "en_venta",
          });
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
    const newValue = type === "checkbox" ? checked : value;

    // Si estamos editando y se desmarca enOferta, eliminar oferta en la API
    if (name === "enOferta" && !checked && esEdicion) {
      deleteOferta(id).catch(() => {});
    }

    setVehiculo({ ...vehiculo, [name]: newValue });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        vehiculo.enOferta &&
        (!vehiculo.precioOferta || !vehiculo.fechaFinOferta)
      ) {
        alert(
          "Si el vehículo está en oferta, debes indicar precio y fecha fin.",
        );
        return;
      }

      let vehiculoId;

      if (esEdicion) {
        await updateVehiculo(id, vehiculo);
        vehiculoId = id;
      } else {
        const data = await addVehiculo(vehiculo);
        vehiculoId = data.id;
      }

      // ── Visibilidad ──────────────────────────────
      await cambiarVisibilidad(vehiculoId, vehiculo.visible);
      // ─────────────────────────────────────────────

      // ── Estado venta ─────────────────────────────
      await updateEstadoVehiculo(vehiculoId, vehiculo.estadoVenta);

      // ── Gestionar oferta ──────────────────────────
      if (
        vehiculo.enOferta &&
        vehiculo.precioOferta &&
        vehiculo.fechaFinOferta
      ) {
        await aplicarOfertaPrecioFijo(
          vehiculoId,
          vehiculo.precioOferta,
          vehiculo.fechaFinOferta,
        );
      } else if (!vehiculo.enOferta) {
        await deleteOferta(vehiculoId).catch(() => {});
      }

      // ─────────────────────────────────────────────

      if (imagenesNuevas.length > 0) {
        await addImagenes(vehiculoId, imagenesNuevas);
      }

      navigate("/administrador");
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    }
  };

  return (
    <>
      <div className="containear-fluid px-4">
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
                    min={1900}
                    max={new Date().getFullYear()}
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
                    min={0}
                    max={999999999}
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
                    min={0}
                    max={999999}
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
                    min={1}
                    max={9}
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
                    min={1}
                    max={20}
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
                      <label className="form-label">
                        Precio oferta{" "}
                        {vehiculo.precioOferta && vehiculo.precio && (
                          <span
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            (−
                            {Math.round(
                              ((vehiculo.precio - vehiculo.precioOferta) /
                                vehiculo.precio) *
                                100,
                            )}
                            %)
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="precioOferta"
                        value={vehiculo.precioOferta}
                        onChange={handleChange}
                        max={vehiculo.precio} // no puede ser mayor que el precio original
                        placeholder={`Máx. €${vehiculo.precio}`}
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
                        min={new Date(Date.now() + 60000)
                          .toISOString()
                          .slice(0, 16)} // mínimo: ahora + 1 min
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
