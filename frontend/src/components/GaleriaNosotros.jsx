import React, { useMemo, useState } from "react";
import { FaTimes, FaExpandAlt } from "react-icons/fa";
//import galeriaFotos from "../data/galeriaConfig";
import { getTodasLasImagenes } from "../api/galeriaApi";

const categorias = [
  { key: "todas", label: "Todas" },
  { key: "concesionario", label: "Concesionario" },
  { key: "taller", label: "Taller" },
  { key: "entregas", label: "Entregas con clientes" },
];

function GaleriaNosotros() {
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [fotoActiva, setFotoActiva] = useState(null);
  const [galeriaFotos, setGaleriaFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limite, setLimite] = useState(9);

  React.useEffect(() => {
    const cargarGaleria = async () => {
      try {
        const data = await getTodasLasImagenes();

        const fotosTransformadas = [];

        Object.entries(data.porCategoria || {}).forEach(
          ([categoria, imagenes]) => {
            imagenes.forEach((img, index) => {
              fotosTransformadas.push({
                id: img.id,
                src: img.url,
                categoria: categoria.toLowerCase(),
                destacada: index === 0,

                // temporales por ahora
                titulo: categoria.charAt(0) + categoria.slice(1).toLowerCase(),

                descripcion:
                  categoria === "CONCESIONARIO"
                    ? "Instalaciones del concesionario"
                    : categoria === "TALLER"
                      ? "Zona de taller"
                      : "Entrega realizada",
              });
            });
          },
        );

        setGaleriaFotos(fotosTransformadas);
      } catch (error) {
        console.error("Error al cargar galería:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarGaleria();
  }, []);

  React.useEffect(() => {
    setLimite(9);
  }, [categoriaActiva]);

  const fotosFiltradas = useMemo(() => {
    if (categoriaActiva === "todas") {
      return galeriaFotos;
    }

    return galeriaFotos.filter((foto) => foto.categoria === categoriaActiva);
  }, [categoriaActiva, galeriaFotos]);

  const fotosVisibles = fotosFiltradas.slice(0, limite);

  if (loading) {
    return (
      <section className="nosotros-galeria">
        <div className="container py-5 text-center">Cargando galería...</div>
      </section>
    );
  }
  return (
    <section className="nosotros-galeria">
      <div className="container">
        <div className="nosotros-galeria-header">
          <div className="nosotros-heading text-start mb-0">
            <span>Instalaciones y entregas</span>
            <h2>Mira como somos por dentro</h2>
            <p>
              Un espacio para mostrar el concesionario, el taller y algunas
              ventas realizadas con clientes.
            </p>
          </div>

          <div
            className="nosotros-galeria-filtros"
            aria-label="Filtros de galeria"
          >
            {categorias.map((categoria) => (
              <button
                key={categoria.key}
                type="button"
                className={
                  categoriaActiva === categoria.key
                    ? "nosotros-galeria-filtro active"
                    : "nosotros-galeria-filtro"
                }
                onClick={() => setCategoriaActiva(categoria.key)}
              >
                {categoria.label}
              </button>
            ))}
          </div>
        </div>

        <div className="nosotros-galeria-grid">
          {fotosVisibles.map((foto, index) => (
            <button
              key={foto.id}
              type="button"
              className={
                foto.destacada && categoriaActiva === "todas" && index === 0
                  ? "nosotros-galeria-item nosotros-galeria-item--featured"
                  : "nosotros-galeria-item"
              }
              onClick={() => setFotoActiva(foto)}
            >
              <img src={foto.src} alt={foto.titulo} loading="lazy" />
              <span className="nosotros-galeria-badge">
                {
                  categorias.find(
                    (categoria) => categoria.key === foto.categoria,
                  )?.label
                }
              </span>
              <span className="nosotros-galeria-zoom" aria-hidden="true">
                <FaExpandAlt />
              </span>
              <span className="nosotros-galeria-copy">
                <strong>{foto.titulo}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>

      {fotoActiva && (
        <div
          className="nosotros-galeria-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={fotoActiva.titulo}
          onClick={() => setFotoActiva(null)}
        >
          <div
            className="nosotros-galeria-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="nosotros-galeria-close"
              aria-label="Cerrar imagen"
              onClick={() => setFotoActiva(null)}
            >
              <FaTimes />
            </button>
            <img src={fotoActiva.src} alt={fotoActiva.titulo} />
            <div className="nosotros-galeria-lightbox-copy">
              <span>
                {
                  categorias.find(
                    (categoria) => categoria.key === fotoActiva.categoria,
                  )?.label
                }
              </span>
              <h3>{fotoActiva.titulo}</h3>
              <p>{fotoActiva.descripcion}</p>
            </div>
          </div>
        </div>
      )}
      {limite < fotosFiltradas.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-dark px-4"
            onClick={() => setLimite((prev) => prev + 6)}
          >
            Ver más
          </button>
        </div>
      )}
    </section>
  );
}

export default GaleriaNosotros;
