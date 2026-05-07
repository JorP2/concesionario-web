import React from "react";

function FormularioScooter({ valores, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <div className="col-6">
        <label className="form-label">Cilindrada (cc) *</label>
        <input
          className="form-control"
          name="cilindrada"
          type="number"
          min="1"
          placeholder="ej: 125"
          value={valores.cilindrada || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6">
        <label className="form-label">Tipo de motor *</label>
        <select
          className="form-select"
          name="tipoMotor"
          value={valores.tipoMotor || ""}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar...</option>
          <option value="2 tiempos">2 tiempos</option>
          <option value="4 tiempos">4 tiempos</option>
          <option value="Eléctrico">Eléctrico</option>
        </select>
      </div>
      <div className="col-6">
        <label className="form-label">Autonomía (km)</label>
        <input
          className="form-control"
          name="autonomia"
          type="number"
          min="0"
          placeholder="ej: 200"
          value={valores.autonomia || ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-6 d-flex flex-column gap-1 justify-content-end pb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="tieneSidecar"
            id="checkSidecar"
            checked={valores.tieneSidecar ?? false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkSidecar">
            Sidecar
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="tieneBaul"
            id="checkBaul"
            checked={valores.tieneBaul ?? false}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkBaul">
            Baúl
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="tieneMaletinBajoAsiento"
            id="checkMaletin"
            checked={valores.tieneMaletinBajoAsiento ?? true}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkMaletin">
            Maletín bajo asiento
          </label>
        </div>
      </div>
    </>
  );
}

export default FormularioScooter;
