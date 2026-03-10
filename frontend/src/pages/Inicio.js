import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
  return (
    <div className="inicio">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Nohales Automóviles</h1>
        <p className="slogan">Más de 30 años de experiencia a tu servicio</p>
        <p className="garantia">✅ Todos nuestros coches con 12 meses de garantía</p>
        <Link to="/coches" className="btn-ver-catalogo">Ver Catálogo</Link>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="caracteristicas">
        <div className="caracteristica">
          <span className="icono">✅</span>
          <h3>Garantía 12 meses</h3>
          <p>Todos nuestros vehículos incluyen garantía</p>
        </div>
        <div className="caracteristica">
          <span className="icono">🚗</span>
          <h3>Amplia selección</h3>
          <p>Gran variedad de marcas y modelos</p>
        </div>
        <div className="caracteristica">
          <span className="icono">💰</span>
          <h3>Financiación</h3>
          <p>Te ayudamos con la financiación</p>
        </div>
      </section>

      {/* FILTROS RÁPIDOS */}
      <section className="filtros-rapidos">
        <h2>¿Qué estás buscando?</h2>
        <div className="botones-filtro">
          <Link to="/coches?filtro=en_venta" className="btn-filtro">En Venta</Link>
          <Link to="/coches?filtro=proximo" className="btn-filtro">Próximamente</Link>
          <Link to="/coches?filtro=vendido" className="btn-filtro">Vendidos</Link>
        </div>
      </section>

      {/* CONTACTO RÁPIDO */}
      <section className="contacto-rapido">
        <h2>¿Hablamos?</h2>
        <div className="info-contacto">
          <p>📞 651 86 82 30</p>
          <p>✉️ nohalesautomoviles@gmail.com</p>
          <p>📍 L-V: 9:30-13:30 | 16:30-20:00</p>
          <p>📍 Sábados: 10:00-14:00</p>
        </div>
      </section>
    </div>
  );
}

export default Inicio;