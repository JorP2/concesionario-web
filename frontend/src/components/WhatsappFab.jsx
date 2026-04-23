import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function WhatsappFab() {
  const location = useLocation();

  // No mostrar en páginas de administrador
  if (location.pathname.startsWith("/administrador")) return null;

  return (
    <a
      href="https://wa.me/34651868230"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      title="Escríbenos por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}

export default WhatsappFab;
