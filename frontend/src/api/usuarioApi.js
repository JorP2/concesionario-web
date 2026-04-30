import { authFetch } from "../utils/authFetch";

const API_URL = process.env.REACT_APP_API_URL + "/usuarios";

// login ya no está aquí — ahora está en authApi.js

export const getUsuarios = async () => {
  const response = await authFetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los usuarios");
  return await response.json();
};

export const getUsuariosActivos = async () => {
  const response = await authFetch(`${API_URL}/activos`);
  if (!response.ok) throw new Error("Error al obtener usuarios activos");
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

export const changePassword = async (id, newPassword) => {
  const response = await authFetch(
    `${API_URL}/${id}/password?password=${newPassword}`,
    { method: "PATCH" }
  );
  if (!response.ok) throw new Error("Error al cambiar la contraseña");
  return await response.json();
};

export const activateUser = async (id) => {
  const response = await authFetch(`${API_URL}/${id}/activar`, { method: "PATCH" });
  if (!response.ok) throw new Error("Error al activar el usuario");
  return await response.json();
};

export const deactivateUser = async (id) => {
  const response = await authFetch(`${API_URL}/${id}/desactivar`, { method: "PATCH" });
  if (!response.ok) throw new Error("Error al desactivar el usuario");
  return await response.json();
};

export const deleteUsuario = async (id) => {
  const response = await authFetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar el usuario");
};