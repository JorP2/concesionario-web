import { authFetch } from "../utils/authFetch";

const BASE_URL = process.env.REACT_APP_API_URL + "/vehiculos";

export const getImagenesByVehiculoId = async (vehiculoId) => {
  const response = await authFetch(`${BASE_URL}/${vehiculoId}/imagenes`);
  if (!response.ok) throw new Error("Error al obtener las imágenes");
  return await response.json();
};

export const addImagenes = async (vehiculoId, archivos) => {
  const formData = new FormData();
  archivos.forEach((archivo) => formData.append("imagenes", archivo));
  // Sin Content-Type — el browser lo pone solo para FormData
  const response = await authFetch(`${BASE_URL}/${vehiculoId}/imagenes`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Error al subir las imágenes");
  return await response.json();
};

export const cambiarPortada = async (vehiculoId, imagenId) => {
  const response = await authFetch(
    `${BASE_URL}/${vehiculoId}/imagenes/${imagenId}/portada`,
    { method: "PUT" }
  );
  if (!response.ok) throw new Error("Error al cambiar la portada");
};

export const reordenarImagenes = async (vehiculoId, idsImagenes) => {
  const response = await authFetch(
    `${BASE_URL}/${vehiculoId}/imagenes/reordenar`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idsImagenes),
    }
  );
  if (!response.ok) throw new Error("Error al reordenar las imágenes");
};

export const eliminarImagen = async (vehiculoId, imagenId) => {
  const response = await authFetch(
    `${BASE_URL}/${vehiculoId}/imagenes/${imagenId}`,
    { method: "DELETE" }
  );
  if (!response.ok) throw new Error("Error al eliminar la imagen");
};