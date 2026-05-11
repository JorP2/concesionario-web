import React from "react";
import { FaFilter, FaBroom, FaTimes } from "react-icons/fa";

const PEGATINAS = ["0 Emisiones", "ECO", "C", "B"];
const COMBUSTIBLES = [
  "Gasolina",
  "Diesel",
  "Hibrido",
  "Hibrido Enchufable",
  "Electrico",
  "GLP",
];

const TRANSMISIONES = ["Manual", "Automatico"];
const TIPOS = ["TURISMO", "FURGONETA", "MOTOCICLETA"];

function FiltroVehiculo({
  filtros,
  onChange,
  onReset,
  marcas,
  anios,
  colores,
  kmMax,
  precioMax,
}) {
  const filtrosActivos =
    [
      filtros.marca,
      filtros.anio,
      filtros.precio,
      filtros.combustible,
      filtros.transmision,
      filtros.tipo,
      filtros.pegatina,
      filtros.color,
    ].filter((v) => v !== "").length +
    (filtros.busqueda.trim() !== "" ? 1 : 0) +
    (filtros.km && Number(filtros.km) < (kmMax || 200000) ? 1 : 0);

  // Precios
  const precioMaximo = precioMax || 50000;
  const precioActual =
    filtros.precio === "" ? precioMaximo : Number(filtros.precio);

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
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("marca", "")}
                />
              </span>
            )}
            {filtros.anio && (
              <span className="badge bg-light text-dark border">
                {filtros.anio}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("anio", "")}
                />
              </span>
            )}
            {filtros.precio !== "" && (
              <span className="badge bg-light text-dark border">
                Hasta EUR {Number(filtros.precio).toLocaleString("es-ES")}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("precio", "")}
                />
              </span>
            )}
            {filtros.combustible && (
              <span className="badge bg-light text-dark border">
                {filtros.combustible}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("combustible", "")}
                />
              </span>
            )}
            {filtros.transmision && (
              <span className="badge bg-light text-dark border">
                {filtros.transmision}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("transmision", "")}
                />
              </span>
            )}
            {filtros.tipo && (
              <span className="badge bg-light text-dark border">
                {filtros.tipo}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("tipo", "")}
                />
              </span>
            )}
            {filtros.pegatina && (
              <span className="badge bg-light text-dark border">
                DGT {filtros.pegatina}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("pegatina", "")}
                />
              </span>
            )}
            {filtros.color && (
              <span className="badge bg-light text-dark border">
                {filtros.color}
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("color", "")}
                />
              </span>
            )}
            {filtros.km && Number(filtros.km) < (kmMax || 200000) && (
              <span className="badge bg-light text-dark border">
                Hasta {Number(filtros.km).toLocaleString("es-ES")} km
                <FaTimes
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onChange("km", "")}
                />
              </span>
            )}
          </div>
        )}

        <div>
          <div className="mb-3">
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
                placeholder="Modelo, version..."
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

          <div className="mb-3">
            <label className="form-label fw-semibold">Tipo</label>
            <select
              className={`form-select ${
                filtros.tipo ? "border-primary shadow-sm" : ""
              }`}
              value={filtros.tipo}
              onChange={(e) => onChange("tipo", e.target.value)}
            >
              <option value="">Todos</option>
              {TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
            <label className="form-label fw-semibold">Combustible</label>
            <select
              className={`form-select ${
                filtros.combustible ? "border-primary shadow-sm" : ""
              }`}
              value={filtros.combustible}
              onChange={(e) => onChange("combustible", e.target.value)}
            >
              <option value="">Todos</option>
              {COMBUSTIBLES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Transmisión</label>
            <div className="d-flex gap-2">
              {TRANSMISIONES.map((t) => (
                <button
                  key={t}
                  className={`btn btn-sm flex-fill ${
                    filtros.transmision === t
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() =>
                    onChange("transmision", filtros.transmision === t ? "" : t)
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Precio máximo
              <span className="text-muted fw-normal ms-2 small">
                EUR {precioActual.toLocaleString("es-ES")}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max={precioMaximo}
              step="1000"
              className="form-range"
              value={precioActual}
              onChange={(e) => onChange("precio", Number(e.target.value))}
            />
            <div className="d-flex justify-content-between text-muted small">
              <span>EUR 0</span>
              <span>{precioActual.toLocaleString("es-ES")} EUR</span>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Kilometros máximos
              <span className="text-muted fw-normal ms-2 small">
                {Number(filtros.km || kmMax || 400000).toLocaleString("es-ES")}{" "}
                km
              </span>
            </label>
            <input
              type="range"
              min="0"
              max={kmMax || 400000}
              step="5000"
              className="form-range"
              value={filtros.km || kmMax || 400000}
              onChange={(e) => onChange("km", e.target.value)}
            />
            <div className="d-flex justify-content-between text-muted small">
              <span>0 km</span>
              <span>{Number(kmMax || 400000).toLocaleString("es-ES")} km</span>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Pegatina DGT</label>
            <div className="d-flex gap-2 flex-wrap">
              {PEGATINAS.map((p) => (
                <button
                  key={p}
                  className={`btn btn-sm ${
                    filtros.pegatina === p
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() =>
                    onChange("pegatina", filtros.pegatina === p ? "" : p)
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Color exterior</label>
            <select
              className={`form-select ${
                filtros.color ? "border-primary shadow-sm" : ""
              }`}
              value={filtros.color}
              onChange={(e) => onChange("color", e.target.value)}
            >
              <option value="">Todos</option>
              {colores.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {filtrosActivos > 0 && (
            <button className="btn btn-outline-danger w-100" onClick={onReset}>
              <FaBroom className="me-2" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FiltroVehiculo;
