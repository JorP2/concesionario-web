// API
const API_URL = "http://localhost:8080/api/vehiculos";

// Función para obtener todos los vehículos (GET)
export const getVehiculos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los vehículos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getVehiculos:", error);
    throw error;
  }
};

// Función para agregar un nuevo vehículo (POST)
export const addVehiculo = async (vehiculo) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vehiculo)
    });
    if (!response.ok) {
      throw new Error("Error al agregar el vehículo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en addVehiculo:", error);
    throw error;
  }
};
