package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import com.concesionario.backend.dto.request.TurismoRequestDTO;
import com.concesionario.backend.dto.response.TurismoResponseDTO;
import com.concesionario.backend.repositorio.TurismoRepository;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.function.Function;

@RestController
@RequestMapping("/api/turismos")
public class TurismoController extends BaseController<TurismoRequestDTO, TurismoResponseDTO, Turismo> {

    @Autowired
    private TurismoRepository turismoRepository;
    
    @Autowired
    private VehiculoService vehiculoService;
    
    @Autowired
    private DTOConverter dtoConverter;

    @Override
    protected List<Turismo> listarEntidades() {
        return turismoRepository.findAll();
    }

    @Override
    protected Turismo obtenerEntidadPorId(Long id) {
        return turismoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turismo no encontrado"));
    }

    @Override
    protected TurismoResponseDTO crearEntidad(TurismoRequestDTO request) {
        Turismo turismo = dtoConverter.toTurismoEntity(request);
        Vehiculo guardado = vehiculoService.crearVehiculo(turismo);
        return dtoConverter.toTurismoResponseDTO((Turismo) guardado);
    }

    @Override
    protected TurismoResponseDTO actualizarEntidad(Long id, TurismoRequestDTO request) {
        Turismo turismo = dtoConverter.toTurismoEntity(request);
        turismo.setId(id);
        Vehiculo guardado = vehiculoService.crearVehiculo(turismo);
        return dtoConverter.toTurismoResponseDTO((Turismo) guardado);
    }

    @Override
    protected void eliminarEntidad(Long id) {
        vehiculoService.eliminar(id);
    }

    @Override
    protected Function<Turismo, TurismoResponseDTO> getConverter() {
        return dtoConverter::toTurismoResponseDTO;
    }

    @Override
    protected TurismoResponseDTO convertWithImages(Turismo entity, List<Imagen> imagenes) {
        return dtoConverter.toTurismoResponseDTO(entity, imagenes);
    }
}