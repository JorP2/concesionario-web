package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.CategoriaGaleria;
import com.concesionario.backend.dominio.Galeria;
import com.concesionario.backend.servicio.GaleriaService;
import com.concesionario.backend.utils.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/galeria")
public class GaleriaController {

    @Autowired
    private GaleriaService galeriaService;

    @Autowired
    private UrlService urlService;

    // ========== SUBIR UNA IMAGEN ==========
    @PostMapping("/subir")
    public ResponseEntity<?> subir(@RequestParam("imagen") MultipartFile archivo,
                                   @RequestParam("categoria") String categoriaStr) {
        try {
            // Validar que haya archivo
            if (archivo == null || archivo.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Debe seleccionar una imagen"
                ));
            }
            
            // Validar tamaño (máx 10MB)
            if (archivo.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "La imagen no puede superar los 10MB"
                ));
            }
            
            // Validar categoría
            CategoriaGaleria categoria;
            try {
                categoria = CategoriaGaleria.valueOf(categoriaStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Categoría no válida. Usa: CONCESIONARIO, TALLER, ENTREGAS"
                ));
            }
            
            // Validar formato de imagen
            String contentType = archivo.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "El archivo debe ser una imagen (JPEG, PNG, JPG, GIF)"
                ));
            }
            
            Galeria imagen = galeriaService.subirImagen(categoria, archivo);
            
            return ResponseEntity.ok(Map.of(
                "id", imagen.getId(),
                "url", urlService.getGaleriaImageUrl(imagen.getUid()),
                "mensaje", "Imagen subida correctamente"
            ));
            
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error al guardar la imagen en el servidor. Intente nuevamente."
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error interno del servidor"
            ));
        }
    }

    // ========== SUBIR MÚLTIPLES IMÁGENES ==========
    @PostMapping("/subir-multiples")
    public ResponseEntity<?> subirMultiples(@RequestParam("imagenes") List<MultipartFile> archivos,
                                            @RequestParam("categoria") String categoriaStr) {
        try {
            // Validar categoría
            CategoriaGaleria categoria;
            try {
                categoria = CategoriaGaleria.valueOf(categoriaStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Categoría no válida. Usa: CONCESIONARIO, TALLER, ENTREGAS"
                ));
            }
            
            if (archivos == null || archivos.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Debe seleccionar al menos una imagen"
                ));
            }
            
            List<Map<String, Object>> exitos = new ArrayList<>();
            List<Map<String, Object>> errores = new ArrayList<>();
            int subidas = 0;
            
            for (MultipartFile archivo : archivos) {
                try {
                    // Validar tamaño
                    if (archivo.getSize() > 10 * 1024 * 1024) {
                        errores.add(Map.of(
                            "nombre", archivo.getOriginalFilename(),
                            "error", "La imagen supera los 10MB"
                        ));
                        continue;
                    }
                    
                    String contentType = archivo.getContentType();
                    if (contentType == null || !contentType.startsWith("image/")) {
                        errores.add(Map.of(
                            "nombre", archivo.getOriginalFilename(),
                            "error", "No es una imagen válida"
                        ));
                        continue;
                    }
                    
                    Galeria imagen = galeriaService.subirImagen(categoria, archivo);
                    exitos.add(Map.of(
                        "id", imagen.getId(),
                        "url", urlService.getGaleriaImageUrl(imagen.getUid()),
                        "nombre", archivo.getOriginalFilename()
                    ));
                    subidas++;
                    
                } catch (IOException e) {
                    errores.add(Map.of(
                        "nombre", archivo.getOriginalFilename(),
                        "error", "Error al guardar la imagen"
                    ));
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("total", archivos.size());
            response.put("subidas", subidas);
            response.put("exitos", exitos);
            response.put("errores", errores);
            response.put("mensaje", subidas + " imagen(es) subida(s) correctamente");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error interno del servidor"
            ));
        }
    }

    // ========== OBTENER IMÁGENES POR CATEGORÍA ==========
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<?> obtener(@PathVariable String categoria) {
        try {
            CategoriaGaleria cat = CategoriaGaleria.valueOf(categoria.toUpperCase());
            List<Galeria> imagenes = galeriaService.obtenerPorCategoria(cat);
            
            if (imagenes.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "mensaje", "No hay imágenes en esta categoría",
                    "categoria", categoria,
                    "total", 0,
                    "imagenes", List.of()
                ));
            }
            
            List<Map<String, Object>> res = imagenes.stream().map(img -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", img.getId());
                map.put("url", urlService.getGaleriaImageUrl(img.getUid()));
                return map;
            }).collect(Collectors.toList());
            
            return ResponseEntity.ok(Map.of(
                "categoria", categoria,
                "total", res.size(),
                "imagenes", res
            ));
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Categoría no válida. Usa: CONCESIONARIO, TALLER, ENTREGAS"
            ));
        }
    }

    // ========== OBTENER TODAS LAS IMÁGENES ==========
    @GetMapping("/todas")
    public ResponseEntity<?> obtenerTodas() {
        List<Galeria> imagenes = galeriaService.obtenerTodas();
        
        if (imagenes.isEmpty()) {
            return ResponseEntity.ok(Map.of(
                "mensaje", "No hay imágenes en la galería",
                "total", 0,
                "imagenes", List.of()
            ));
        }
        
        Map<String, List<Map<String, Object>>> agrupadas = new HashMap<>();
        
        for (Galeria img : imagenes) {
            String cat = img.getCategoria().name();
            agrupadas.computeIfAbsent(cat, k -> new ArrayList<>()).add(Map.of(
                "id", img.getId(),
                "url", urlService.getGaleriaImageUrl(img.getUid())
            ));
        }
        
        return ResponseEntity.ok(Map.of(
            "total", imagenes.size(),
            "porCategoria", agrupadas
        ));
    }

    // ========== ELIMINAR IMAGEN ==========
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            galeriaService.eliminar(id);
            return ResponseEntity.ok(Map.of(
                "mensaje", "Imagen eliminada correctamente"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "error", "Imagen no encontrada"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error al eliminar la imagen"
            ));
        }
    }

    // ========== ELIMINAR POR CATEGORÍA ==========
    @DeleteMapping("/categoria/{categoria}")
    public ResponseEntity<?> eliminarPorCategoria(@PathVariable String categoria) {
        try {
            CategoriaGaleria cat = CategoriaGaleria.valueOf(categoria.toUpperCase());
            int eliminadas = galeriaService.eliminarPorCategoria(cat);
            return ResponseEntity.ok(Map.of(
                "mensaje", "Se eliminaron " + eliminadas + " imágenes",
                "categoria", categoria,
                "eliminadas", eliminadas
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Categoría no válida. Usa: CONCESIONARIO, TALLER, ENTREGAS"
            ));
        }
    }
}