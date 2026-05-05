import React from "react";

function FormularioScooter({ valores, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <div className="col-6"><input className="form-control" name="cilindrada" placeholder="Cilindrada (cc)" type="number" value={valores.cilindrada || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="tipoMotor" placeholder="Tipo motor (2T/4T/Eléctrico)" value={valores.tipoMotor || ""} onChange={handleChange} required /></div>
      <div className="col-6"><input className="form-control" name="autonomia" placeholder="Autonomía (km)" type="number" value={valores.autonomia || ""} onChange={handleChange} /></div>
      <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="tieneSidecar" id="checkSidecar" checked={valores.tieneSidecar || false} onChange={handleChange} />
          <label className="form-check-label" htmlFor="checkSidecar">Sidecar</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="tieneBaul" id="checkBaul" checked={valores.tieneBaul || false} onChange={handleChange} />
          <label className="form-check-label" htmlFor="checkBaul">Baúl</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="tieneMaletinBajoAsiento" id="checkMaletin" checked={valores.tieneMaletinBajoAsiento || false} onChange={handleChange} />
          <label className="form-check-label" htmlFor="checkMaletin">Maletín bajo asiento</label>
        </div>
      </div>
    </>
  );
}

export default FormularioScooter;