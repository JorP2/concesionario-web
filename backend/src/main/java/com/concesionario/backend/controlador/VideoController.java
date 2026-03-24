package com.concesionario.backend.controlador;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dto.response.VideoResponseDTO;
import com.concesionario.backend.servicio.VideoService;
import com.concesionario.backend.utils.DTOConverter;

@RestController
@RequestMapping("/api/vehiculos/{vehiculoId}/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    // SUBIR VIDEO
    @PostMapping
    public ResponseEntity<VideoResponseDTO> subirVideo(
            @PathVariable Long vehiculoId,
            @RequestParam("video") MultipartFile archivo) {
        try {
            Video video = videoService.subirVideo(vehiculoId, archivo);
            return ResponseEntity.ok(DTOConverter.toVideoResponseDTO(video));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // OBTENER VIDEOS
    @GetMapping
    public ResponseEntity<List<VideoResponseDTO>> obtenerVideos(@PathVariable Long vehiculoId) {
        List<Video> videos = videoService.obtenerVideosPorVehiculo(vehiculoId);
        List<VideoResponseDTO> dtos = videos.stream()
                .map(DTOConverter::toVideoResponseDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // ELIMINAR VIDEO
    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> eliminarVideo(@PathVariable Long videoId) {
        videoService.eliminarVideo(videoId);
        return ResponseEntity.noContent().build();
    }
}