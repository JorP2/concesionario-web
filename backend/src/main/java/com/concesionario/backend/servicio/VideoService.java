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
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.repositorio.VehiculoRepository;
import com.concesionario.backend.repositorio.VideoRepository;
import com.concesionario.backend.utils.FileUtils;

@Service
@Transactional
public class VideoService {

    private static final Logger log = LoggerFactory.getLogger(VideoService.class);

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UploadConfig uploadConfig;

    public Video subirVideo(Long vehiculoId, MultipartFile archivo) throws IOException {
        log.info("Subiendo video para vehículo ID: {}", vehiculoId);
        
        if (archivo == null || archivo.isEmpty()) {
            throw new RuntimeException("Debe seleccionar un archivo de video.");
        }
        
        if (!FileUtils.esVideo(archivo)) {
            throw new RuntimeException("El archivo debe ser un video válido (MP4, MPEG o MOV).");
        }
        
        Vehiculo vehiculo = obtenerVehiculo(vehiculoId);
        String carpeta = crearCarpetaVideos(vehiculoId);
        String uid = guardarArchivo(archivo, carpeta);
        int nuevoOrden = calcularNuevoOrden(vehiculoId);
        
        Video video = crearEntidadVideo(vehiculo, uid, nuevoOrden);
        
        Video resultado = videoRepository.save(video);
        log.info("Video subido con ID: {} para vehículo ID: {}", resultado.getId(), vehiculoId);
        return resultado;
    }

    public List<Video> obtenerVideosPorVehiculo(Long vehiculoId) {
        log.info("Obteniendo videos del vehículo ID: {}", vehiculoId);
        return videoRepository.findByVehiculoIdOrderByOrdenAsc(vehiculoId);
    }

    public void eliminarVideo(Long id) {
        log.info("Eliminando video ID: {}", id);
        
        Video video = obtenerVideo(id);
        eliminarArchivoFisico(video);
        videoRepository.deleteById(id);
        
        log.info("Video ID: {} eliminado", id);
    }

    private Vehiculo obtenerVehiculo(Long vehiculoId) {
        return vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> {
                    log.warn("Vehículo no encontrado con ID: {}", vehiculoId);
                    return new RuntimeException("Vehículo no encontrado.");
                });
    }

    private String crearCarpetaVideos(Long vehiculoId) {
        String carpeta = uploadConfig.getRuta() + vehiculoId + "/videos/";
        FileUtils.crearCarpeta(carpeta);
        log.debug("Carpeta creada: {}", carpeta);
        return carpeta;
    }

    private String guardarArchivo(MultipartFile archivo, String carpeta) throws IOException {
        try {
            String uid = FileUtils.guardarArchivo(archivo, carpeta);
            log.debug("Archivo guardado con UID: {}", uid);
            return uid;
        } catch (IOException e) {
            log.error("Error al guardar archivo de video", e);
            throw new RuntimeException("Error al guardar el video en el servidor.");
        }
    }

    private int calcularNuevoOrden(Long vehiculoId) {
        Integer ultimoOrden = videoRepository.findMaxOrdenByVehiculoId(vehiculoId);
        int nuevoOrden = (ultimoOrden == null) ? 1 : ultimoOrden + 1;
        log.debug("Nuevo orden calculado: {}", nuevoOrden);
        return nuevoOrden;
    }

    private Video crearEntidadVideo(Vehiculo vehiculo, String uid, int orden) {
        Video video = new Video();
        video.setVehiculo(vehiculo);
        video.setUid(uid);
        video.setOrden(orden);
        return video;
    }

    private Video obtenerVideo(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Video no encontrado con ID: {}", id);
                    return new RuntimeException("Video no encontrado.");
                });
    }

    private void eliminarArchivoFisico(Video video) {
        String rutaArchivo = uploadConfig.getRuta() +
                            video.getVehiculo().getId() +
                            "/videos/" +
                            video.getUid();
        FileUtils.eliminarArchivo(rutaArchivo);
        log.debug("Archivo físico eliminado: {}", rutaArchivo);
    }
}