package com.concesionario.backend.servicio;

import java.io.IOException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.concesionario.backend.config.UploadConfig;
import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.ImagenRepository;
import com.concesionario.backend.repositorio.VehiculoRepository;
import com.concesionario.backend.utils.FileUtils;

@Service
@Transactional
public class ImagenService {

    private static final Logger log = LoggerFactory.getLogger(ImagenService.class);

    @Autowired
    private ImagenRepository imagenRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UploadConfig uploadConfig;

    // ========== SUBIR IMAGEN ==========

    public Imagen subirImagen(Long vehiculoId, MultipartFile archivo) throws IOException {
        log.info("Subiendo imagen para vehículo ID: {}", vehiculoId);
        
        validarQueEsImagen(archivo);
        Vehiculo vehiculo = obtenerVehiculo(vehiculoId);
        String carpeta = crearCarpetaImagenes(vehiculoId);
        String uid = guardarArchivo(archivo, carpeta);
        int nuevoOrden = calcularNuevoOrden(vehiculoId);
        
        Imagen imagen = crearEntidadImagen(vehiculo, uid, nuevoOrden);
        determinarSiEsPortada(imagen, vehiculoId);
        
        Imagen resultado = imagenRepository.save(imagen);
        log.info("Imagen subida con ID: {} para vehículo ID: {}", resultado.getId(), vehiculoId);
        return resultado;
    }

    // ========== SUBIR MÚLTIPLES IMÁGENES ==========

    public List<Imagen> subirMultiplesImagenes(Long vehiculoId, List<MultipartFile> archivos) throws IOException {
        log.info("Subiendo {} imágenes para vehículo ID: {}", archivos.size(), vehiculoId);
        
        for (MultipartFile archivo : archivos) {
            subirImagen(vehiculoId, archivo);
        }
        
        List<Imagen> resultado = obtenerImagenesPorVehiculo(vehiculoId);
        log.info("Total imágenes después de subir: {}", resultado.size());
        return resultado;
    }

    // ========== OBTENER IMÁGENES ==========

    public List<Imagen> obtenerImagenesPorVehiculo(Long vehiculoId) {
        log.info("Obteniendo imágenes del vehículo ID: {}", vehiculoId);
        return imagenRepository.findByVehiculoIdOrderByOrdenAsc(vehiculoId);
    }

    // ========== REORDENAR IMÁGENES ==========

    public void reordenarImagenes(Long vehiculoId, List<Long> idsImagenes) {
        log.info("Reordenando imágenes del vehículo ID: {}", vehiculoId);
        
        int orden = 1;
        for (Long id : idsImagenes) {
            Imagen img = obtenerImagen(id);
            validarPerteneceAlVehiculo(img, vehiculoId);
            img.setOrden(orden++);
            imagenRepository.save(img);
        }
        
        log.info("Imágenes reordenadas para vehículo ID: {}", vehiculoId);
    }

    // ========== CAMBIAR FOTO PRINCIPAL ==========

    public void cambiarFotoPrincipal(Long vehiculoId, Long imagenId) {
        log.info("Cambiando foto principal del vehículo ID: {} a imagen ID: {}", vehiculoId, imagenId);
        
        quitarPortadaATodas(vehiculoId);
        establecerPortada(imagenId, vehiculoId);  
        
        log.info("Foto principal cambiada para vehículo ID: {}", vehiculoId);
    }

    // ========== ELIMINAR IMAGEN ==========

    public void eliminarImagen(Long id) {
        log.info("Eliminando imagen ID: {}", id);
        
        Imagen imagen = obtenerImagen(id);
        eliminarArchivoFisico(imagen);
        imagenRepository.deleteById(id);
        
        log.info("Imagen ID: {} eliminada", id);
    }

    // ========== MÉTODOS PRIVADOS ==========

    private void validarQueEsImagen(MultipartFile archivo) {
        if (!FileUtils.esImagen(archivo)) {
            log.warn("Archivo no válido: no es una imagen");
            throw new RuntimeException("El archivo debe ser una imagen (JPEG, PNG, JPG, GIF)");
        }
    }

    private Vehiculo obtenerVehiculo(Long vehiculoId) {
        return vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> {
                    log.warn("Vehículo no encontrado con ID: {}", vehiculoId);
                    return new RuntimeException("Vehículo no encontrado");
                });
    }

    private String crearCarpetaImagenes(Long vehiculoId) {
        String carpeta = uploadConfig.getRuta() + vehiculoId + "/imagenes/";
        FileUtils.crearCarpeta(carpeta);
        log.debug("Carpeta creada: {}", carpeta);
        return carpeta;
    }

    private String guardarArchivo(MultipartFile archivo, String carpeta) throws IOException {
        String uid = FileUtils.guardarArchivo(archivo, carpeta);
        log.debug("Archivo guardado con UID: {}", uid);
        return uid;
    }

    private int calcularNuevoOrden(Long vehiculoId) {
        Integer ultimoOrden = imagenRepository.findMaxOrdenByVehiculoId(vehiculoId);
        int nuevoOrden = (ultimoOrden == null) ? 1 : ultimoOrden + 1;
        log.debug("Nuevo orden calculado: {}", nuevoOrden);
        return nuevoOrden;
    }

    private Imagen crearEntidadImagen(Vehiculo vehiculo, String uid, int orden) {
        Imagen imagen = new Imagen();
        imagen.setVehiculo(vehiculo);
        imagen.setUid(uid);
        imagen.setOrden(orden);
        return imagen;
    }

    private void determinarSiEsPortada(Imagen imagen, Long vehiculoId) {
        long totalImagenes = imagenRepository.countByVehiculoId(vehiculoId);
        imagen.setEsPortada(totalImagenes == 0);
        log.debug("Imagen es portada: {}", totalImagenes == 0);
    }

    private Imagen obtenerImagen(Long id) {
        return imagenRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Imagen no encontrada con ID: {}", id);
                    return new RuntimeException("Imagen no encontrada");
                });
    }

    private void validarPerteneceAlVehiculo(Imagen imagen, Long vehiculoId) {
        if (!imagen.getVehiculo().getId().equals(vehiculoId)) {
            log.warn("Imagen ID: {} no pertenece al vehículo ID: {}", imagen.getId(), vehiculoId);
            throw new RuntimeException("La imagen no pertenece a este vehículo");
        }
    }

    private void quitarPortadaATodas(Long vehiculoId) {
        List<Imagen> imagenes = imagenRepository.findByVehiculoIdOrderByOrdenAsc(vehiculoId);
        for (Imagen img : imagenes) {
            img.setEsPortada(false);
            imagenRepository.save(img);
        }
        log.debug("Portada quitada a todas las imágenes del vehículo ID: {}", vehiculoId);
    }

    private void establecerPortada(Long imagenId, Long vehiculoId) {
        Imagen nuevaPortada = obtenerImagen(imagenId);
  
        
        if (!nuevaPortada.getVehiculo().getId().equals(vehiculoId)) {
            log.warn("Intento de establecer portada: imagen {} no pertenece al vehículo {}", imagenId, vehiculoId);
            throw new RuntimeException("La imagen no pertenece a este vehículo");
        }
        
        nuevaPortada.setEsPortada(true);
        imagenRepository.save(nuevaPortada);
    }

    private void eliminarArchivoFisico(Imagen imagen) {
        String rutaArchivo = uploadConfig.getRuta() +
                            imagen.getVehiculo().getId() +
                            "/imagenes/" +
                            imagen.getUid();
        FileUtils.eliminarArchivo(rutaArchivo);
        log.debug("Archivo físico eliminado: {}", rutaArchivo);
    }
}