import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getSesion, borrarSesion } from "../utils/auth";
import { logoutApi } from "../api/authApi";
import "../styles/navbar.css";

export const Navbar = () => {
  const sesion = getSesion();
  const navigate = useNavigate();
  const location = useLocation(); // ← añade esto
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarCollapseRef = useRef(null);

  // Sincroniza el estado con los eventos reales de Bootstrap
  useEffect(() => {
    const collapseEl = document.getElementById("navbarMain");
    if (!collapseEl) return;

    navbarCollapseRef.current = collapseEl;

    const handleShow = () => setMobileMenuOpen(true);
    const handleHidden = () => setMobileMenuOpen(false);

    collapseEl.addEventListener("show.bs.collapse", handleShow);
    collapseEl.addEventListener("hidden.bs.collapse", handleHidden);

    return () => {
      collapseEl.removeEventListener("show.bs.collapse", handleShow);
      collapseEl.removeEventListener("hidden.bs.collapse", handleHidden);
    };
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    const collapseEl = navbarCollapseRef.current;
    if (!collapseEl) return;

    const { Collapse } = require("bootstrap");
    const bsCollapse = Collapse.getInstance(collapseEl);
    if (bsCollapse) bsCollapse.hide();
    // No necesitamos comprobar mobileMenuOpen — si está cerrado, hide() no hace nada
  }, [location.pathname]); // ← se dispara solo cuando cambia la ruta

  const handleLogout = async () => {
    try {
      // Avisa al backend para que invalide el refreshToken en BD
      if (sesion?.refreshToken) {
        await logoutApi(sesion.refreshToken);
      }
    } catch {
      // Si falla el logout del backend, no importa — borramos sesión igualmente
    } finally {
      borrarSesion(); // Borra localStorage
      setDropdownOpen(false);
      navigate("/");
    }
  };

  const UserDesktop = () => (
    <div className="ms-3 user-dropdown-wrapper d-none d-lg-block">
      <button
        className="btn btn-link p-1 border-0 user-avatar-btn"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUserCircle size={28} color="white" />
      </button>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            zIndex: 9999,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            minWidth: "200px",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {sesion ? (
            <>
              <div
                style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}
              >
                {/* Ahora mostramos username y role en vez de nombre y email */}
                <p style={{ margin: 0, fontWeight: 600 }}>{sesion.username}</p>
                <small style={{ color: "#888" }}>{sesion.role}</small>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 16px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  color: "#dc3545",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fff5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "none")
                }
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setDropdownOpen(false)}
              style={{
                display: "block",
                padding: "10px 16px",
                color: "#333",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>
      )}
    </div>
  );

  const closeMenu = () => {
    const collapseEl = navbarCollapseRef.current;
    if (!collapseEl) return;
    const { Collapse } = require("bootstrap");
    const bsCollapse = Collapse.getOrCreateInstance(collapseEl);
    bsCollapse.hide();
  };

  const toggleMenu = () => {
    const collapseEl = navbarCollapseRef.current;
    if (!collapseEl) return;
    const { Collapse } = require("bootstrap");
    const bsCollapse = Collapse.getOrCreateInstance(collapseEl);

    if (mobileMenuOpen) {
      bsCollapse.hide();
      return;
    }

    bsCollapse.show();
  };

  return (
    <>
      {dropdownOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9998 }}
          onClick={() => setDropdownOpen(false)}
        />
      )}

      <div className="topbar bg-primary text-white py-2">
        <div className="container topbar-content">
          <span>Nohales Automoviles</span>
          <span>Talleres Garcia</span>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark shadow modern-navbar"
        style={{ overflow: "visible" }}
      >
        <div className="container-fluid px-lg-4">
          <NavLink to="/" className="navbar-brand brand-wrap">
            <img
              src="/logoNohalesAutomoviles.png"
              alt="Concesionario-Nohales"
              width="210"
              height="76"
              className="brand-logo"
            />
          </NavLink>

          <button
            className={`navbar-toggler ms-auto custom-toggler ${
              mobileMenuOpen ? "is-open" : ""
            }`}
            type="button"
            aria-controls="navbarMain"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="toggler-line"></span>
            <span className="toggler-line"></span>
            <span className="toggler-line"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <div className="navbar-main-panel">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 fw-semibold modern-nav-links">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link modern-nav-link"
                    onClick={closeMenu}
                  >
                    Inicio
                  </NavLink>
                </li>
                {/* Muestra Administrador solo si hay sesión activa */}
                {sesion && (
                  <li className="nav-item">
                    <NavLink
                      to="/administrador"
                      className="nav-link modern-nav-link"
                      onClick={closeMenu}
                    >
                      Administrador
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink
                    to="/vehiculos"
                    className="nav-link modern-nav-link"
                    onClick={closeMenu}
                  >
                    Vehículos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/nosotros"
                    className="nav-link modern-nav-link"
                    onClick={closeMenu}
                  >
                    Nosotros
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contacto"
                    className="nav-link modern-nav-link"
                    onClick={closeMenu}
                  >
                    Contacto
                  </NavLink>
                </li>
              </ul>

              {/* Móvil */}
              <div className="d-lg-none mobile-user-section">
                {sesion ? (
                  <>
                    <div className="mobile-user-info">
                      <FaUserCircle size={20} />
                      <div>
                        <p className="mb-0 fw-semibold">{sesion.username}</p>
                        <small>{sesion.role}</small>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="mobile-logout-btn">
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="mobile-login-btn"
                    onClick={closeMenu}
                  >
                    Iniciar sesión
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          <UserDesktop />
        </div>
      </nav>
    </>
  );
};
