import React from "react";

function FormularioFurgoneta({ valores, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <div className="col-6"><input className="form-control" name="motor" placeholder="Motor" value={valores.motor || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="cambio" placeholder="Cambio" value={valores.cambio || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="puertas" placeholder="Puertas" type="number" value={valores.puertas || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="asientos" placeholder="Asientos" type="number" value={valores.asientos || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="pegatina" placeholder="Pegatina" value={valores.pegatina || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="interior" placeholder="Interior" value={valores.interior || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="capacidadCarga" placeholder="Capacidad carga (m³)" type="number" step="0.1" value={valores.capacidadCarga || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="numeroAsientos" placeholder="Nº asientos" type="number" value={valores.numeroAsientos || ""} onChange={handleChange} required /></div>
      <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="tienePuertaCorredera" id="checkPuertaCorredera" checked={valores.tienePuertaCorredera || false} onChange={handleChange} />
          <label className="form-check-label" htmlFor="checkPuertaCorredera">Puerta corredera</label>
        </div>
      </div>
    </>
  );
}

export default FormularioFurgoneta;