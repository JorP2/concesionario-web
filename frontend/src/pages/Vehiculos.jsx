import React from "react";
import { getVehiculos } from "../api/vehiculoApi";
import CardVehiculo from "../components/CardVehiculo";

function Vehiculos() {

    // Estado para guardar los vehículos
    const [vehiculos, setVehiculos] = React.useState([]);

    // Estado para loading (cargando)
    const [loading, setLoading] = React.useState(true);

    // Función para cargar vehículos desde la API
    const loadVehiculos = async () => {
        try {
            const data = await getVehiculos();
            setVehiculos(data);
        } catch (error) {
            console.error("Error al cargar los vehículos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Se ejecuta al cargar la página
    React.useEffect(() => {
        loadVehiculos();
    }, []);

    return (
        <div>

            {loading ? (
                <p>Cargando vehículos...</p>
            ) : (
                vehiculos.map((vehiculo) => (
                    <CardVehiculo key={vehiculo.id} vehiculo={vehiculo} />
                ))
            )}

        </div>
    );
}

export default Vehiculos;