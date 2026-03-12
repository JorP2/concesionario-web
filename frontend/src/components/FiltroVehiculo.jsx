import React from "react";

function FiltroVehiculo() {
  return (
    <>
      <form className="mb-4 ms-2 w-50">
        {/*  Barra de búsqueda */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar vehículo..."
            aria-label="Buscar vehiculo"
          />

          <button className="btn btn-success" type="submit">
            Buscar
          </button>
        </div>

        {/* Select marca */}
        <div className="mb-3">
          <select className="form-select">
            <option value="">Todas las marcas</option>
            <option>Toyota</option>
            <option>BMW</option>
            <option>Audi</option>
          </select>
        </div>

        {/* Select año */}
        <div className="mb-3">
          <select className="form-select">
            <option value="">Cualquier año</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>

        {/* Select precio */}
        <div className="mb-3">
          <select className="form-select">
            <option value="">Cualquier precio</option>
            <option>Hasta €10.000</option>
            <option>Hasta €20.000</option>
            <option>Hasta €30.000</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default FiltroVehiculo;
