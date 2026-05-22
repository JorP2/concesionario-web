import React from "react";
import {
  cambiarPortada,
  eliminarImagen,
  getImagenesByVehiculoId,
} from "../../api/imagenApi";
import {
  eliminarVideo,
  getVideosByVehiculoId,
} from "../../api/videoApi";

const MAX_VIDEOS = 2;

function GaleriaMultimedia({
  vehiculoId,
  imagenesNuevas,
  setImagenesNuevas,
  portadaNuevaIdx,
  setPortadaNuevaIdx,
  videosNuevos,
  setVideosNuevos,
}) {
  const [imagenesExistentes, setImagenesExistentes] = React.useState([]);
  const [videosExistentes, setVideosExistentes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState(null);
  const [modalImageId, setModalImageId] = React.useState(null);
  const [modalIsNew, setModalIsNew] = React.useState(false);

  const inputImagenRef = React.useRef(null);
  const inputVideoRef = React.useRef(null);

  // Determinar si estamos en modo edición (hay ID)
  const esEdicion = Boolean(vehiculoId);

  // Cargar multimedia existente
  React.useEffect(() => {
    if (!vehiculoId) return;

    const cargar = async () => {
      setLoading(true);
      try {
        const imgs = await getImagenesByVehiculoId(vehiculoId);
        const vids = await getVideosByVehiculoId(vehiculoId);
        setImagenesExistentes(imgs);
        setVideosExistentes(vids);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [vehiculoId]);

  const abrirModal = (imagen, esNueva = false, idx = null) => {
    setModalImage(imagen);
    setModalIsNew(esNueva);
    if (!esNueva) {
      setModalImageId(imagen.id);
    } else {
      setModalImageId(idx);
    }
    setModalOpen(true);
  };

  const cambiarPortadaDesdeModal = () => {
    if (modalIsNew) {
      setPortadaNuevaIdx(modalImageId);
    } else {
      handleCambiarPortada(modalImageId);
    }
    setModalOpen(false);
  };

  const eliminarImagenNueva = (index) => {
    const nuevas = imagenesNuevas.filter((_, i) => i !== index);
    setImagenesNuevas(nuevas);
    if (portadaNuevaIdx === index) setPortadaNuevaIdx(-1);
    else if (portadaNuevaIdx > index) setPortadaNuevaIdx(portadaNuevaIdx - 1);
  };

  const handleEliminarImagen = async (imagenId) => {
    try {
      await eliminarImagen(vehiculoId, imagenId);
      setImagenesExistentes((prev) => prev.filter((img) => img.id !== imagenId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCambiarPortada = async (imagenId) => {
    try {
      await cambiarPortada(vehiculoId, imagenId);
      setImagenesExistentes((prev) =>
        prev.map((img) => ({ ...img, esPortada: img.id === imagenId }))
      );
      setPortadaNuevaIdx(-1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Click en imagen existente
  const handleClickImagenExistente = (img) => {
    if (!img.esPortada) {
      handleCambiarPortada(img.id);
    }
  };

  // Click en imagen nueva (SOLO en modo CREACIÓN)
  const handleClickImagenNueva = (idx) => {
    if (!esEdicion) {
      setPortadaNuevaIdx(idx);
    }
    // En modo edición, NO hace nada
  };

  const handleSeleccionarImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    setImagenesNuevas((prev) => [...prev, ...archivos]);
    e.target.value = "";
  };

  const eliminarVideoNuevo = (index) => {
    const nuevos = videosNuevos.filter((_, i) => i !== index);
    setVideosNuevos(nuevos);
  };

  const handleEliminarVideo = async (videoId) => {
    try {
      await eliminarVideo(vehiculoId, videoId);
      setVideosExistentes((prev) => prev.filter((v) => v.id !== videoId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSeleccionarVideo = (e) => {
    const archivos = Array.from(e.target.files);
    const disponibles = MAX_VIDEOS - (videosExistentes.length + videosNuevos.length);
    if (archivos.length > disponibles) {
      alert(`Máximo ${MAX_VIDEOS} videos. Espacio disponible: ${disponibles}`);
      e.target.value = "";
      return;
    }
    setVideosNuevos((prev) => [...prev, ...archivos]);
    e.target.value = "";
  };

  if (loading) return <div className="text-center py-4">Cargando...</div>;

  const portadaNueva = (!esEdicion && portadaNuevaIdx >= 0 && portadaNuevaIdx < imagenesNuevas.length)
    ? URL.createObjectURL(imagenesNuevas[portadaNuevaIdx])
    : null;
  const portadaExistente = imagenesExistentes.find((img) => img.esPortada);
  const imagenPortadaActual = portadaNueva || portadaExistente?.url || null;

  return (
    <div>
      {/* IMÁGENES EXISTENTES (solo en edición) */}
      {esEdicion && imagenesExistentes.length > 0 && (
        <div className="mb-4">
          <label className="form-label" style={{ fontSize: "11px", color: "#6c7a91" }}>
            Imágenes guardadas
          </label>
          <div className="image-grid">
            {imagenesExistentes.map((img) => (
              <div
                key={img.id}
                className={`image-card ${img.esPortada && !portadaNueva ? "portada" : ""}`}
                onClick={() => handleClickImagenExistente(img)}
                onDoubleClick={() => abrirModal(img.url, false, img.id)}
              >
                <img src={img.url} alt="" />
                <div
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEliminarImagen(img.id);
                  }}
                >
                  ✕
                </div>
                {img.esPortada && !portadaNueva && <div className="portada-star">★</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IMÁGENES NUEVAS (pendientes) */}
      <div className="mb-4">
        <label className="form-label" style={{ fontSize: "11px", color: esEdicion ? "#f59e0b" : "#6c7a91" }}>
          {imagenesNuevas.length > 0 
            ? (esEdicion ? "Imágenes pendientes (no pueden ser portada hasta guardar)" : "Imágenes pendientes (click para elegir portada)")
            : "Añadir imágenes"}
        </label>
        <div className="image-grid">
          {imagenesNuevas.map((archivo, idx) => (
            <div
              key={idx}
              className={`image-card ${!esEdicion && portadaNuevaIdx === idx ? "portada" : ""}`}
              onClick={() => handleClickImagenNueva(idx)}
              onDoubleClick={() => abrirModal(URL.createObjectURL(archivo), true, idx)}
              style={{ cursor: esEdicion ? "default" : "pointer" }}
            >
              <img src={URL.createObjectURL(archivo)} alt="Preview" />
              <div
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarImagenNueva(idx);
                }}
              >
                ✕
              </div>
              {!esEdicion && portadaNuevaIdx === idx && <div className="portada-star">★</div>}
            </div>
          ))}
          <div className="add-image-btn" onClick={() => inputImagenRef.current.click()}>
            +<span>Añadir</span>
          </div>
        </div>
        <input
          type="file"
          ref={inputImagenRef}
          className="d-none"
          multiple
          accept="image/*"
          onChange={handleSeleccionarImagenes}
        />
      </div>

      {/* VISTA PREVIA PORTADA GRANDE */}
      <div className="portada-preview">
        <label className="form-label" style={{ fontSize: "10px" }}>Vista previa portada</label>
        {imagenPortadaActual ? (
          <img
            src={imagenPortadaActual}
            alt="Portada"
            onClick={() => {
              if (portadaNueva) {
                abrirModal(portadaNueva, true, portadaNuevaIdx);
              } else if (portadaExistente) {
                abrirModal(portadaExistente.url, false, portadaExistente.id);
              }
            }}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <div className="portada-placeholder">
            <span>Sin portada seleccionada</span>
            <small>
              {esEdicion 
                ? "Haz click en una imagen guardada para establecerla como portada"
                : "Haz click en una imagen para establecerla como portada"}
            </small>
          </div>
        )}
        {portadaNueva && (
          <div className="text-muted mt-1" style={{ fontSize: "11px" }}>
            Nueva portada (se aplicará al guardar)
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Preview" className="modal-image" />
            <div className="modal-actions">
              {(!esEdicion || !modalIsNew) && (
                <button className="modal-btn portada" onClick={cambiarPortadaDesdeModal}>
                  Establecer como portada
                </button>
              )}
              <button className="modal-btn close" onClick={() => setModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEOS */}
      <div className="video-section">
        <label className="form-label">Videos (máx {MAX_VIDEOS})</label>
        <div className="video-grid">
          {videosExistentes.map((vid) => (
            <div key={vid.id} className="video-card">
              <video src={vid.url} controls />
              <button className="delete-video-btn" onClick={() => handleEliminarVideo(vid.id)}>
                ✕
              </button>
            </div>
          ))}
          {videosNuevos.map((video, idx) => (
            <div key={`new-${idx}`} className="video-card">
              <video src={URL.createObjectURL(video)} controls />
              <button className="delete-video-btn" onClick={() => eliminarVideoNuevo(idx)}>
                ✕
              </button>
            </div>
          ))}
          {videosExistentes.length + videosNuevos.length < MAX_VIDEOS && (
            <div className="add-video-btn" onClick={() => inputVideoRef.current.click()}>
              +<span>Añadir video</span>
            </div>
          )}
        </div>
        {videosExistentes.length + videosNuevos.length >= MAX_VIDEOS && (
          <div className="video-limit-warning">Límite de {MAX_VIDEOS} videos alcanzado</div>
        )}
        <input
          type="file"
          ref={inputVideoRef}
          className="d-none"
          accept="video/mp4,video/mpeg,video/quicktime"
          onChange={handleSeleccionarVideo}
        />
      </div>
    </div>
  );
}

export default GaleriaMultimedia;