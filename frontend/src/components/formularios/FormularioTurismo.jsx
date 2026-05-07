import React from "react";

function FormularioTurismo({ valores, onChange }) {
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
          placeholder="ej: 1.6 TDI"
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
          placeholder="ej: Manual 6 vel."
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
        <label className="form-label">Asientos *</label>
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
          placeholder="ej: Tela negro"
          value={valores.interior || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6 d-flex align-items-end gap-3 pb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="tieneAireAcondicionado"
            id="checkAire"
            checked={valores.tieneAireAcondicionado ?? true}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkAire">
            Aire acondicionado
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="tieneNavegacion"
            id="checkNav"
            checked={valores.tieneNavegacion ?? false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkNav">
            Navegación
          </label>
        </div>
      </div>
    </>
  );
}

export default FormularioTurismo;
