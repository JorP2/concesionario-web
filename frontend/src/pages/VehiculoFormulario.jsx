import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioTurismo from "../components/formularios/FormularioTurismo";
import FormularioFurgoneta from "../components/formularios/FormularioFurgoneta";
import FormularioScooter from "../components/formularios/FormularioScooter";
import {
  addVehiculo,
  updateVehiculo,
  getVehiculoById,
  aplicarOfertaPrecioFijo,
  deleteOferta,
  updateEstadoVehiculo,
  cambiarVisibilidad,
} from "../api/vehiculoApi";

function VehiculoFormulario() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("TURISMO");
  const [comunes, setComunes] = useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    kilometros: "",
    combustible: "",
    colorExterior: "",
    descripcion: "",
    comentarios: "",
    extras: "",
    visible: true,
    estadoVenta: "en_venta",
    enOferta: false,
    precioOferta: "",
    fechaFinOferta: "",
  });
  const [especificos, setEspecificos] = useState({});

  useEffect(() => {
    if (esEdicion) {
      const cargarVehiculo = async () => {
        try {
          const data = await getVehiculoById(id);

          setComunes({
            marca: data.marca ?? "",
            modelo: data.modelo ?? "",
            anio: data.anio ?? "",
            precio: data.precio ?? "",
            kilometros: data.kilometros ?? "",
            combustible: data.combustible ?? "",
            colorExterior: data.colorExterior ?? "",
            descripcion: data.descripcion ?? "",
            comentarios: data.comentarios ?? "",
            extras: data.extras ?? "",
            visible: data.visible ?? true,
            estadoVenta: data.estadoVenta ?? "en_venta",
            enOferta: data.enOferta ?? false,
            precioOferta: data.precioOferta ?? "",
            fechaFinOferta: data.fechaFinOferta
              ? data.fechaFinOferta.slice(0, 16)
              : "",
          });

          if (data.cilindrada !== undefined) {
            setTipo("SCOOTER");
            setEspecificos({
              cilindrada: data.cilindrada,
              tipoMotor: data.tipoMotor,
              tieneSidecar: data.tieneSidecar,
              tieneBaul: data.tieneBaul,
              tieneMaletinBajoAsiento: data.tieneMaletinBajoAsiento,
              autonomia: data.autonomia,
            });
          } else if (data.capacidadCarga !== undefined) {
            setTipo("FURGONETA");
            setEspecificos({
              asientos: data.asientos,
              puertas: data.puertas,
              motor: data.motor,
              cambio: data.cambio,
              pegatina: data.pegatina,
              interior: data.interior,
              capacidadCarga: data.capacidadCarga,
              numeroAsientos: data.numeroAsientos,
              tienePuertaCorredera: data.tienePuertaCorredera,
            });
          } else {
            setTipo("TURISMO");
            setEspecificos({
              asientos: data.asientos,
              puertas: data.puertas,
              motor: data.motor,
              cambio: data.cambio,
              pegatina: data.pegatina,
              interior: data.interior,
              tieneAireAcondicionado: data.tieneAireAcondicionado,
              tieneNavegacion: data.tieneNavegacion,
            });
          }
        } catch (error) {
          console.error("Error al cargar el vehículo:", error);
        }
      };
      cargarVehiculo();
    }
  }, [id, esEdicion]);

  const handleComunesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComunes({ ...comunes, [name]: type === "checkbox" ? checked : value });

    if (name === "enOferta" && !checked && esEdicion) {
      deleteOferta(id).catch(() => {});
    }
  };

  const handleEspecificosChange = (datos) => {
    setEspecificos({ ...especificos, ...datos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        comunes.enOferta &&
        (!comunes.precioOferta || !comunes.fechaFinOferta)
      ) {
        alert(
          "Si el vehículo está en oferta, debes indicar precio y fecha fin.",
        );
        return;
      }

      const datosCompletos = { ...comunes, ...especificos };
      let vehiculoId;

      if (esEdicion) {
        await updateVehiculo(id, datosCompletos);
        vehiculoId = id;
      } else {
        const data = await addVehiculo(datosCompletos);
        vehiculoId = data.id;
      }

      await cambiarVisibilidad(vehiculoId, comunes.visible);
      await updateEstadoVehiculo(vehiculoId, comunes.estadoVenta);

      if (comunes.enOferta && comunes.precioOferta && comunes.fechaFinOferta) {
        await aplicarOfertaPrecioFijo(
          vehiculoId,
          comunes.precioOferta,
          comunes.fechaFinOferta,
        );
      } else if (!comunes.enOferta && esEdicion) {
        await deleteOferta(vehiculoId).catch(() => {});
      }

      navigate("/administrador");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar el vehículo");
    }
  };

  return (
    <div className="container-fluid px-4">
      <button
        className="btn btn-light btn-outline-secondary rounded-circle mb-3"
        onClick={() => navigate(-1)}
        style={{ width: "45px", height: "45px", marginTop: "10px" }}
      >
        <FaArrowLeft />
      </button>

      <h2 className="text-center mb-4">
        {esEdicion ? "Editar Vehículo" : "Agregar Vehículo"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {!esEdicion && (
            <div className="col-12">
              <label className="form-label">Tipo de vehículo</label>
              <select
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="TURISMO">🚗 Turismo</option>
                <option value="FURGONETA">🚐 Furgoneta</option>
                <option value="SCOOTER">🛵 Scooter</option>
              </select>
            </div>
          )}

          {esEdicion && (
            <div className="col-12">
              <label className="form-label">Tipo</label>
              <input
                type="text"
                className="form-control"
                value={tipo}
                disabled
              />
            </div>
          )}

          <div className="col-6">
            <input
              className="form-control"
              name="marca"
              placeholder="Marca"
              value={comunes.marca}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="modelo"
              placeholder="Modelo"
              value={comunes.modelo}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              name="anio"
              placeholder="Año"
              type="number"
              value={comunes.anio}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              name="precio"
              placeholder="Precio"
              type="number"
              value={comunes.precio}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              name="kilometros"
              placeholder="Kilómetros"
              type="number"
              value={comunes.kilometros}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="combustible"
              placeholder="Combustible"
              value={comunes.combustible}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="colorExterior"
              placeholder="Color exterior"
              value={comunes.colorExterior}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              name="descripcion"
              placeholder="Descripción"
              rows="3"
              value={comunes.descripcion}
              onChange={handleComunesChange}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              name="comentarios"
              placeholder="Comentarios del vendedor"
              rows="3"
              value={comunes.comentarios}
              onChange={handleComunesChange}
              required
            />
          </div>

          {tipo === "TURISMO" && (
            <FormularioTurismo
              valores={especificos}
              onChange={handleEspecificosChange}
            />
          )}
          {tipo === "FURGONETA" && (
            <FormularioFurgoneta
              valores={especificos}
              onChange={handleEspecificosChange}
            />
          )}
          {tipo === "SCOOTER" && (
            <FormularioScooter
              valores={especificos}
              onChange={handleEspecificosChange}
            />
          )}

          <div className="col-12">
            <label className="form-label">
              Extras <span className="text-muted">(opcional)</span>
            </label>
            <textarea
              className="form-control"
              name="extras"
              placeholder="ej: Techo panorámico, sensores de aparcamiento..."
              rows="2"
              value={comunes.extras}
              onChange={handleComunesChange}
            />
          </div>

          <div className="col-6">
            <label className="form-label">Estado de venta</label>
            <select
              className="form-select"
              name="estadoVenta"
              value={comunes.estadoVenta}
              onChange={handleComunesChange}
            >
              <option value="en_venta">En venta</option>
              <option value="vendido">Vendido</option>
              <option value="reservado">Reservado</option>
            </select>
          </div>

          <div className="col-6">
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                name="visible"
                id="checkVisible"
                checked={comunes.visible}
                onChange={handleComunesChange}
              />
              <label className="form-check-label" htmlFor="checkVisible">
                Visible
              </label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="enOferta"
                id="checkOferta"
                checked={comunes.enOferta}
                onChange={handleComunesChange}
              />
              <label className="form-check-label" htmlFor="checkOferta">
                En oferta
              </label>
            </div>
          </div>

          {comunes.enOferta && (
            <>
              <div className="col-6">
                <label className="form-label">Precio oferta</label>
                <input
                  type="number"
                  className="form-control"
                  name="precioOferta"
                  value={comunes.precioOferta}
                  onChange={handleComunesChange}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Fecha fin oferta</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="fechaFinOferta"
                  value={comunes.fechaFinOferta}
                  onChange={handleComunesChange}
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
      </form>
    </div>
  );
}

export default VehiculoFormulario;
