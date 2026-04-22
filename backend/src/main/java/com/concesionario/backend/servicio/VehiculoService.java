package com.concesionario.backend.servicio;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.concesionario.backend.config.UploadConfig;
import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.repositorio.VehiculoRepository;
import com.concesionario.backend.utils.DateUtils;

@Service
@Transactional
public class VehiculoService {

	 private static final Logger log = LoggerFactory.getLogger(VehiculoService.class);
	 
	 
	@Autowired
	private ImagenService imagenService;

	@Autowired
	private VideoService videoService;

	@Autowired
	private UploadConfig uploadConfig;
    @Autowired
    private VehiculoRepository vehiculoRepository;

    // .- CRUD BASICO

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo obtenerPorId(Long id) {
        return vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
    }

    @Transactional
    public void eliminar(Long id) {
        try {
            Vehiculo vehiculo = obtenerPorId(id);
            
            // Eliminar imágenes
            List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
            for (Imagen img : imagenes) {
                try {
                    imagenService.eliminarImagen(img.getId());
                } catch (Exception e) {
                    log.error("Error al eliminar imagen {}: {}", img.getId(), e.getMessage());
                }
            }
            
            // Eliminar videos
            List<Video> videos = videoService.obtenerVideosPorVehiculo(id);
            for (Video vid : videos) {
                try {
                    videoService.eliminarVideo(vid.getId());
                } catch (Exception e) {
                    log.error("Error al eliminar video {}: {}", vid.getId(), e.getMessage());
                }
            }
            
            vehiculoRepository.deleteById(id);
            eliminarCarpetas(id);
            
        } catch (Exception e) {
            log.error("Error general al eliminar vehículo {}: {}", id, e.getMessage());
            throw new RuntimeException("Error al eliminar vehículo " + id + ": " + e.getMessage());
        }
    }

    private void eliminarCarpetas(Long id) {
        try {
            File carpetaVehiculo = new File(uploadConfig.getRuta() + id);
            
            if (carpetaVehiculo.exists() && carpetaVehiculo.isDirectory()) {
                eliminarDirectorio(carpetaVehiculo);
                log.info("Carpeta del vehículo {} eliminada correctamente", id);
            }
        } catch (Exception e) {
            log.error("Error al eliminar carpetas del vehículo {}: {}", id, e.getMessage());
        }
    }

    private void eliminarDirectorio(File directorio) {
        File[] archivos = directorio.listFiles();
        if (archivos != null) {
            for (File archivo : archivos) {
                if (archivo.isDirectory()) {
                    eliminarDirectorio(archivo);
                } else {
                    archivo.delete();
                }
            }
        }
        directorio.delete();
    }
    
    // CREAR

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        log.info("Creando nuevo vehículo: {} {}", vehiculo.getMarca(), vehiculo.getModelo());
        
        validarVehiculo(vehiculo);
        asignarValoresPorDefecto(vehiculo);
        Vehiculo resultado = vehiculoRepository.save(vehiculo);
        
