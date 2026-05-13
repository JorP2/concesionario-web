import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/vehiculoCardAdmin.css";
import sinImagen from "../../assets/sin-imagen.png";
import { deleteOferta } from "../../api/vehiculoApi";
import { FaClock } from "react-icons/fa";

function CardVehiculoAdmin({ vehiculo, onEliminar }) {
  const [mostrarModal, setMostrarModal] = React.useState(false);
  const [tiempoRestante, setTiempoRestante] = React.useState("");

  // Manejo eliminar
  const handleEliminar = () => {
    onEliminar(vehiculo.id);
    setMostrarModal(false);
  };

  // Manejo tiempo restante oferta
  React.useEffect(() => {
    if (!vehiculo.fechaFinOferta || !vehiculo.enOferta) return;

    const calcular = () => {
      const ahora = new Date();
      const fin = new Date(vehiculo.fechaFinOferta);
      const diff = fin - ahora;

      if (diff <= 0) {
        setTiempoRestante("Expirada");
        deleteOferta(vehiculo.id).catch((err) => {
          console.error("Error al eliminar oferta expirada: ", err);
        });
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);

      if (dias > 0) setTiempoRestante(`${dias}d ${horas}h ${minutos}m`);
      else if (horas > 0)
        setTiempoRestante(`${horas}h ${minutos}m ${segundos}s`);
      else setTiempoRestante(`${minutos}m ${segundos}s`);
    };

    calcular();
    const timer = setInterval(calcular, 1000);
    return () => clearInterval(timer);
  }, [vehiculo.fechaFinOferta, vehiculo.enOferta, vehiculo.id]);

  return (
    <>
      <div className="card shadow-sm vehiculo-admin-card">
        <div className="row g-0 align-items-center">
          {/* IMAGEN */}
          <div
            className="col-md-3"
            style={{ position: "relative", overflow: "hidden" }}
          >
            {vehiculo.enOferta && vehiculo.precioOferta && (
              <div className="oferta-ribbon-admin">OFERTA</div>
            )}
            {vehiculo.estadoVenta === "vendido" && (
              <div className="vendido-ribbon-admin">VENDIDO</div>
            )}
            <img
              src={vehiculo.imagenPortada || sinImagen}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              className={`img-admin ${!vehiculo.imagenPortada ? "sin-imagen-img-admin" : ""}`}
            />
          </div>

          {/* INFO */}
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">
                {vehiculo.marca} {vehiculo.modelo}
              </h5>
              <div className="row g-1 mt-1">
                <div className="col-6">
                  <p className="card-text mb-1">
                    <strong>Kilómetros:</strong> {vehiculo.kilometros}
                  </p>
                </div>
                <div className="col-6">
                  <p className="card-text mb-1">
                    <strong>Combustible:</strong> {vehiculo.combustible}
                  </p>
                </div>
                <div className="col-6">
                  <p className="card-text mb-1">
                    <strong>Cambio:</strong> {vehiculo.cambio}
                  </p>
                </div>
                <div className="col-6">
                  <p className="card-text mb-1">
                    <strong>Año:</strong> {vehiculo.anio}
                  </p>
                </div>
                <div className="col-6">
                  <p className="card-text mb-1">
                    <strong>Precio:</strong>{" "}
                    {vehiculo.enOferta && vehiculo.precioOferta ? (
                      <span className="precio-original">
                        €{vehiculo.precio}
                      </span>
                    ) : (
                      <span className="precio-normal">€{vehiculo.precio}</span>
                    )}
                  </p>
                  {vehiculo.enOferta && vehiculo.precioOferta && (
                    <div className="oferta-row">
                      <span className="precio-oferta">
                        Oferta: €{vehiculo.precioOferta}
                      </span>
                      {tiempoRestante && (
                        <span
                          className={`contador-oferta${tiempoRestante === "Expirada" ? " expirada" : ""}`}
                        >
                          <FaClock size={10} />
                          {tiempoRestante}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-6">
                  <p className="card-text mb-1">
                    <strong>Estado:</strong> {vehiculo.estadoVenta ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="col-md-3 text-center">
            <div className="d-flex flex-column gap-2 p-3">
              <Link
                to={`/administrador/vehiculo-form/${vehiculo.id}`}
                className="btn btn-warning"
              >
                Editar
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => setMostrarModal(true)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL — fuera del card, controlado por React ── */}
      {mostrarModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  ¿Seguro desea eliminar este vehículo?
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                />
              </div>
              <div className="modal-body">
                Esta acción no se puede deshacer.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleEliminar}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardVehiculoAdmin;
