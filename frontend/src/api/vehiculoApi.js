//API
const API_URL = process.env.REACT_APP_API_URL + "/vehiculos";
const API_URL_PUBLIC = process.env.REACT_APP_API_URL + "/vehiculos/public";

//GET
// PUBLIC : Listar en Venta
export const getVehiculosEnVenta = async () => {
  try {
    const response = await fetch(`${API_URL_PUBLIC}/en-venta`);
    if (!response.ok) {
      throw new Error("Error al obtener los vehículos en venta");
    }
    return await response.json();
    
  } catch (error) {
    console.error("Error en getVehiculosEnVenta:", error);
    throw error;
  }
};

// PUBLIC : Listar Proximos
export const getVehiculosProximos = async () => {
  try {
    const response = await fetch(`${API_URL_PUBLIC}/proximos`);
    if (!response.ok) {
      throw new Error("Error al obtener los vehículos próximos");
    }
    return await response.json();

  } catch (error) {
    console.error("Error en getVehiculosProximos:", error);
    throw error;
  }
};

// PUBLIC : Listar Vendidos
export const getVehiculosVendidos = async () => {
  try {
    const response = await fetch(`${API_URL_PUBLIC}/vendidos`);
    if (!response.ok) {
      throw new Error("Error al obtener los vehículos vendidos");
    }
    return await response.json();

  } catch (error) {
    console.error("Error en getVehiculosVendidos:", error);
    throw error;
  }
};

// PUBLIC: Listar Buscar
export const serchVehiculos = async (marca, precioMin, precioMax) => {
  const params = new URLSearchParams();
  if (marca) params.append("marca", marca);
  if (precioMin) params.append("precioMin", precioMin);
  if (precioMax) params.append("precioMax", precioMax);

  try {
    const response = await fetch(`${API_URL_PUBLIC}/buscar?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Error al buscar vehículos");
    }
    return await response.json();
    
  } catch (error) {
    console.error("Error en serchVehiculos:", error);
    throw error;
  }
};

// PUBLIC: obtenerPorId()
export const getVehiculoByIdPublic = async (id) => {
  try {
    const response = await fetch(`${API_URL_PUBLIC}/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener el vehículo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getVehiculoById:", error);
    throw error;
  }
};

// ADMIN: listarTodos()
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

// ADMIN: obtenerPorId()
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
//ADMIN: crear()
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
//ADMIN: actualizar()
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
//ADMIN: eliminar()
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

//ADMIN: eliminarOferta()
export const deleteOferta = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/oferta`, {
      method: "DELETE"
    })
    if(!response.ok){
      throw new Error("Error al borrar el vehículo")
    }
  } catch (error) {
    console.error("Error en deleteOferta: ", error)
    throw error
  }
}

// PATCH
//ADMIN: actualizarEstado()
export const updateEstadoVehiculo = async (id, estado) => {
  try {
    const response = await fetch(`${API_URL}/${id}/estado?estado=${estado}`, {
      method: "PATCH"
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el estado del vehículo");
    }
    return await response.json();
    
  } catch (error) {
    console.error("Error en updateEstadoVehiculo:", error);
    throw error;
  }
}

// ADMIN: cambiarVisibilidad()
export const cambiarVisibilidad = async (id, visible) => {
  try {
    const response = await fetch(`${API_URL}/${id}/visible?visible=${visible}`, {
      method: "PATCH"
    });
    if (!response.ok) {
      throw new Error("Error al cambiar la visibilidad del vehículo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en cambiarVisibilidad:", error);
    throw error;
  }
};

// ADMIN: aplicarOferta()
export const aplicarOferta = async (id, descuento) => {
  try {
    const response = await fetch(`${API_URL}/${id}/oferta?descuento=${descuento}`, {
      method: "PATCH"
    });

    if (!response.ok) {
      throw new Error("Error al aplicar la oferta al vehículo");
    }

    return await response.json();
    
  } catch (error) {
    console.error("Error en aplicarOferta:", error);
    throw error;
  }
};