        log.info("Vehículo creado con ID: {}", resultado.getId());
        return resultado;
    }
    

    // ACTUALIZAR
    public Vehiculo actualizarVehiculo(Long id, Vehiculo vehiculoActualizado) {
        log.info("Actualizando vehículo ID: {}", id);
        
        Vehiculo existente = obtenerPorId(id);
        actualizarCampos(existente, vehiculoActualizado);
        Vehiculo resultado = vehiculoRepository.save(existente);
        
        log.info("Vehículo ID: {} actualizado correctamente", id);
        return resultado;
    }

    // .- GESTIÓN DE OFERTAS
    // APLICAR OFERTA
    public Vehiculo aplicarOferta(Long id, Double descuento) {
        log.info("Aplicando oferta de {}% al vehículo ID: {}", descuento, id);
        
        if (descuento <= 0 || descuento > 100) {
            log.warn("Descuento inválido: {} para vehículo ID: {}", descuento, id);
            throw new RuntimeException("El descuento debe ser entre 1 y 100");
        }

        Vehiculo vehiculo = obtenerPorId(id);
        Double precioOferta = vehiculo.getPrecio() - (vehiculo.getPrecio() * descuento / 100);

        vehiculo.setPrecioOferta(precioOferta);
        vehiculo.setEnOferta(true);
        vehiculo.setFechaFinOferta(DateUtils.ahora().plusDays(30));

        return vehiculoRepository.save(vehiculo);
    }

    public Vehiculo aplicarOfertaPrecioFijo(Long id, Double nuevoPrecioOferta, LocalDateTime fechaFinOferta) {
        log.info("Aplicando oferta de precio fijo {}€ al vehículo ID: {} hasta {}", nuevoPrecioOferta, id, fechaFinOferta);
        
        Vehiculo vehiculo = obtenerPorId(id);
        
        if (nuevoPrecioOferta <= 0 || nuevoPrecioOferta >= vehiculo.getPrecio()) {
            log.warn("Precio oferta inválido: {} para vehículo ID: {}", nuevoPrecioOferta, id);
            throw new RuntimeException("El precio de oferta debe ser menor al precio original (" 
            		+ vehiculo.getPrecio() + ")");
        }
        
        // Validar que la fecha sea futura
        if (fechaFinOferta.isBefore(LocalDateTime.now())) {
            log.warn("Fecha de fin de oferta inválida: {} para vehículo ID: {}", fechaFinOferta, id);
            throw new RuntimeException("La fecha de fin debe ser posterior a hoy");
        }
        
        vehiculo.setPrecioOferta(nuevoPrecioOferta); 
        vehiculo.setEnOferta(true);
        vehiculo.setFechaFinOferta(fechaFinOferta);  // ← Usa la fecha que envía el frontend
        
        log.info("Oferta de precio fijo aplicada al vehículo ID: {}", id);
        return vehiculoRepository.save(vehiculo);
    }
    
    
    // QUITAR OFERTA
    public Vehiculo quitarOferta(Long id) {
        log.info("Quitando oferta del vehículo ID: {}", id);
        
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setEnOferta(false);
        vehiculo.setPrecioOferta(null);
        vehiculo.setFechaFinOferta(null);
        
        log.info("Oferta quitada del vehículo ID: {}", id);
        return vehiculoRepository.save(vehiculo);
    }

    // .- GESTION DE ESTADOS
    // CAMBIAR VISIBILIDAD
    public Vehiculo cambiarVisibilidad(Long id, Boolean visible) {
        log.info("Cambiando visibilidad del vehículo ID: {} a {}", id, visible);
        
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setVisible(visible);
        Vehiculo resultado = vehiculoRepository.save(vehiculo);
        
        log.info("Visibilidad del vehículo ID: {} cambiada a {}", id, visible);
        return resultado;
    }

    //CAMBIAR ESTADO
    public Vehiculo cambiarEstadoVenta(Long id, String estado) {

    	log.info("Cambiando estado de venta del vehículo ID: {} a {}", id, estado);
        
        if (!estado.equals("en_venta") && !estado.equals("vendido") && !estado.equals("reservado")) {
            log.warn("Estado inválido: {} para vehículo ID: {}", estado, id);
            throw new RuntimeException("Estado no válido");
        }
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setEstadoVenta(estado);
        
        log.info("Estado de venta del vehículo ID: {} cambiado a {}", id, estado);
        return vehiculoRepository.save(vehiculo);
    }

    // .-CONSULTAS PUBLICAS

    public List<Vehiculo> obtenerVehiculosEnVenta() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("en_venta");
    }


    public List<Vehiculo> obtenerVendidos() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("vendido");
    }

    public List<Vehiculo> buscarVehiculos(String marca, Double precioMin, Double precioMax) {
        return vehiculoRepository.buscarAvanzado(marca, "en_venta", precioMin, precioMax);
    }

    // .- ESTADÍSTICAS

    public long contarVehiculos() {
        return vehiculoRepository.count();
    }

    public long contarEnVenta() {
        return vehiculoRepository.countByEstadoVenta("en_venta");
    }

    public long contarVendidos() {
        return vehiculoRepository.countByEstadoVenta("vendido");
    }

    // METODOS PRIVADOS

    private void validarVehiculo(Vehiculo vehiculo) {
        int añoActual = LocalDateTime.now().getYear();

        if (vehiculo.getPrecio() < 0) {
            throw new RuntimeException("El precio no puede ser negativo");
        }
        if (vehiculo.getAnio() < 1900 || vehiculo.getAnio() > añoActual + 1) {
            throw new RuntimeException("Año no válido");
        }
        if (vehiculo.getKilometros() < 0) {
            throw new RuntimeException("Los kilómetros no pueden ser negativos");
        }
        if (vehiculo.getAsientos() < 1 || vehiculo.getAsientos() > 9) {
            throw new RuntimeException("Número de asientos no válido");
        }
    }

    private void asignarValoresPorDefecto(Vehiculo vehiculo) {
        if (vehiculo.getVisible() == null) {
            vehiculo.setVisible(true);
        }
        if (vehiculo.getEstadoVenta() == null) {
            vehiculo.setEstadoVenta("en_venta");
        }
        if (vehiculo.getEnOferta() == null) {
            vehiculo.setEnOferta(false);
        }
    }

    private void actualizarCampos(Vehiculo existente, Vehiculo nuevo) {
        existente.setMarca(nuevo.getMarca());
        existente.setModelo(nuevo.getModelo());
        existente.setPrecio(nuevo.getPrecio());
        existente.setAnio(nuevo.getAnio());
        existente.setKilometros(nuevo.getKilometros());
        existente.setCombustible(nuevo.getCombustible());
        existente.setColorExterior(nuevo.getColorExterior());
        existente.setInterior(nuevo.getInterior());
        existente.setAsientos(nuevo.getAsientos());
        existente.setPuertas(nuevo.getPuertas());
        existente.setMotor(nuevo.getMotor());
        existente.setCambio(nuevo.getCambio());
        existente.setPegatina(nuevo.getPegatina());
        existente.setDescripcion(nuevo.getDescripcion());
        existente.setExtras(nuevo.getExtras());
    }
}