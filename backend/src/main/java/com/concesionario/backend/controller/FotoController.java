package com.concesionario.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*")
public class FotoController {

    // 📁 Carpeta principal para fotos (RUTA RELATIVA - funciona en cualquier PC)
    private final String CARPETA_PRINCIPAL = "uploads/vehiculos/";

    // =========================================
    // SUBIR FOTO(S) PARA UN VEHÍCULO
    // =========================================
    @PostMapping("/{id}/fotos")
    public ResponseEntity<String> subirFotos(
            @PathVariable Long id,
            @RequestParam("fotos") List<MultipartFile> fotos) {

        try {
            // 📁 Crear carpeta del vehículo si no existe
            String carpetaVehiculo = CARPETA_PRINCIPAL + id + "/";
            File directorio = new File(carpetaVehiculo);
            if (!directorio.exists()) {
                directorio.mkdirs();
                System.out.println("📁 Carpeta creada: " + carpetaVehiculo);
            }

            // Guardar cada foto con nombre único
            for (MultipartFile foto : fotos) {
                String nombreOriginal = foto.getOriginalFilename();
                String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
                String nombreUnico = UUID.randomUUID().toString() + extension;

                Path ruta = Paths.get(carpetaVehiculo + nombreUnico);
                Files.copy(foto.getInputStream(), ruta);
                System.out.println("✅ Foto guardada: " + ruta);
            }

            return ResponseEntity.ok("Fotos guardadas para el vehículo " + id);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error al guardar fotos: " + e.getMessage());
        }
    }

    // =========================================
    // OBTENER TODAS LAS FOTOS DE UN VEHÍCULO
    // =========================================
    @GetMapping("/{id}/fotos")
    public ResponseEntity<List<String>> obtenerFotos(@PathVariable Long id) {
        String carpetaVehiculo = CARPETA_PRINCIPAL + id + "/";
        File directorio = new File(carpetaVehiculo);

        List<String> fotos = new ArrayList<>();

        if (directorio.exists() && directorio.isDirectory()) {
            File[] archivos = directorio.listFiles();
            if (archivos != null) {
                for (File archivo : archivos) {
                    if (archivo.isFile()) {
                        // Devolver URL para acceder a la foto
                        fotos.add("/api/vehiculos/uploads/" + id + "/" + archivo.getName());
                    }
                }
            }
            System.out.println("📸 Fotos encontradas para vehículo " + id + ": " + fotos.size());
        } else {
            System.out.println("⚠️ No existe carpeta para vehículo " + id);
        }

        return ResponseEntity.ok(fotos);
    }

    // =========================================
    // SERVIR LAS FOTOS (NUEVO - ESTO ES LO QUE FALTA)
    // =========================================
    @GetMapping("/uploads/{id}/{nombreFoto:.+}")
    public ResponseEntity<Resource> servirFoto(
            @PathVariable Long id,
            @PathVariable String nombreFoto) {

        try {
            // Construir la ruta completa del archivo
            String rutaArchivo = CARPETA_PRINCIPAL + id + "/" + nombreFoto;
            Path ruta = Paths.get(rutaArchivo);
            Resource recurso = new UrlResource(ruta.toUri());

            System.out.println("🔍 Buscando foto: " + rutaArchivo);
            System.out.println("📁 Ruta absoluta: " + ruta.toAbsolutePath());

            if (recurso.exists() && recurso.isReadable()) {
                // Detectar el tipo de archivo
                String contentType = Files.probeContentType(ruta);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + recurso.getFilename() + "\"")
                        .body(recurso);
            } else {
                System.out.println("❌ Foto NO encontrada: " + rutaArchivo);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    // =========================================
    // ELIMINAR UNA FOTO ESPECÍFICA
    // =========================================
    @DeleteMapping("/{id}/fotos/{nombreFoto}")
    public ResponseEntity<String> eliminarFoto(
            @PathVariable Long id,
            @PathVariable String nombreFoto) {

        String rutaFoto = CARPETA_PRINCIPAL + id + "/" + nombreFoto;
        File foto = new File(rutaFoto);

        if (foto.exists() && foto.delete()) {
            System.out.println("🗑️ Foto eliminada: " + rutaFoto);
            return ResponseEntity.ok("Foto eliminada");
        }

        return ResponseEntity.notFound().build();
    }

    // =========================================
    // ELIMINAR TODAS LAS FOTOS DE UN VEHÍCULO
    // =========================================
    @DeleteMapping("/{id}/fotos")
    public ResponseEntity<String> eliminarTodasFotos(@PathVariable Long id) {
        String carpetaVehiculo = CARPETA_PRINCIPAL + id + "/";
        File directorio = new File(carpetaVehiculo);

        if (directorio.exists() && directorio.isDirectory()) {
            File[] archivos = directorio.listFiles();
            if (archivos != null) {
                for (File archivo : archivos) {
                    archivo.delete();
                }
            }
            directorio.delete();
            System.out.println("🗑️ Todas las fotos eliminadas para vehículo " + id);
        }

        return ResponseEntity.ok("Todas las fotos eliminadas");
    }
}