import { FaStar } from "react-icons/fa";
import "../styles/nosotros.css";
import React from "react";

function Nosotros() {
  const reviews = [
    {
      text: "Muy buenos profesionales y trato cercano en todo momento.",
      name: "Javier Garcia",
      role: "Cliente verificado",
      link: "https://share.google/ficPdfbF2QA2WmW7x",
    },
    {
      text: "Paulino es muy buen profesional. Compra clara y sin sorpresas.",
      name: "Antonio Pino",
      role: "Cliente verificado",
      link: "https://share.google/c2Oa8QxjTlui5fyP1",
    },
    {
      text: "Trato cercano, todo muy claro desde el primer momento y coche en perfecto estado.",
      name: "Laura Martin",
      role: "Cliente verificada",
      link: "https://www.google.com/maps",
    },
    {
      text: "Nos ayudaron con la financiacion y resolvieron todas las dudas sin prisas.",
      name: "Carlos Romero",
      role: "Cliente verificado",
      link: "https://www.google.com/maps",
    },
    {
      text: "Concesionario serio, revisaron el vehiculo antes de entregarlo y cumplieron todo.",
      name: "Sergio Diaz",
      role: "Cliente verificado",
      link: "https://www.google.com/maps",
    },
    {
      text: "Muy buena experiencia de compra. Transparencia, rapidez y buena atencion postventa.",
      name: "Marta Lopez",
      role: "Cliente verificada",
      link: "https://www.google.com/maps",
    },
  ];
  const reviewsLoop = [...reviews, ...reviews];

  return (
    <div className="nosotros-page">
      <section
        className="nosotros-hero"
        style={{ backgroundImage: "url(/imagenNosotros.jpeg)" }}
      >
        <div className="nosotros-hero-overlay" />
        <div className="container nosotros-hero-content mb-4">
          <span className="nosotros-kicker">Burguillos de Toledo</span>
          <h1>Compraventa de vehículos en Toledo</h1>
          <p>
            Vehículos revisados y transparencia en el proceso, 
            tanto en nuestro concesionario como en el entorno digital.
          </p>
          <a href="#opiniones" className="btn btn-outline-light btn-lg">
            Ver opiniones
          </a>
        </div>
      </section>

      <section className="nosotros-intro">
        <div className="container">
          <div className="nosotros-intro-grid">
            <div className="nosotros-intro-card dark">
              <span>Nuestra forma de trabajar</span>
              <h3>Concesionario de confianza</h3>
              <p>
                Trabajamos para ofrecer vehículos revisados y una compra clara,
                con atención cercana desde el primer contacto hasta la entrega.
              </p>
            </div>
            <div className="nosotros-intro-card">
              <span>Lo que cuidamos</span>
              <h3>Profesionalidad y transparencia</h3>
              <p>
                Asesoramos durante todo el proceso con comunicación directa,
                sin rodeos y con foco en que el cliente se sienta bien atendido.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-story">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="nosotros-story-media">
                <img src="/imagenHome3.jpeg" alt="Equipo Nohales" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="nosotros-heading text-start">
                <span>Quiénes somos</span>
                <h2>Una forma cercana de vender coches</h2>
              </div>
              <p className="text-muted mb-3">
                Llevamos años en el sector ayudando a encontrar coches para
                distintos presupuestos y necesidades, siempre con revisión
                previa y trato cercano.
              </p>
              <p className="text-muted mb-4">
                Nuestro objetivo es que el cliente sienta claridad
                y que al salir del concesionario tenga la sensación de haber
                tomado una buena decisión.
              </p>
              <div className="nosotros-points">
                <span>Revisión completa antes de venta</span>
                <span>Atención personalizada</span>
                <span>Instalaciones en Toledo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="opiniones" className="nosotros-reviews">
        <div className="container">
          <div className="nosotros-heading text-center">
            <span>Opiniones</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p>
              Cómo lo recuerdan
              quienes ya han comprado con nosotros.
            </p>
          </div>

          <div className="nosotros-reviews-carousel">
            <div className="nosotros-reviews-track nosotros-reviews-track--auto">
              {reviewsLoop.map((review, index) => (
                <div key={`${review.name}-${index}`} className="nosotros-review-slide">
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nosotros-review-link"
                  >
                    <div className="nosotros-review-card">
                      <div className="nosotros-review-user">
                        <div className="nosotros-review-avatar">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <strong>{review.name}</strong>
                          <span>{review.role}</span>
                        </div>
                      </div>
                      <div className="nosotros-review-stars mb-3">
                        {Array(5)
                          .fill()
                          .map((_, starIndex) => (
                            <FaStar key={starIndex} />
                          ))}
                      </div>
                      <p className="mb-4">{review.text}</p>
                      <div className="nosotros-review-footer">
                        <strong>5.0</strong>
                        <span>Ver en Google -&gt;</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-5">
            <a
              className="btn btn-outline-dark btn-lg px-5"
              href="https://www.google.com/search?hl=en-AU&gl=au&q=Nohales+Autom%C3%B3viles,+Calle+R%C3%ADo+Jarama,+65,+Toledo&ludocid=6490944929613204907#lrd=0xd6a0dbd75458da7:0x5a147805e237cdab,1,,,"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mas opiniones
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;
