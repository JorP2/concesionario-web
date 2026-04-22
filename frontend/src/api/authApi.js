const BASE_URL = process.env.REACT_APP_API_URL + "/auth";

// Login - manda username y password, recibe accessToken, refreshToken, username y role
export const loginConTokens = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Credenciales incorrectas");
  return await response.json(); // { accessToken, refreshToken, username, role }
};

// Refresh - manda el refreshToken, recibe un nuevo accessToken
export const refreshToken = async (refreshToken) => {
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) throw new Error("Refresh token inválido");
  return await response.json(); // { accessToken }
};

// Logout - manda el refreshToken para que el backend lo invalide en BD
export const logoutApi = async (refreshToken) => {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
};