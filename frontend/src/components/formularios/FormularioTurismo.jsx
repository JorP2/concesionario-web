import React from "react";

function FormularioTurismo({ valores, onChange }) {
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
    </>
  );
}

export default FormularioTurismo;