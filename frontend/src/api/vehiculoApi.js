import { authFetch } from "../utils/authFetch";

const API_URL = process.env.REACT_APP_API_URL + "/vehiculos";
const API_URL_PUBLIC = process.env.REACT_APP_API_URL + "/vehiculos/public";

const getErrorMessage = async (response, fallback) => {
  try {
    const data = await response.json();
    return data?.message || fallback;
  } catch {
    return fallback;
  }
};

// ── PÚBLICAS (fetch normal) ──────────────────────────────

export const getVehiculosPorTipo = async (tipo) => {
  const response = await fetch(
    `${API_URL_PUBLIC}/tipo?tipo=${encodeURIComponent(tipo)}`
  );
  if (!response.ok) throw new Error("Error al obtener vehículos por tipo");
  return await response.json();
};

export const getVehiculosEnVenta = async () => {
  const response = await fetch(`${API_URL_PUBLIC}/en-venta`);
  if (!response.ok) throw new Error("Error al obtener los vehículos en venta");
  return await response.json();
};

export const getVehiculosProximos = async () => {
  const response = await fetch(`${API_URL_PUBLIC}/proximos`);
  if (!response.ok) throw new Error("Error al obtener los vehículos próximos");
  return await response.json();
};

export const getVehiculosVendidos = async () => {
  const response = await fetch(`${API_URL_PUBLIC}/vendidos`);
  if (!response.ok) throw new Error("Error al obtener los vehículos vendidos");
  return await response.json();
};

export const serchVehiculos = async (marca, precioMin, precioMax, tipo) => {
  const params = new URLSearchParams();
  if (marca) params.append("marca", marca);
  if (precioMin) params.append("precioMin", precioMin);
  if (precioMax) params.append("precioMax", precioMax);
  if(tipo) params.append("tipo", tipo);
  const response = await fetch(`${API_URL_PUBLIC}/buscar?${params.toString()}`);
  if (!response.ok) throw new Error("Error al buscar vehículos");
  return await response.json();
};

export const getVehiculoByIdPublic = async (id) => {
  const response = await fetch(`${API_URL_PUBLIC}/${id}`);
  if (!response.ok) throw new Error("Error al obtener el vehículo");
  return await response.json();
};

// ── ADMIN (authFetch — lleva token automáticamente) ──────

export const getVehiculos = async () => {
  const response = await authFetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener los vehículos");
  return await response.json();
};

export const getVehiculoById = async (id) => {
  const response = await authFetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error al obtener el vehículo");
  return await response.json();
};

export const addVehiculo = async (vehiculo) => {
  const response = await authFetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Error al agregar el vehículo"));
  }
  return await response.json();
};

export const updateVehiculo = async (id, vehiculo) => {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Error al actualizar el vehículo"));
  }
  return await response.json();
};

export const deleteVehiculo = async (id) => {
  const response = await authFetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar el vehículo");
};

export const deleteOferta = async (id) => {
  const response = await authFetch(`${API_URL}/${id}/oferta`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar la oferta");
};

export const updateEstadoVehiculo = async (id, estado) => {
  const response = await authFetch(`${API_URL}/${id}/estado?estado=${estado}`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Error al actualizar el estado");
  return await response.json();
};

export const cambiarVisibilidad = async (id, visible) => {
  const response = await authFetch(`${API_URL}/${id}/visible?visible=${visible}`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Error al cambiar la visibilidad");
  return await response.json();
};

export const aplicarOfertaPrecioFijo = async (id, precioOferta, fechaFin) => {
  const response = await authFetch(
    `${API_URL}/${id}/oferta-precio?precioOferta=${encodeURIComponent(precioOferta)}&fechaFin=${encodeURIComponent(fechaFin)}`,
    { method: "POST" }
  );
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Error al aplicar la oferta"));
  }
  return await response.json();
};
