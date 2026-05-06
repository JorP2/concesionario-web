package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import com.concesionario.backend.dto.request.FurgonetaRequestDTO;
import com.concesionario.backend.dto.response.FurgonetaResponseDTO;
import com.concesionario.backend.repositorio.FurgonetaRepository;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class FurgonetaService {

    @Autowired
    private FurgonetaRepository furgonetaRepository;
    
    @Autowired
    private DTOConverter dtoConverter;

    public List<Furgoneta> obtenerTodos() {
        return furgonetaRepository.findAll();
    }

    public Furgoneta obtenerPorId(Long id) {
        return furgonetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Furgoneta no encontrada con ID: " + id));
    }

    public FurgonetaResponseDTO crear(FurgonetaRequestDTO request) {
        Furgoneta furgoneta = dtoConverter.toFurgonetaEntity(request);
        Furgoneta guardado = furgonetaRepository.save(furgoneta);
        return dtoConverter.toFurgonetaResponseDTO(guardado);
    }

    public FurgonetaResponseDTO actualizar(Long id, FurgonetaRequestDTO request) {
        obtenerPorId(id);
        Furgoneta furgoneta = dtoConverter.toFurgonetaEntity(request);
        furgoneta.setId(id);
        Furgoneta guardado = furgonetaRepository.save(furgoneta);
        return dtoConverter.toFurgonetaResponseDTO(guardado);
    }

    public void eliminar(Long id) {
        if (!furgonetaRepository.existsById(id)) {
            throw new RuntimeException("Furgoneta no encontrada con ID: " + id);
        }
        furgonetaRepository.deleteById(id);
    }
}