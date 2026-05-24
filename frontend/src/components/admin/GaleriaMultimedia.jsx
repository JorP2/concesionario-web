import React from "react";
import {
  cambiarPortada,
  eliminarImagen,
  getImagenesByVehiculoId,
  reordenarImagenes,
} from "../../api/imagenApi";
import {
  addVideo,
  eliminarVideo,
  getVideosByVehiculoId,
} from "../../api/videoApi";
import { FaPlus, FaTimes, FaArrowLeft, FaStar, FaVideo } from "react-icons/fa";

const sectionTitleStyle = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--bs-secondary-color, #6c757d)",
  marginBottom: "12px",
  paddingBottom: "8px",
  borderBottom: "1px solid var(--bs-border-color, #dee2e6)",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

function GaleriaMultimedia({
  vehiculoId,
  imagenesNuevas,
  setImagenesNuevas,
  portadaNuevaIdx,
  setPortadaNuevaIdx,
}) {
  const [imagenesExistentes, setImagenesExistentes] = React.useState([]);
  const [videosExistentes, setVideosExistentes] = React.useState([]);
  const [cargando, setCargando] = React.useState(false);
  const inputImagenRef = React.useRef(null);
  const inputVideoRef = React.useRef(null);

  React.useEffect(() => {
    if (!vehiculoId) return;
    const cargarMultimedia = async () => {
      setCargando(true);
      try {
        const imgs = await getImagenesByVehiculoId(vehiculoId);
        const vids = await getVideosByVehiculoId(vehiculoId);
        setImagenesExistentes(imgs);
        setVideosExistentes(vids);
      } catch (error) {
        console.error("Error al cargar multimedia:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarMultimedia();
  }, [vehiculoId]);

  const handleEliminarImg = async (vehiculoId, imagenId) => {
    try {
      if (!imagenId) return;
      await eliminarImagen(vehiculoId, imagenId);
      setImagenesExistentes((prev) =>
        prev.filter((img) => img.id !== imagenId),
      );
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const handlePortada = async (vehiculoId, imagenId) => {
    try {
      await cambiarPortada(vehiculoId, imagenId);
      setImagenesExistentes((prev) =>
        prev.map((img) =>
          img.id === imagenId
            ? { ...img, esPortada: true }
            : { ...img, esPortada: false },
        ),
      );
    } catch (error) {
      console.error("Error al cambiar la portada:", error);
    }
  };

  const handleMoverIzquierda = async (index) => {
    if (index === 0) return;
    const nuevasImagenes = [...imagenesExistentes];
    [nuevasImagenes[index - 1], nuevasImagenes[index]] = [
      nuevasImagenes[index],
      nuevasImagenes[index - 1],
    ];
    setImagenesExistentes(nuevasImagenes);
    const idsOrdenados = nuevasImagenes.map((img) => img.id);
    try {
      await reordenarImagenes(vehiculoId, idsOrdenados);
    } catch (error) {
      console.error("Error al reordenar las imágenes:", error);
      setImagenesExistentes(imagenesExistentes);
    }
  };

  const handleSeleccionarImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    setImagenesNuevas((prev) => [...prev, ...archivos]);
  };

  const handleEliminarVideo = async (vehiculoId, videoId) => {
    try {
      await eliminarVideo(vehiculoId, videoId);
      setVideosExistentes((prev) => prev.filter((v) => v.id !== videoId));
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    }
  };

  const handleSeleccionarVideo = async (e) => {
    const archivos = Array.from(e.target.files);
    for (const archivo of archivos) {
      try {
        const videoGuardado = await addVideo(vehiculoId, archivo);
        setVideosExistentes((prev) => [...prev, videoGuardado]);
      } catch (error) {
        console.error("Error al subir video:", error);
      }
    }
    e.target.value = "";
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* ── Sección imágenes ── */}
      <div>
        <p style={sectionTitleStyle}>
          Imágenes
          {!cargando && (
            <span
              className="ms-auto"
              style={{
                fontSize: "10px",
                fontWeight: 400,
                color: "var(--bs-secondary-color, #6c757d)",
                textTransform: "none",
                letterSpacing: 0,
              }}
            >
              Primera imagen = portada
            </span>
          )}
        </p>

        <input
          type="file"
          ref={inputImagenRef}
          className="d-none"
          multiple
          accept="image/*"
          onChange={handleSeleccionarImagenes}
        />

        {cargando ? (
          <div className="row g-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col-4">
                <div className="ratio ratio-4x3 rounded overflow-hidden placeholder-glow">
                  <span
                    className="placeholder w-100 h-100 rounded"
                    style={{ background: "var(--bs-border-color)" }}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="row g-2">
              {imagenesExistentes.map((img, index) => (
                <div key={img.id} className="col-4">
                  <div
                    className="ratio ratio-4x3 position-relative rounded overflow-hidden"
                    style={{
                      border: img.esPortada
                        ? "2px solid #0d6efd"
                        : "2px solid transparent",
                    }}
                  >
                    <img
                      src={img.url}
                      className="w-100 h-100 position-absolute top-0 start-0"
                      style={{ objectFit: "cover" }}
                      alt={`Imagen ${img.id}`}
                    />

                    {/* Badge portada */}
                    {img.esPortada && (
                      <span
                        className="position-absolute top-0 start-0 m-1 d-flex align-items-center gap-1"
                        style={{
                          background: "rgba(13,110,253,0.85)",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: "6px",
                          zIndex: 2,
                        }}
                      >
                        <FaStar size={8} /> Portada
                      </span>
                    )}

                    {/* Overlay hover */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-1 gap-1"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        opacity: 0,
                        transition: "opacity 0.15s",
                        zIndex: 3,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary w-100 d-flex align-items-center justify-content-center gap-1"
                          style={{ fontSize: "11px", padding: "3px 0" }}
                          onClick={() => handleMoverIzquierda(index)}
                        >
                          <FaArrowLeft size={9} /> Mover
                        </button>
                      )}
                      {!img.esPortada && (
                        <button
                          type="button"
                          className="btn btn-sm btn-light w-100"
                          style={{ fontSize: "11px", padding: "3px 0" }}
                          onClick={() => handlePortada(vehiculoId, img.id)}
                        >
                          Portada
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger w-100"
                        style={{ fontSize: "11px", padding: "3px 0" }}
                        onClick={() => handleEliminarImg(vehiculoId, img.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botón añadir */}
              <div className="col-4">
                <div
                  style={{
                    position: "relative",
                    paddingTop: "75%",
                    border: "1.5px dashed var(--bs-border-color, #dee2e6)",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}
                  onClick={() => inputImagenRef.current.click()}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#0d6efd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "var(--bs-border-color, #dee2e6)")
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      color: "var(--bs-secondary-color, #6c757d)",
                      fontSize: "11px",
                    }}
                  >
                    <FaPlus size={18} />
                    <span>Añadir</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Imágenes pendientes de subir */}
            {imagenesNuevas.length > 0 && (
              <div className="mt-3">
                <p
                  className="mb-2 d-flex align-items-center gap-2"
                  style={{
                    fontSize: "12px",
                    color: "#856404",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      background: "#fff3cd",
                      border: "1px solid #ffc107",
                      borderRadius: "20px",
                      padding: "1px 8px",
                    }}
                  >
                    {imagenesNuevas.length} pendiente
                    {imagenesNuevas.length > 1 ? "s" : ""}
                  </span>
                  {imagenesExistentes.length === 0 && (
                    <span className="text-muted" style={{ fontWeight: 400 }}>
                      Toca para marcar portada
                    </span>
                  )}
                </p>
                <div className="row g-2">
                  {imagenesNuevas.map((archivo, i) => (
                    <div key={i} className="col-4">
                      <div
                        className="ratio ratio-4x3 position-relative rounded overflow-hidden"
                        style={{
                          cursor:
                            imagenesExistentes.length === 0
                              ? "pointer"
                              : "default",
                          border:
                            imagenesExistentes.length === 0 &&
                            portadaNuevaIdx === i
                              ? "2px solid #0d6efd"
                              : "2px solid transparent",
                        }}
                        onClick={() =>
                          imagenesExistentes.length === 0 &&
                          setPortadaNuevaIdx(i)
                        }
                      >
                        <img
                          src={URL.createObjectURL(archivo)}
                          className="w-100 h-100 position-absolute top-0 start-0"
                          style={{ objectFit: "cover" }}
                          alt={archivo.name}
                        />
                        {imagenesExistentes.length === 0 &&
                          portadaNuevaIdx === i && (
                            <span
                              className="position-absolute bottom-0 start-0 w-100 text-center py-1"
                              style={{
                                background: "rgba(13,110,253,0.8)",
                                color: "white",
                                fontSize: "10px",
                                fontWeight: 600,
                                zIndex: 2,
                              }}
                            >
                              Portada
                            </span>
                          )}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            zIndex: 4,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const nuevas = imagenesNuevas.filter(
                              (_, idx) => idx !== i,
                            );
                            setImagenesNuevas(nuevas);
                            if (portadaNuevaIdx === i) setPortadaNuevaIdx(0);
                            else if (portadaNuevaIdx > i)
                              setPortadaNuevaIdx(portadaNuevaIdx - 1);
                          }}
                        >
                          <FaTimes size={9} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Sección vídeos ── */}
      <div>
        <p style={sectionTitleStyle}>
          <FaVideo size={11} style={{ opacity: 0.6 }} /> Vídeos
        </p>

        {vehiculoId ? (
          <>
            <input
              type="file"
              ref={inputVideoRef}
              className="d-none"
              multiple
              accept="video/*"
              onChange={handleSeleccionarVideo}
            />
            <div className="row g-2">
              {videosExistentes.map((vid) => (
                <div key={vid.id} className="col-12">
                  <div className="position-relative rounded overflow-hidden">
                    <video
                      src={vid.url}
                      className="w-100 rounded"
                      style={{
                        maxHeight: "160px",
                        objectFit: "cover",
                        display: "block",
                      }}
                      controls
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleEliminarVideo(vehiculoId, vid.id)}
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Botón añadir vídeo */}
              <div className="col-12">
                <div
                  className="rounded d-flex flex-column align-items-center justify-content-center gap-2 text-muted"
                  style={{
                    height: "90px",
                    border: "1.5px dashed var(--bs-border-color, #dee2e6)",
                    cursor: "pointer",
                    fontSize: "12px",
                    transition: "border-color 0.15s",
                  }}
                  onClick={() => inputVideoRef.current.click()}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#0d6efd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "var(--bs-border-color, #dee2e6)")
                  }
                >
                  <FaPlus size={16} />
                  <span>Subir vídeo</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Guarda el vehículo primero para poder subir vídeos.
          </p>
        )}
      </div>
    </div>
  );
}

export default GaleriaMultimedia;