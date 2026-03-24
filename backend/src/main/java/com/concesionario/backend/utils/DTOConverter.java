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

public class DTOConverter {

	// 0. LOGIN
	// LoginRequest → Usuario
    public static Usuario toEntity(LoginRequest request) {
        if (request == null) return null;
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());
        return usuario;
    }

	//  1. USUARIO
	// Entidad → Response
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

	// UsuarioRequestDTO → Usuario
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


	//  2. VEHICULO
	// Entidad → Response

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

	// VehiculoRequestDTO → Vehiculo
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

	//  3. IMAGEN
	// Entidad → Response
	public static ImagenResponseDTO toImagenResponseDTO(Imagen imagen) {
	    if (imagen == null) return null;
	    ImagenResponseDTO dto = new ImagenResponseDTO();
	    dto.setId(imagen.getId());
	    dto.setUrl(imagen.getUid());
	    dto.setOrden(imagen.getOrden());
	    dto.setEsPortada(imagen.getEsPortada());
	    return dto;
	}

	//  4. VIDEO
	// Entidad → Response
	public static VideoResponseDTO toVideoResponseDTO(Video video) {
	    if (video == null) return null;
	    VideoResponseDTO dto = new VideoResponseDTO();
	    dto.setId(video.getId());
	    dto.setUrl(video.getUid());
	    dto.setOrden(video.getOrden());
	    return dto;
	}
}