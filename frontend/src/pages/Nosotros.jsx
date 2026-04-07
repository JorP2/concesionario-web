import { FaStar } from "react-icons/fa";
import "../styles/Nosotros.css";

function Nosotros() {
  return (
    <div className="bg-light">
      {/* HERO */}
      <div
        className="hero-section text-white d-flex align-items-center justify-content-center text-center position-relative"
        style={{
          backgroundImage: `url(/imagenNosotros.jpeg)`,
        }}
      >
        <div
          className="hero-content position-relative px-3"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="display-4 fw-bold mb-3">
            Compraventa de vehículos en Toledo
          </h1>

          <p className="lead">
            Vehículos revisados, garantía y confianza en cada compra
          </p>

          <a href="#opiniones" className="btn btn-outline-light btn-lg">
            Ver opiniones
          </a>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container py-5">
        {/* ABOUT */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-lg-6">
            <div className="p-4 h-100 rounded-4 shadow-sm bg-dark text-white">
              <h4 className="mb-3">Concesionario de confianza</h4>
              <p className="mb-0 text-white-50">
                Trabajamos por y para nuestros clientes, ofreciendo vehículos
                totalmente revisados y con garantía. Nuestro concesionario
                físico se encuentra en Burguillos de Toledo (Toledo), donde
                podrás visitar nuestras instalaciones. Contamos con un catálogo
                permanente de más de 40 vehículos.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="p-4 h-100 rounded-4 shadow-sm bg-white">
              <h4 className="mb-3">Profesionalidad y transparencia</h4>
              <p className="mb-0 text-muted">
                Te ofrecemos asesoramiento profesional durante todo el proceso
                de compra, con los más altos estándares de calidad.
              </p>
            </div>
          </div>
        </div>

        {/* REVIEWS TITLE */}
        <div id="opiniones" className="text-center mb-4 border-top border-2">
          <h2 className="fw-bold mt-4">Opiniones de nuestros clientes</h2>
          <p className="text-muted">
            Lo que dicen quienes ya confían en nosotros
          </p>
        </div>

        {/* REVIEWS */}
        <div className="row g-4">
          {[
            {
              text: "Muy buenos profesionales...",
              name: "Javier García",
              link: "https://share.google/ficPdfbF2QA2WmW7x",
            },
            {
              text: "Paulino es muy buen profesional...",
              name: "Antonio Pino",
              link: "https://share.google/c2Oa8QxjTlui5fyP1",
            },
          ].map((review, index) => (
            <div key={index} className="col-12 col-md-6">
              <a
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="p-4 h-100 bg-white rounded-4 shadow-sm transition-card">
                  {/* estrellas */}
                  <div className="text-warning mb-3">
                    {Array(5)
                      .fill()
                      .map((_, starIndex) => (
                        <FaStar key={starIndex} />
                      ))}
                  </div>

                  {/* texto */}
                  <p className="fst-italic mb-4 text-muted">“{review.text}”</p>

                  {/* nombre */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="fw-bold mb-0">{review.name}</p>

                    <span className="text-primary small">Ver en Google →</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-5">
          <a
            className="btn btn-outline-dark btn-lg px-5 shadow-sm"
            href="https://www.google.com/search?hl=en-AU&gl=au&q=Nohales+Autom%C3%B3viles,+Calle+R%C3%ADo+Jarama,+65,+Toledo&ludocid=6490944929613204907#lrd=0xd6a0dbd75458da7:0x5a147805e237cdab,1,,,"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver más opiniones
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
