import "../styles/Footer.css";
import { MdEmail, MdPhone, MdLocationOn, MdHome, MdAccessTime } from "react-icons/md";

function Footer() {
  return (
    <footer>
      <div className="footer-logo-div">
        <img src="/logoNohalesAutomoviles.png" alt="Logo Nohales Automoviles" className="footer-logo" />
      </div>

      <div className="footer-div">
        <h3>Horarios:</h3>
        <ul>
          <li><MdAccessTime/> Lunes a viernes: 09:30 - 13:30 | 16:30- 20:00</li>
          <li><MdAccessTime/> Sabados: 10:00 - 14:00</li>
        </ul>
      </div>

      <div className="footer-div">
        <h3>Dirección:</h3>
        <p><MdLocationOn/> 45112 Burguillos de Toledo (Toledo)</p>
        <p><MdHome/> C/ Caño S/N</p>
      </div>

      <div className="footer-div">
        <h3>Contáctanos</h3>
        <p><MdEmail/> nohalesautomoviles@gmail.com</p>
        <p><MdPhone/> +34 651 86 82 30</p>
      </div>
    </footer>
  );
}

export default Footer;