import React from "react";
import CardVehiculoAdmin from "./CardVehiculoAdmin";

function VehiculosLista({ vehiculos, onEliminar }) {
  // Si no hay vehículos o está vacío
  if (!vehiculos || vehiculos.length === 0) {
    return (
      <div className="admin-list-empty">
        <p>No hay vehículos para mostrar.</p>
        <p className="admin-list-empty-sub">
          Agrega tu primer vehículo usando el botón "Añadir vehículo"
        </p>
      </div>
    );
  }

  return (
    <div className="admin-list">
      {vehiculos.map((vehiculo) => (
        <CardVehiculoAdmin
          key={vehiculo.id}
          vehiculo={vehiculo}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default VehiculosLista;