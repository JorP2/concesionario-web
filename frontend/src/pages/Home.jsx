import { MdLocationOn, MdEuroSymbol } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section
        className="home-hero"
        style={{ backgroundImage: "url(/imagenHome.jpeg)" }}
      >
        <div className="home-hero-overlay" />
        <div className="container home-hero-content mb-4">
          <div className="home-hero-copy">
            <span className="home-hero-kicker">Vehículos de confianza</span>
            <h1>Nohales Automóviles</h1>
            <p>
              Coches seleccionados con criterio, financiación flexible y un
              trato cercano para que elegir sea tan fácil como conducirlo.
            </p>

            <div className="home-hero-actions">
              <Link to="/vehiculos" className="btn btn-primary btn-lg px-4">
                Ver vehículos
              </Link>
              <Link
                to="/contacto"
                className="btn btn-outline-light btn-lg px-4"
              >
                Contactar
              </Link>
            </div>
          </div>

          <div className="home-hero-panel">
            <div className="home-google-rating">
              <span className="home-google-rating-label">Google Reviews</span>
              <div className="home-google-rating-score">
                <FaStar />
                <strong>4.9</strong>
                <span>/5</span>
              </div>
              <p>Valoración media de clientes verificados</p>
            </div>
            <div className="home-hero-stat">
              <strong>+40</strong>
              <span>Vehículos en stock</span>
            </div>
            <div className="home-hero-stat">
              <strong>96</strong>
              <span>Meses de financiación</span>
            </div>
            <div className="home-hero-stat">
              <strong>12</strong>
              <span>Meses de garantía</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-strip">
        <div className="container">
          <div className="home-strip-grid">
            <div>
              <strong>+25 años</strong>
              <span>Ayudando a elegir coche en Toledo</span>
            </div>
            <div>
              <strong>Taller propio</strong>
              <span>Revisión completa antes de cada entrega</span>
            </div>
            <div>
              <strong>Selección continua</strong>
              <span>Stock renovado con frecuencia</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section container mt-5">
        <div className="home-section-heading">
          <span>Ventajas</span>
          <h2>Por qué elegirnos</h2>
          <p>
            Explora las ventajas de elegirnos como tu concesionario de confianza
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 p-4">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <MdEuroSymbol size={32} className="text-primary" />
                </div>

                <h5 className="fw-bold">Garantía y financiación</h5>
                <p className="text-muted">
                  Hasta 12 meses de garantía y 96 meses de financiación sin
                  entrada. Tenemos taller propio con más de 35 años de
                  experiencia.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 p-4">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <FaStar size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Confianza y fiabilidad</h5>
                <p className="text-muted">
                  Más de 4.9 estrellas en Google Reviews avalan la satisfacción
                  de nuestros clientes. Ofrecemos buen trato y total
                  transparencia.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 p-4">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <MdLocationOn size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Ubicacion y trato</h5>
                <p className="text-muted">
                  Concesionario en Burguillos de Toledo con presencia en
                  portales de venta y redes sociales, así como gestionando la
                  entrega en las Islas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-showcase">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <div className="home-showcase-media">
                <img
                  src="/imagenHome3.jpeg"
                  alt="Nohales Automoviles"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="home-section-heading text-start mb-4">
                <span>Sobre nosotros</span>
                <h2>Seleccionamos coches para durar</h2>
              </div>
              <p className="text-muted mb-3">
                Llevamos mas de 25 años en el sector de la compraventa de
                automóviles y contamos con taller propio para revisar cada
                unidad antes de ofrecerla.
              </p>
              <p className="text-muted mb-4">
                No buscamos solo vender un coche. Buscamos que el cliente sienta
                que ha comprado bien, con claridad y sin sobresaltos.
              </p>
              <div className="home-showcase-points">
                <span>Revisión mecánica previa</span>
                <span>Asesoramiento cercano</span>
                <span>Stock variado y rotación constante</span>
              </div>
              <Link
                to="/nosotros"
                className="btn btn-outline-primary px-4 mt-4"
              >
                Saber más
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-featured container">
        <div className="home-banner-card">
          <img src="/imagenHome3.jpeg" alt="Stock renovado" />
          <div className="home-banner-overlay" />
          <div className="home-banner-copy">
            <span>Stock destacado</span>
            <h2>Vehículos seleccionados con criterio</h2>
            <p>
              Renovamos el stock de forma continua para mantener una selección
              atractiva y bien revisada.
            </p>
            <Link to="/vehiculos" className="btn btn-primary px-4">
              Ver catálogo
            </Link>
          </div>
        </div>

        <div className="row g-4 mt-1">
          <div className="col-md-6">
            <div className="home-mini-card">
              <img src="/logoNohalesAutomoviles.png" alt="Contacto" />
              <div className="home-mini-overlay" />
              <div className="home-mini-copy">
                <h5>Métodos de contacto</h5>
                <p>WhatsApp, teléfono, email o visita presencial.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="home-mini-card">
              <img src="/imagenHome2.jpeg" alt="Confianza" />
              <div className="home-mini-overlay" />
              <div className="home-mini-copy">
                <h5>Confianza que se nota</h5>
                <p>Un concesionario pensado para transmitir seguridad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="home-cta-box">
            <div>
              <span>Da el siguiente paso</span>
              <h2>
                Explora nuestro catálogo o cuentanos qué coche estás buascando
              </h2>
            </div>
            <div className="home-cta-actions">
              <Link to="/vehiculos" className="btn btn-primary btn-lg px-5">
                Ver vehículos
              </Link>
              <Link
                to="/contacto"
                className="btn btn-outline-secondary btn-lg px-5"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
