import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalleCoche.css';

function DetalleCoche() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coche, setCoche] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Cargar datos del coche
        const cocheRes = await fetch(`http://localhost:8080/api/vehiculos/${id}`);
        const cocheData = await cocheRes.json();
        setCoche(cocheData);

        // Cargar fotos del coche
        const fotosRes = await fetch(`http://localhost:8080/api/vehiculos/${id}/fotos`);
        const fotosData = await fotosRes.json();
        
        // Separar fotos y videos
        const listaFotos = fotosData.filter(url => 
          !url.includes('.mp4') && !url.includes('.webm') && !url.includes('.ogg')
        );
        const listaVideos = fotosData.filter(url => 
          url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')
        );
        
        setFotos(listaFotos);
        setVideos(listaVideos);
        
        if (listaFotos.length > 0) {
          setFotoSeleccionada(listaFotos[0]);
        }
        
        setCargando(false);
      } catch (error) {
        console.error('Error:', error);
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [id]);

  if (cargando) return <div className="cargando">Cargando...</div>;
  if (!coche) return <div className="error">Coche no encontrado</div>;

  return (
    <div className="detalle-container">
      <button className="btn-volver" onClick={() => navigate('/coches')}>
        ← Volver a coches
      </button>

      <div className="detalle-grid">
        {/* COLUMNA IZQUIERDA - FOTOS */}
        <div className="fotos-columna">
          {/* Foto principal grande */}
          <div className="foto-principal">
            {fotoSeleccionada ? (
              <img 
                src={`http://localhost:8080${fotoSeleccionada}`} 
                alt={coche.marca}
              />
            ) : (
              <div className="sin-foto">
                <img 
                  src="https://via.placeholder.com/600x400/3b82f6/ffffff?text=Sin+Imagen"
                  alt="Sin imagen"
                />
              </div>
            )}
          </div>

          {/* SECCIÓN DE VIDEOS (arriba, junto a la foto principal) */}
          {videos.length > 0 && (
            <div className="videos-seccion">
              <h3>🎬 Videos del vehículo</h3>
              <div className="videos-grid-detalle">
                {videos.map((video, index) => (
                  <div key={index} className="video-item-detalle">
                    <video 
                      controls 
                      preload="metadata"
                      width="100%"
                      height="auto"
                    >
                      <source src={`http://localhost:8080${video}`} type="video/mp4" />
                      <source src={`http://localhost:8080${video}`} type="video/webm" />
                      Tu navegador no soporta videos.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALERÍA DE FOTOS (abajo, todas las fotos en fila) */}
          {fotos.length > 1 && (
            <div className="galeria-seccion">
              <h3>📸 Galería de fotos</h3>
              <div className="galeria-grid">
                {fotos.map((foto, index) => (
                  <div 
                    key={index} 
                    className={`galeria-item ${foto === fotoSeleccionada ? 'activo' : ''}`}
                    onClick={() => setFotoSeleccionada(foto)}
                  >
                    <img 
                      src={`http://localhost:8080${foto}`} 
                      alt={`Foto ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA - INFORMACIÓN */}
        <div className="info-columna">
          <h1>{coche.marca} {coche.modelo}</h1>
          <p className="precio-detalle">{coche.precio?.toLocaleString()}€</p>
          
          <div className="caracteristicas-detalle">
            <div className="caracteristica-item">
              <span className="label">Año</span>
              <span className="valor">{coche.anio}</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Kilómetros</span>
              <span className="valor">{coche.kilometros?.toLocaleString()} km</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Combustible</span>
              <span className="valor">{coche.combustible}</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Cambio</span>
              <span className="valor">{coche.cambio}</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Color</span>
              <span className="valor">{coche.colorExterior}</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Motor</span>
              <span className="valor">{coche.motor}</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Asientos</span>
              <span className="valor">{coche.asientos}</span>
            </div>
            <div className="caracteristica-item">
              <span className="label">Puertas</span>
              <span className="valor">{coche.puertas}</span>
            </div>
          </div>

          <div className="descripcion-detalle">
            <h3>Descripción</h3>
            <p>{coche.descripcion}</p>
          </div>

          {coche.extras && (
            <div className="extras-detalle">
              <h3>Extras</h3>
              <p>{coche.extras}</p>
            </div>
          )}

          <div className="contacto-rapido">
            <h3>¿Te interesa este coche?</h3>
            <div className="botones-contacto">
              <a href="tel:651868230" className="btn-telefono">
                📞 Llamar
              </a>
              <a href="mailto:nohalesautomoviles@gmail.com" className="btn-email">
                ✉️ Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleCoche;