import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GaleriaMultimedia from "../components/admin/GaleriaMultimedia";
import Toast from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";
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
import { addVideo } from "../api/videoApi";
import "../styles/VehiculoFormulario.css";

const Contador = ({ valor, max }) => {
  const len = valor?.length ?? 0;
  return <span className={`char-counter ${len >= max ? "danger" : ""}`}>({len}/{max})</span>;
};

function VehiculoFormulario() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [imagenesNuevas, setImagenesNuevas] = React.useState([]);
  const [videosNuevos, setVideosNuevos] = React.useState([]);
  const [portadaNuevaIdx, setPortadaNuevaIdx] = React.useState(-1);
  const [errores, setErrores] = React.useState({});
  const [tocados, setTocados] = React.useState({});
  const [validados, setValidados] = React.useState({});

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

  const opcionesCombustible = ["Gasolina", "Diesel", "Híbrido", "Eléctrico"];
  const opcionesCambio = ["Manual", "Automático", "Híbrido"];
  const opcionesPegatina = ["C", "B", "ECO", "CERO"];

  const validarCampo = (name, value, vehiculoActual = vehiculo) => {
    const añoActual = new Date().getFullYear();
    switch (name) {
      case "tipo": return !value ? "El tipo es obligatorio" : "";
      case "marca": return !value?.trim() ? "La marca es obligatoria" : "";
      case "modelo": return !value?.trim() ? "El modelo es obligatorio" : "";
      case "anio":
        if (!value) return "El año es obligatorio";
        if (value < 1900 || value > añoActual + 1) return `Año entre 1900 y ${añoActual + 1}`;
        return "";
      case "precio":
        if (!value || value <= 0) return "El precio debe ser mayor a 0";
        if (vehiculoActual.enOferta && vehiculoActual.precioOferta && parseFloat(vehiculoActual.precioOferta) >= parseFloat(value))
          return "El precio oferta debe ser menor";
        return "";
      case "kilometros": return (!value && value !== 0) ? "Los km son obligatorios" : (value < 0 ? "No puede ser negativo" : "");
      case "combustible": return !value ? "Selecciona combustible" : "";
      case "colorExterior": return !value?.trim() ? "El color es obligatorio" : "";
      case "interior": if (vehiculoActual.tipo !== "MOTOCICLETA" && !value?.trim()) return "El interior es obligatorio"; return "";
      case "asientos": if (!value) return "Asientos obligatorio";
        if (value < 1 || value > 9) return "Asientos entre 1 y 9";
        return "";
      case "puertas": if (vehiculoActual.tipo !== "MOTOCICLETA" && (!value || value < 2 || value > 6)) return "Puertas entre 2 y 6"; return "";
      case "motor": return !value?.trim() ? "El motor es obligatorio" : "";
      case "cambio": return !value ? "Selecciona cambio" : "";
      case "pegatina": return !value ? "Selecciona pegatina" : "";
      case "descripcion": return !value?.trim() ? "La descripción es obligatoria" : "";
      case "comentarios": return !value?.trim() ? "Los comentarios son obligatorios" : "";
      case "precioOferta":
        if (vehiculoActual.enOferta && (!value || value <= 0)) return "Precio oferta obligatorio";
        if (vehiculoActual.enOferta && value && parseFloat(value) >= parseFloat(vehiculoActual.precio))
          return "Debe ser menor al precio original";
        return "";
      case "fechaFinOferta":
        if (vehiculoActual.enOferta && !value) return "Fecha fin obligatoria";
        if (vehiculoActual.enOferta && value && new Date(value) <= new Date()) return "Fecha debe ser posterior";
        return "";
      default: return "";
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nuevosValidados = {};
    let esValido = true;
    Object.keys(vehiculo).forEach((campo) => {
      const error = validarCampo(campo, vehiculo[campo], vehiculo);
      if (error) {
        nuevosErrores[campo] = error;
        nuevosValidados[campo] = false;
        esValido = false;
      } else {
        nuevosValidados[campo] = true;
      }
    });
    setErrores(nuevosErrores);
    setValidados(nuevosValidados);
    return esValido;
  };

  const marcarTodosTocados = () => {
    const todos = {};
    Object.keys(vehiculo).forEach((campo) => { todos[campo] = true; });
    setTocados(todos);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    let actualizado = { ...vehiculo, [name]: newValue };
    if (name === "tipo" && value === "MOTOCICLETA") {
      actualizado.interior = "Ninguno";
      actualizado.puertas = 0;
    }
    setVehiculo(actualizado);
    
    if (tocados[name]) {
      const error = validarCampo(name, newValue, actualizado);
      setErrores((prev) => ({ ...prev, [name]: error }));
      setValidados((prev) => ({ ...prev, [name]: !error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
    const error = validarCampo(name, value, vehiculo);
    setErrores((prev) => ({ ...prev, [name]: error }));
    setValidados((prev) => ({ ...prev, [name]: !error }));
  };

  React.useEffect(() => {
    if (esEdicion) {
      const cargar = async () => {
        setLoading(true);
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
            fechaFinOferta: data.fechaFinOferta ? data.fechaFinOferta.slice(0, 16) : "",
            visible: data.visible ?? true,
            estadoVenta: data.estadoVenta ?? "en_venta",
          });
        } catch (error) {
          const msg = error.response?.data?.mensaje || "Error al cargar";
          setToast({ message: msg, type: "error" });
        } finally {
          setLoading(false);
        }
      };
      cargar();
    }
  }, [id, esEdicion]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  marcarTodosTocados();
  if (!validarFormulario()) {
    setToast({ message: "Complete todos los campos obligatorios", type: "error" });
    return;
  }
  setLoading(true);
  try {
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
    
    if (vehiculo.enOferta && vehiculo.precioOferta && vehiculo.fechaFinOferta) {
      await aplicarOfertaPrecioFijo(vehiculoId, vehiculo.precioOferta, vehiculo.fechaFinOferta);
    } else if (!vehiculo.enOferta) {
      await deleteOferta(vehiculoId).catch(() => {});
    }
    
    // ========== SUBIR IMÁGENES NUEVAS ==========
    // NOTA: En edición, las imágenes nuevas NO pueden ser portada
    // Solo se suben, no se aplica portada a ellas
    if (imagenesNuevas.length > 0) {
      await addImagenes(vehiculoId, imagenesNuevas);
    }
    
    // ========== SUBIR VIDEOS NUEVOS ==========
    if (videosNuevos.length > 0) {
      for (const video of videosNuevos) {
        await addVideo(vehiculoId, video);
      }
    }
    
    setToast({ message: esEdicion ? "Vehículo actualizado" : "Vehículo creado", type: "success" });
    setTimeout(() => navigate("/administrador"), 1500);
  } catch (error) {
    const msg = error.response?.data?.mensaje || error.response?.data?.error || "Error al guardar";
    setToast({ message: msg, type: "error" });
    setLoading(false);
  }
};

  const getFieldStatus = (name) => {
    if (!tocados[name]) return "";
    if (errores[name]) return "is-error";
    if (validados[name]) return "is-valid";
    return "";
  };

  return (
    <div className="vehiculo-form-container">
      <div className="form-header">
        <button type="button" className="btn-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <h1 className="form-title">
          {esEdicion ? "Editar vehículo" : "Nuevo vehículo"}
        </h1>
        <div className="form-header-placeholder"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-layout">
          {/* COLUMNA IZQUIERDA - FORMULARIO */}
          <div className="form-column">
            <div className="form-card">
              <div className="form-card-header">
                <h3>DATOS GENERALES</h3>
              </div>
              <div className="form-card-body">
                <div className="form-grid">
                  <div className="form-group form-grid-full">
                    <label className="form-label">TIPO <span className="required">*</span></label>
                    <select className={`form-select ${getFieldStatus("tipo")}`} name="tipo" value={vehiculo.tipo} onChange={handleChange} onBlur={handleBlur} required>
                      <option value="">Seleccionar</option>
                      <option value="TURISMO">Turismo</option>
                      <option value="FURGONETA">Furgoneta</option>
                      <option value="MOTOCICLETA">Motocicleta</option>
                    </select>
                    {tocados.tipo && errores.tipo && <div className="error-feedback">{errores.tipo}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">MARCA <span className="required">*</span> <Contador valor={vehiculo.marca} max={20} /></label>
                    <input type="text" className={`form-control ${getFieldStatus("marca")}`} name="marca" value={vehiculo.marca} onChange={handleChange} onBlur={handleBlur} maxLength={20} required />
                    {tocados.marca && errores.marca && <div className="error-feedback">{errores.marca}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">MODELO <span className="required">*</span> <Contador valor={vehiculo.modelo} max={30} /></label>
                    <input type="text" className={`form-control ${getFieldStatus("modelo")}`} name="modelo" value={vehiculo.modelo} onChange={handleChange} onBlur={handleBlur} maxLength={30} required />
                    {tocados.modelo && errores.modelo && <div className="error-feedback">{errores.modelo}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">AÑO <span className="required">*</span></label>
                    <input type="number" className={`form-control ${getFieldStatus("anio")}`} name="anio" value={vehiculo.anio} onChange={handleChange} onBlur={handleBlur} min={1900} max={new Date().getFullYear() + 1} required />
                    {tocados.anio && errores.anio && <div className="error-feedback">{errores.anio}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">PRECIO (€) <span className="required">*</span></label>
                    <input type="number" className={`form-control ${getFieldStatus("precio")}`} name="precio" value={vehiculo.precio} onChange={handleChange} onBlur={handleBlur} min={0} required />
                    {tocados.precio && errores.precio && <div className="error-feedback">{errores.precio}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">KILÓMETROS <span className="required">*</span></label>
                    <input type="number" className={`form-control ${getFieldStatus("kilometros")}`} name="kilometros" value={vehiculo.kilometros} onChange={handleChange} onBlur={handleBlur} min={0} required />
                    {tocados.kilometros && errores.kilometros && <div className="error-feedback">{errores.kilometros}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">COMBUSTIBLE <span className="required">*</span></label>
                    <select className={`form-select ${getFieldStatus("combustible")}`} name="combustible" value={vehiculo.combustible} onChange={handleChange} onBlur={handleBlur} required>
                      <option value="">Seleccionar</option>
                      {opcionesCombustible.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {tocados.combustible && errores.combustible && <div className="error-feedback">{errores.combustible}</div>}
                  </div>

                  <div className="form-group form-grid-full">
                    <label className="form-label">COLOR EXTERIOR <span className="required">*</span> <Contador valor={vehiculo.colorExterior} max={25} /></label>
                    <input type="text" className={`form-control ${getFieldStatus("colorExterior")}`} name="colorExterior" value={vehiculo.colorExterior} onChange={handleChange} onBlur={handleBlur} maxLength={25} required />
                    {tocados.colorExterior && errores.colorExterior && <div className="error-feedback">{errores.colorExterior}</div>}
                  </div>

                  {vehiculo.tipo !== "MOTOCICLETA" && (
                    <div className="form-group form-grid-full">
                      <label className="form-label">INTERIOR <span className="required">*</span> <Contador valor={vehiculo.interior} max={25} /></label>
                      <input type="text" className="form-control" name="interior" value={vehiculo.interior} onChange={handleChange} maxLength={25} required />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">MOTOR <span className="required">*</span> <Contador valor={vehiculo.motor} max={30} /></label>
                    <input type="text" className={`form-control ${getFieldStatus("motor")}`} name="motor" value={vehiculo.motor} onChange={handleChange} onBlur={handleBlur} maxLength={30} required />
                    {tocados.motor && errores.motor && <div className="error-feedback">{errores.motor}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">CAMBIO <span className="required">*</span></label>
                    <select className={`form-select ${getFieldStatus("cambio")}`} name="cambio" value={vehiculo.cambio} onChange={handleChange} onBlur={handleBlur} required>
                      <option value="">Seleccionar</option>
                      {opcionesCambio.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {tocados.cambio && errores.cambio && <div className="error-feedback">{errores.cambio}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">ASIENTOS <span className="required">*</span></label>
                    <input type="number" className={`form-control ${getFieldStatus("asientos")}`} name="asientos" value={vehiculo.asientos} onChange={handleChange} onBlur={handleBlur} min={1} max={9} required />
                    {tocados.asientos && errores.asientos && <div className="error-feedback">{errores.asientos}</div>}
                  </div>

                  {vehiculo.tipo !== "MOTOCICLETA" && (
                    <div className="form-group">
                      <label className="form-label">PUERTAS</label>
                      <input type="number" className="form-control" name="puertas" value={vehiculo.puertas} onChange={handleChange} min={2} max={6} />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">PEGATINA <span className="required">*</span></label>
                    <select className={`form-select ${getFieldStatus("pegatina")}`} name="pegatina" value={vehiculo.pegatina} onChange={handleChange} onBlur={handleBlur} required>
                      <option value="">Seleccionar</option>
                      {opcionesPegatina.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {tocados.pegatina && errores.pegatina && <div className="error-feedback">{errores.pegatina}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">ESTADO VENTA</label>
                    <select className="form-select" name="estadoVenta" value={vehiculo.estadoVenta} onChange={handleChange}>
                      <option value="en_venta">En venta</option>
                      <option value="vendido">Vendido</option>
                      <option value="reservado">Reservado</option>
                    </select>
                  </div>

                  <div className="form-group form-grid-full">
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <input type="checkbox" name="visible" id="visible" checked={vehiculo.visible} onChange={handleChange} />
                        <label htmlFor="visible">Visible</label>
                      </div>
                      <div className="checkbox-item">
                        <input type="checkbox" name="enOferta" id="enOferta" checked={vehiculo.enOferta} onChange={handleChange} />
                        <label htmlFor="enOferta">En oferta</label>
                      </div>
                    </div>
                  </div>

                  {vehiculo.enOferta && (
                    <div className="form-group form-grid-full">
                      <div className="oferta-panel">
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">PRECIO OFERTA (€)</label>
                            <input type="number" className={`form-control ${getFieldStatus("precioOferta")}`} name="precioOferta" value={vehiculo.precioOferta} onChange={handleChange} onBlur={handleBlur} min={0} />
                            {tocados.precioOferta && errores.precioOferta && <div className="error-feedback">{errores.precioOferta}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">FECHA FIN OFERTA</label>
                            <input type="datetime-local" className={`form-control ${getFieldStatus("fechaFinOferta")}`} name="fechaFinOferta" value={vehiculo.fechaFinOferta} onChange={handleChange} onBlur={handleBlur} />
                            {tocados.fechaFinOferta && errores.fechaFinOferta && <div className="error-feedback">{errores.fechaFinOferta}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-header">
                <h3>DESCRIPCIÓN Y EXTRAS</h3>
              </div>
              <div className="form-card-body">
                <div className="form-grid">
                  <div className="form-group form-grid-full">
                    <label className="form-label">DESCRIPCIÓN <span className="required">*</span> <Contador valor={vehiculo.descripcion} max={500} /></label>
                    <textarea className={`form-control ${getFieldStatus("descripcion")}`} name="descripcion" rows={3} value={vehiculo.descripcion} onChange={handleChange} onBlur={handleBlur} maxLength={500} required />
                    {tocados.descripcion && errores.descripcion && <div className="error-feedback">{errores.descripcion}</div>}
                  </div>

                  <div className="form-group form-grid-full">
                    <label className="form-label">COMENTARIOS <span className="required">*</span> <Contador valor={vehiculo.comentarios} max={500} /></label>
                    <textarea className={`form-control ${getFieldStatus("comentarios")}`} name="comentarios" rows={2} value={vehiculo.comentarios} onChange={handleChange} onBlur={handleBlur} maxLength={500} required />
                    {tocados.comentarios && errores.comentarios && <div className="error-feedback">{errores.comentarios}</div>}
                  </div>

                  <div className="form-group form-grid-full">
                    <label className="form-label">EXTRAS (separados por comas)</label>
                    <textarea className="form-control" name="extras" rows={2} value={vehiculo.extras} onChange={handleChange} maxLength={500} placeholder="Elevalunas, Climatizador, Cámara trasera, Sensores de aparcamiento..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="btn-save-wrapper">
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA - GALERÍA MULTIMEDIA */}
          <div className="gallery-column">
            <div className="form-card">
              <div className="form-card-header">
                <h3>GALERÍA MULTIMEDIA</h3>
              </div>
              <div className="form-card-body">
                <GaleriaMultimedia
                  vehiculoId={id}
                  imagenesNuevas={imagenesNuevas}
                  setImagenesNuevas={setImagenesNuevas}
                  portadaNuevaIdx={portadaNuevaIdx}
                  setPortadaNuevaIdx={setPortadaNuevaIdx}
                  videosNuevos={videosNuevos}
                  setVideosNuevos={setVideosNuevos}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {loading && <Spinner message={esEdicion ? "Actualizando..." : "Creando vehículo..."} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default VehiculoFormulario;