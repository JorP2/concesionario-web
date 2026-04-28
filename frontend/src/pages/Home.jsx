import { MdEuroSymbol, MdLocationOn } from "react-icons/md";
import "../styles/home.css";
import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page bg-light">
      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        className="hero-section text-white d-flex align-items-center"
        style={{ backgroundImage: `url(/imagenHome.jpeg)` }}
      >
        <div className="hero-content container text-center">
          <h1 className="display-3 fw-bold mb-3">Nohales Automóviles</h1>
          <p className="lead mb-4">
            Vehículos de confianza · +25 años de experiencia
          </p>
          <div className="mb-4">
          <span className="badge bg-light text-dark px-3 py-2 shadow-sm">
            ⭐ 4.9 / 5 en Google Reviews
          </span>
        </div>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to={`/vehiculos`} className="btn btn-primary btn-lg px-4">
              Ver vehículos
            </Link>
            <Link
              to={`/contacto`}
              className="btn btn-outline-light btn-lg px-4"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS RÁPIDOS ────────────────────────────────── */}
      <div className="stats-bar bg-primary text-white py-3">
        <div className="container">
          <div className="row text-center g-2">
            <div className="col-6 col-md-3">
              <div className="stat-number">+25</div>
              <div className="stat-label">Años de experiencia</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">+40</div>
              <div className="stat-label">Vehículos en stock</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">96</div>
              <div className="stat-label">Meses financiación</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-number">12</div>
              <div className="stat-label">Meses de garantía</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-2">¿Por qué elegirnos?</h2>
        <p className="text-center text-muted mb-5">
          Llevamos décadas ayudando a nuestros clientes a encontrar su coche
          ideal.
        </p>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <FaShieldAlt size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Máxima garantía</h5>
                <p className="text-muted">
                  12 meses de garantía en todos los vehículos. Taller propio con
                  más de 35 años de experiencia. Revisamos cada coche antes de
                  ponerlo a la venta.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <MdEuroSymbol size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Financiación flexible</h5>
                <p className="text-muted">
                  Hasta 96 meses sin entrada, independientemente de la
                  antigüedad del vehículo. Te ayudamos a conseguir las mejores
                  condiciones para tu bolsillo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 shadow-sm p-3">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <MdLocationOn size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Ubicación</h5>
                <p className="text-muted">
                  Concesionario en Burguillos de Toledo con más de 40 vehículos
                  disponibles de todas las gamas y precios. También presentes en
                  los principales portales online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONÓCENOS ────────────────────────────────────── */}
      <div className="conocenos-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <img
                src="/imagenHome3.jpeg"
                alt="Nohales Automóviles"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  objectFit: "cover",
                  maxHeight: "420px",
                  width: "100%",
                }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <p
                className="text-primary fw-semibold mb-1 text-uppercase"
                style={{ letterSpacing: "1px", fontSize: "13px" }}
              >
                Sobre nosotros
              </p>
              <h2 className="fw-bold mb-3">Conócenos</h2>
              <p className="text-muted mb-3">
                Llevamos más de 25 años en el sector de la compraventa de
                automóviles, ofreciendo a nuestros clientes un servicio
                personalizado y de máxima garantía. Contamos con taller propio
                con más de 35 años de experiencia para que tu vehículo llegue en
                las mejores condiciones.
              </p>
              <p className="text-muted mb-4">
                Seleccionamos cada vehículo con revisión completa antes de
                ponerlo a la venta. Queremos que conduzcas con total
                tranquilidad.
              </p>
              <Link to={`/nosotros`} className="btn btn-outline-primary px-4">
                Saber más
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESTACADO ────────────────────────────────────── */}
      <div className="container my-5">
        <div className="card border-0 shadow-lg mb-4 overflow-hidden rounded-4 featured-card">
          <img
            src="/imagenHome3.jpeg"
            className="card-img"
            alt="Vehículo destacado"
          />
          <div className="card-img-overlay d-flex align-items-end overlay-dark">
            <div className="text-white p-3">
              <h2 className="fw-bold">Stock renovado semanalmente</h2>
              <p className="mb-3">
                Seleccionamos cada vehículo con revisión completa y garantía.
              </p>
              <Link to={`/vehiculos`} className="btn btn-primary px-4">
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <img
                src="/logoNohalesAutomoviles.png"
                className="card-img"
                alt="Contacto"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-img-overlay d-flex align-items-end overlay-dark">
                <div className="text-white">
                  <h5 className="fw-bold mb-1">Múltiples formas de contacto</h5>
                  <p className="mb-0 small">
                    Mail, WhatsApp, teléfono o visítanos.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <img
                src="/imagenHome2.jpeg"
                className="card-img"
                alt="Confianza"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-img-overlay d-flex align-items-end overlay-dark">
                <div className="text-white">
                  <h5 className="fw-bold mb-1">Concesionario de confianza</h5>
                  <p className="mb-0 small">
                    Los mejores vehículos de segunda mano.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <div className="cta-section text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-2">¿Buscas tu próximo coche?</h2>
          <p className="text-muted mb-4">
            Explora nuestro catálogo actualizado o contáctanos sin compromiso.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to={`/vehiculos`} className="btn btn-primary btn-lg px-5">
              Ver vehículos
            </Link>
            <Link
              to={`/contacto`}
              className="btn btn-outline-secondary btn-lg px-5"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
