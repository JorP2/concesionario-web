package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dto.VideoResponseDTO;
import com.concesionario.backend.servicio.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos/{vehiculoId}/videos")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping
    public ResponseEntity<Video> subirVideo(
            @PathVariable Long vehiculoId,
            @RequestParam("video") MultipartFile archivo) {
        try {
            Video video = videoService.subirVideo(vehiculoId, archivo);
            return ResponseEntity.ok(video);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<VideoResponseDTO>> obtenerVideos(@PathVariable Long vehiculoId) {
        List<Video> videos = videoService.obtenerVideosPorVehiculo(vehiculoId);
        List<VideoResponseDTO> dtos = videos.stream().map(v -> {
            VideoResponseDTO dto = new VideoResponseDTO();
            dto.setId(v.getId());
            dto.setUrl("/api/vehiculos/uploads/" + vehiculoId + "/videos/" + v.getUid());
            dto.setOrden(v.getOrden());
            return dto;
        }).toList();
        return ResponseEntity.ok(dtos);
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> eliminarVideo(@PathVariable Long videoId) {
        videoService.eliminarVideo(videoId);
        return ResponseEntity.noContent().build();
    }
}