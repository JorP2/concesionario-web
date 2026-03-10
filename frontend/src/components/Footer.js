import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nohales Automóviles</h3>
          <p>Tu concesionario de confianza</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📞 651 86 82 30</p>
          <p>✉️ nohalesautomoviles@gmail.com</p>
        </div>
        <div className="footer-section">
          <h3>Horario</h3>
          <p>L-V: 9:30 - 13:30 | 16:30 - 20:00</p>
          <p>Sábados: 10:00 - 14:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Nohales Automóviles</p>
      </div>
    </footer>
  );
}

export default Footer;