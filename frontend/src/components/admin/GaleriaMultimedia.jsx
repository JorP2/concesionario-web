import React from "react";

function GaleriaMultimedia({ vehiculoId, imagenesNuevas, setImagenesNuevas }) {
  return (
    <div>
      {/* Sección imágenes */}
      <div className="mb-4">
        <h5>Imágenes</h5>
        {/* acá irá el grid de fotos */}
      </div>

      {/* Sección videos */}
      <div>
        <h5>Videos</h5>
        {vehiculoId ? (
          <div>{/* acá irá el contenido de videos */}</div>
        ) : (
          <p className="text-muted small">
            Guardá el vehículo primero para poder subir videos.
          </p>
        )}
      </div>
    </div>
  );
}

export default GaleriaMultimedia;
