package com.concesionario.backend.utils;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUtils {

    // Generar nombre único
    public static String generarNombreUnico(String nombreOriginal) {
        String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
        return UUID.randomUUID().toString() + extension;
    }

    // Validar que es imagen
    public static boolean esImagen(MultipartFile archivo) {
        String contentType = archivo.getContentType();
        return contentType != null && (
            contentType.equals("image/jpeg") ||
            contentType.equals("image/png") ||
            contentType.equals("image/jpg") ||
            contentType.equals("image/gif")
        );
    }

    // Validar que es video
    public static boolean esVideo(MultipartFile archivo) {
        String contentType = archivo.getContentType();
        return contentType != null && (
            contentType.equals("video/mp4") ||
            contentType.equals("video/mpeg") ||
            contentType.equals("video/quicktime")
        );
    }

    // Crear carpeta si no existe
    public static void crearCarpeta(String ruta) {
        File carpeta = new File(ruta);
        if (!carpeta.exists()) {
            carpeta.mkdirs();
        }
    }

    // Guardar archivo
    public static String guardarArchivo(MultipartFile archivo, String rutaDestino) throws IOException {
        String nombreUnico = generarNombreUnico(archivo.getOriginalFilename());
        Path ruta = Paths.get(rutaDestino + nombreUnico);
        Files.copy(archivo.getInputStream(), ruta);
        return nombreUnico;
    }

    // Eliminar archivo
    public static boolean eliminarArchivo(String rutaCompleta) {
        File archivo = new File(rutaCompleta);
        return archivo.exists() && archivo.delete();
    }
}