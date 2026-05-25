import { authFetch } from "../utils/authFetch";

const BASE_URL = process.env.REACT_APP_API_URL + "/galeria";

// ========= GET PÚBLICOS =========
export const getImagenesByCategoria = async (categoria) => {
  const response = await fetch(
    `${BASE_URL}/categoria/${categoria}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener las imágenes");
  }

  return await response.json();
};

export const getTodasLasImagenes = async () => {
  const response = await fetch(`${BASE_URL}/todas`);

  if (!response.ok) {
    throw new Error("Error al obtener la galería");
  }

  return await response.json();
};

// ========= ADMIN =========
export const subirImagen = async (archivo, categoria) => {
  const formData = new FormData();

  formData.append("imagen", archivo);
  formData.append("categoria", categoria);

  const response = await authFetch(
    `${BASE_URL}/subir`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  return await response.json();
};

export const subirMultiplesImagenes = async (
  archivos,
  categoria
) => {
  const formData = new FormData();

  archivos.forEach((archivo) => {
    formData.append("imagenes", archivo);
  });

  formData.append("categoria", categoria);

  const response = await authFetch(
    `${BASE_URL}/subir-multiples`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir las imágenes");
  }

  return await response.json();
};

export const eliminarImagen = async (id) => {
  const response = await authFetch(
    `${BASE_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar la imagen");
  }

  return await response.json();
};

export const eliminarPorCategoria = async (categoria) => {
  const response = await authFetch(
    `${BASE_URL}/categoria/${categoria}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error al eliminar las imágenes");
  }

  return await response.json();
};