package com.concesionario.backend.utils;

import com.concesionario.backend.dominio.*;
import com.concesionario.backend.dto.*;

public class DTOConverter {

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

    public static VehiculoResponseDTO toVehiculoResponseDTO(Vehiculo vehiculo, String baseUrl) {
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
        dto.setFechaFinOferta(vehiculo.getFechaFinOferta() != null ?
            vehiculo.getFechaFinOferta().toString() : null);
        dto.setEstadoVenta(vehiculo.getEstadoVenta());
        // Las imágenes se setean aparte
        return dto;
    }

    public static ImagenResponseDTO toImagenResponseDTO(Imagen imagen, String baseUrl) {
        if (imagen == null) return null;
        ImagenResponseDTO dto = new ImagenResponseDTO();
        dto.setId(imagen.getId());
        dto.setUrl(baseUrl + "/" + imagen.getUid());
        dto.setOrden(imagen.getOrden());
        dto.setEsPortada(imagen.getEsPortada());
        return dto;
    }
}