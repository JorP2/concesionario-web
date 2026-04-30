import { getAccessToken, getRefreshToken, actualizarAccessToken, borrarSesion } from "./auth";
import { refreshToken as pedirNuevoToken } from "../api/authApi";

// authFetch funciona igual que fetch normal, pero añade el token automáticamente
// url - la dirección a llamar
// options — mismo objeto que pasarías a fetch (method, body, headers...)
export const authFetch = async (url, options = {}) => {

  // Construye los headers añadiendo el token actual
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${getAccessToken()}`,
  };

  // Hace la petición con el token
  let response = await fetch(url, { ...options, headers });

  // Si el backend responde 401 (token caducado), intenta renovarlo
  if (response.status === 401) {
    try {
      // Pide nuevo accessToken usando el refreshToken
      const datos = await pedirNuevoToken(getRefreshToken());

      // Guarda el nuevo accessToken en localStorage
      actualizarAccessToken(datos.accessToken);

      // Repite la petición original con el nuevo token
      const headersNuevos = {
        ...options.headers,
        Authorization: `Bearer ${datos.accessToken}`,
      };
      response = await fetch(url, { ...options, headers: headersNuevos });

    } catch {
      // Si el refresh también falla, la sesión ha caducado del todo
      // Borra la sesión y manda al usuario a login
      borrarSesion();
      window.location.href = "/login";
    }
  }

  return response;
};