import React from "react";

function FiltroVehiculo({ filtros, onChange, onReset, marcas, anios }) {
  // Controla si el panel está abierto en móvil
  const [abierto, setAbierto] = React.useState(false);

  return (
    <div className="card p-3 mb-2 ms-3 bg-light text-dark">
      {/* Botón solo visible en móvil */}
      <div className="d-flex justify-content-between align-items-center d-md-none mb-2">
        <h5 className="mb-0">Filtros</h5>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setAbierto(!abierto)}
        >
          {abierto ? "Cerrar ▲" : "Abrir ▼"}
        </button>
      </div>

      {/*
        En escritorio: siempre visible (d-none d-md-block)
        En móvil: solo si abierto === true
      */}
      <div className={`${abierto ? "d-block" : "d-none"} d-md-block`}>
        <h3 className="d-none d-md-block">¿Buscas algo en específico?</h3>

        {/* Barra de búsqueda */}
        <div className="input-group mb-3 w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar vehículo..."
            value={filtros.busqueda}
            onChange={(e) => onChange("busqueda", e.target.value)}
          />
        </div>

        <div className="row g-2">
          {/* Select marca — opciones dinámicas según los datos reales */}
          <div className="mb-3 col-md">
            <select
              className="form-select"
              value={filtros.marca}
              onChange={(e) => onChange("marca", e.target.value)}
            >
              <option value="">Todas las marcas</option>
              {marcas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Select año */}
          <div className="mb-3 col-md">
            <select
              className="form-select"
              value={filtros.anio}
              onChange={(e) => onChange("anio", e.target.value)}
            >
              <option value="">Cualquier año</option>
              {anios.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Select precio */}
          <div className="mb-3 col-md">
            <select
              className="form-select"
              value={filtros.precio}
              onChange={(e) => onChange("precio", e.target.value)}
            >
              <option value="">Cualquier precio</option>
              <option value="10000">Hasta €10.000</option>
              <option value="20000">Hasta €20.000</option>
              <option value="30000">Hasta €30.000</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={onReset}>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FiltroVehiculo;
