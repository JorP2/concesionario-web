import { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import "../styles/contacto.css";

function Contacto() {
  const [captchaError, setCaptchaError] = useState(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar con el backend
  };

  return (
    <div className="contacto-page bg-light">
      {/* HERO */}
      <div
        className="hero-section text-white d-flex align-items-center mb-5"
        style={{
          backgroundImage: `url(/imagenContacto.jpeg)`,
          minHeight: "50vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold mb-3">Contáctanos</h1>

          <p className="lead">
            Encuentra tu coche ideal. Si no lo tenemos, te lo buscamos.
          </p>

          <div className="mt-4 d-flex gap-3 justify-content-center flex-wrap">
            <a href="#formulario" className="btn btn-primary btn-lg">
              Formulario
            </a>

            <a href="#contactos" className="btn btn-outline-light btn-lg">
              Contactos
            </a>
          </div>
        </div>
      </div>

      <section className="contacto-cards">
        <div className="container">
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
                  <span>Enviar mensaje -&gt;</span>
                </div>
              </a>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <a href="tel:+34925393186" className="contacto-card-link">
                <div className="contacto-card">
                  <MdPhone size={32} className="contacto-icon phone" />
                  <h6>Telefono</h6>
                  <p>+34 925 39 31 86</p>
                  <span>Llamar ahora -&gt;</span>
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
                  <span>Enviar email -&gt;</span>
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
                  <h6>Ubicacion</h6>
                  <p>Burguillos de Toledo</p>
                  <span>Como llegar -&gt;</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div id="formulario" className="mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-12 col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Tu email"
                    />
                  </div>

                  <div className="col-12 col-md-6">
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
                    rows="4"
                    placeholder="Mensaje"
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
        </div>

        {/* CONTACTO */}
        <div id="contactos" className="text-center mb-4 border-top border-2">
          <h2 className="fw-bold mt-4">Contáctanos directamente</h2>
          <p className="text-muted">
            Estaremos encantados de atenderte a través de los siguientes métodos
          </p>
        </div>

        <div className="card border-0 bg-transparent">
          <div className="card-body p-4">
            <div className="row g-3 text-center">
              {/* WhatsApp */}
              <div className="col-12 col-md-6 col-lg-3 transition-card">
                <a
                  href="https://wa.me/34651868230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <div className="border-0 shadow-sm h-100 contacto-card">
                    <div className="card-body">
                      <FaWhatsapp size={35} className="text-success mb-2" />
                      <h6 className="fw-bold mb-1">WhatsApp</h6>
                      <small className="text-muted">+34 651 86 82 30</small>
                    </div>
                  </div>
                </a>
              </div>

              {/* Teléfono */}
              <div className="col-12 col-md-6 col-lg-3 transition-card">
                <a
                  href="tel:+34925393186"
                  className="text-decoration-none text-dark"
                >
                  <div className="border-0 shadow-sm h-100 contacto-card">
                    <div className="card-body">
                      <MdPhone size={35} className="text-primary mb-2" />
                      <h6 className="fw-bold mb-1">Teléfono</h6>
                      <small className="text-muted">+34 925 39 31 86</small>
                    </div>
                  </div>
                </a>
              </div>

              {/* Email */}
              <div className="col-12 col-md-6 col-lg-3 transition-card">
                <a
                  href="mailto:nohalesautomoviles@gmail.com"
                  className="text-decoration-none text-dark"
                >
                  <div className="border-0 shadow-sm h-100 contacto-card">
                    <div className="card-body">
                      <MdEmail size={35} className="text-primary mb-2" />
                      <h6 className="fw-bold mb-1">Email</h6>
                      <small className="text-muted">
                        nohalesautomoviles@gmail.com
                      </small>
                    </div>
                  </div>
                </a>
              </div>

              {/* Ubicación */}
              <div className="col-12 col-md-6 col-lg-3 transition-card">
                <a
                  href="https://www.google.com/maps/place/Nohales+Autom%C3%B3viles/@39.7965174,-3.9981655,17z/data=!3m1!4b1!4m6!3m5!1s0xd6a0dbd75458da7:0x5a147805e237cdab!8m2!3d39.7965174!4d-3.9955906!16s%2Fg%2F11fvmg0y34?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <div className="border-0 shadow-sm h-100 contacto-card">
                    <div className="card-body">
                      <MdLocationOn size={35} className="text-danger mb-2" />
                      <h6 className="fw-bold mb-1">Ubicación</h6>
                      <small className="text-muted">Burguillos de Toledo</small>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="text-center mt-5 pt-3 border-top border-2">
          <p className="text-muted mb-3">Visita nuestras redes sociales:</p>

          <div className="d-flex justify-content-center gap-4">
            <a
              href="https://www.facebook.com/nohalesauto#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary fs-4"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/nohalesautomoviles/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-danger fs-4"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Contacto;
