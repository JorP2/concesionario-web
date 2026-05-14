import { authFetch } from "../utils/authFetch";

const API_URL = process.env.REACT_APP_API_URL + "/usuarios";

export const getUsuarios = async () => {
  const response = await authFetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los usuarios");
  return await response.json();
};

export const getUsuarioById = async (id) => {
  const response = await authFetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error al obtener el usuario");
  return await response.json();
};

export const addUsuario = async (usuario) => {
  const response = await authFetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) throw new Error("Error al agregar el usuario");
  return await response.json();
};

export const updateUsuario = async (id, usuario) => {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return await response.json();
};

export const deleteUsuario = async (id) => {
  const response = await authFetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar el usuario");
};
