import { MdEmail, MdPhone, MdLocationOn, MdHome, MdAccessTime } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start align-items-start">

          <div className="col-12 col-md-3 mb-4 mb-md-0 text-center">
            <img 
              src="/logoNohalesAutomoviles.png"
              alt="Logo Nohales Automoviles"
              className="img-fluid"
              style={{ maxWidth: "180px" }}
            />
          </div>

          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5>Horarios</h5>
            <ul className="list-unstyled">
              <li><MdAccessTime className="me-2"/> Lunes a viernes: 09:30 - 13:30 | 16:30 - 20:00</li>
              <li><MdAccessTime className="me-2"/> Sábados: 10:00 - 14:00</li>
            </ul>
          </div>

          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5>Dirección</h5>
            <p><MdLocationOn className="me-2"/> 45112 Burguillos de Toledo (Toledo)</p>
            <p><MdHome className="me-2"/> C/ Caño S/N</p>
          </div>

          <div className="col-12 col-md-3">
            <h5>Contáctanos</h5>
            <p><MdEmail className="me-2"/> nohalesautomoviles@gmail.com</p>
            <p><MdPhone className="me-2"/> +34 651 86 82 30 | +34 925 39 31 86</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;