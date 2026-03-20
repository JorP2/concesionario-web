package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VideoRepository;
import com.concesionario.backend.repositorio.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    private final String CARPETA_PRINCIPAL = "uploads/vehiculos/";


    // SUBIR VIDEO

    public Video subirVideo(Long vehiculoId, MultipartFile archivo) throws IOException {

        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));


        String carpetaVehiculo = CARPETA_PRINCIPAL + vehiculoId + "/videos/";
        File directorio = new File(carpetaVehiculo);
        if (!directorio.exists()) {
            directorio.mkdirs();
        }

        String nombreOriginal = archivo.getOriginalFilename();
        String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
        String uid = UUID.randomUUID().toString() + extension;

        Path ruta = Paths.get(carpetaVehiculo + uid);
        Files.copy(archivo.getInputStream(), ruta);

        // Calcular orden automático
        Integer ultimoOrden = videoRepository.findMaxOrdenByVehiculoId(vehiculoId);
        int nuevoOrden = (ultimoOrden == null) ? 1 : ultimoOrden + 1;

        Video video = new Video();
        video.setVehiculo(vehiculo);
        video.setUid(uid);
        video.setOrden(nuevoOrden);

        return videoRepository.save(video);
    }

    // OBTENER VIDEOS

    public List<Video> obtenerVideosPorVehiculo(Long vehiculoId) {
        return videoRepository.findByVehiculoIdOrderByOrdenAsc(vehiculoId);
    }

    // ELIMINAR VIDEO

    public void eliminarVideo(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video no encontrado"));

        String rutaArchivo = CARPETA_PRINCIPAL +
                            video.getVehiculo().getId() +
                            "/videos/" +
                            video.getUid();
        File archivo = new File(rutaArchivo);
        if (archivo.exists()) {
            archivo.delete();
        }

        videoRepository.deleteById(id);
    }
}