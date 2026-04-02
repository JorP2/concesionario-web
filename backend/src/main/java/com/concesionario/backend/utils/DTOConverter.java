package com.concesionario.backend.utils;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dto.request.LoginRequest;
import com.concesionario.backend.dto.request.UsuarioRequestDTO;
import com.concesionario.backend.dto.request.VehiculoRequestDTO;
import com.concesionario.backend.dto.response.ImagenResponseDTO;
import com.concesionario.backend.dto.response.UsuarioResponseDTO;
import com.concesionario.backend.dto.response.VehiculoResponseDTO;
import com.concesionario.backend.dto.response.VideoResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DTOConverter {

    @Autowired
    private UrlService urlService;

    // ========== LOGIN ==========
    public static Usuario toEntity(LoginRequest request) {
        if (request == null) return null;
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());
        return usuario;
    }

    // ========== USUARIO ==========
    public static UsuarioResponseDTO toUsuarioResponseDTO(Usuario usuario) {
        if (usuario == null) return null;
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setUsername(usuario.getUsername());
        dto.setNombre(usuario.getNombre());
        dto.setEmail(usuario.getEmail());
        dto.setTelefono(usuario.getTelefono());
        dto.setActivo(usuario.getActivo());
        dto.setEsSuperUsuario(usuario.getEsSuperUsuario());
        return dto;
    }

    public static Usuario toEntity(UsuarioRequestDTO request) {
        if (request == null) return null;
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setTelefono(request.getTelefono());
        usuario.setPassword(request.getPassword());
        return usuario;
    }

    // ========== VEHÍCULO ==========
    
    // Entidad → Response (básico, sin imágenes/videos)
    public static VehiculoResponseDTO toVehiculoResponseDTO(Vehiculo vehiculo) {
        if (vehiculo == null) return null;
        VehiculoResponseDTO dto = new VehiculoResponseDTO();
        dto.setId(vehiculo.getId());
        dto.setMarca(vehiculo.getMarca());
        dto.setModelo(vehiculo.getModelo());
        dto.setPrecio(vehiculo.getPrecio());
        dto.setAnio(vehiculo.getAnio());
        dto.setKilometros(vehiculo.getKilometros());
        dto.setCombustible(vehiculo.getCombustible());
        dto.setColorExterior(vehiculo.getColorExterior());
        dto.setInterior(vehiculo.getInterior());
        dto.setAsientos(vehiculo.getAsientos());
        dto.setPuertas(vehiculo.getPuertas());
        dto.setMotor(vehiculo.getMotor());
        dto.setCambio(vehiculo.getCambio());
        dto.setPegatina(vehiculo.getPegatina());
        dto.setDescripcion(vehiculo.getDescripcion());
        dto.setExtras(vehiculo.getExtras());
        dto.setEnOferta(vehiculo.getEnOferta());
        dto.setPrecioOferta(vehiculo.getPrecioOferta());
        dto.setFechaFinOferta(DateUtils.formatearParaJSON(vehiculo.getFechaFinOferta()));
        dto.setEstadoVenta(vehiculo.getEstadoVenta());
        return dto;
    }

    // Entidad → Response (completo, con imágenes y videos)
    public VehiculoResponseDTO toVehiculoResponseDTO(Vehiculo vehiculo, List<Imagen> imagenes) {
        VehiculoResponseDTO dto = toVehiculoResponseDTO(vehiculo);
        
        // Lista completa de imágenes
        dto.setImagenes(imagenes.stream()
            .map(img -> urlService.getImageUrl(vehiculo.getId(), img.getUid()))
            .toList());
        
        // Portada (la que tiene esPortada = true)
        Imagen portada = imagenes.stream()
            .filter(Imagen::getEsPortada)
            .findFirst()
            .orElse(null);
        
        if (portada != null) {
            dto.setImagenPortada(urlService.getImageUrl(vehiculo.getId(), portada.getUid()));
        }
        
        return dto;
    }

    public static Vehiculo toEntity(VehiculoRequestDTO request) {
        if (request == null) return null;
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setMarca(request.getMarca());
        vehiculo.setModelo(request.getModelo());
        vehiculo.setPrecio(request.getPrecio());
        vehiculo.setAnio(request.getAnio());
        vehiculo.setKilometros(request.getKilometros());
        vehiculo.setCombustible(request.getCombustible());
        vehiculo.setColorExterior(request.getColorExterior());
        vehiculo.setInterior(request.getInterior());
        vehiculo.setAsientos(request.getAsientos());
        vehiculo.setPuertas(request.getPuertas());
        vehiculo.setMotor(request.getMotor());
        vehiculo.setCambio(request.getCambio());
        vehiculo.setPegatina(request.getPegatina());
        vehiculo.setDescripcion(request.getDescripcion());
        vehiculo.setExtras(request.getExtras());
        return vehiculo;
    }

    // ========== IMAGEN ==========
    public ImagenResponseDTO toImagenResponseDTO(Imagen imagen) {
        if (imagen == null) return null;
        ImagenResponseDTO dto = new ImagenResponseDTO();
        dto.setId(imagen.getId());
        dto.setUrl(urlService.getImageUrl(imagen.getVehiculo().getId(), imagen.getUid()));
        dto.setOrden(imagen.getOrden());
        dto.setEsPortada(imagen.getEsPortada());
        return dto;
    }

    // ========== VIDEO ==========
    public VideoResponseDTO toVideoResponseDTO(Video video) {
        if (video == null) return null;
        VideoResponseDTO dto = new VideoResponseDTO();
        dto.setId(video.getId());
        dto.setUrl(urlService.getVideoUrl(video.getVehiculo().getId(), video.getUid()));
        dto.setOrden(video.getOrden());
        return dto;
    }
}