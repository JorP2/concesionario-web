package com.concesionario.backend.utils;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.dominio.Video;
import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import com.concesionario.backend.dto.request.FurgonetaRequestDTO;
import com.concesionario.backend.dto.request.LoginRequest;
import com.concesionario.backend.dto.request.ScooterRequestDTO;
import com.concesionario.backend.dto.request.TurismoRequestDTO;
import com.concesionario.backend.dto.request.UsuarioRequestDTO;
import com.concesionario.backend.dto.response.FurgonetaResponseDTO;
import com.concesionario.backend.dto.response.ImagenResponseDTO;
import com.concesionario.backend.dto.response.ScooterResponseDTO;
import com.concesionario.backend.dto.response.TurismoResponseDTO;
import com.concesionario.backend.dto.response.UsuarioResponseDTO;
import com.concesionario.backend.dto.response.VideoResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DTOConverter {

    @Autowired
    private UrlService urlService;

    public static Usuario toEntity(LoginRequest request) {
        if (request == null) return null;
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());
        return usuario;
    }

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

    public Turismo toTurismoEntity(TurismoRequestDTO request) {
        if (request == null) return null;
        Turismo turismo = new Turismo();

        asignarCamposComunes(turismo, request.getMarca(), request.getModelo(), request.getPrecio(),
                request.getAnio(), request.getKilometros(), request.getCombustible(),
                request.getColorExterior(), request.getDescripcion(), request.getComentarios(),
                request.getExtras());

        turismo.setInterior(request.getInterior());
        turismo.setAsientos(request.getAsientos());
        turismo.setPuertas(request.getPuertas());
        turismo.setMotor(request.getMotor());
        turismo.setCambio(request.getCambio());
        turismo.setPegatina(request.getPegatina());
        turismo.setTieneAireAcondicionado(request.getTieneAireAcondicionado());
        turismo.setTieneNavegacion(request.getTieneNavegacion());

        return turismo;
    }

    public TurismoResponseDTO toTurismoResponseDTO(Turismo turismo) {
        if (turismo == null) return null;
        TurismoResponseDTO dto = new TurismoResponseDTO();

        asignarCamposComunes(dto, turismo);
        dto.setInterior(turismo.getInterior());
        dto.setAsientos(turismo.getAsientos());
        dto.setPuertas(turismo.getPuertas());
        dto.setMotor(turismo.getMotor());
        dto.setCambio(turismo.getCambio());
        dto.setPegatina(turismo.getPegatina());
        dto.setTieneAireAcondicionado(turismo.getTieneAireAcondicionado());
        dto.setTieneNavegacion(turismo.getTieneNavegacion());

        return dto;
    }

    public Furgoneta toFurgonetaEntity(FurgonetaRequestDTO request) {
        if (request == null) return null;
        Furgoneta furgoneta = new Furgoneta();

        asignarCamposComunes(furgoneta, request.getMarca(), request.getModelo(), request.getPrecio(),
                request.getAnio(), request.getKilometros(), request.getCombustible(),
                request.getColorExterior(), request.getDescripcion(), request.getComentarios(),
                request.getExtras());

        furgoneta.setInterior(request.getInterior());
        furgoneta.setAsientos(request.getAsientos());
        furgoneta.setPuertas(request.getPuertas());
        furgoneta.setMotor(request.getMotor());
        furgoneta.setCambio(request.getCambio());
        furgoneta.setPegatina(request.getPegatina());
        furgoneta.setCapacidadCarga(request.getCapacidadCarga());
        furgoneta.setNumeroAsientos(request.getNumeroAsientos());
        furgoneta.setTienePuertaCorredera(request.getTienePuertaCorredera());

        return furgoneta;
    }

    public FurgonetaResponseDTO toFurgonetaResponseDTO(Furgoneta furgoneta) {
        if (furgoneta == null) return null;
        FurgonetaResponseDTO dto = new FurgonetaResponseDTO();

        asignarCamposComunes(dto, furgoneta);
        dto.setInterior(furgoneta.getInterior());
        dto.setAsientos(furgoneta.getAsientos());
        dto.setPuertas(furgoneta.getPuertas());
        dto.setMotor(furgoneta.getMotor());
        dto.setCambio(furgoneta.getCambio());
        dto.setPegatina(furgoneta.getPegatina());
        dto.setCapacidadCarga(furgoneta.getCapacidadCarga());
        dto.setNumeroAsientos(furgoneta.getNumeroAsientos());
        dto.setTienePuertaCorredera(furgoneta.getTienePuertaCorredera());

        return dto;
    }

    public Scooter toScooterEntity(ScooterRequestDTO request) {
        if (request == null) return null;
        Scooter scooter = new Scooter();

        asignarCamposComunes(scooter, request.getMarca(), request.getModelo(), request.getPrecio(),
                request.getAnio(), request.getKilometros(), request.getCombustible(),
                request.getColorExterior(), request.getDescripcion(), request.getComentarios(),
                request.getExtras());

        scooter.setCilindrada(request.getCilindrada());
        scooter.setTipoMotor(request.getTipoMotor());
        scooter.setTieneSidecar(request.getTieneSidecar());
        scooter.setTieneBaul(request.getTieneBaul());
        scooter.setTieneMaletinBajoAsiento(request.getTieneMaletinBajoAsiento());
        scooter.setAutonomia(request.getAutonomia());

        return scooter;
    }

    public ScooterResponseDTO toScooterResponseDTO(Scooter scooter) {
        if (scooter == null) return null;
        ScooterResponseDTO dto = new ScooterResponseDTO();

        asignarCamposComunes(dto, scooter);
        dto.setCilindrada(scooter.getCilindrada());
        dto.setTipoMotor(scooter.getTipoMotor());
        dto.setTieneSidecar(scooter.getTieneSidecar());
        dto.setTieneBaul(scooter.getTieneBaul());
        dto.setTieneMaletinBajoAsiento(scooter.getTieneMaletinBajoAsiento());
        dto.setAutonomia(scooter.getAutonomia());

        return dto;
    }

    public TurismoResponseDTO toTurismoResponseDTO(Turismo turismo, List<Imagen> imagenes) {
        TurismoResponseDTO dto = toTurismoResponseDTO(turismo);
        asignarImagenes(dto, turismo.getId(), imagenes);
        return dto;
    }

    public FurgonetaResponseDTO toFurgonetaResponseDTO(Furgoneta furgoneta, List<Imagen> imagenes) {
        FurgonetaResponseDTO dto = toFurgonetaResponseDTO(furgoneta);
        asignarImagenes(dto, furgoneta.getId(), imagenes);
        return dto;
    }

    public ScooterResponseDTO toScooterResponseDTO(Scooter scooter, List<Imagen> imagenes) {
        ScooterResponseDTO dto = toScooterResponseDTO(scooter);
        asignarImagenes(dto, scooter.getId(), imagenes);
        return dto;
    }

    public ImagenResponseDTO toImagenResponseDTO(Imagen imagen) {
        if (imagen == null) return null;
        ImagenResponseDTO dto = new ImagenResponseDTO();
        dto.setId(imagen.getId());
        dto.setUrl(urlService.getImageUrl(imagen.getVehiculo().getId(), imagen.getUid()));
        dto.setOrden(imagen.getOrden());
        dto.setEsPortada(imagen.getEsPortada());
        return dto;
    }

    public VideoResponseDTO toVideoResponseDTO(Video video) {
        if (video == null) return null;
        VideoResponseDTO dto = new VideoResponseDTO();
        dto.setId(video.getId());
        dto.setUrl(urlService.getVideoUrl(video.getVehiculo().getId(), video.getUid()));
        dto.setOrden(video.getOrden());
        return dto;
    }

    private void asignarCamposComunes(
            com.concesionario.backend.dominio.Vehiculo vehiculo,
            String marca,
            String modelo,
            Double precio,
            Integer anio,
            Integer kilometros,
            String combustible,
            String colorExterior,
            String descripcion,
            String comentarios,
            String extras) {
        vehiculo.setMarca(marca);
        vehiculo.setModelo(modelo);
        vehiculo.setPrecio(precio);
        vehiculo.setAnio(anio);
        vehiculo.setKilometros(kilometros);
        vehiculo.setCombustible(combustible);
        vehiculo.setColorExterior(colorExterior);
        vehiculo.setDescripcion(descripcion);
        vehiculo.setComentarios(comentarios);
        vehiculo.setExtras(extras);
    }

    private void asignarCamposComunes(
            com.concesionario.backend.dto.response.VehiculoResponseDTO dto,
            com.concesionario.backend.dominio.Vehiculo vehiculo) {
        dto.setId(vehiculo.getId());
        dto.setMarca(vehiculo.getMarca());
        dto.setModelo(vehiculo.getModelo());
        dto.setPrecio(vehiculo.getPrecio());
        dto.setAnio(vehiculo.getAnio());
        dto.setKilometros(vehiculo.getKilometros());
        dto.setCombustible(vehiculo.getCombustible());
        dto.setColorExterior(vehiculo.getColorExterior());
        dto.setDescripcion(vehiculo.getDescripcion());
        dto.setComentarios(vehiculo.getComentarios());
        dto.setExtras(vehiculo.getExtras());
        dto.setVisible(vehiculo.getVisible());
        dto.setEnOferta(vehiculo.getEnOferta());
        dto.setPrecioOferta(vehiculo.getPrecioOferta());
        dto.setFechaFinOferta(DateUtils.formatearParaJSON(vehiculo.getFechaFinOferta()));
        dto.setEstadoVenta(vehiculo.getEstadoVenta());
    }

    private void asignarImagenes(
            com.concesionario.backend.dto.response.VehiculoResponseDTO dto,
            Long vehiculoId,
            List<Imagen> imagenes) {
        dto.setImagenes(imagenes.stream()
            .map(img -> urlService.getImageUrl(vehiculoId, img.getUid()))
            .toList());

        Imagen portada = imagenes.stream()
            .filter(Imagen::getEsPortada)
            .findFirst()
            .orElse(null);

        if (portada != null) {
            dto.setImagenPortada(urlService.getImageUrl(vehiculoId, portada.getUid()));
        }
    }
}
