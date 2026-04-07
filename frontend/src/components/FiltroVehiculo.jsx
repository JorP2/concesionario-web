import React from "react";
import {
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaBroom,
  FaTimes,
} from "react-icons/fa";

function FiltroVehiculo({ filtros, onChange, onReset, marcas, anios }) {
  const [abierto, setAbierto] = React.useState(false);

  const filtrosActivos =
    [filtros.marca, filtros.anio, filtros.precio].filter((v) => v !== "")
      .length + (filtros.busqueda.trim() !== "" ? 1 : 0);

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <FaFilter /> Filtros
            {filtrosActivos > 0 && (
              <span className="badge bg-primary rounded-pill">
                {filtrosActivos}
              </span>
            )}
          </h5>

          <button
            className="btn btn-sm btn-outline-secondary d-md-none"
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {filtrosActivos > 0 && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {filtros.busqueda && (
              <span className="badge bg-light text-dark border">
                "{filtros.busqueda}"
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("busqueda", "")}
                />
              </span>
            )}

            {filtros.marca && (
              <span className="badge bg-light text-dark border">
                {filtros.marca}
                <FaTimes
                  className="ms-1"
                  onClick={() => onChange("marca", "")}
                  style={{ cursor: "pointer" }}
                />
              </span>
            )}

            {filtros.anio && (
              <span className="badge bg-light text-dark border">
                {filtros.anio}
                <FaTimes
                  className="ms-1"
                  onClick={() => onChange("anio", "")}
                  style={{ cursor: "pointer" }}
                />
              </span>
            )}

            {filtros.precio && (
              <span className="badge bg-light text-dark border">
                Hasta €{filtros.precio}
                <FaTimes
                  className="ms-1"
                  onClick={() => onChange("precio", "")}
                  style={{ cursor: "pointer" }}
                />
              </span>
            )}
          </div>
        )}

        <div className={`${abierto ? "d-block" : "d-none"} d-md-block`}>
          <div className="mb-4">
            <label className="form-label fw-semibold">Buscar</label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaFilter />
              </span>

              <input
                type="text"
                className={`form-control ${
                  filtros.busqueda ? "border-primary shadow-sm" : ""
                }`}
                placeholder="Modelo, versión..."
                value={filtros.busqueda}
                onChange={(e) => onChange("busqueda", e.target.value)}
              />

              {filtros.busqueda && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => onChange("busqueda", "")}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Marca</label>
              <select
                className={`form-select ${
                  filtros.marca ? "border-primary shadow-sm" : ""
                }`}
                value={filtros.marca}
                onChange={(e) => onChange("marca", e.target.value)}
              >
                <option value="">Todas</option>
                {marcas.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Año</label>
              <select
                className={`form-select ${
                  filtros.anio ? "border-primary shadow-sm" : ""
                }`}
                value={filtros.anio}
                onChange={(e) => onChange("anio", e.target.value)}
              >
                <option value="">Todos</option>
                {anios.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Precio máximo</label>

              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                className="form-range"
                value={filtros.precio || 50000}
                onChange={(e) => onChange("precio", e.target.value)}
              />

              <div className="text-muted small">
                Hasta €{filtros.precio || "50.000"}
              </div>
            </div>
          </div>

          {filtrosActivos > 0 && (
            <div className="text-end">
              <button className="btn btn-outline-danger" onClick={onReset}>
                <FaBroom className="me-2" />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FiltroVehiculo;