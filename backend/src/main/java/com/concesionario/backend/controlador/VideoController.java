package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dto.response.VideoResponseDTO;
import com.concesionario.backend.servicio.VideoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos/{vehiculoId}/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;
    
    @Autowired
    private DTOConverter dtoConverter;  

    @PostMapping
    public ResponseEntity<VideoResponseDTO> subirVideo(
            @PathVariable Long vehiculoId,
            @RequestParam("video") MultipartFile archivo) {
        try {
            Video video = videoService.subirVideo(vehiculoId, archivo);
            return ResponseEntity.ok(dtoConverter.toVideoResponseDTO(video));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<VideoResponseDTO>> obtenerVideos(@PathVariable Long vehiculoId) {
        List<Video> videos = videoService.obtenerVideosPorVehiculo(vehiculoId);
        List<VideoResponseDTO> dtos = videos.stream()
                .map(dtoConverter::toVideoResponseDTO) 
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> eliminarVideo(@PathVariable Long videoId) {
        videoService.eliminarVideo(videoId);
        return ResponseEntity.noContent().build();
    }
}