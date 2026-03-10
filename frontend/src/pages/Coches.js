import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Coches.css';

function Coches() {
  const navigate = useNavigate();
  const [coches, setCoches] = useState([]);
  const [cochesFiltrados, setCochesFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pestanaActiva, setPestanaActiva] = useState('stock');
  
  // Estados para filtros
  const [filtros, setFiltros] = useState({
    marca: '',
    precioMin: '',
    precioMax: '',
    añoMin: '',
    añoMax: '',
    kmMin: '',
    kmMax: '',
    combustible: ''
  });

  // Obtener coches del backend CON SUS FOTOS
  useEffect(() => {
    const obtenerCoches = async () => {
      let url = 'http://localhost:8080/api/vehiculos';
      
      if (pestanaActiva === 'stock') {
        url = 'http://localhost:8080/api/vehiculos/web';
      } else if (pestanaActiva === 'proximos') {
        url = 'http://localhost:8080/api/vehiculos/web/proximos';
      } else if (pestanaActiva === 'vendidos') {
        url = 'http://localhost:8080/api/vehiculos/estado/vendido';
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Para cada coche, obtener sus fotos
        const cochesConFotos = await Promise.all(
          data.map(async (coche) => {
            try {
              const fotosRes = await fetch(`http://localhost:8080/api/vehiculos/${coche.id}/fotos`);
              const fotos = await fotosRes.json();
              console.log(`Fotos para coche ${coche.id}:`, fotos);
              return { 
                ...coche, 
                fotos: fotos || []  // Guardar todas las fotos
              };
            } catch (error) {
              console.error(`Error cargando fotos del coche ${coche.id}:`, error);
              return { ...coche, fotos: [] };
            }
          })
        );
        
        setCoches(cochesConFotos);
        setCochesFiltrados(cochesConFotos);
        setCargando(false);
      } catch (err) {
        console.error('Error:', err);
        setCargando(false);
      }
    };

    obtenerCoches();
  }, [pestanaActiva]);

  // Función para manejar error de imagen
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Error+imagen';
  };

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...coches];

    if (filtros.marca) {
      resultado = resultado.filter(c => 
        c.marca.toLowerCase().includes(filtros.marca.toLowerCase())
      );
    }

    if (filtros.precioMin) {
      resultado = resultado.filter(c => c.precio >= Number(filtros.precioMin));
    }
    if (filtros.precioMax) {
      resultado = resultado.filter(c => c.precio <= Number(filtros.precioMax));
    }

    if (filtros.añoMin) {
      resultado = resultado.filter(c => c.anio >= Number(filtros.añoMin));
    }
    if (filtros.añoMax) {
      resultado = resultado.filter(c => c.anio <= Number(filtros.añoMax));
    }

    if (filtros.kmMin) {
      resultado = resultado.filter(c => c.kilometros >= Number(filtros.kmMin));
    }
    if (filtros.kmMax) {
      resultado = resultado.filter(c => c.kilometros <= Number(filtros.kmMax));
    }

    if (filtros.combustible) {
      resultado = resultado.filter(c => c.combustible === filtros.combustible);
    }

    setCochesFiltrados(resultado);
  }, [filtros, coches]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFiltros = () => {
    setFiltros({
      marca: '',
      precioMin: '',
      precioMax: '',
      añoMin: '',
      añoMax: '',
      kmMin: '',
      kmMax: '',
      combustible: ''
    });
  };

  const verDetalle = (id) => {
    navigate(`/coche/${id}`);
  };

  if (cargando) return <div className="cargando">Cargando coches...</div>;

  return (
    <div className="coches-page">
      {/* PESTAÑAS SUPERIORES */}
      <div className="pestanas">
        <button 
          className={pestanaActiva === 'stock' ? 'activa' : ''} 
          onClick={() => setPestanaActiva('stock')}
        >
          EN STOCK ({coches.filter(c => c.estadoVenta === 'en_venta').length})
        </button>
        <button 
          className={pestanaActiva === 'proximos' ? 'activa' : ''} 
          onClick={() => setPestanaActiva('proximos')}
        >
          PRÓXIMAMENTE ({coches.filter(c => c.estadoVenta === 'proximo').length})
        </button>
        <button 
          className={pestanaActiva === 'vendidos' ? 'activa' : ''} 
          onClick={() => setPestanaActiva('vendidos')}
        >
          VENDIDOS ({coches.filter(c => c.estadoVenta === 'vendido').length})
        </button>
      </div>

      <div className="contenedor-principal">
        {/* BARRA LATERAL DE FILTROS */}
        <aside className="barra-filtros">
          <h3>Filtros</h3>
          
          <div className="grupo-filtro">
            <label>Marca</label>
            <input
              type="text"
              name="marca"
              value={filtros.marca}
              onChange={handleFiltroChange}
              placeholder="Ej: Seat, Toyota..."
            />
          </div>

          <div className="grupo-filtro">
            <label>Precio (€)</label>
            <div className="rango-inputs">
              <input
                type="number"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleFiltroChange}
                placeholder="Mín"
              />
              <span>-</span>
              <input
                type="number"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleFiltroChange}
                placeholder="Máx"
              />
            </div>
          </div>

          <div className="grupo-filtro">
            <label>Año</label>
            <div className="rango-inputs">
              <input
                type="number"
                name="añoMin"
                value={filtros.añoMin}
                onChange={handleFiltroChange}
                placeholder="Desde"
              />
              <span>-</span>
              <input
                type="number"
                name="añoMax"
                value={filtros.añoMax}
                onChange={handleFiltroChange}
                placeholder="Hasta"
              />
            </div>
          </div>

          <div className="grupo-filtro">
            <label>Kilómetros</label>
            <div className="rango-inputs">
              <input
                type="number"
                name="kmMin"
                value={filtros.kmMin}
                onChange={handleFiltroChange}
                placeholder="Mín"
              />
              <span>-</span>
              <input
                type="number"
                name="kmMax"
                value={filtros.kmMax}
                onChange={handleFiltroChange}
                placeholder="Máx"
              />
            </div>
          </div>

          <div className="grupo-filtro">
            <label>Combustible</label>
            <select name="combustible" value={filtros.combustible} onChange={handleFiltroChange}>
              <option value="">Todos</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diésel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>

          <button className="btn-limpiar" onClick={resetFiltros}>
            Limpiar filtros
          </button>
        </aside>

        {/* LISTA DE COCHES */}
        <main className="lista-coches">
          <p className="resultados">{cochesFiltrados.length} vehículos encontrados</p>
          
          <div className="grid-coches">
            {cochesFiltrados.length === 0 ? (
              <p className="sin-resultados">No hay coches que coincidan con los filtros</p>
            ) : (
              cochesFiltrados.map(coche => (
                <div key={coche.id} className="tarjeta-coche">
                  {/* ETIQUETAS DE ESTADO */}
                  {coche.estadoVenta === 'vendido' && (
                    <span className="etiqueta etiqueta-vendido">VENDIDO</span>
                  )}
                  {coche.estadoVenta === 'proximo' && (
                    <span className="etiqueta etiqueta-proximo">PRÓXIMAMENTE</span>
                  )}
                  {!coche.visible && coche.estadoVenta === 'en_venta' && (
                    <span className="etiqueta etiqueta-oculto">OCULTO</span>
                  )}

                  {/* IMAGEN PRINCIPAL (solo la primera foto) */}
                  <div className="imagen-container">
                    <img 
                      src={coche.fotos && coche.fotos.length > 0 
                        ? `http://localhost:8080${coche.fotos[0]}`  // Primera foto
                        : 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Sin+Imagen'
                      }
                      alt={`${coche.marca} ${coche.modelo}`}
                      onError={handleImageError}
                    />
                    
                    {/* Indicador de más fotos */}
                    {coche.fotos && coche.fotos.length > 1 && (
                      <span className="contador-fotos">
                        +{coche.fotos.length - 1} fotos
                      </span>
                    )}
                  </div>

                  {/* INFORMACIÓN DEL COCHE */}
                  <div className="info-coche">
                    <h4>{coche.marca} {coche.modelo}</h4>
                    <p className="precio">{coche.precio?.toLocaleString()}€</p>
                    
                    <div className="caracteristicas">
                      <span>📅 {coche.anio}</span>
                      <span>📍 {coche.kilometros?.toLocaleString()} km</span>
                      <span>⛽ {coche.combustible}</span>
                      <span>⚙️ {coche.cambio}</span>
                    </div>

                    <p className="descripcion-corta">
                      {coche.descripcion?.substring(0, 60)}...
                    </p>
                    
                    <button 
                      className="btn-ver-detalle"
                      onClick={() => verDetalle(coche.id)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Coches;