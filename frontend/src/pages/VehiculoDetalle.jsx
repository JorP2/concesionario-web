import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaPlay,
  FaEuroSign,
  FaCalendarAlt,
  FaDoorOpen,
  FaUser,
  FaPalette,
  FaChair,
} from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { getVehiculoByIdPublic } from "../api/vehiculoApi";
import { getVideosByVehiculoId } from "../api/videoApi";
import "../styles/VehiculoDetalle.css";

function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [videos, setVideos] = useState([]);
  const [galeriaIndex, setGaleriaIndex] = useState(0);
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);
  const esMoto = vehiculo?.tipo === "MOTOCICLETA";

  // Configuración de galería
  const IMAGENES_POR_PAGINA = 4;

  useEffect(() => {
    getVehiculoByIdPublic(id)
      .then((data) => setVehiculo(data))
      .catch(() => setError(true));
    getVideosByVehiculoId(id).then(setVideos);
  }, [id]);

  // Navegación galería
  const siguienteGrupo = () => {
    const totalImagenes = vehiculo?.imagenes?.length || 0;
    if (galeriaIndex + IMAGENES_POR_PAGINA < totalImagenes) {
      setGaleriaIndex(galeriaIndex + 1);
    }
  };

  const anteriorGrupo = () => {
    if (galeriaIndex > 0) {
      setGaleriaIndex(galeriaIndex - 1);
    }
  };

  const imagenesVisibles = vehiculo?.imagenes?.slice(
    galeriaIndex,
    galeriaIndex + IMAGENES_POR_PAGINA
  ) || [];

  const hayMasImagenes = (vehiculo?.imagenes?.length || 0) > galeriaIndex + IMAGENES_POR_PAGINA;
  const hayMenosImagenes = galeriaIndex > 0;

  if (error) {
    return (
      <div className="vehiculo-detalle-container">
        <div className="error-message">
          <p>No se pudo cargar la información del vehículo</p>
          <button onClick={() => window.location.reload()} className="btn-reintentar">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!vehiculo) {
    return (
      <div className="vehiculo-detalle-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vehiculo-detalle-container">
      <div className="detalle-grid">
        {/* COLUMNA IZQUIERDA - IMÁGENES Y VIDEOS */}
        <div className="detalle-columna-izquierda">
          {/* IMAGEN PRINCIPAL */}
          <div className="imagen-principal">
            <img
              src={selectedImg || vehiculo.imagenPortada}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              onClick={() => setSelectedImg(selectedImg || vehiculo.imagenPortada)}
            />
            {vehiculo.enOferta && vehiculo.precioOferta && (
              <div className="ribbon-oferta">OFERTA</div>
            )}
          </div>

          {/* GALERÍA CON FLECHAS */}
          {vehiculo.imagenes && vehiculo.imagenes.length > 0 && (
            <div className="galeria-section">
              <button
                className={`flecha-galeria ${!hayMenosImagenes ? "disabled" : ""}`}
                onClick={anteriorGrupo}
                disabled={!hayMenosImagenes}
                aria-label="Imágenes anteriores"
              >
                <FaChevronLeft />
              </button>

              <div className="galeria-grid">
                {imagenesVisibles.map((img, idx) => (
                  <div
                    key={idx}
                    className={`galeria-item ${selectedImg === img ? "activo" : ""}`}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} />
                  </div>
                ))}
              </div>

              <button
                className={`flecha-galeria ${!hayMasImagenes ? "disabled" : ""}`}
                onClick={siguienteGrupo}
                disabled={!hayMasImagenes}
                aria-label="Imágenes siguientes"
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {/* SECCIÓN VIDEOS */}
          {videos.length > 0 && (
            <div className="videos-section">
              <h3>Videos del vehículo</h3>
              <div className="videos-grid">
                {videos.map((video, idx) => (
                  <div
                    key={idx}
                    className="video-card"
                    onClick={() => setVideoSeleccionado(video.url)}
                  >
                    <video src={video.url} preload="metadata" />
                    <div className="video-overlay">
                      <FaPlay />
                      <span>Reproducir</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ESPECIFICACIONES TÉCNICAS */}
          <div className="especificaciones-section">
            <h3>Especificaciones técnicas</h3>
            <div className="especificaciones-grid">
              <div className="espec-item">
                <FaGasPump />
                <div>
                  <span>Combustible</span>
                  <strong>{vehiculo.combustible}</strong>
                </div>
              </div>
              <div className="espec-item">
                <FaCogs />
                <div>
                  <span>Motor</span>
                  <strong>{vehiculo.motor}</strong>
                </div>
              </div>
              <div className="espec-item">
                <FaTachometerAlt />
                <div>
                  <span>Kilómetros</span>
                  <strong>{vehiculo.kilometros?.toLocaleString()} km</strong>
                </div>
              </div>
              <div className="espec-item">
                <GiGearStick />
                <div>
                  <span>Transmisión</span>
                  <strong>{vehiculo.cambio}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* CARACTERÍSTICAS */}
          <div className="caracteristicas-section">
            <h3>Características</h3>
            <div className="caracteristicas-grid">
              <div className="caracteristica-item">
                <FaCalendarAlt />
                <span>Año</span>
                <strong>{vehiculo.anio}</strong>
              </div>
              <div className="caracteristica-item">
                <FaEuroSign />
                <span>Pegatina ambiental</span>
                <strong>{vehiculo.pegatina}</strong>
              </div>
              {!esMoto && (
                <div className="caracteristica-item">
                  <FaDoorOpen />
                  <span>Puertas</span>
                  <strong>{vehiculo.puertas}</strong>
                </div>
              )}
              <div className="caracteristica-item">
                <FaUser />
                <span>Asientos</span>
                <strong>{vehiculo.asientos}</strong>
              </div>
              <div className="caracteristica-item">
                <FaPalette />
                <span>Color exterior</span>
                <strong>{vehiculo.colorExterior}</strong>
              </div>
              {!esMoto && (
                <div className="caracteristica-item">
                  <FaChair />
                  <span>Interior</span>
                  <strong>{vehiculo.interior}</strong>
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="descripcion-section">
            <h3>Descripción</h3>
            <p>{vehiculo.descripcion}</p>
          </div>

          {/* EXTRAS */}
          {vehiculo.extras && (
            <div className="extras-section">
              <h3>Equipamiento y extras</h3>
              <div className="extras-grid">
                {vehiculo.extras.split(",").map((extra, idx) => (
                  <span key={idx} className="extra-badge">
                    {extra.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA - INFO Y CONTACTO */}
        <div className="detalle-columna-derecha">
          <div className="info-sticky">
            <div className="info-card">
              <h1>
                {vehiculo.marca} {vehiculo.modelo}
              </h1>
              <div className="precio-container">
                {vehiculo.precioOferta ? (
                  <>
                    <span className="precio-original">{vehiculo.precio.toLocaleString()}€</span>
                    <span className="precio-oferta">{vehiculo.precioOferta.toLocaleString()}€</span>
                    <span className="descuento-badge">
                      -{Math.round((1 - vehiculo.precioOferta / vehiculo.precio) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="precio-normal">{vehiculo.precio.toLocaleString()}€</span>
                )}
              </div>

              <div className="estado-vehiculo">
                <span className={`estado-badge ${vehiculo.estadoVenta}`}>
                  {vehiculo.estadoVenta === "en_venta" && "✓ En venta"}
                  {vehiculo.estadoVenta === "vendido" && "✗ Vendido"}
                  {vehiculo.estadoVenta === "reservado" && "⏱ Reservado"}
                </span>
              </div>

              <div className="servicios-lista">
                <div className="servicio-item">
                  <span>✓</span> Garantía 12 meses
                </div>
                <div className="servicio-item">
                  <span>✓</span> Financiación a medida
                </div>
                <div className="servicio-item">
                  <span>✓</span> Entrega inmediata
                </div>
                <div className="servicio-item">
                  <span>✓</span> Revisión técnica incluida
                </div>
              </div>

              <a href="/contacto/#contactos" className="btn-contactar">
                Solicitar información
              </a>
            </div>

            <div className="comentarios-card">
              <h4>Comentarios del vendedor</h4>
              <p>{vehiculo.comentarios}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL IMAGEN AMPLIADA */}
      {selectedImg && (
        <div className="modal-ampliado" onClick={() => setSelectedImg(null)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setSelectedImg(null)}>
              <FaTimes />
            </button>
            <img src={selectedImg} alt="Imagen ampliada" />
          </div>
        </div>
      )}

      {/* MODAL VIDEO */}
      {videoSeleccionado && (
        <div className="modal-ampliado" onClick={() => setVideoSeleccionado(null)}>
          <div className="modal-contenido video" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setVideoSeleccionado(null)}>
              <FaTimes />
            </button>
            <video src={videoSeleccionado} controls autoPlay />
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiculoDetalle;