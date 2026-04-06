const BASE_URL = process.env.REACT_APP_API_URL + "/vehiculos";
//const BaSE_URL_IMAGENES = process.env.REACT_APP_API_URL + "/imagenes";
// GET 
// obtener imágenes por vehículo
export const getImagenesByVehiculoId = async (vehiculoId) => {
    try {
        const response = await fetch(`${BASE_URL}/${vehiculoId}/imagenes`);
        if (!response.ok) throw new Error("Error al obtener las imágenes");
        return await response.json();
    } catch (error) {
        console.error("Error en getImagenesByVehiculoId:", error);
        throw error;
    }
};

// POST 
// subir múltiples imágenes
export const addImagenes = async (vehiculoId, archivos) => {
    try {
        const formData = new FormData(); // instancia, no la clase
        archivos.forEach((archivo) => formData.append("imagenes", archivo));

        const response = await fetch(`${BASE_URL}/${vehiculoId}/imagenes`, {
            method: "POST",
            body: formData, // sin Content-Type, el browser lo setea solo
        });
        if (!response.ok) throw new Error("Error al subir las imágenes");
        return await response.json();
    } catch (error) {
        console.error("Error en addImagenes:", error);
        throw error;
    }
};

// PUT 
// cambiar portada
export const cambiarPortada = async (vehiculoId, imagenId) => {
    try {
        const response = await fetch(`${BASE_URL}/${vehiculoId}/imagenes/${imagenId}/portada`, {
            method: "PUT",
        });
        if (!response.ok) throw new Error("Error al cambiar la portada");
    } catch (error) {
        console.error("Error en cambiarPortada:", error);
        throw error;
    }
};

// reordenar imágenes
export const reordenarImagenes = async (vehiculoId, idsImagenes) => {
    try {
        const response = await fetch(`${BASE_URL}/${vehiculoId}/imagenes/reordenar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(idsImagenes), // array de IDs: [3, 1, 2]
        });
        if (!response.ok) throw new Error("Error al reordenar las imágenes");
    } catch (error) {
        console.error("Error en reordenarImagenes:", error);
        throw error;
    }
};

// DELETE 
// eliminar imagen
export const eliminarImagen = async (vehiculoId, imagenId) => {
    try {
        const response = await fetch(`${BASE_URL}/${vehiculoId}/imagenes/${imagenId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar la imagen");
        // no se parsea JSON porque el backend devuelve 204 No Content
    } catch (error) {
        console.error("Error en eliminarImagen:", error);
        throw error;
    }
};