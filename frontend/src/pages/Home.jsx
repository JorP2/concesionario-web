import { MdEuroSymbol, MdLocationOn } from "react-icons/md";
import "../styles/home.css";
import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section
        className="home-hero"
        style={{ backgroundImage: "url(/imagenHome.jpeg)" }}
      >
        <div className="home-hero-overlay" />
        <div className="container home-hero-content">
          <div className="home-hero-copy">
            <span className="home-hero-kicker">
              Toledo · Vehiculos revisados · Garantia real
            </span>
            <h1>Nohales Automoviles</h1>
            <p>
              Coches seleccionados con criterio, financiacion flexible y un
              trato cercano para que elegir sea tan facil como conducirlo.
            </p>

            <div className="home-hero-actions">
              <Link to="/vehiculos" className="btn btn-primary btn-lg px-4">
                Ver vehiculos
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
            <div className="home-hero-stat">
              <strong>+40</strong>
              <span>vehiculos en stock</span>
            </div>
            <div className="home-hero-stat">
              <strong>96</strong>
              <span>meses de financiacion</span>
            </div>
            <div className="home-hero-stat">
              <strong>12</strong>
              <span>meses de garantia</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-strip">
        <div className="container">
          <div className="home-strip-grid">
            <div>
              <strong>+25 anos</strong>
              <span>ayudando a elegir coche en Toledo</span>
            </div>
            <div>
              <strong>Taller propio</strong>
              <span>revision completa antes de cada entrega</span>
            </div>
            <div>
              <strong>Seleccion continua</strong>
              <span>stock renovado con frecuencia</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section container">
        <div className="home-section-heading">
          <span>Ventajas</span>
          <h2>Por que elegirnos</h2>
          <p>
            Queremos que la compra transmita tranquilidad desde el primer clic
            hasta la entrega.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 p-4">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <FaShieldAlt size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Maxima garantia</h5>
                <p className="text-muted">
                  Todos los coches se revisan antes de ponerse a la venta y se
                  entregan con garantia real y soporte postventa.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 p-4">
              <div className="card-body">
                <div className="feature-icon-wrapper mb-3">
                  <MdEuroSymbol size={32} className="text-primary" />
                </div>
                <h5 className="fw-bold">Financiacion flexible</h5>
                <p className="text-muted">
                  Estudiamos opciones de financiacion de hasta 96 meses para que
                  el proceso de compra no se frene por el presupuesto.
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
                <h5 className="fw-bold">Ubicacion y trato cercano</h5>
                <p className="text-muted">
                  Estamos en Burguillos de Toledo y atendemos cada operacion con
                  un enfoque directo, transparente y personal.
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
                Llevamos mas de 25 anos en el sector de la compraventa de
                automoviles y contamos con taller propio para revisar cada
                unidad antes de ofrecerla.
              </p>
              <p className="text-muted mb-4">
                No buscamos solo vender un coche. Buscamos que el cliente sienta
                que ha comprado bien, con claridad y sin sobresaltos.
              </p>
              <div className="home-showcase-points">
                <span>Revision mecanica previa</span>
                <span>Asesoramiento cercano</span>
                <span>Stock variado y rotacion constante</span>
              </div>
              <Link to="/nosotros" className="btn btn-outline-primary px-4 mt-4">
                Saber mas
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
            <h2>Vehiculos que entran con criterio, no por volumen</h2>
            <p>
              Renovamos el stock de forma continua para mantener una seleccion
              atractiva y bien revisada.
            </p>
            <Link to="/vehiculos" className="btn btn-primary px-4">
              Ver catalogo
            </Link>
          </div>
        </div>

        <div className="row g-4 mt-1">
          <div className="col-md-6">
            <div className="home-mini-card">
              <img src="/logoNohalesAutomoviles.png" alt="Contacto" />
              <div className="home-mini-overlay" />
              <div className="home-mini-copy">
                <h5>Varias formas de contacto</h5>
                <p>WhatsApp, telefono, email o visita presencial.</p>
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
              <h2>Explora el catalogo o cuentanos que coche buscas</h2>
            </div>
            <div className="home-cta-actions">
              <Link to="/vehiculos" className="btn btn-primary btn-lg px-5">
                Ver vehiculos
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
