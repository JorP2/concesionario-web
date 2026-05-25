import React from "react";
import {
  getTodasLasImagenes,
  subirMultiplesImagenes,
  eliminarImagen,
} from "../../api/galeriaApi";

function GestionGaleria() {
  const [imagenes, setImagenes] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [categoria, setCategoria] = React.useState("CONCESIONARIO");

  const cargarImagenes = async () => {
    try {
      const data = await getTodasLasImagenes();
      setImagenes(data.porCategoria || {});
    } catch (error) {
      console.error("Error al cargar galería:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cargarImagenes();
  }, []);

  const handleSubir = async (e) => {
    const archivos = Array.from(e.target.files);

    if (archivos.length === 0) return;

    try {
      await subirMultiplesImagenes(archivos, categoria);
      await cargarImagenes();
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarImagen(id);
      await cargarImagenes();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  if (loading) {
    return <p>Cargando galería...</p>;
  }

  return (
    <div>
      <div className="d-flex gap-2 mb-4">
        <select
          className="form-select w-auto"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="CONCESIONARIO">Concesionario</option>
          <option value="TALLER">Taller</option>
          <option value="ENTREGAS">Entregas</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          className="form-control"
          onChange={handleSubir}
        />
      </div>

      {Object.entries(imagenes).map(([cat, imgs]) => (
        <div key={cat} className="mb-5">
          <h5 className="mb-3">{cat}</h5>

          <div className="row g-3">
            {imgs.map((img) => (
              <div key={img.id} className="col-md-3">
                <div className="card">
                  <img
                    src={img.url}
                    alt=""
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body p-2">
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => handleEliminar(img.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GestionGaleria;
