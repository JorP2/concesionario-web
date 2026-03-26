//API
const API_URL = process.env.REACT_APP_API_URL + "/usuarios"; 


//GET
// Listar Todos()
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

// Listar Activos
export const getUsuariosActivos = async () => {
  try {
    const response = await fetch(`${API_URL}/activos`);
    if (!response.ok) throw new Error("Error al obetener usuarios activos");
    return await response.json();
    
  } catch (error) {
    console.error("Error en getUsuariosActivos:", error);
    throw error;
  }
};


// ObtenerPorId()
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
// crear Usuario
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


// Login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"      },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }
    return await response.json();

  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};


//PUT
//actualizar()
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


// PATCH
// Cambiar Contraseña
export const changePassword = async (id, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/${id}/password?password=${newPassword}`, {
      method: "PATCH"
    });

    if (!response.ok) {
      throw new Error("Error al cambiar la contraseña");
    }
    return await response.json();

  } catch (error) {
    console.error("Error en changePassword:", error);
    throw error;
  }
};

// Activa Usuario
export const activateUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/activar`, {
      method: "PATCH"
    });
    if (!response.ok) {
      throw new Error("Error al activar el usuario");

    }
    return await response.json();

  } catch (error) {
    console.error("Error en activateUser:", error);
    throw error;
  }
};

// Desactivar Usuario
export const deactivateUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/desactivar`, {
      method: "PATCH"
    });
    if (!response.ok) {
      throw new Error("Error al desactivar el usuario");
    }
    return await response.json();

  } catch (error) {
    console.error("Error en deactivateUser:", error);
    throw error;
  }
};

//DELETE
// eliminar()
export const deleteUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    if(!response.ok){
      throw new Error("Error al borrar el usuario")
    }
    return await response;
  } catch (error) {
    console.error("Error en deleteUsuario: ", error)
    throw error
  }
}