package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dto.ImagenResponseDTO;
import com.concesionario.backend.servicio.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos/{vehiculoId}/imagenes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    @PostMapping
    public ResponseEntity<List<Imagen>> subirImagenes(
            @PathVariable Long vehiculoId,
            @RequestParam("imagenes") List<MultipartFile> archivos) {
        try {
            List<Imagen> imagenes = imagenService.subirMultiplesImagenes(vehiculoId, archivos);
            return ResponseEntity.ok(imagenes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ImagenResponseDTO>> obtenerImagenes(@PathVariable Long vehiculoId) {
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(vehiculoId);
        List<ImagenResponseDTO> dtos = imagenes.stream().map(i -> {
            ImagenResponseDTO dto = new ImagenResponseDTO();
            dto.setId(i.getId());
            dto.setUrl("/api/vehiculos/uploads/" + vehiculoId + "/imagenes/" + i.getUid());
            dto.setOrden(i.getOrden());
            dto.setEsPortada(i.getEsPortada());
            return dto;
        }).toList();
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{imagenId}/portada")
    public ResponseEntity<Void> cambiarPortada(
            @PathVariable Long vehiculoId,
            @PathVariable Long imagenId) {
        imagenService.cambiarFotoPrincipal(vehiculoId, imagenId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(@PathVariable Long imagenId) {
        imagenService.eliminarImagen(imagenId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/reordenar")
    public ResponseEntity<Void> reordenar(
            @PathVariable Long vehiculoId,
            @RequestBody List<Long> idsImagenes) {
        imagenService.reordenarImagenes(vehiculoId, idsImagenes);
        return ResponseEntity.ok().build();
    }
}