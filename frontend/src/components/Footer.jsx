import "../styles/Footer.css";
import { MdEmail, MdPhone } from "react-icons/md";

function Footer() {
  return (
    <footer>
      <div>
        <h3>Nohales Automoviles</h3>
        <p>Vehículos de confianza</p>
      </div>

      <div>
        <h3>Horario:</h3>
        <ul>
          <li>Lunes a viernes: 09:30 - 13:30 | 16:30 - 20:00</li>
          <li>Sabados: 10:00 - 14:00</li>
          <li></li>
        </ul>
      </div>

      <div>
        <h3>Contáctanos</h3>
        <p><MdEmail/> nohalesautomoviles@gmail.com</p>
        <p><MdPhone/> +34 651 86 82 30</p>
      </div>
    </footer>
  );
}

export default Footer;