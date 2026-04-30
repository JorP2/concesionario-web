package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import com.concesionario.backend.dto.request.TurismoRequestDTO;
import com.concesionario.backend.dto.response.TurismoResponseDTO;
import com.concesionario.backend.repositorio.TurismoRepository;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class TurismoService {

    @Autowired
    private TurismoRepository turismoRepository;
    
    @Autowired
    private DTOConverter dtoConverter;

    public List<Turismo> obtenerTodos() {
        return turismoRepository.findAll();
    }

    public Turismo obtenerPorId(Long id) {
        return turismoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turismo no encontrado con ID: " + id));
    }

    public TurismoResponseDTO crear(TurismoRequestDTO request) {
        Turismo turismo = dtoConverter.toTurismoEntity(request);
        Turismo guardado = turismoRepository.save(turismo);
        return dtoConverter.toTurismoResponseDTO(guardado);
    }

    public TurismoResponseDTO actualizar(Long id, TurismoRequestDTO request) {
        obtenerPorId(id);
        Turismo turismo = dtoConverter.toTurismoEntity(request);
        turismo.setId(id);
        Turismo guardado = turismoRepository.save(turismo);
        return dtoConverter.toTurismoResponseDTO(guardado);
    }

    public void eliminar(Long id) {
        if (!turismoRepository.existsById(id)) {
            throw new RuntimeException("Turismo no encontrado con ID: " + id);
        }
        turismoRepository.deleteById(id);
    }
}