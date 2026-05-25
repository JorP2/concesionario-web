package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.CategoriaGaleria;
import com.concesionario.backend.dominio.Galeria;
import com.concesionario.backend.repositorio.GaleriaRepository;
import com.concesionario.backend.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class GaleriaService {

    @Autowired
    private GaleriaRepository galeriaRepository;

    private final String RUTA_GALERIA = "uploads/galeria/";

    // ========== SUBIR UNA IMAGEN ==========
    public Galeria subirImagen(CategoriaGaleria categoria, MultipartFile archivo) throws IOException {
        // Validar que es imagen
        if (!FileUtils.esImagen(archivo)) {
            throw new RuntimeException("El archivo debe ser una imagen válida (JPEG, PNG, JPG, GIF)");
        }

        // Crear carpeta si no existe
        File carpeta = new File(RUTA_GALERIA);
        if (!carpeta.exists()) {
            carpeta.mkdirs();
        }

        // Guardar archivo con UUID
        String uid = FileUtils.guardarArchivo(archivo, RUTA_GALERIA);
        
        // Guardar en BD
        return galeriaRepository.save(new Galeria(categoria, uid));
    }

    // ========== OBTENER IMÁGENES POR CATEGORÍA ==========
    public List<Galeria> obtenerPorCategoria(CategoriaGaleria categoria) {
        return galeriaRepository.findByCategoria(categoria);
    }

    // ========== OBTENER TODAS LAS IMÁGENES ==========
    public List<Galeria> obtenerTodas() {
        return galeriaRepository.findAll();
    }

    // ========== ELIMINAR UNA IMAGEN POR ID ==========
    public void eliminar(Long id) {
        Galeria imagen = galeriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada"));
        
        // Eliminar archivo físico
        String rutaArchivo = RUTA_GALERIA + imagen.getUid();
        FileUtils.eliminarArchivo(rutaArchivo);
        
        // Eliminar registro de BD
        galeriaRepository.deleteById(id);
    }

    // ========== ELIMINAR TODAS LAS IMÁGENES DE UNA CATEGORÍA ==========
    public int eliminarPorCategoria(CategoriaGaleria categoria) {
        List<Galeria> imagenes = galeriaRepository.findByCategoria(categoria);
        
        for (Galeria imagen : imagenes) {
            // Eliminar archivo físico
            String rutaArchivo = RUTA_GALERIA + imagen.getUid();
            FileUtils.eliminarArchivo(rutaArchivo);
        }
        
        // Eliminar registros de BD
        galeriaRepository.deleteAll(imagenes);
        
        return imagenes.size();
    }

    // ========== ELIMINAR TODAS LAS IMÁGENES ==========
    public int eliminarTodas() {
        List<Galeria> imagenes = galeriaRepository.findAll();
        
        for (Galeria imagen : imagenes) {
            // Eliminar archivo físico
            String rutaArchivo = RUTA_GALERIA + imagen.getUid();
            FileUtils.eliminarArchivo(rutaArchivo);
        }
        
        // Eliminar registros de BD
        galeriaRepository.deleteAll();
        
        return imagenes.size();
    }

    // ========== CONTAR IMÁGENES POR CATEGORÍA ==========
    public long contarPorCategoria(CategoriaGaleria categoria) {
        return galeriaRepository.countByCategoria(categoria);
    }

    // ========== EXISTE IMAGEN ==========
    public boolean existe(Long id) {
        return galeriaRepository.existsById(id);
    }
}