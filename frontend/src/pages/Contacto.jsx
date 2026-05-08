import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import "../styles/Contacto.css";
import React from "react";

function Contacto() {
  const turnstileSiteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;
  const [captchaToken, setCaptchaToken] = React.useState("");
  const [captchaError, setCaptchaError] = React.useState("");

  React.useEffect(() => {
    window.onTurnstileSuccess = (token) => {
      setCaptchaToken(token);
      setCaptchaError("");
    };

    return () => {
      delete window.onTurnstileSuccess;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (turnstileSiteKey && !captchaToken) {
      setCaptchaError("Completa la verificacion anti-spam antes de enviar.");
      return;
    }

    setCaptchaError("");
  };

  return (
    <div className="contacto-page">
      <section
        className="contacto-hero"
        style={{ backgroundImage: "url(/imagenContacto.jpeg)" }}
      >
        <div className="contacto-hero-overlay" />
        <div className="container contacto-hero-content">
          <span className="contacto-kicker">Habla con nosotros</span>
          <h1>Contáctanos</h1>
          <p>
            Si ya sabes qué coche buscas o quieres que te orientemos, estamos
            listos para ayudarte.
          </p>

          <div className="contacto-hero-actions">
            <a href="#formulario" className="btn btn-primary btn-lg">
              Formulario
            </a>
            <a href="#contacto-cards" className="btn btn-outline-light btn-lg">
              Contactos
            </a>
          </div>
        </div>
      </section>

      <section className="contacto-cards">
        <div className="container" id="contacto-cards">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <a
                href="https://wa.me/34651868230"
                target="_blank"
                rel="noopener noreferrer"
                className="contacto-card-link"
              >
                <div className="contacto-card">
                  <FaWhatsapp size={32} className="contacto-icon whatsapp" />
                  <h6>WhatsApp</h6>
                  <p>+34 651 86 82 30</p>
                  <span className="text-primary">Enviar mensaje -</span>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <a href="tel:+34925393186" className="contacto-card-link">
                <div className="contacto-card">
                  <MdPhone size={32} className="contacto-icon phone" />
                  <h6>Teléfono</h6>
                  <p>+34 925 39 31 86</p>
                  <span className="text-primary">Llamar ahora -</span>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <a
                href="mailto:nohalesautomoviles@gmail.com"
                className="contacto-card-link"
              >
                <div className="contacto-card">
                  <MdEmail size={32} className="contacto-icon email" />
                  <h6>Email</h6>
                  <p>nohalesautomoviles@gmail.com</p>
                  <span className="text-primary">Enviar email -</span>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <a
                href="https://www.google.com/maps/place/Nohales+Autom%C3%B3viles/@39.7965174,-3.9981655,17z/data=!3m1!4b1!4m6!3m5!1s0xd6a0dbd75458da7:0x5a147805e237cdab!8m2!3d39.7965174!4d-3.9955906!16s%2Fg%2F11fvmg0y34?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="contacto-card-link"
              >
                <div className="contacto-card">
                  <MdLocationOn size={32} className="contacto-icon location" />
                  <h6>Ubicación</h6>
                  <p>Burguillos de Toledo</p>
                  <span className="text-primary">Cómo llegar -</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contacto-content container pb-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="contacto-panel" id="formulario">
              <div className="contacto-heading text-start">
                <span className="text-primary">Formulario</span>
                <h2>Envianos un mensaje</h2>
                <p>Te responderemos lo antes posible.</p>
              </div>

              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Tu email"
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                {turnstileSiteKey && (
                  <div className="mb-3">
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-callback="onTurnstileSuccess"
                    />
                    {captchaError && (
                      <small className="text-danger d-block mt-2">
                        {captchaError}
                      </small>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contacto-submit"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="contacto-panel mb-4" id="contactos">
              <div className="contacto-heading text-start">
                <span className="text-primary">Contacto directo</span>
                <h2>Información de contacto</h2>
              </div>

              <div className="contacto-info-list">
                <div className="contacto-info-item">
                  <MdLocationOn className="contacto-info-icon text-primary" />
                  <div>
                    <strong>Dirección</strong>
                    <p>Ctra. CM-4001, km 9, Burguillos de Toledo</p>
                  </div>
                </div>

                <div className="contacto-info-item">
                  <MdPhone className="contacto-info-icon text-primary" />
                  <div>
                    <strong>Horario</strong>
                    <p>
                      Lunes a Viernes: 10:00-14:00 / 17:00-20:00
                      <br />
                      Sabados: 10:00-13:30
                    </p>
                  </div>
                </div>
              </div>

              <div className="contacto-socials">
                <span>Siguenos en redes</span>
                <div className="d-flex gap-3">
                  <a
                    href="https://www.facebook.com/nohalesauto#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto-social facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/nohalesautomoviles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto-social instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>

            <div className="contacto-panel contacto-map-panel">
              <iframe
                title="Mapa Nohales Automoviles"
                src="https://www.google.com/maps?q=Nohales+Autom%C3%B3viles+Burguillos+de+Toledo&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacto;
