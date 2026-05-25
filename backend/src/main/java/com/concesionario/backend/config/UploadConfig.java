package com.concesionario.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;
import java.io.File;

@Configuration
@ConfigurationProperties(prefix = "upload")
public class UploadConfig {

    private String ruta = "uploads/vehiculos/";

    @PostConstruct
    public void init() {
        File carpeta = new File(ruta);
        if (!carpeta.exists()) {
            carpeta.mkdirs();
            System.out.println("Carpeta creada: " + ruta);
        }
        // Crear carpeta para galería
        crearCarpetaGaleria();
    }

    public String getRuta() { return ruta; }
    public void setRuta(String ruta) { this.ruta = ruta; }

    // NUEVO MÉTODO para la galería
    public String getRutaGaleria() {
        return "uploads/galeria/";
    }

    private void crearCarpetaGaleria() {
        File carpetaGaleria = new File(getRutaGaleria());
        if (!carpetaGaleria.exists()) {
            carpetaGaleria.mkdirs();
            System.out.println("Carpeta creada: " + getRutaGaleria());
        }
    }
}