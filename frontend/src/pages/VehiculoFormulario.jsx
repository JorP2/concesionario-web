import React from "react";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
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
import { addImagenes, cambiarPortada } from "../api/imagenApi";
import "../styles/vehiculoFormulario.css";

const cardStyle = {
  background: "var(--bs-body-bg, #fff)",
  border: "1px solid var(--bs-border-color, #dee2e6)",
  borderRadius: "12px",
  padding: "20px 24px",
};

const sectionTitleStyle = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--bs-secondary-color, #6c757d)",
  marginBottom: "14px",
  paddingBottom: "8px",
  borderBottom: "1px solid var(--bs-border-color, #dee2e6)",
};

const Contador = ({ valor, max }) => {
  const len = valor?.length ?? 0;
  return (
    <small
      className={`ms-1 ${len >= max ? "text-danger" : "text-muted"}`}
      style={{ fontSize: "11px" }}
    >
      {len}/{max}
    </small>
  );
};

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
    if (!esEdicion) return;

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
  }, [id, esEdicion]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "enOferta" && !checked && esEdicion) {
      deleteOferta(id).catch(() => {});
    }

    const vehiculoActualizado = { ...vehiculo, [name]: newValue };

    if (name === "tipo") {
      if (value === "MOTOCICLETA") {
        vehiculoActualizado.interior = "Ninguno";
        vehiculoActualizado.puertas = 0;
      } else if (vehiculo.tipo === "MOTOCICLETA") {
        vehiculoActualizado.interior =
          vehiculo.interior === "Ninguno" ? "" : vehiculo.interior;
        vehiculoActualizado.puertas = vehiculo.puertas === 0 ? "" : vehiculo.puertas;
      }
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
        alert("Si el vehículo está en oferta, debes indicar precio y fecha fin.");
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
        const imagenesSubidas = await addImagenes(vehiculoId, imagenesNuevas);
        const imagenPortada = imagenesSubidas[portadaNuevaIdx];
        if (imagenPortada) {
          await cambiarPortada(vehiculoId, imagenPortada.id);
        }
      }

      navigate("/administrador");
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    }
  };

  return (
    <div className="container-fluid px-3 px-md-4 mb-5">
      <div className="d-flex align-items-center gap-3 my-4">
        <button
          type="button"
          className="btn btn-light btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          onClick={() => navigate(-1)}
          style={{ width: "40px", height: "40px" }}
        >
          <FaArrowLeft size={14} />
        </button>
        <h2 className="mb-0 fs-4 fw-medium">
          {esEdicion ? "Editar vehículo" : "Agregar vehículo"}
        </h2>
        {esEdicion && vehiculo.enOferta && (
          <span
            className="badge d-inline-flex align-items-center gap-1"
            style={{
              background: "#fff3cd",
              color: "#856404",
              border: "1px solid #ffc107",
              fontWeight: 500,
              fontSize: "12px",
              borderRadius: "20px",
              padding: "5px 10px",
            }}
          >
            <FaTag size={10} />
            En oferta
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3 align-items-start">
          {esEdicion && (
            <div className="col-12 col-lg-5 col-xl-4 d-flex flex-column gap-3">
              <div style={cardStyle}>
                <GaleriaMultimedia
                  vehiculoId={id}
                  imagenesNuevas={imagenesNuevas}
                  setImagenesNuevas={setImagenesNuevas}
                  portadaNuevaIdx={portadaNuevaIdx}
                  setPortadaNuevaIdx={setPortadaNuevaIdx}
                />
              </div>

              <div style={cardStyle}>
                <p style={sectionTitleStyle}>Visibilidad y estado</p>
                <div className="d-flex flex-column gap-2">
                  <div
                    className="d-flex align-items-center justify-content-between py-2"
                    style={{
                      borderBottom: "1px solid var(--bs-border-color, #dee2e6)",
                    }}
                  >
                    <div>
                      <p className="mb-0 fw-medium" style={{ fontSize: "14px" }}>
                        Visible al público
                      </p>
                      <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
                        {vehiculo.visible
                          ? "Aparece en el catálogo"
                          : "Oculto en el catálogo"}
                      </p>
                    </div>
                    <div className="form-check form-switch mb-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        role="switch"
                        name="visible"
                        id="checkVisible"
                        checked={vehiculo.visible}
                        onChange={handleChange}
                        style={{
                          width: "40px",
                          height: "22px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-between py-2"
                    style={{
                      borderBottom: "1px solid var(--bs-border-color, #dee2e6)",
                    }}
                  >
                    <div>
                      <p className="mb-0 fw-medium" style={{ fontSize: "14px" }}>
                        En oferta
                      </p>
                      <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
                        {vehiculo.enOferta
                          ? "Precio reducido activo"
                          : "Sin oferta activa"}
                      </p>
                    </div>
                    <div className="form-check form-switch mb-0">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        role="switch"
                        name="enOferta"
                        id="checkOferta"
                        checked={vehiculo.enOferta}
                        onChange={handleChange}
                        style={{
                          width: "40px",
                          height: "22px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label
                      className="form-label text-muted mb-1"
                      style={{ fontSize: "12px" }}
                    >
                      Estado de venta
                    </label>
                    <select
                      className="form-select form-select-sm"
                      name="estadoVenta"
                      value={vehiculo.estadoVenta}
                      onChange={handleChange}
                    >
                      <option value="en_venta">En venta</option>
                      <option value="vendido">Vendido</option>
                      <option value="reservado">Reservado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`col-12 ${esEdicion ? "col-lg-7 col-xl-8" : "col-lg-8 mx-auto"}`}
          >
            <div className="d-flex flex-column gap-3">
              {!esEdicion && (
                <div style={cardStyle}>
                  <p style={sectionTitleStyle}>Visibilidad y estado</p>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
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
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
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
                  </div>
                </div>
              )}

              <div style={cardStyle}>
                <p style={sectionTitleStyle}>Identificación</p>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Tipo
                    </label>
                    <select
                      className="form-select"
                      name="tipo"
                      value={vehiculo.tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="TURISMO">Turismo</option>
                      <option value="FURGONETA">Furgoneta</option>
                      <option value="MOTOCICLETA">Motocicleta</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Pegatina <Contador valor={vehiculo.pegatina} max={10} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="pegatina"
                      value={vehiculo.pegatina}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Marca <Contador valor={vehiculo.marca} max={20} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="marca"
                      value={vehiculo.marca}
                      onChange={handleChange}
                      maxLength={20}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Modelo <Contador valor={vehiculo.modelo} max={30} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="modelo"
                      value={vehiculo.modelo}
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />
                  </div>
                  <div className="col-6 col-sm-3">
                    <label className="form-label">Año</label>
                    <input
                      type="number"
                      className="form-control"
                      name="anio"
                      value={vehiculo.anio}
                      onChange={handleChange}
                      max={new Date().getFullYear()}
                      required
                    />
                  </div>
                  <div className="col-6 col-sm-3">
                    <label className="form-label">Kilómetros</label>
                    <input
                      type="number"
                      className="form-control"
                      name="kilometros"
                      value={vehiculo.kilometros}
                      onChange={handleChange}
                      min={0}
                      max={9999999}
                      required
                    />
                  </div>
                  <div className="col-6 col-sm-3">
                    <label className="form-label">Precio (€)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="precio"
                      value={vehiculo.precio}
                      onChange={handleChange}
                      min={0}
                      max={999999999}
                      required
                    />
                  </div>
                  {vehiculo.tipo !== "MOTOCICLETA" && (
                    <div className="col-6 col-sm-3">
                      <label className="form-label">Puertas</label>
                      <input
                        type="number"
                        className="form-control"
                        name="puertas"
                        value={vehiculo.puertas}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                  <div className="col-6 col-sm-3">
                    <label className="form-label">Asientos</label>
                    <input
                      type="number"
                      className="form-control"
                      name="asientos"
                      value={vehiculo.asientos}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <p style={sectionTitleStyle}>Características técnicas</p>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Combustible <Contador valor={vehiculo.combustible} max={20} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="combustible"
                      value={vehiculo.combustible}
                      onChange={handleChange}
                      maxLength={20}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Motor <Contador valor={vehiculo.motor} max={30} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="motor"
                      value={vehiculo.motor}
                      onChange={handleChange}
                      maxLength={30}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Cambio <Contador valor={vehiculo.cambio} max={20} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="cambio"
                      value={vehiculo.cambio}
                      onChange={handleChange}
                      maxLength={20}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <p style={sectionTitleStyle}>Acabados</p>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label d-flex justify-content-between">
                      Color exterior <Contador valor={vehiculo.colorExterior} max={25} />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="colorExterior"
                      value={vehiculo.colorExterior}
                      onChange={handleChange}
                      maxLength={25}
                      required
                    />
                  </div>
                  {vehiculo.tipo !== "MOTOCICLETA" && (
                    <div className="col-12 col-sm-6">
                      <label className="form-label d-flex justify-content-between">
                        Interior <Contador valor={vehiculo.interior} max={25} />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="interior"
                        value={vehiculo.interior}
                        onChange={handleChange}
                        maxLength={25}
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <div style={cardStyle}>
                <p style={sectionTitleStyle}>Descripción y extras</p>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label d-flex justify-content-between">
                      Descripción <Contador valor={vehiculo.descripcion} max={200} />
                    </label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      rows={3}
                      value={vehiculo.descripcion}
                      onChange={handleChange}
                      maxLength={200}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label d-flex justify-content-between">
                      Comentarios del anunciante{" "}
                      <Contador valor={vehiculo.comentarios} max={500} />
                    </label>
                    <textarea
                      className="form-control"
                      name="comentarios"
                      rows={3}
                      value={vehiculo.comentarios}
                      onChange={handleChange}
                      maxLength={500}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label d-flex justify-content-between">
                      Extras <Contador valor={vehiculo.extras} max={500} />
                    </label>
                    <textarea
                      className="form-control"
                      name="extras"
                      rows={2}
                      value={vehiculo.extras}
                      onChange={handleChange}
                      maxLength={500}
                    />
                  </div>
                </div>
              </div>

              {vehiculo.enOferta && (
                <div
                  style={{
                    ...cardStyle,
                    border: "1px solid #ffc107",
                    background: "#fffdf0",
                  }}
                >
                  <p
                    style={{
                      ...sectionTitleStyle,
                      borderBottomColor: "#ffc107",
                    }}
                  >
                    Detalles de la oferta
                  </p>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label d-flex justify-content-between">
                        Precio oferta
                        {vehiculo.precioOferta && vehiculo.precio && (
                          <span
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            −
                            {Math.round(
                              ((vehiculo.precio - vehiculo.precioOferta) /
                                vehiculo.precio) *
                                100,
                            )}
                            %
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
                    <div className="col-12 col-sm-6">
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
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-end pb-2">
                <button
                  type="submit"
                  className="btn btn-primary px-5"
                  style={{ borderRadius: "8px", fontWeight: 500 }}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VehiculoFormulario;
