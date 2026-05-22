import { FaStar } from "react-icons/fa";
import "../styles/Nosotros.css";
import React from "react";

function Nosotros() {
  const reviews = [
    {
      text: "Muy buenos profesionales, tanto a la hora de venderme el coche, como en el taller preparándolo y dejándolo perfecto...",
      name: "Javier Garcia",
      role: "Cliente verificado",
      link: "https://maps.app.goo.gl/3Kyp9Ru73GZ3fAMf6",
    },
    {
      text: "Han pasado ya dos meses desde la adquisición de mi vehículo en Nohales y estoy muy satisfecho con mi compra...",
      name: "Tomás Sierra Notario",
      role: "Cliente verificado",
      link: "https://maps.app.goo.gl/JLSiA7rWunSC8Nw56",
    },
    {
      text: "Hoy me han entregado un precioso Honda civic y el  trato de Paulino, Javier y el resto de integrantes del equipo ha  sido espectacular...",
      name: "Saul Fernández Yagüe",
      role: "Cliente verificada",
      link: "https://maps.app.goo.gl/NaMNmKzHdwEqV1nJ8",
    },
    {
      text: "Espectacular el trato, muy recomendable. Son unos grandes profesionales. El personal del taller igualmente muy agradables...",
      name: "Denisse",
      role: "Cliente verificado",
      link: "https://maps.app.goo.gl/by4K2E13KquJqhqi6",
    },
    {
      text: "Muy agradecidos a Nohales Automóviles y Talleres García por el tratamiento recibido, sinceridad y total transparencia...",
      name: "Jose Angel Castellano",
      role: "Cliente verificado",
      link: "https://maps.app.goo.gl/WMMyRjquckjswp4PA",
    },
    {
      text: "Estaba buscando un sitio de confianza y la verdad que estoy muy contento con el trato recibido y con el pedazo de coche que ahora tengo...",
      name: "Di Ginius",
      role: "Cliente verificada",
      link: "https://maps.app.goo.gl/iNisKNdoFHNKC9WW9",
    },
  ];
  const reviewsLoop = [...reviews, ...reviews];

  return (
    <div className="nosotros-page mb-5">
      <section
        className="nosotros-hero"
        style={{ backgroundImage: "url(/imagenNosotros.jpeg)" }}
      >
        <div className="nosotros-hero-overlay" />
        <div className="container nosotros-hero-content mb-4">
          <span className="nosotros-kicker">Burguillos de Toledo</span>
          <h1>Compraventa de vehículos en Toledo</h1>
          <p>
            Vehículos revisados y transparencia en el proceso, tanto en nuestro
            concesionario como en el entorno digital.
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
                Asesoramos durante todo el proceso con comunicación directa, sin
                rodeos y con foco en que el cliente se sienta bien atendido.
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
                Nuestro objetivo es que el cliente sienta claridad y que al
                salir del concesionario tenga la sensación de haber tomado una
                buena decisión.
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
            <p>Cómo lo recuerdan quienes ya han comprado con nosotros.</p>
          </div>

          <div className="nosotros-reviews-carousel">
            <div className="nosotros-reviews-track nosotros-reviews-track--auto">
              {reviewsLoop.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="nosotros-review-slide"
                >
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
                        <strong></strong>
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
