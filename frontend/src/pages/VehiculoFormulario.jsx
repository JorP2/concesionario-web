import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import GaleriaMultimedia from "../components/admin/GaleriaMultimedia";
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
import "../styles/vehiculoFormulario.css"

function VehiculoFormulario() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const [imagenesNuevas, setImagenesNuevas] = React.useState([]);
  const navigate = useNavigate();

  const [vehiculo, setVehiculo] = React.useState({
    tipo: "",
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
    comentarios: "",
    extras: "",
    enOferta: false,
    precioOferta: "",
    fechaFinOferta: "",
    visible: true,
    estadoVenta: "en_venta",
  });

  React.useEffect(() => {
    if (esEdicion) {
      const cargarVehiculo = async () => {
        try {
          const data = await getVehiculoById(id);
          setVehiculo({
            tipo: data.tipo ?? "",
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
            comentarios: data.comentarios ?? "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "enOferta" && !checked && esEdicion) {
      deleteOferta(id).catch(() => {});
    }

    let vehiculoActualizado = {
      ...vehiculo,
      [name]: newValue,
    };

    if (name === "tipo" && value === "MOTOCICLETA") {
      vehiculoActualizado.interior = "Ninguno";
      vehiculoActualizado.puertas = 0;
    }

    setVehiculo(vehiculoActualizado);
  };

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
          className="btn btn-light btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center m-4"
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
                {/* Fila: Tipo */}
                <div className="col-12">
                  <label className="form-label">Tipo</label>
                  <select
                    className={"form-select is-valid"}
                    name="tipo"
                    value={vehiculo.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="TURISMO">Turismo</option>
                    <option value="FURGONETA">Furgoneta</option>
                    <option value="MOTOCICLETA">Motocicleta</option>
                  </select>
                </div>
                {/* Fila: Marca + Modelo */}
                <div className="col-6">
                  <label className="form-label">Marca</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.marca.length <= 0 || vehiculo.marca.length > 50 ? "is-invalid" : "is-valid"}`}
                    name="marca"
                    value={vehiculo.marca}
                    onChange={handleChange}
                    required
                  />
                  {(vehiculo.marca.length <= 0 || vehiculo.marca.length > 50) && (
                    <div className="invalid-feedback d-block">
                      Marca debe estar entre 1 - 50 caracteres
                    </div>
                  )}
                </div>

                <div className="col-6">
                  <label className="form-label">Modelo</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.modelo.length <= 0 || vehiculo.modelo.length > 100 ? "is-invalid" : "is-valid"}`}
                    name="modelo"
                    value={vehiculo.modelo}
                    onChange={handleChange}
                    required
                  />
                  {(vehiculo.modelo.length <= 0 || vehiculo.modelo.length > 100) && (
                    <div className="invalid-feedback d-block">
                      Modelo debe estar entre 1 - 100 caracteres
                    </div>
                  )}
                </div>

                {/* Fila: Año + Precio */}
                <div className="col-6">
                  <label className="form-label">Año</label>
                  <input
                    type="number"
                    placeholder="..."
                    className={`form-control ${vehiculo.anio <= 1900 || vehiculo.anio > new Date().getFullYear() ? "is-invalid" : "is-valid"}`}
                    name="anio"
                    value={vehiculo.anio}
                    onChange={handleChange}
                    required
                  />
                  {(vehiculo.anio < 1900 || vehiculo.anio > new Date().getFullYear()) && (
                    <div className="invalid-feedback d-block">
                      Año debe estar entre 1900 - Actual
                    </div>
                  )}
                </div>

                <div className="col-6">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    placeholder="..."
                    className={`form-control ${vehiculo.precio <= 0 ? "is-invalid" : "is-valid"}`}
                    name="precio"
                    value={vehiculo.precio}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.precio <= 0 && (
                    <div className="invalid-feedback d-block">
                      Precio debe ser mayor que 0
                    </div>
                  )}
                </div>

                {/* Fila: Kilómetros + Combustible */}
                <div className="col-6">
                  <label className="form-label">Kilómetros</label>
                  <input
                    type="number"
                    placeholder="..."
                    className={`form-control ${vehiculo.kilometros < 0 ? "is-invalid" : "is-valid"}`}
                    name="kilometros"
                    value={vehiculo.kilometros}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.kilometros < 0 && (
                    <div className="invalid-feedback d-block">
                      Kilómetros deben ser mayor o igual que 0
                    </div>
                  )}
                </div>

                <div className="col-6">
                  <label className="form-label">Combustible</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.combustible.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="combustible"
                    value={vehiculo.combustible}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.combustible.length <= 0 && (
                    <div className="invalid-feedback d-block">
                      Combustible no puede estar vacío
                    </div>
                  )}
                </div>

                {/* Fila: Color exterior + Interior */}
                <div className="col-6">
                  <label className="form-label">Color exterior</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.colorExterior.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="colorExterior"
                    value={vehiculo.colorExterior}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.colorExterior.length <= 0 && (
                    <div className="invalid-feedback d-block">
                      Color exterior no puede estar vacío
                    </div>
                  )}
                </div>

                {vehiculo.tipo !== "MOTOCICLETA" && (
                  <div className="col-6">
                    <label className="form-label">Interior</label>
                    <input
                      type="text"
                      placeholder="..."
                      className={`form-control ${vehiculo.interior.length <= 0 ? "is-invalid" : "is-valid"}`}
                      name="interior"
                      value={vehiculo.interior}
                      onChange={handleChange}
                      required
                    />
                    {vehiculo.interior.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Interior no puede estar vacío
                      </div>
                    )}
                  </div>
                )}

                {/* Fila: Motor + Cambio */}
                <div className="col-6">
                  <label className="form-label">Motor</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.motor.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="motor"
                    value={vehiculo.motor}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.motor.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Motor no puede estar vacío
                      </div>
                    )}
                </div>

                <div className="col-6">
                  <label className="form-label">Cambio</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.cambio.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="cambio"
                    value={vehiculo.cambio}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.cambio.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Cambio no puede estar vacío
                      </div>
                    )}
                </div>

                {/* Fila: Puertas + Asientos */}
                {vehiculo.tipo !== "MOTOCICLETA" && (
                  <div className="col-6">
                    <label className="form-label">Puertas</label>
                    <input
                      type="number"
                      placeholder="..."
                      className={`form-control ${vehiculo.puertas <= 0 ? "is-invalid" : "is-valid"}`}
                      name="puertas"
                      value={vehiculo.puertas}
                      onChange={handleChange}
                      required
                    />
                    {vehiculo.puertas <= 0 && (
                      <div className="invalid-feedback d-block">
                        Puertas debe ser mayor a 0
                      </div>
                    )}
                  </div>
                )}

                <div className="col-6">
                  <label className="form-label">Asientos</label>
                  <input
                    type="number"
                    placeholder="..."
                    className={`form-control ${vehiculo.asientos <= 0 ? "is-invalid" : "is-valid"}`}
                    name="asientos"
                    value={vehiculo.asientos}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.asientos <= 0 && (
                      <div className="invalid-feedback d-block">
                        Asientos debe ser mayor a 0
                      </div>
                    )}
                </div>

                {/* Fila: Pegatina + Estado venta */}
                <div className="col-6">
                  <label className="form-label">Pegatina</label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.pegatina.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="pegatina"
                    value={vehiculo.pegatina}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.pegatina.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Pegatina no puede estar vacío
                      </div>
                    )}
                </div>

                <div className="col-6">
                  <label className="form-label">Estado de venta</label>
                  <select
                    className="form-select is-valid"
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
                    className={`form-control ${vehiculo.descripcion.length <= 0 || vehiculo.descripcion.length > 200 ? "is-invalid" : "is-valid"}`}
                    placeholder="..."
                    name="descripcion"
                    rows={3}
                    value={vehiculo.descripcion}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.descripcion.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Descripción debe tener entre 1 - 200 caracteres
                      </div>
                    )}
                </div>

                {/* Comentarios del anunciante- ancho completo */}
                <div className="col-12">
                  <label className="form-label">Comentarios del anunciante</label>
                  <textarea
                    className={`form-control ${vehiculo.comentarios.length <= 0 || vehiculo.comentarios.length > 2000 ? "is-invalid" : "is-valid"}`}
                    placeholder="..."
                    name="comentarios"
                    rows={3}
                    value={vehiculo.comentarios}
                    onChange={handleChange}
                    required
                  />
                  {vehiculo.comentarios.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Comentarios debe tener entre 1 - 2000 caracteres
                      </div>
                    )}
                </div>

                {/* Extras — ancho completo */}
                <div className="col-12">
                  <label className="form-label">Extras</label>
                  <textarea
                    className={`form-control ${vehiculo.comentarios.length <= 0 || vehiculo.comentarios.length > 2000 ? "is-invalid" : "is-valid"}`}
                    placeholder="..."
                    name="extras"
                    rows={2}
                    value={vehiculo.extras}
                    onChange={handleChange}
                    required
                  />
                      <div className="text-muted small d-block">
                        Separa cada extra con una coma
                      </div>
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
                        placeholder={`${vehiculo.precio}€`}
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
                          .slice(0, 16)}
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