//API
const API_URL = "http://localhost:8080/api/usuario";

//GET
//Backend: listarTodos()
export const getUsuarios = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    throw error;
  }
};

//Backend: obtenerPorId()
export const getUsuarioById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener el usuario");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getUsuarioById:", error);
    throw error;
  }
};

//POST
//Backend: crear()
export const addUsuario = async (usuario) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) {
      throw new Error("Error al agregar el usuario");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en addUsuario:", error);
    throw error;
  }
};

//PUT
//Backend: actualizar()
export const updateUsuario = async (id, usuario) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateUsuario:", error);
    throw error;
  }
};

//DELETE
//Backend: eliminar()
export const deleteUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    if(!response.ok){
      throw new Error("Error al borrar el usuario")
    }
  } catch (error) {
    console.error("Error en deleteUsuario: ", error)
    throw error
  }
}