package com.concesionario.backend.servicio;


import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.concesionario.backend.config.UploadConfig;
import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.ImagenRepository;
import com.concesionario.backend.repositorio.VehiculoRepository;
import com.concesionario.backend.utils.FileUtils;


@Service
@Transactional
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UploadConfig uploadConfig;


    // SUBIR IMAGEN (con carpeta /imagenes)

    public Imagen subirImagen(Long vehiculoId, MultipartFile archivo) throws IOException {

        // VALIDAR QUE SEA IMAGEN
        if (!FileUtils.esImagen(archivo)) {
            throw new RuntimeException("El archivo debe ser una imagen (JPEG, PNG, JPG, GIF)");
        }

        // Buscar vehículo
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));

        // Crear carpeta: uploads/vehiculos/1/imagenes/
        String carpetaVehiculo = uploadConfig.getRuta() + vehiculoId + "/imagenes/";
        FileUtils.crearCarpeta(carpetaVehiculo);

        //  GUARDAR ARCHIVO (genera nombre único y lo guarda)
        String uid = FileUtils.guardarArchivo(archivo, carpetaVehiculo);

        // Calcular orden
        Integer ultimoOrden = imagenRepository.findMaxOrdenByVehiculoId(vehiculoId);
        int nuevoOrden = (ultimoOrden == null) ? 1 : ultimoOrden + 1;

        // Crear entidad Imagen
        Imagen imagen = new Imagen();
        imagen.setVehiculo(vehiculo);
        imagen.setUid(uid);
        imagen.setOrden(nuevoOrden);

        // Si es la primera imagen, que sea portada
        long totalImagenes = imagenRepository.countByVehiculoId(vehiculoId);
        imagen.setEsPortada(totalImagenes == 0);

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
        String rutaArchivo = uploadConfig.getRuta() +
                            imagen.getVehiculo().getId() +
                            "/imagenes/" +
                            imagen.getUid();
        FileUtils.eliminarArchivo(rutaArchivo);

        // Eliminar registro BD
        imagenRepository.deleteById(id);
    }
}