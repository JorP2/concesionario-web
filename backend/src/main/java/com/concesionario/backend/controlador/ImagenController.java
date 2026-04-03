package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dto.response.ImagenResponseDTO;
import com.concesionario.backend.servicio.ImagenService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos/{vehiculoId}/imagenes")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;
    
    @Autowired
    private DTOConverter dtoConverter; 

    // SUBIR MÚLTIPLES IMÁGENES
    @PostMapping
    public ResponseEntity<List<ImagenResponseDTO>> subirImagenes(
            @PathVariable Long vehiculoId,
            @RequestParam("imagenes") List<MultipartFile> archivos) {
        try {
            List<Imagen> imagenes = imagenService.subirMultiplesImagenes(vehiculoId, archivos);
            List<ImagenResponseDTO> dtos = imagenes.stream()
                    .map(dtoConverter::toImagenResponseDTO)  
                    .toList();
            return ResponseEntity.ok(dtos);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // OBTENER IMÁGENES
    @GetMapping
    public ResponseEntity<List<ImagenResponseDTO>> obtenerImagenes(@PathVariable Long vehiculoId) {
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(vehiculoId);
        List<ImagenResponseDTO> dtos = imagenes.stream()
                .map(dtoConverter::toImagenResponseDTO) 
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // CAMBIAR PORTADA
    @PutMapping("/{imagenId}/portada")
    public ResponseEntity<Void> cambiarPortada(
            @PathVariable Long vehiculoId,
            @PathVariable Long imagenId) {
        imagenService.cambiarFotoPrincipal(vehiculoId, imagenId);
        return ResponseEntity.ok().build();
    }

    // ELIMINAR IMAGEN
    @DeleteMapping("/{imagenId}")
    public ResponseEntity<Void> eliminarImagen(@PathVariable Long imagenId) {
        imagenService.eliminarImagen(imagenId);
        return ResponseEntity.noContent().build();
    }

    // REORDENAR IMÁGENES
    @PutMapping("/reordenar")
    public ResponseEntity<Void> reordenar(
            @PathVariable Long vehiculoId,
            @RequestBody List<Long> idsImagenes) {
        imagenService.reordenarImagenes(vehiculoId, idsImagenes);
        return ResponseEntity.ok().build();
    }
}