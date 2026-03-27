import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import "../styles/Contacto.css";

function Contacto() {
  return (
    <div className="contacto-page bg-light">
      {/* HERO */}
      <div
        className="hero-section text-white d-flex align-items-center mb-5"
        style={{
          backgroundImage: `url(/imagenContacto.jpeg)`
        }}
      >
        <div className="hero-content container text-center">
          <h1 className="display-4 fw-bold mb-3">
            Contáctanos
          </h1>

          <p className="lead">
            Contáctanos y encuentra tu coche ideal. Si no lo tenemos, te lo buscamos
          </p>

          <div className="mt-4 d-flex gap-3 justify-content-center">
            <a href="#formulario" className="btn btn-primary btn-lg">
              Formulario
            </a>

            <a href="mailto:nohalesautomoviles@gmail.com" className="btn btn-outline-light btn-lg">
              Email
            </a>

            <a
              href="https://wa.me/34651868230"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-lg"
            >
              Whatsapp
            </a>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container pb-5">
        <div className="row g-5">
          {/* FORMULARIO */}
          <div id="formulario" className="col-12 col-lg-6">
            <form className="p-4 bg-white rounded-4 shadow-sm">

              <h3 className="mb-3 text-center">Escríbenos</h3>

              <p className="mb-4 text-center text-muted">
                Si lo prefieres, puedes utilizar este formulario de contacto.
              </p>

              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre" />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                  <input type="email" className="form-control" placeholder="Tu email" />
                </div>

                <div className="col-12 col-md-6">
                  <input type="text" className="form-control" placeholder="Tu teléfono" />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Mensaje"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Enviar
              </button>
            </form>
          </div>

          {/* CONTACTO DIRECTO */}
          <div className="col-12 col-lg-6 text-center">

            <h3 className="mb-3">Contacto directo</h3>

            <p className="mb-4 text-muted">
              Estaremos encantados de atenderte
            </p>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <MdPhone className="me-2 text-primary" size={26} />
              +34 651 86 82 30 | +34 925 39 31 86
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <MdEmail className="me-2 text-primary" size={26} />
              nohalesautomoviles@gmail.com
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <MdLocationOn className="me-2 text-primary" size={26} />
              C/ Caño S/N, 45112 Burguillos de Toledo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;