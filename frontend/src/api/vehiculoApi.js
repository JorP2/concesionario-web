//API
const API_URL = "http://localhost:8080/api/vehiculos";

//GET
//Backend: listarTodos()
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

//Backend: obtenerPorId()
export const getVehiculoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener el vehículo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getVehiculoById:", error);
    throw error;
  }
};

//POST
//Backend: crear()
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

//PUT
//Backend: actualizar()
export const updateVehiculo = async (id, vehiculo) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vehiculo)
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el vehículo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateVehiculo:", error);
    throw error;
  }
};

//DELETE
//Backend: eliminar()
export const deleteVehiculo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    if(!response.ok){
      throw new Error("Error al borrar el vehículo")
    }
  } catch (error) {
    console.error("Error en deleteVehiculo: ", error)
    throw error
  }
}