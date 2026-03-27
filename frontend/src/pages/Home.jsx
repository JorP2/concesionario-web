import { MdCheck, MdEuroSymbol, MdLocationOn } from "react-icons/md";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <div className="hero-section text-white d-flex align-items-center "
        style={{
          backgroundImage: `url(/imagenHome.jpeg)`
        }}
      >
        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold mb-3">
            Nohales Automóviles
          </h1>
          <p className="lead">
            Vehículos de confianza · Más de 25 años de experiencia
          </p>

          <div className="mt-4 d-flex gap-3 justify-content-center mb-4">
            <a href="/vehiculos" className="btn btn-primary btn-lg">
              Ver coches
            </a>
            <a href="/contacto" className="btn btn-outline-light btn-lg">
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container my-5">
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 shadow-sm">
              <div className="card-body">
                <MdCheck size={45} className="text-primary mb-3" />
                <h5>Máxima garantía</h5>
                <p>
                  12 meses de garantía en todos los vehículos con taller propio.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 shadow-sm">
              <div className="card-body">
                <MdEuroSymbol size={45} className="text-primary mb-3" />
                <h5>Financiación flexible</h5>
                <p>
                  Hasta 96 meses sin entrada. Te ayudamos a conseguir tu coche.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card h-100 text-center border-0 shadow-sm">
              <div className="card-body">
                <MdLocationOn size={45} className="text-primary mb-3" />
                <h5>Ubicación</h5>
                <p>
                  Concesionario en Toledo con más de 40 vehículos disponibles.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* DESTACADO */}
      <div className="container my-5">
        <div className="card border-0 shadow-lg overflow-hidden featured-card">
          <img
            src="https://picsum.photos/1200/400?random=2"
            className="card-img"
            alt="Vehículo destacado"
          />
          <div className="card-img-overlay d-flex align-items-end overlay-dark">
            <div className="text-white">
              <h2 className="fw-bold">Stock renovado semanalmente</h2>
              <p>
                Seleccionamos cada vehículo con revisión completa y garantía.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;