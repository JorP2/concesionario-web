import React from "react";
// NavLink para navegación
import { NavLink } from "react-router-dom";
// Icono
import { FaUserCircle } from "react-icons/fa";

// Barra Superior de Navegación
export const Navbar = () => {
  // Constante del usuario logueado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          {/* Logo / Nombre */}
          <NavLink to="/" className="navbar-brand">
            <img
              src="/logoNohalesAutomoviles.png"
              alt="Concesionario-Nohales"
              width="140"
              height="50"
            ></img>
          </NavLink>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NavLinks */}
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-5 fw-semibold">
              {/* Inicio */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>
              </li>

              {/* Administrador */}
              {usuario && (
                <li className="nav-item">
                  <NavLink to="/administrador" className="nav-link">
                    Administrador
                  </NavLink>
                </li>
              )}

              {/* Coches */}
              <li className="nav-item">
                <NavLink to="/vehiculos" className="nav-link">
                  Vehículos
                </NavLink>
              </li>

              {/* Nosotros */}
              <li className="nav-item">
                <NavLink to="/nosotros" className="nav-link">
                  Nosotros
                </NavLink>
              </li>

              {/* Contacto dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contacto
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <a href="https://wa.me/34651868230" className="dropdown-item">
                      WhatsApp
                    </a>
                  </li>

                  <li>
                    <a href="mailto:nohalesautomoviles@gmail.com" className="dropdown-item">
                      Email
                    </a>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <NavLink to="/contacto" className="dropdown-item">
                      Formulario
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>

            {/* ADMINISTRADOR/LOGIN */}
            <NavLink to="/login" className="nav-link ms-4 me-2">
              <FaUserCircle size={30} color="white" />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
