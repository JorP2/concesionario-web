package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import com.concesionario.backend.dto.request.ScooterRequestDTO;
import com.concesionario.backend.dto.response.ScooterResponseDTO;
import com.concesionario.backend.repositorio.ScooterRepository;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class ScooterService {

    @Autowired
    private ScooterRepository scooterRepository;
    
    @Autowired
    private DTOConverter dtoConverter;

    public List<Scooter> obtenerTodos() {
        return scooterRepository.findAll();
    }

    public Scooter obtenerPorId(Long id) {
        return scooterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scooter no encontrado con ID: " + id));
    }

    public ScooterResponseDTO crear(ScooterRequestDTO request) {
        Scooter scooter = dtoConverter.toScooterEntity(request);
        Scooter guardado = scooterRepository.save(scooter);
        return dtoConverter.toScooterResponseDTO(guardado);
    }

    public ScooterResponseDTO actualizar(Long id, ScooterRequestDTO request) {
        obtenerPorId(id);
        Scooter scooter = dtoConverter.toScooterEntity(request);
        scooter.setId(id);
        Scooter guardado = scooterRepository.save(scooter);
        return dtoConverter.toScooterResponseDTO(guardado);
    }

    public void eliminar(Long id) {
        if (!scooterRepository.existsById(id)) {
            throw new RuntimeException("Scooter no encontrado con ID: " + id);
        }
        scooterRepository.deleteById(id);
    }
}