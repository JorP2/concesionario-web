// Clave que usamos en localStorage - así no escribimos el string a mano en varios sitios
const SESSION_KEY = "session";

// Guarda toda la sesión de golpe cuando el usuario hace login
// Recibe: { accessToken, refreshToken, username, role }
export const guardarSesion = (datos) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(datos));
};

// Devuelve el objeto sesión completo, o null si no hay sesión
export const getSesion = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

// Devuelve solo el accessToken - lo usaremos en cada petición protegida
export const getAccessToken = () => {
  return getSesion()?.accessToken || null;
};

// Devuelve solo el refreshToken - lo usaremos para pedir un nuevo accessToken
export const getRefreshToken = () => {
  return getSesion()?.refreshToken || null;
};

// Actualiza solo el accessToken cuando hacemos refresh
// Mantiene el resto de datos (refreshToken, username, role) intactos
export const actualizarAccessToken = (nuevoToken) => {
  const sesion = getSesion();
  if (sesion) {
    guardarSesion({ ...sesion, accessToken: nuevoToken });
  }
};

// Borra toda la sesión - se llama al hacer logout o cuando el refreshToken caduca
export const borrarSesion = () => {
  localStorage.removeItem(SESSION_KEY);
};

// Devuelve true si hay sesión activa - útil para proteger rutas en la UI
export const haySesion = () => {
  return getSesion() !== null;
};