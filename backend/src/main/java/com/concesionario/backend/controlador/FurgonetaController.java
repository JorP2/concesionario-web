package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import com.concesionario.backend.dto.request.FurgonetaRequestDTO;
import com.concesionario.backend.dto.response.FurgonetaResponseDTO;
import com.concesionario.backend.repositorio.FurgonetaRepository;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.function.Function;

@RestController
@RequestMapping("/api/furgonetas")
public class FurgonetaController extends BaseController<FurgonetaRequestDTO, FurgonetaResponseDTO, Furgoneta> {

    @Autowired
    private FurgonetaRepository furgonetaRepository;
    
    @Autowired
    private VehiculoService vehiculoService;
    
    @Autowired
    private DTOConverter dtoConverter;

    @Override
    protected List<Furgoneta> listarEntidades() {
        return furgonetaRepository.findAll();
    }

    @Override
    protected Furgoneta obtenerEntidadPorId(Long id) {
        return furgonetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Furgoneta no encontrada"));
    }

    @Override
    protected FurgonetaResponseDTO crearEntidad(FurgonetaRequestDTO request) {
        Furgoneta furgoneta = dtoConverter.toFurgonetaEntity(request);
        Vehiculo guardado = vehiculoService.crearVehiculo(furgoneta);
        return dtoConverter.toFurgonetaResponseDTO((Furgoneta) guardado);
    }

    @Override
    protected FurgonetaResponseDTO actualizarEntidad(Long id, FurgonetaRequestDTO request) {
        Furgoneta furgoneta = dtoConverter.toFurgonetaEntity(request);
        furgoneta.setId(id);
        Vehiculo guardado = vehiculoService.crearVehiculo(furgoneta);
        return dtoConverter.toFurgonetaResponseDTO((Furgoneta) guardado);
    }

    @Override
    protected void eliminarEntidad(Long id) {
        vehiculoService.eliminar(id);
    }

    @Override
    protected Function<Furgoneta, FurgonetaResponseDTO> getConverter() {
        return dtoConverter::toFurgonetaResponseDTO;
    }

    @Override
    protected FurgonetaResponseDTO convertWithImages(Furgoneta entity, List<Imagen> imagenes) {
        return dtoConverter.toFurgonetaResponseDTO(entity, imagenes);
    }
}