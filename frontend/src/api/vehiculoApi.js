import { authFetch } from "../utils/authFetch";

const API_URL_TURISMOS = process.env.REACT_APP_API_URL + "/turismos";
const API_URL_FURGONETAS = process.env.REACT_APP_API_URL + "/furgonetas";
const API_URL_SCOOTERS = process.env.REACT_APP_API_URL + "/scooters";
const API_URL_PUBLIC = process.env.REACT_APP_API_URL + "/vehiculos/public";

// ── PÚBLICAS (fetch normal) ──────────────────────────────
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

export const serchVehiculos = async (marca, precioMin, precioMax) => {
  const params = new URLSearchParams();
  if (marca) params.append("marca", marca);
  if (precioMin) params.append("precioMin", precioMin);
  if (precioMax) params.append("precioMax", precioMax);
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

// Obtener todos los vehículos (uniendo los 3 tipos)
export const getVehiculos = async () => {
  const [turismos, furgonetas, scooters] = await Promise.all([
    authFetch(API_URL_TURISMOS).then(res => res.ok ? res.json() : []),
    authFetch(API_URL_FURGONETAS).then(res => res.ok ? res.json() : []),
    authFetch(API_URL_SCOOTERS).then(res => res.ok ? res.json() : [])
  ]);
  return [...turismos, ...furgonetas, ...scooters];
};

// Obtener un vehículo por ID (buscando en los 3 tipos)
export const getVehiculoById = async (id) => {
  try {
    const response = await authFetch(`${API_URL_TURISMOS}/${id}`);
    if (response.ok) return await response.json();
  } catch {}
  try {
    const response = await authFetch(`${API_URL_FURGONETAS}/${id}`);
    if (response.ok) return await response.json();
  } catch {}
  try {
    const response = await authFetch(`${API_URL_SCOOTERS}/${id}`);
    if (response.ok) return await response.json();
  } catch {}
  throw new Error("Vehículo no encontrado");
};

// Crear vehículo (detecta el tipo por los campos)
export const addVehiculo = async (vehiculo) => {
  let url;
  if (vehiculo.cilindrada !== undefined) {
    url = API_URL_SCOOTERS;
  } else if (vehiculo.capacidadCarga !== undefined) {
    url = API_URL_FURGONETAS;
  } else {
    url = API_URL_TURISMOS;
  }
  
  const response = await authFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  if (!response.ok) throw new Error("Error al agregar el vehículo");
  return await response.json();
};

// Actualizar vehículo (detecta el tipo por los campos)
export const updateVehiculo = async (id, vehiculo) => {
  let url;
  if (vehiculo.cilindrada !== undefined) {
    url = `${API_URL_SCOOTERS}/${id}`;
  } else if (vehiculo.capacidadCarga !== undefined) {
    url = `${API_URL_FURGONETAS}/${id}`;
  } else {
    url = `${API_URL_TURISMOS}/${id}`;
  }
  
  const response = await authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  if (!response.ok) throw new Error("Error al actualizar el vehículo");
  return await response.json();
};

// Eliminar vehículo (necesita el tipo)
export const deleteVehiculo = async (id, tipo) => {
  let url;
  if (tipo === "SCOOTER") url = `${API_URL_SCOOTERS}/${id}`;
  else if (tipo === "FURGONETA") url = `${API_URL_FURGONETAS}/${id}`;
  else url = `${API_URL_TURISMOS}/${id}`;
  
  const response = await authFetch(url, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar el vehículo");
};

// ── OFERTAS Y ESTADOS (funcionan con cualquier tipo) ──────
const getBaseUrlPorId = async (id) => {
  try {
    const res = await authFetch(`${API_URL_TURISMOS}/${id}`);
    if (res.ok) return API_URL_TURISMOS;
  } catch {}
  try {
    const res = await authFetch(`${API_URL_FURGONETAS}/${id}`);
    if (res.ok) return API_URL_FURGONETAS;
  } catch {}
  return API_URL_SCOOTERS;
};

export const deleteOferta = async (id) => {
  const baseUrl = await getBaseUrlPorId(id);
  const response = await authFetch(`${baseUrl}/${id}/oferta`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al borrar la oferta");
};

export const updateEstadoVehiculo = async (id, estado) => {
  const baseUrl = await getBaseUrlPorId(id);
  const response = await authFetch(`${baseUrl}/${id}/estado?estado=${estado}`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Error al actualizar el estado");
  return await response.json();
};

export const cambiarVisibilidad = async (id, visible) => {
  const baseUrl = await getBaseUrlPorId(id);
  const response = await authFetch(`${baseUrl}/${id}/visible?visible=${visible}`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Error al cambiar la visibilidad");
  return await response.json();
};

export const aplicarOfertaPrecioFijo = async (id, precioOferta, fechaFin) => {
  const baseUrl = await getBaseUrlPorId(id);
  const response = await authFetch(
    `${baseUrl}/${id}/oferta-precio?precioOferta=${encodeURIComponent(precioOferta)}&fechaFin=${encodeURIComponent(fechaFin)}`,
    { method: "POST" }
  );
  if (!response.ok) throw new Error("Error al aplicar la oferta");
  return await response.json();
};