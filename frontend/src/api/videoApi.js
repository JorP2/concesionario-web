const BASE_URL = process.env.REACT_APP_API_URL + "/vehiculos";

// GET 
// obtener videos por vehículo
export const getVideosByVehiculoId = async (vehiculoId) => {
    try {
        const response = await fetch(`${BASE_URL}/${vehiculoId}/videos`);
        if (!response.ok) throw new Error("Error al obtener los videos");
        return await response.json();
    } catch (error) {
        console.error("Error en getVideosByVehiculoId:", error);
        throw error;
    }
};

// POST 
// subir un video (de a uno)
export const addVideo = async (vehiculoId, archivo) => {
    try {
        const formData = new FormData();
        formData.append("video", archivo);

        const response = await fetch(`${BASE_URL}/${vehiculoId}/videos`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) throw new Error("Error al subir el video");
        return await response.json();
    } catch (error) {
        console.error("Error en addVideo:", error);
        throw error;
    }
};

// DELETE 
// eliminar video
export const eliminarVideo = async (vehiculoId, videoId) => {
    try {
        const response = await fetch(`${BASE_URL}/${vehiculoId}/videos/${videoId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar el video");
        // 204 No Content, no se parsea JSON
    } catch (error) {
        console.error("Error en eliminarVideo:", error);
        throw error;
    }
};