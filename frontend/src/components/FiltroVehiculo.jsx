import React from "react";

function FiltroVehiculo() {
  return (
    <>
      <div className="card p-3 mb-2 ms-3 bg-light text-dark ">
        <form className="mb-4 ms-2">
          <h3>Buscas Algo en Especifico?</h3>
          {/*  Barra de búsqueda */}
          <div className="input-group mb-3 w-75">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar vehículo..."
              aria-label="Buscar vehiculo"
            />
          </div>
          <div className="row g-2">
            {/* Select marca */}
            <div className="mb-3 col-md">
              <select className="form-select">
                <option value="">Marcas...</option>
                <option>Toyota</option>
                <option>BMW</option>
                <option>Audi</option>
              </select>
            </div>

            {/* Select año */}
            <div className="mb-3 col-md">
              <select className="form-select">
                <option value="">Año...</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>

            {/* Select precio */}
            <div className="mb-3 col-md">
              <select className="form-select">
                <option value="">Precio...</option>
                <option>Hasta €10.000</option>
                <option>Hasta €20.000</option>
                <option>Hasta €30.000</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-success" type="submit">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FiltroVehiculo;
