import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [coches, setCoches] = useState([]);
  const [cochesFiltrados, setCochesFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [vista, setVista] = useState('lista'); // 'lista', 'crear', 'editar'
  const [cocheActual, setCocheActual] = useState(null);
  
  // Estados para el formulario
  const [formulario, setFormulario] = useState({
    marca: '',
    modelo: '',
    precio: '',
    anio: '',
    kilometros: '',
    combustible: '',
    cambio: '',
    colorExterior: '',
    asientos: '',
    puertas: '',
    motor: '',
    descripcion: '',
    extras: '',
    visible: true,
    estadoVenta: 'en_venta'
  });

  // Estados para fotos
  const [fotosSubidas, setFotosSubidas] = useState([]);
  const [fotosExistentes, setFotosExistentes] = useState([]);
  const [fotoPrincipal, setFotoPrincipal] = useState(null);
  const [videosSubidos, setVideosSubidos] = useState([]);
  const [videosExistentes, setVideosExistentes] = useState([]);
  const [previews, setPreviews] = useState([]);
  
  const [cargando, setCargando] = useState(false);

  // Verificar si está logueado
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
    }
  }, [navigate]);

  // Obtener coches
  useEffect(() => {
    cargarCoches();
  }, []);

  const cargarCoches = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/vehiculos');
      const data = await res.json();
      
      // Para cada coche, obtener su primera foto
      const cochesConFotos = await Promise.all(
        data.map(async (coche) => {
          try {
            const fotosRes = await fetch(`http://localhost:8080/api/vehiculos/${coche.id}/fotos`);
            const fotos = await fotosRes.json();
            return { 
              ...coche, 
              fotoPrincipal: fotos.length > 0 ? fotos[0] : null 
            };
          } catch {
            return { ...coche, fotoPrincipal: null };
          }
        })
      );
      
      setCoches(cochesConFotos);
      setCochesFiltrados(cochesConFotos);
    } catch (err) {
      console.error('Error cargando coches:', err);
    }
  };

  // Buscar coches
  useEffect(() => {
    const resultados = coches.filter(coche => 
      coche.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      coche.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
      coche.anio.toString().includes(busqueda)
    );
    setCochesFiltrados(resultados);
  }, [busqueda, coches]);

  // Cargar fotos cuando se selecciona un coche para editar
  useEffect(() => {
    if (cocheActual && vista === 'editar') {
      cargarFotosCoche(cocheActual.id);
    }
  }, [cocheActual, vista]);

  const cargarFotosCoche = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/vehiculos/${id}/fotos`);
      const data = await res.json();
      
      // Separar fotos y videos
      const fotos = data.filter(url => !url.includes('.mp4') && !url.includes('.webm'));
      const videos = data.filter(url => url.includes('.mp4') || url.includes('.webm'));
      
      setFotosExistentes(fotos);
      setVideosExistentes(videos);
      if (fotos.length > 0) setFotoPrincipal(fotos[0]);
    } catch (err) {
      console.error('Error cargando fotos:', err);
    }
  };

  // Previsualizar fotos antes de subir
  const handleFotosChange = (e) => {
    const archivos = Array.from(e.target.files);
    setFotosSubidas(archivos);
    
    // Crear previews
    const nuevasPreviews = archivos.map(archivo => URL.createObjectURL(archivo));
    setPreviews(nuevasPreviews);
  };

  // Manejar videos
  const handleVideosChange = (e) => {
    const archivos = Array.from(e.target.files);
    
    // Validar tamaño máximo (10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const videosValidos = archivos.filter(video => {
      if (video.size > MAX_SIZE) {
        alert(`El video ${video.name} es demasiado grande (máx 10MB)`);
        return false;
      }
      return true;
    });
    
    // Limitar a 2 videos
    setVideosSubidos(videosValidos.slice(0, 2));
    
    if (videosValidos.length > 2) {
      alert('Solo se pueden subir 2 videos máximo');
    }
  };

  // Establecer foto principal
  const establecerPrincipal = (foto) => {
    setFotoPrincipal(foto);
  };

  // Guardar coche nuevo
  const guardarCoche = async () => {
    try {
      setCargando(true);
      
      // Validar campos requeridos
      if (!formulario.marca || !formulario.modelo || !formulario.precio) {
        alert('Por favor completa los campos requeridos');
        return;
      }
      
      // 1. Crear el coche
      const res = await fetch('http://localhost:8080/api/vehiculos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });
      
      if (!res.ok) throw new Error('Error al crear coche');
      
      const nuevoCoche = await res.json();
      
      // 2. Subir fotos si hay
      if (fotosSubidas.length > 0) {
        await subirArchivos(nuevoCoche.id, fotosSubidas, 'fotos');
      }
      
      // 3. Subir videos si hay
      if (videosSubidos.length > 0) {
        await subirArchivos(nuevoCoche.id, videosSubidos, 'videos');
      }
      
      alert('✅ Coche creado correctamente');
      setVista('lista');
      resetFormulario();
      cargarCoches();
      
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  // Actualizar coche
  const actualizarCoche = async () => {
    try {
      setCargando(true);
      
      // 1. Actualizar datos del coche
      await fetch(`http://localhost:8080/api/vehiculos/${cocheActual.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });
      
      // 2. Subir nuevas fotos
      if (fotosSubidas.length > 0) {
        await subirArchivos(cocheActual.id, fotosSubidas, 'fotos');
      }
      
      // 3. Subir nuevos videos
      if (videosSubidos.length > 0) {
        await subirArchivos(cocheActual.id, videosSubidos, 'videos');
      }
      
      alert('✅ Coche actualizado correctamente');
      setVista('lista');
      cargarCoches();
      
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  const subirArchivos = async (id, archivos, tipo) => {
    const formData = new FormData();
    archivos.forEach(archivo => formData.append('fotos', archivo));
    
    const res = await fetch(`http://localhost:8080/api/vehiculos/${id}/fotos`, {
      method: 'POST',
      body: formData
    });
    
    if (!res.ok) throw new Error(`Error al subir ${tipo}`);
  };

  // Eliminar coche
  const eliminarCoche = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este coche?')) return;
    
    try {
      await fetch(`http://localhost:8080/api/vehiculos/${id}`, {
        method: 'DELETE'
      });
      
      // Eliminar también las fotos
      await fetch(`http://localhost:8080/api/vehiculos/${id}/fotos`, {
        method: 'DELETE'
      });
      
      alert('✅ Coche eliminado');
      cargarCoches();
      
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  // Eliminar foto individual
  const eliminarFoto = async (fotoUrl) => {
    if (!window.confirm('¿Eliminar esta foto?')) return;
    
    const nombreFoto = fotoUrl.split('/').pop();
    
    try {
      await fetch(`http://localhost:8080/api/vehiculos/${cocheActual.id}/fotos/${nombreFoto}`, {
        method: 'DELETE'
      });
      
      setFotosExistentes(fotosExistentes.filter(f => f !== fotoUrl));
      if (fotoPrincipal === fotoUrl) {
        setFotoPrincipal(fotosExistentes.length > 1 ? fotosExistentes[1] : null);
      }
    } catch (error) {
      alert('Error al eliminar foto');
    }
  };

  // Eliminar video individual
  const eliminarVideo = async (videoUrl) => {
    if (!window.confirm('¿Eliminar este video?')) return;
    
    const nombreVideo = videoUrl.split('/').pop();
    
    try {
      await fetch(`http://localhost:8080/api/vehiculos/${cocheActual.id}/fotos/${nombreVideo}`, {
        method: 'DELETE'
      });
      
      setVideosExistentes(videosExistentes.filter(v => v !== videoUrl));
      alert('✅ Video eliminado');
    } catch (error) {
      alert('❌ Error al eliminar video');
    }
  };

  const resetFormulario = () => {
    setFormulario({
      marca: '', modelo: '', precio: '', anio: '', kilometros: '',
      combustible: '', cambio: '', colorExterior: '', asientos: '',
      puertas: '', motor: '', descripcion: '', extras: '',
      visible: true, estadoVenta: 'en_venta'
    });
    setFotosSubidas([]);
    setPreviews([]);
    setVideosSubidos([]);
    setFotosExistentes([]);
    setVideosExistentes([]);
    setFotoPrincipal(null);
  };

  const editarCoche = (coche) => {
    setCocheActual(coche);
    setFormulario(coche);
    setVista('editar');
  };

  const logout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  // Vista de lista de coches
  if (vista === 'lista') {
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h2>Panel de Administración - Nohales Automóviles</h2>
          <div>
            <button onClick={() => { resetFormulario(); setVista('crear'); }} className="btn-crear">
              ➕ Nuevo Coche
            </button>
            <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
          </div>
        </div>

        <div className="buscador">
          <input
            type="text"
            placeholder="🔍 Buscar coche por marca, modelo o año..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className="lista-coches-admin">
          <table className="tabla-coches">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Marca/Modelo</th>
                <th>Año</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cochesFiltrados.map(coche => (
                <tr key={coche.id}>
                  <td>
                    <img 
                      src={coche.fotoPrincipal ? `http://localhost:8080${coche.fotoPrincipal}` : 'https://via.placeholder.com/50'}
                      alt={coche.marca}
                      className="foto-tabla"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                    />
                  </td>
                  <td>{coche.marca} {coche.modelo}</td>
                  <td>{coche.anio}</td>
                  <td>{coche.precio?.toLocaleString()}€</td>
                  <td>
                    <span className={`estado-${coche.estadoVenta}`}>
                      {coche.estadoVenta === 'en_venta' ? 'En venta' : 
                       coche.estadoVenta === 'proximo' ? 'Próximo' : 'Vendido'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => editarCoche(coche)} className="btn-editar">
                      ✏️ Editar
                    </button>
                    <button onClick={() => eliminarCoche(coche.id)} className="btn-eliminar">
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Vista de crear/editar coche
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>{vista === 'crear' ? '➕ Nuevo Coche' : `✏️ Editando: ${cocheActual?.marca} ${cocheActual?.modelo}`}</h2>
        <button onClick={() => setVista('lista')} className="btn-volver">
          ← Volver
        </button>
      </div>

      <div className="formulario-grid">
        {/* Columna izquierda - Datos del coche */}
        <div className="columna-datos">
          <h3>📋 Datos del vehículo</h3>
          
          <div className="form-grupo">
            <label>Marca *</label>
            <input
              type="text"
              value={formulario.marca}
              onChange={(e) => setFormulario({...formulario, marca: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Modelo *</label>
            <input
              type="text"
              value={formulario.modelo}
              onChange={(e) => setFormulario({...formulario, modelo: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Precio (€) *</label>
            <input
              type="number"
              value={formulario.precio}
              onChange={(e) => setFormulario({...formulario, precio: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Año *</label>
            <input
              type="number"
              value={formulario.anio}
              onChange={(e) => setFormulario({...formulario, anio: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Kilómetros *</label>
            <input
              type="number"
              value={formulario.kilometros}
              onChange={(e) => setFormulario({...formulario, kilometros: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Combustible *</label>
            <select
              value={formulario.combustible}
              onChange={(e) => setFormulario({...formulario, combustible: e.target.value})}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diésel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>

          <div className="form-grupo">
            <label>Cambio *</label>
            <select
              value={formulario.cambio}
              onChange={(e) => setFormulario({...formulario, cambio: e.target.value})}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Manual">Manual</option>
              <option value="Automático">Automático</option>
            </select>
          </div>

          <div className="form-grupo">
            <label>Color exterior *</label>
            <input
              type="text"
              value={formulario.colorExterior}
              onChange={(e) => setFormulario({...formulario, colorExterior: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Asientos *</label>
            <input
              type="number"
              value={formulario.asientos}
              onChange={(e) => setFormulario({...formulario, asientos: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Puertas *</label>
            <input
              type="number"
              value={formulario.puertas}
              onChange={(e) => setFormulario({...formulario, puertas: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Motor *</label>
            <input
              type="text"
              value={formulario.motor}
              onChange={(e) => setFormulario({...formulario, motor: e.target.value})}
              required
            />
          </div>

          <div className="form-grupo">
            <label>Descripción *</label>
            <textarea
              value={formulario.descripcion}
              onChange={(e) => setFormulario({...formulario, descripcion: e.target.value})}
              rows="4"
              required
            />
          </div>

          <div className="form-grupo">
            <label>Extras</label>
            <textarea
              value={formulario.extras}
              onChange={(e) => setFormulario({...formulario, extras: e.target.value})}
              rows="3"
            />
          </div>

          <div className="form-grupo checkbox">
            <label>
              <input
                type="checkbox"
                checked={formulario.visible}
                onChange={(e) => setFormulario({...formulario, visible: e.target.checked})}
              />
              Visible en web
            </label>
          </div>

          <div className="form-grupo">
            <label>Estado de venta</label>
            <select
              value={formulario.estadoVenta}
              onChange={(e) => setFormulario({...formulario, estadoVenta: e.target.value})}
            >
              <option value="en_venta">En venta</option>
              <option value="proximo">Próximamente</option>
              <option value="vendido">Vendido</option>
            </select>
          </div>
        </div>

        {/* Columna derecha - Fotos y videos */}
        <div className="columna-multimedia">
          <h3>📸 Fotos</h3>
          
          <div className="subir-zona">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFotosChange}
              id="fotos-input"
              className="file-input"
            />
            <label htmlFor="fotos-input" className="file-label">
              + Agregar fotos
            </label>
          </div>

          {/* Previews de nuevas fotos */}
          {previews.length > 0 && (
            <div className="previews-grid">
              <h4>Nuevas fotos:</h4>
              {previews.map((preview, index) => (
                <div key={index} className="preview-item">
                  <img src={preview} alt={`Preview ${index}`} />
                </div>
              ))}
            </div>
          )}

          {/* Fotos existentes */}
          {fotosExistentes.length > 0 && (
            <div className="fotos-grid">
              <h4>Fotos actuales:</h4>
              {fotosExistentes.map((foto, index) => (
                <div key={index} className={`foto-item ${foto === fotoPrincipal ? 'principal' : ''}`}>
                  <img 
                    src={`http://localhost:8080${foto}`} 
                    alt={`Foto ${index}`}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                  />
                  <div className="foto-overlay">
                    {foto !== fotoPrincipal && (
                      <button onClick={() => establecerPrincipal(foto)} className="btn-principal">
                        ⭐ Principal
                      </button>
                    )}
                    {foto === fotoPrincipal && (
                      <span className="principal-badge">Principal</span>
                    )}
                    <button onClick={() => eliminarFoto(foto)} className="btn-eliminar-foto">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h3>🎬 Videos (máx 2)</h3>
          
          <div className="subir-zona">
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              multiple
              onChange={handleVideosChange}
              id="videos-input"
              className="file-input"
            />
            <label htmlFor="videos-input" className="file-label">
              + Agregar videos (MP4, max 10MB)
            </label>
            {videosSubidos.length > 0 && (
              <p className="info-videos">{videosSubidos.length} video(s) seleccionado(s)</p>
            )}
          </div>

          {/* Videos existentes */}
          {videosExistentes.length > 0 && (
            <div className="videos-grid">
              <h4>Videos actuales:</h4>
              {videosExistentes.map((video, index) => (
                <div key={index} className="video-item">
                  <video 
                    controls 
                    width="100%" 
                    height="auto"
                    preload="metadata"
                  >
                    <source src={`http://localhost:8080${video}`} type="video/mp4" />
                    <source src={`http://localhost:8080${video}`} type="video/webm" />
                    Tu navegador no soporta videos.
                  </video>
                  <button 
                    onClick={() => eliminarVideo(video)}
                    className="btn-eliminar-video"
                  >
                    🗑️ Eliminar video
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-acciones">
        <button 
          onClick={vista === 'crear' ? guardarCoche : actualizarCoche}
          disabled={cargando}
          className="btn-guardar"
        >
          {cargando ? 'Guardando...' : '💾 Guardar coche'}
        </button>
      </div>
    </div>
  );
}

export default Admin;