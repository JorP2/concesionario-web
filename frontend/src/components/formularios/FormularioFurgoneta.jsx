import React from "react";

function FormularioFurgoneta({ valores, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <div className="col-6">
        <label className="form-label">Motor *</label>
        <input
          className="form-control"
          name="motor"
          placeholder="ej: 2.0 TDI"
          value={valores.motor || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6">
        <label className="form-label">Cambio *</label>
        <input
          className="form-control"
          name="cambio"
          placeholder="ej: Manual 5 vel."
          value={valores.cambio || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-4">
        <label className="form-label">Puertas *</label>
        <input
          className="form-control"
          name="puertas"
          type="number"
          min="2"
          max="5"
          value={valores.puertas || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-4">
        <label className="form-label">Asientos (cabina) *</label>
        <input
          className="form-control"
          name="asientos"
          type="number"
          min="1"
          max="9"
          value={valores.asientos || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-4">
        <label className="form-label">Pegatina DGT *</label>
        <input
          className="form-control"
          name="pegatina"
          placeholder="ej: C"
          value={valores.pegatina || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6">
        <label className="form-label">Interior *</label>
        <input
          className="form-control"
          name="interior"
          placeholder="ej: Tela gris"
          value={valores.interior || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-3">
        <label className="form-label">Capacidad carga (m³) *</label>
        <input
          className="form-control"
          name="capacidadCarga"
          type="number"
          step="0.1"
          min="0"
          placeholder="ej: 5.5"
          value={valores.capacidadCarga || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-3">
        <label className="form-label">Nº plazas *</label>
        <input
          className="form-control"
          name="numeroAsientos"
          type="number"
          min="2"
          max="3"
          value={valores.numeroAsientos || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="tienePuertaCorredera"
            id="checkPuertaCorredera"
            checked={valores.tienePuertaCorredera ?? true}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkPuertaCorredera">
            Puerta corredera
          </label>
        </div>
      </div>
    </>
  );
}

export default FormularioFurgoneta;
