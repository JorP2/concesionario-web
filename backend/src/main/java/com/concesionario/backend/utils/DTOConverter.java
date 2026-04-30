package com.concesionario.backend.utils;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import com.concesionario.backend.dto.request.LoginRequest;
import com.concesionario.backend.dto.request.UsuarioRequestDTO;
import com.concesionario.backend.dto.request.TurismoRequestDTO;
import com.concesionario.backend.dto.request.FurgonetaRequestDTO;
import com.concesionario.backend.dto.request.ScooterRequestDTO;
import com.concesionario.backend.dto.response.ImagenResponseDTO;
import com.concesionario.backend.dto.response.UsuarioResponseDTO;
import com.concesionario.backend.dto.response.TurismoResponseDTO;
import com.concesionario.backend.dto.response.FurgonetaResponseDTO;
import com.concesionario.backend.dto.response.ScooterResponseDTO;
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

    // ========== CONVERSIÓN PARA TURISMO ==========
    
    public Turismo toTurismoEntity(TurismoRequestDTO request) {
        if (request == null) return null;
        Turismo turismo = new Turismo();
        
        // Campos comunes (de Vehiculo)
        turismo.setMarca(request.getMarca());
        turismo.setModelo(request.getModelo());
        turismo.setPrecio(request.getPrecio());
        turismo.setAnio(request.getAnio());
        turismo.setKilometros(request.getKilometros());
        turismo.setCombustible(request.getCombustible());
        turismo.setColorExterior(request.getColorExterior());
        turismo.setDescripcion(request.getDescripcion());
        turismo.setExtras(request.getExtras());
        
        // Campos de Coche
        turismo.setInterior(request.getInterior());
        turismo.setAsientos(request.getAsientos());
        turismo.setPuertas(request.getPuertas());
        turismo.setMotor(request.getMotor());
        turismo.setCambio(request.getCambio());
        turismo.setPegatina(request.getPegatina());
        
        // Campos específicos de Turismo
        turismo.setTieneAireAcondicionado(request.getTieneAireAcondicionado());
        turismo.setTieneNavegacion(request.getTieneNavegacion());
        
        return turismo;
    }
    
    public TurismoResponseDTO toTurismoResponseDTO(Turismo turismo) {
        if (turismo == null) return null;
        TurismoResponseDTO dto = new TurismoResponseDTO();
        
        // Campos comunes
        dto.setId(turismo.getId());
        dto.setMarca(turismo.getMarca());
        dto.setModelo(turismo.getModelo());
        dto.setPrecio(turismo.getPrecio());
        dto.setAnio(turismo.getAnio());
        dto.setKilometros(turismo.getKilometros());
        dto.setCombustible(turismo.getCombustible());
        dto.setColorExterior(turismo.getColorExterior());
        dto.setDescripcion(turismo.getDescripcion());
        dto.setExtras(turismo.getExtras());
        dto.setVisible(turismo.getVisible());
        dto.setEnOferta(turismo.getEnOferta());
        dto.setPrecioOferta(turismo.getPrecioOferta());
        dto.setFechaFinOferta(DateUtils.formatearParaJSON(turismo.getFechaFinOferta()));
        dto.setEstadoVenta(turismo.getEstadoVenta());
        
        // Campos de Coche
        dto.setInterior(turismo.getInterior());
        dto.setAsientos(turismo.getAsientos());
        dto.setPuertas(turismo.getPuertas());
        dto.setMotor(turismo.getMotor());
        dto.setCambio(turismo.getCambio());
        dto.setPegatina(turismo.getPegatina());
        
        // Campos específicos de Turismo
        dto.setTieneAireAcondicionado(turismo.getTieneAireAcondicionado());
        dto.setTieneNavegacion(turismo.getTieneNavegacion());
        
        return dto;
    }
    
    // ========== CONVERSIÓN PARA FURGONETA ==========
    
    public Furgoneta toFurgonetaEntity(FurgonetaRequestDTO request) {
        if (request == null) return null;
        Furgoneta furgoneta = new Furgoneta();
        
        // Campos comunes
        furgoneta.setMarca(request.getMarca());
        furgoneta.setModelo(request.getModelo());
        furgoneta.setPrecio(request.getPrecio());
        furgoneta.setAnio(request.getAnio());
        furgoneta.setKilometros(request.getKilometros());
        furgoneta.setCombustible(request.getCombustible());
        furgoneta.setColorExterior(request.getColorExterior());
        furgoneta.setDescripcion(request.getDescripcion());
        furgoneta.setExtras(request.getExtras());
        
        // Campos de Coche
        furgoneta.setInterior(request.getInterior());
        furgoneta.setAsientos(request.getAsientos());
        furgoneta.setPuertas(request.getPuertas());
        furgoneta.setMotor(request.getMotor());
        furgoneta.setCambio(request.getCambio());
        furgoneta.setPegatina(request.getPegatina());
        
        // Campos específicos de Furgoneta
        furgoneta.setCapacidadCarga(request.getCapacidadCarga());
        furgoneta.setNumeroAsientos(request.getNumeroAsientos());
        furgoneta.setTienePuertaCorredera(request.getTienePuertaCorredera());
        
        return furgoneta;
    }
    
    public FurgonetaResponseDTO toFurgonetaResponseDTO(Furgoneta furgoneta) {
        if (furgoneta == null) return null;
        FurgonetaResponseDTO dto = new FurgonetaResponseDTO();
        
        // Campos comunes
        dto.setId(furgoneta.getId());
        dto.setMarca(furgoneta.getMarca());
        dto.setModelo(furgoneta.getModelo());
        dto.setPrecio(furgoneta.getPrecio());
        dto.setAnio(furgoneta.getAnio());
        dto.setKilometros(furgoneta.getKilometros());
        dto.setCombustible(furgoneta.getCombustible());
        dto.setColorExterior(furgoneta.getColorExterior());
        dto.setDescripcion(furgoneta.getDescripcion());
        dto.setExtras(furgoneta.getExtras());
        dto.setVisible(furgoneta.getVisible());
        dto.setEnOferta(furgoneta.getEnOferta());
        dto.setPrecioOferta(furgoneta.getPrecioOferta());
        dto.setFechaFinOferta(DateUtils.formatearParaJSON(furgoneta.getFechaFinOferta()));
        dto.setEstadoVenta(furgoneta.getEstadoVenta());
        
        // Campos de Coche
        dto.setInterior(furgoneta.getInterior());
        dto.setAsientos(furgoneta.getAsientos());
        dto.setPuertas(furgoneta.getPuertas());
        dto.setMotor(furgoneta.getMotor());
        dto.setCambio(furgoneta.getCambio());
        dto.setPegatina(furgoneta.getPegatina());
        
        // Campos específicos de Furgoneta
        dto.setCapacidadCarga(furgoneta.getCapacidadCarga());
        dto.setNumeroAsientos(furgoneta.getNumeroAsientos());
        dto.setTienePuertaCorredera(furgoneta.getTienePuertaCorredera());
        
        return dto;
    }
    
    // ========== CONVERSIÓN PARA SCOOTER ==========
    
    public Scooter toScooterEntity(ScooterRequestDTO request) {
        if (request == null) return null;
        Scooter scooter = new Scooter();
        
        // Campos comunes
        scooter.setMarca(request.getMarca());
        scooter.setModelo(request.getModelo());
        scooter.setPrecio(request.getPrecio());
        scooter.setAnio(request.getAnio());
        scooter.setKilometros(request.getKilometros());
        scooter.setCombustible(request.getCombustible());
        scooter.setColorExterior(request.getColorExterior());
        scooter.setDescripcion(request.getDescripcion());
        scooter.setExtras(request.getExtras());
        
        // Campos de Motocicleta
        scooter.setCilindrada(request.getCilindrada());
        scooter.setTipoMotor(request.getTipoMotor());
        scooter.setTieneSidecar(request.getTieneSidecar());
        scooter.setTieneBaul(request.getTieneBaul());
        
        // Campos específicos de Scooter
        scooter.setTieneMaletinBajoAsiento(request.getTieneMaletinBajoAsiento());
        scooter.setAutonomia(request.getAutonomia());
        
        return scooter;
    }
    
    public ScooterResponseDTO toScooterResponseDTO(Scooter scooter) {
        if (scooter == null) return null;
        ScooterResponseDTO dto = new ScooterResponseDTO();
        
        // Campos comunes
        dto.setId(scooter.getId());
        dto.setMarca(scooter.getMarca());
        dto.setModelo(scooter.getModelo());
        dto.setPrecio(scooter.getPrecio());
        dto.setAnio(scooter.getAnio());
        dto.setKilometros(scooter.getKilometros());
        dto.setCombustible(scooter.getCombustible());
        dto.setColorExterior(scooter.getColorExterior());
        dto.setDescripcion(scooter.getDescripcion());
        dto.setExtras(scooter.getExtras());
        dto.setVisible(scooter.getVisible());
        dto.setEnOferta(scooter.getEnOferta());
        dto.setPrecioOferta(scooter.getPrecioOferta());
        dto.setFechaFinOferta(DateUtils.formatearParaJSON(scooter.getFechaFinOferta()));
        dto.setEstadoVenta(scooter.getEstadoVenta());
        
        // Campos de Motocicleta
        dto.setCilindrada(scooter.getCilindrada());
        dto.setTipoMotor(scooter.getTipoMotor());
        dto.setTieneSidecar(scooter.getTieneSidecar());
        dto.setTieneBaul(scooter.getTieneBaul());
        
        // Campos específicos de Scooter
        dto.setTieneMaletinBajoAsiento(scooter.getTieneMaletinBajoAsiento());
        dto.setAutonomia(scooter.getAutonomia());
        
        return dto;
    }
    
    // ========== CONVERSIÓN PARA IMÁGENES CON URLs ==========
    
    public TurismoResponseDTO toTurismoResponseDTO(Turismo turismo, List<Imagen> imagenes) {
        TurismoResponseDTO dto = toTurismoResponseDTO(turismo);
        
        dto.setImagenes(imagenes.stream()
            .map(img -> urlService.getImageUrl(turismo.getId(), img.getUid()))
            .toList());
        
        Imagen portada = imagenes.stream()
            .filter(Imagen::getEsPortada)
            .findFirst()
            .orElse(null);
        
        if (portada != null) {
            dto.setImagenPortada(urlService.getImageUrl(turismo.getId(), portada.getUid()));
        }
        
        return dto;
    }
    
    public FurgonetaResponseDTO toFurgonetaResponseDTO(Furgoneta furgoneta, List<Imagen> imagenes) {
        FurgonetaResponseDTO dto = toFurgonetaResponseDTO(furgoneta);
        
        dto.setImagenes(imagenes.stream()
            .map(img -> urlService.getImageUrl(furgoneta.getId(), img.getUid()))
            .toList());
        
        Imagen portada = imagenes.stream()
            .filter(Imagen::getEsPortada)
            .findFirst()
            .orElse(null);
        
        if (portada != null) {
            dto.setImagenPortada(urlService.getImageUrl(furgoneta.getId(), portada.getUid()));
        }
        
        return dto;
    }
    
    public ScooterResponseDTO toScooterResponseDTO(Scooter scooter, List<Imagen> imagenes) {
        ScooterResponseDTO dto = toScooterResponseDTO(scooter);
        
        dto.setImagenes(imagenes.stream()
            .map(img -> urlService.getImageUrl(scooter.getId(), img.getUid()))
            .toList());
        
        Imagen portada = imagenes.stream()
            .filter(Imagen::getEsPortada)
            .findFirst()
            .orElse(null);
        
        if (portada != null) {
            dto.setImagenPortada(urlService.getImageUrl(scooter.getId(), portada.getUid()));
        }
        
        return dto;
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