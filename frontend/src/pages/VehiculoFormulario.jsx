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

// Helper para el contador
const Contador = ({ valor, max }) => (
  <small
    className={`text-muted ms-1 ${(valor?.length ?? 0) >= max ? "text-danger" : ""}`}
  >
    ({valor?.length ?? 0}/{max})
  </small>
);

function VehiculoFormulario() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const [imagenesNuevas, setImagenesNuevas] = React.useState([]);
  const [portadaNuevaIdx, setPortadaNuevaIdx] = React.useState(0);
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

    let vehiculoActualizado = { ...vehiculo, [name]: newValue };

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

      await cambiarVisibilidad(vehiculoId, vehiculo.visible);
      await updateEstadoVehiculo(vehiculoId, vehiculo.estadoVenta);

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
          style={{ width: "45px", height: "45px", marginTop: "20px" }}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-center mb-4">
          {id ? "Editar Vehículo" : "Agregar Vehículo"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {esEdicion && (
              <div className="col-12 col-lg-6">
                <GaleriaMultimedia
                  vehiculoId={id}
                  imagenesNuevas={imagenesNuevas}
                  setImagenesNuevas={setImagenesNuevas}
                  portadaNuevaIdx={portadaNuevaIdx}
                  setPortadaNuevaIdx={setPortadaNuevaIdx}
                />
              </div>
            )}

            <div
              className={`col-12 ${esEdicion ? "col-lg-6" : "col-lg-8 mx-auto"}`}
            >
              <div className="row g-3">
                {/* Tipo */}
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

                {/* Marca + Modelo */}
                <div className="col-6">
                  <label className="form-label">
                    Marca <Contador valor={vehiculo.marca} max={20} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.marca.length <= 0 || vehiculo.marca.length > 50 ? "is-invalid" : "is-valid"}`}
                    name="marca"
                    value={vehiculo.marca}
                    onChange={handleChange}
                    maxLength={20}
                    required
                  />
                  {(vehiculo.marca.length <= 0 || vehiculo.marca.length > 50) && (
                    <div className="invalid-feedback d-block">
                      Marca debe estar entre 1 - 50 caracteres
                    </div>
                  )}
                </div>

                <div className="col-6">
                  <label className="form-label">
                    Modelo <Contador valor={vehiculo.modelo} max={30} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.modelo.length <= 0 || vehiculo.modelo.length > 100 ? "is-invalid" : "is-valid"}`}
                    name="modelo"
                    value={vehiculo.modelo}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                  {(vehiculo.modelo.length <= 0 || vehiculo.modelo.length > 100) && (
                    <div className="invalid-feedback d-block">
                      Modelo debe estar entre 1 - 100 caracteres
                    </div>
                  )}
                </div>

                {/* Año + Precio */}
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

                {/* Kilómetros + Combustible */}
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
                  <label className="form-label">
                    Combustible{" "}
                    <Contador valor={vehiculo.combustible} max={20} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.combustible.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="combustible"
                    value={vehiculo.combustible}
                    onChange={handleChange}
                    maxLength={20}
                    required
                  />
                  {vehiculo.combustible.length <= 0 && (
                    <div className="invalid-feedback d-block">
                      Combustible no puede estar vacío
                    </div>
                  )}
                </div>

                {/* Color exterior + Interior */}
                <div className="col-6">
                  <label className="form-label">
                    Color exterior{" "}
                    <Contador valor={vehiculo.colorExterior} max={25} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.colorExterior.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="colorExterior"
                    value={vehiculo.colorExterior}
                    onChange={handleChange}
                    maxLength={25}
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
                    <label className="form-label">
                      Interior <Contador valor={vehiculo.interior} max={25} />
                    </label>
                    <input
                      type="text"
                      placeholder="..."
                      className={`form-control ${vehiculo.interior.length <= 0 ? "is-invalid" : "is-valid"}`}
                      name="interior"
                      value={vehiculo.interior}
                      onChange={handleChange}
                      maxLength={25}
                      required
                    />
                    {vehiculo.interior.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Interior no puede estar vacío
                      </div>
                    )}
                  </div>
                )}

                {/* Motor + Cambio */}
                <div className="col-6">
                  <label className="form-label">
                    Motor <Contador valor={vehiculo.motor} max={30} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.motor.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="motor"
                    value={vehiculo.motor}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                  {vehiculo.motor.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Motor no puede estar vacío
                      </div>
                    )}
                </div>

                <div className="col-6">
                  <label className="form-label">
                    Cambio <Contador valor={vehiculo.cambio} max={20} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.cambio.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="cambio"
                    value={vehiculo.cambio}
                    onChange={handleChange}
                    maxLength={20}
                    required
                  />
                  {vehiculo.cambio.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Cambio no puede estar vacío
                      </div>
                    )}
                </div>

                {/* Puertas + Asientos */}
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

                {/* Pegatina + Estado venta */}
                <div className="col-6">
                  <label className="form-label">
                    Pegatina <Contador valor={vehiculo.pegatina} max={10} />
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    className={`form-control ${vehiculo.pegatina.length <= 0 ? "is-invalid" : "is-valid"}`}
                    name="pegatina"
                    value={vehiculo.pegatina}
                    onChange={handleChange}
                    maxLength={10}
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

                {/* Descripción */}
                <div className="col-12">
                  <label className="form-label">
                    Descripción{" "}
                    <Contador valor={vehiculo.descripcion} max={500} />
                  </label>
                  <textarea
                    className={`form-control ${vehiculo.descripcion.length <= 0 || vehiculo.descripcion.length > 200 ? "is-invalid" : "is-valid"}`}
                    placeholder="..."
                    name="descripcion"
                    rows={3}
                    value={vehiculo.descripcion}
                    onChange={handleChange}
                    maxLength={500}
                    required
                  />
                  {vehiculo.descripcion.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Descripción debe tener entre 1 - 200 caracteres
                      </div>
                    )}
                </div>

                {/* Comentarios */}
                <div className="col-12">
                  <label className="form-label">
                    Comentarios del anunciante{" "}
                    <Contador valor={vehiculo.comentarios} max={500} />
                  </label>
                  <textarea
                    className={`form-control ${vehiculo.comentarios.length <= 0 || vehiculo.comentarios.length > 2000 ? "is-invalid" : "is-valid"}`}
                    placeholder="..."
                    name="comentarios"
                    rows={3}
                    value={vehiculo.comentarios}
                    onChange={handleChange}
                    maxLength={500}
                    required
                  />
                  {vehiculo.comentarios.length <= 0 && (
                      <div className="invalid-feedback d-block">
                        Comentarios debe tener entre 1 - 2000 caracteres
                      </div>
                    )}
                </div>

                {/* Extras */}
                <div className="col-12">
                  <label className="form-label">
                    Extras <Contador valor={vehiculo.extras} max={500} />
                  </label>
                  <textarea
                    className={`form-control ${vehiculo.comentarios.length <= 0 || vehiculo.comentarios.length > 2000 ? "is-invalid" : "is-valid"}`}
                    placeholder="..."
                    name="extras"
                    rows={2}
                    value={vehiculo.extras}
                    onChange={handleChange}
                    maxLength={500}
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

                {/* Precio oferta + Fecha fin */}
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
                        max={vehiculo.precio}
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