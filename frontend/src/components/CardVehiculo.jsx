function CardVehiculo({ vehiculo }) {
    return (
        <div className="card">
            <h2>{vehiculo.marca} {vehiculo.modelo}</h2>
            <p>Año: {vehiculo.anio}</p>
            <p>Precio: ${vehiculo.precio}</p>
        </div>
    );
}

export default CardVehiculo;