import React from "react";
// APIs
import {
  cambiarPortada,
  eliminarImagen,
  getImagenesByVehiculoId,
} from "../../api/imagenApi";
import { getVideosByVehiculoId } from "../../api/videoApi";

// Iconos
import { FaPlus, FaTimes } from "react-icons/fa";

function GaleriaMultimedia({ vehiculoId, imagenesNuevas, setImagenesNuevas }) {
  const [imagenesExistentes, setImagenesExistentes] = React.useState([]);
  const [videosExistentes, setVideosExistentes] = React.useState([]);
  const [cargando, setCargando] = React.useState(false);
  const inputImagenRef = React.useRef(null);

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

      setImagenesExistentes(
        imagenesExistentes.filter((img) => img.id !== imagenId),
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

  // Funcion cuando el usuario selecciona archivos
  const handleSeleccionarImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    setImagenesNuevas((prev) => [...prev, ...archivos]);
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
              {imagenesExistentes.map((img) => (
                <div key={img.id} className="col-6 col-md-3 col-lg-2">
                  <div className="ratio ratio-1x1 position-relative rounded overflow-hidden">
                    <img
                      src={img.url}
                      className="w-100 h-100 position-absolute top-0 start-0"
                      style={{ objectFit: "cover" }}
                      alt={`Imagen ${img.marca} ${img.modelo}`}
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
                </h6>
                <div className="row g-2">
                  {imagenesNuevas.map((archivo, i) => (
                    <div key={i} className="col-6 col-md-3 col-lg-2">
                      <div className="ratio ratio-1x1 position-relative rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(archivo)}
                          className="w-100 h-100 position-absolute top-0 start-0"
                          style={{ objectFit: "cover" }}
                          alt={archivo.name}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                          }}
                          onClick={() =>
                            setImagenesNuevas(
                              imagenesNuevas.filter((_, idx) => idx !== i),
                            )
                          }
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
      <div className="mt-5">
        <h5>Videos</h5>
        {vehiculoId ? (
          <div>{/*contenido de videos */}</div>
        ) : (
          <p className="text-muted small">
            Guarda el vehículo primero para poder subir videos
          </p>
        )}
      </div>
    </div>
  );
}

export default GaleriaMultimedia;
