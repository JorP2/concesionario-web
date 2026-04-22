import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdHome,
  MdAccessTime,
} from "react-icons/md";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer
      className="bg-dark text-white py-5 mt-5"
      style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="container">
        <div className="row g-4 text-center text-md-start align-items-start">
          {/* LOGO */}
          <div className="col-12 col-md-3 text-center">
            <img
              src="/logoNohalesAutomoviles.png"
              alt="Logo Nohales Automoviles"
              className="img-fluid mb-3"
              style={{ maxWidth: "170px" }}
            />
            <p className="text-white-50 small">
              Vehículos revisados, garantía y confianza.
            </p>
          </div>

          {/* HORARIOS */}
          <div className="col-12 col-md-3">
            <h5 className="mb-3">Horarios</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">
                <MdAccessTime className="me-2" />
                L-V: 09:30 - 13:30 | 16:30 - 20:00
              </li>
              <li>
                <MdAccessTime className="me-2" />
                Sábados: 10:00 - 14:00
              </li>
            </ul>
          </div>

          {/* DIRECCIÓN */}
          <div className="col-12 col-md-3">
            <h5 className="mb-3">Ubicación</h5>

            <p className="text-white-50 small mb-2">
              <MdLocationOn className="me-2" />
              45112 Burguillos de Toledo
            </p>

            <p className="text-white-50 small">
              <MdHome className="me-2" />
              C/ Caño S/N
            </p>
          </div>

          {/* CONTACTO */}
          <div className="col-12 col-md-3">
            <h5 className="mb-3">Contacto</h5>

            <p className="text-white-50 small mb-2 footer-hover">
              <MdEmail className="me-2" />
              nohalesautomoviles@gmail.com
            </p>

            <p className="text-white-50 small footer-hover">
              <FaWhatsapp className="me-2 mb-2" />
              +34 651 86 82 30
              <br />
              <MdPhone className="me-2" />
              +34 925 39 31 86
            </p>
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div className="d-flex justify-content-center gap-4 mt-4 pt-3 border-top border-secondary text-white-50">
          <a
            href="https://www.facebook.com/nohalesauto#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-5 opacity-75"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/nohalesautomoviles/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-5 opacity-75"
          >
            <FaInstagram />
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center mt-4 pt-3 border-top border-secondary small text-white-50">
          © 2026 Nohales Automóviles. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
