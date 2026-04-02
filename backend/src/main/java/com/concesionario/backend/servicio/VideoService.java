package com.concesionario.backend.servicio;

import java.io.IOException;
import java.util.List;
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

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UploadConfig uploadConfig;


    // SUBIR VIDEO

    public Video subirVideo(Long vehiculoId, MultipartFile archivo) throws IOException {

    	 if (!FileUtils.esVideo(archivo)) {
             throw new RuntimeException("El archivo debe ser un video (MP4, MPEG, MOV)");
         }
    	 
    	 Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                 .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));

         // Crear carpeta: uploads/vehiculos/1/videos/
         String carpetaVehiculo = uploadConfig.getRuta() + vehiculoId + "/videos/";
         FileUtils.crearCarpeta(carpetaVehiculo);

         // GUARDAR ARCHIVO (genera nombre único y lo guarda)
         String uid = FileUtils.guardarArchivo(archivo, carpetaVehiculo);

         // Calcular orden
         Integer ultimoOrden = videoRepository.findMaxOrdenByVehiculoId(vehiculoId);
         int nuevoOrden = (ultimoOrden == null) ? 1 : ultimoOrden + 1;

         // Crear entidad Video
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

        String rutaArchivo = uploadConfig.getRuta() +
                            video.getVehiculo().getId() +
                            "/videos/" +
                            video.getUid();
        FileUtils.eliminarArchivo(rutaArchivo);

        videoRepository.deleteById(id);
    }
}