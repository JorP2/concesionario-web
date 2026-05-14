import React from "react";
// APIs
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

// Iconos
import { FaPlus, FaTimes } from "react-icons/fa";

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
    if (!vehiculoId) return; // Si no hay ID, no hacemos nada

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

  // Funcion para eliminar una imagen (tanto de la API como del estado local)
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

  // Funcion para cambiar la portada
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

  // Función ordenar imágenes mover a la izquierda
  const handleMoverIzquierda = async (index) => {
    if (index === 0) return;

    // Crea la copia del array e intercambia la imagen con la anterior
    const nuevasImagenes = [...imagenesExistentes];
    [nuevasImagenes[index - 1], nuevasImagenes[index]] = [
      nuevasImagenes[index],
      nuevasImagenes[index - 1],
    ];

    // Actualiza el estado local
    setImagenesExistentes(nuevasImagenes);

    // Manda al backend solo los IDs en el uevo orden
    const idsOrdenados = nuevasImagenes.map((img) => img.id);
    try {
      await reordenarImagenes(vehiculoId, idsOrdenados);
    } catch (error) {
      console.error("Error al reordenar las imágenes:", error);
      // Si falla revertimos
      setImagenesExistentes(imagenesExistentes);
    }
  };

  // Funcion cuando el usuario selecciona archivos
  const handleSeleccionarImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    setImagenesNuevas((prev) => [...prev, ...archivos]);
  };

  // Funciones VIDEOS
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
    // Resetea el input para permitir subir el mismo archivo otra vez
    e.target.value = "";
  };

  return (
    <div>
      {/* Sección imágenes */}
      <div className="mb-4">
        <h5>Imágenes</h5>
        {/* input siempre presente pero oculto */}
        <input
          type="file"
          ref={inputImagenRef}
          className="d-none"
          multiple
          accept="image/*"
          onChange={handleSeleccionarImagenes}
        />

        {/*grid de fotos */}
        {cargando ? (
          // situacion 1 - Cargando...
          <div className="row g-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="col-6 col-md-3 col-lg-2">
                <div className="ratio ratio-1x1 position-relative rounded overflow-hidden">
                  <div className="placeholder-glow w-100 h-100">
                    <span className="placeholder w-100 h-100 rounded"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="row g-2">
              {imagenesExistentes.map((img, index) => (
                <div key={img.id} className="col-6 col-md-3 col-lg-2">
                  <div className="ratio ratio-1x1 position-relative rounded overflow-hidden">
                    <img
                      src={img.url}
                      className="w-100 h-100 position-absolute top-0 start-0"
                      style={{ objectFit: "cover" }}
                      alt={`Imagen ${img.id}`}
                    />

                    {/* Portada */}
                    {img.esPortada && (
                      <span
                        className="position-absolute top-0 start-0 m-1 badge"
                        style={{ background: "rgba(0,0,0,0.5)", zIndex: 2 }}
                      >
                        Portada
                      </span>
                    )}

                    {/* Overlay con botones */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-1 gap-1"
                      style={{ background: "rgba(0,0,0,0.45)", opacity: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary w-100"
                          onClick={() => handleMoverIzquierda(index)}
                        >
                          ← Mover
                        </button>
                      )}
                      {!img.esPortada && (
                        <button
                          type="button"
                          className="btn btn-sm btn-light w-100"
                          onClick={() => handlePortada(vehiculoId, img.id)}
                        >
                          Portada
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger w-100"
                        onClick={() => handleEliminarImg(vehiculoId, img.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botón agregar*/}
              <div className="col-6 col-md-3 col-lg-2">
                <div
                  className="ratio ratio-1x1 border rounded"
                  style={{ cursor: "pointer", borderStyle: "dashed" }}
                  onClick={() => inputImagenRef.current.click()}
                >
                  <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <FaPlus size={28} className="text-muted" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección imágenes a subir */}
            {imagenesNuevas.length > 0 && (
              <div className="mt-3">
                <h6 className="text-warning">
                  Imágenes a subir ({imagenesNuevas.length})
                  {imagenesExistentes.length === 0 && (
                    <small
                      className="text-muted ms-2"
                      style={{ fontSize: "12px" }}
                    >
                      Haz click para marcar portada
                    </small>
                  )}
                </h6>
                <div className="row g-2">
                  {imagenesNuevas.map((archivo, i) => (
                    <div key={i} className="col-6 col-md-3 col-lg-2">
                      <div
                        className="ratio ratio-1x1 position-relative rounded overflow-hidden"
                        style={{
                          cursor:
                            imagenesExistentes.length === 0
                              ? "pointer"
                              : "default",
                          border:
                            imagenesExistentes.length === 0 &&
                            portadaNuevaIdx === i
                              ? "3px solid #ffc107"
                              : "3px solid transparent",
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
                                background: "rgba(13,110,253,0.75)",
                                color: "white",
                                fontSize: "11px",
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
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
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
                          <FaTimes size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sección videos */}
      {vehiculoId ? (
        <div className="mt-4">
          <h5>Videos</h5>
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
              <div key={vid.id} className="col-12 col-md-6 col-lg-4">
                <div className="position-relative rounded overflow-hidden">
                  <video
                    src={vid.url}
                    className="w-100 rounded"
                    style={{ maxHeight: "180px", objectFit: "cover" }}
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

            {/* Botón agregar */}
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="border rounded d-flex align-items-center justify-content-center"
                style={{
                  height: "180px",
                  cursor: "pointer",
                  borderStyle: "dashed",
                }}
                onClick={() => inputVideoRef.current.click()}
              >
                <FaPlus size={28} className="text-muted" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted small">
          Guarda el vehículo primero para poder subir videos
        </p>
      )}
    </div>
  );
}

export default GaleriaMultimedia;
