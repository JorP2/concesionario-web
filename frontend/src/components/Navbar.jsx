import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Icons
import { FaUserCircle } from "react-icons/fa";
// styles
import "../styles/navbar.css";

export const Navbar = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setDropdownOpen(false);
    navigate("/");
  };

  // Bloque de usuario reutilizable — cambia según si hay sesión o no
  const UserDesktop = () => (
    <div
      className="ms-3 user-dropdown-wrapper d-none d-lg-block"
      style={{ position: "relative" }}
    >
      <button
        className="btn btn-link p-1 border-0"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUserCircle size={28} color="white" />
      </button>

      {dropdownOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            right: "12px",
            zIndex: 9999,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            minWidth: "200px",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {usuario ? (
            <>
              <div
                style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}
              >
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {usuario.nombre ?? "Usuario"}
                </p>
                <small style={{ color: "#888" }}>{usuario.email ?? ""}</small>
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

  return (
    <>
      {/* Overlay para cerrar dropdown al hacer click fuera */}
      {dropdownOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9998 }}
          onClick={() => setDropdownOpen(false)}
        />
      )}

      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
        style={{ overflow: "visible" }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <NavLink to="/" className="navbar-brand">
            <img
              src="/logoNohalesAutomoviles.png"
              alt="Concesionario-Nohales"
              width="140"
              height="50"
            />
          </NavLink>

          {/* Botón hamburguesa — siempre a la derecha */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NavLinks colapsables */}
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-5 fw-semibold">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>
              </li>
              {usuario && (
                <li className="nav-item">
                  <NavLink to="/administrador" className="nav-link">
                    Administrador
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/vehiculos" className="nav-link">
                  Coches
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/nosotros" className="nav-link">
                  Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacto" className="nav-link">
                  Contacto
                </NavLink>
              </li>
            </ul>

            {/* Sección usuario en móvil — solo visible cuando el collapse está abierto */}
            <div className="d-lg-none border-top border-secondary mt-2 pt-2">
              {usuario ? (
                <>
                  <div className="px-3 py-2">
                    <p className="mb-0 fw-semibold text-white">
                      {usuario.nombre ?? "Usuario"}
                    </p>
                    <small className="text-secondary">
                      {usuario.email ?? ""}
                    </small>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-danger text-decoration-none px-3 py-2 d-block"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <NavLink to="/login" className="nav-link px-3 py-2">
                  Iniciar sesión
                </NavLink>
              )}
            </div>
          </div>

          {/* Desktop: user a la derecha del logo, antes del toggler — solo visible en lg+ */}
          <UserDesktop />
        </div>
      </nav>
    </>
  );
};
