import React from "react";
// Componente
import CardVehiculoAdmin from "./CardVehiculoAdmin";

function VehiculosLista({ vehiculos }) {
  if (!vehiculos.length) {
    return <p>No hay vehículos para mostrar.</p>;
  }

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {vehiculos.map((vehiculo) => (
          <CardVehiculoAdmin key={vehiculo.id} vehiculo={vehiculo} />
        ))}
      </div>
    </>
  );
}

export default VehiculosLista;
