const API_URL = process.env.REACT_APP_API_URL + "/contacto";

export const enviarFormularioContacto = async (payload) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "No se pudo enviar el mensaje";

    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch {
      try {
        message = await response.text();
      } catch {
        // ignore parse errors
      }
    }

    throw new Error(message);
  }

  return await response.json();
};
