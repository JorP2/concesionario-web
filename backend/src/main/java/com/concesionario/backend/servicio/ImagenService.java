package com.concesionario.backend.servicio;


import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.ImagenRepository;
import com.concesionario.backend.repositorio.VehiculoRepository;
import com.concesionario.backend.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
@Transactional
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    private final String CARPETA_PRINCIPAL = "uploads/vehiculos/";

    // SUBIR IMAGEN (con carpeta /imagenes)

    public Imagen subirImagen(Long vehiculoId, MultipartFile archivo) throws IOException {

        // 1. Buscar vehículo
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));

        // 2. Crear carpeta: uploads/vehiculos/1/imagenes/
        String carpetaVehiculo = CARPETA_PRINCIPAL + vehiculoId + "/imagenes/";

        FileUtils.crearCarpeta(carpetaVehiculo);


        String nombreOriginal = archivo.getOriginalFilename();
        String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
        String uid = FileUtils.generarNombreUnico(archivo.getOriginalFilename());


        Path ruta = Paths.get(carpetaVehiculo + uid);
        Files.copy(archivo.getInputStream(), ruta);


        Integer ultimoOrden = imagenRepository.findMaxOrdenByVehiculoId(vehiculoId);
        int nuevoOrden = (ultimoOrden == null) ? 1 : ultimoOrden + 1;

        Imagen imagen = new Imagen();
        imagen.setVehiculo(vehiculo);
        imagen.setUid(uid);
        imagen.setOrden(nuevoOrden);

        // Si es la primera imagen, que sea portada

        long totalImagenes = imagenRepository.countByVehiculoId(vehiculoId);
        if (totalImagenes == 0) {
            imagen.setEsPortada(true);
        } else {
            imagen.setEsPortada(false);
        }

        return imagenRepository.save(imagen);
    }

    // REORDENAR IMÁGENES

    public void reordenarImagenes(Long vehiculoId, List<Long> idsImagenes) {
        int orden = 1;
        for (Long id : idsImagenes) {
            Imagen img = imagenRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Imagen no encontrada: " + id));

            // Verificar que la imagen pertenece al vehículo
            if (!img.getVehiculo().getId().equals(vehiculoId)) {
                throw new RuntimeException("La imagen no pertenece a este vehículo");
            }

            img.setOrden(orden++);
            imagenRepository.save(img);
        }
    }

    // SUBIR VARIAS IMÁGENES

    public List<Imagen> subirMultiplesImagenes(Long vehiculoId, List<MultipartFile> archivos) throws IOException {
        for (MultipartFile archivo : archivos) {
            subirImagen(vehiculoId, archivo);
        }
        return obtenerImagenesPorVehiculo(vehiculoId);
    }


    // OBTENER IMÁGENES

    public List<Imagen> obtenerImagenesPorVehiculo(Long vehiculoId) {
        return imagenRepository.findByVehiculoIdOrderByOrdenAsc(vehiculoId);
    }


    // CAMBIAR FOTO PRINCIPAL

    public void cambiarFotoPrincipal(Long vehiculoId, Long imagenId) {
        // Quitar portada a todas
        List<Imagen> imagenes = imagenRepository.findByVehiculoIdOrderByOrdenAsc(vehiculoId);
        for (Imagen img : imagenes) {
            img.setEsPortada(false);
            imagenRepository.save(img);
        }

        // Poner portada a la seleccionada
        Imagen nuevaPortada = imagenRepository.findById(imagenId)
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada"));
        nuevaPortada.setEsPortada(true);
        imagenRepository.save(nuevaPortada);
    }

    // ELIMINAR IMAGEN

    public void eliminarImagen(Long id) {
        Imagen imagen = imagenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada"));

        // Eliminar archivo físico
        String rutaArchivo = CARPETA_PRINCIPAL +
                            imagen.getVehiculo().getId() +
                            "/imagenes/" +
                            imagen.getUid();
        File archivo = new File(rutaArchivo);
        if (archivo.exists()) {
            archivo.delete();
        }

        // Eliminar registro BD
        imagenRepository.deleteById(id);
    }
}