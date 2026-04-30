import { authFetch } from "../utils/authFetch";

const BASE_URL = process.env.REACT_APP_API_URL + "/vehiculos";

export const getVideosByVehiculoId = async (vehiculoId) => {
  const response = await authFetch(`${BASE_URL}/${vehiculoId}/videos`);
  if (!response.ok) throw new Error("Error al obtener los videos");
  return await response.json();
};

export const addVideo = async (vehiculoId, archivo) => {
  const formData = new FormData();
  formData.append("video", archivo);
  // Sin Content-Type — igual que en imágenes, el browser lo pone solo
  const response = await authFetch(`${BASE_URL}/${vehiculoId}/videos`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Error al subir el video");
  return await response.json();
};

export const eliminarVideo = async (vehiculoId, videoId) => {
  const response = await authFetch(
    `${BASE_URL}/${vehiculoId}/videos/${videoId}`,
    { method: "DELETE" }
  );
  if (!response.ok) throw new Error("Error al eliminar el video");
  // 204 No Content, no se parsea JSON
};