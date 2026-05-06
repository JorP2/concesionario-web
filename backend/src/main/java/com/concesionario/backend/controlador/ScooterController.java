package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import com.concesionario.backend.dto.request.ScooterRequestDTO;
import com.concesionario.backend.dto.response.ScooterResponseDTO;
import com.concesionario.backend.repositorio.ScooterRepository;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.function.Function;

@RestController
@RequestMapping("/api/scooters")
public class ScooterController extends BaseController<ScooterRequestDTO, ScooterResponseDTO, Scooter> {

    @Autowired
    private ScooterRepository scooterRepository;
    
    @Autowired
    private VehiculoService vehiculoService;
    
    @Autowired
    private DTOConverter dtoConverter;

    @Override
    protected List<Scooter> listarEntidades() {
        return scooterRepository.findAll();
    }

    @Override
    protected Scooter obtenerEntidadPorId(Long id) {
        return scooterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scooter no encontrado"));
    }

    @Override
    protected ScooterResponseDTO crearEntidad(ScooterRequestDTO request) {
        Scooter scooter = dtoConverter.toScooterEntity(request);
        Vehiculo guardado = vehiculoService.crearVehiculo(scooter);
        return dtoConverter.toScooterResponseDTO((Scooter) guardado);
    }

    @Override
    protected ScooterResponseDTO actualizarEntidad(Long id, ScooterRequestDTO request) {
        Scooter scooter = dtoConverter.toScooterEntity(request);
        scooter.setId(id);
        Vehiculo guardado = vehiculoService.crearVehiculo(scooter);
        return dtoConverter.toScooterResponseDTO((Scooter) guardado);
    }

    @Override
    protected void eliminarEntidad(Long id) {
        vehiculoService.eliminar(id);
    }

    @Override
    protected Function<Scooter, ScooterResponseDTO> getConverter() {
        return dtoConverter::toScooterResponseDTO;
    }

    @Override
    protected ScooterResponseDTO convertWithImages(Scooter entity, List<Imagen> imagenes) {
        return dtoConverter.toScooterResponseDTO(entity, imagenes);
    }
}