package com.concesionario.backend.servicio;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VehiculoRepository;

@Service
public class VehiculoService {

    private final VehiculoRepository vehiculoRepository;

    
    public VehiculoService(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }
    
    //CRUD
    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }
    
    public Optional<Vehiculo> obtenerPorId(Long id) {
        return vehiculoRepository.findById(id);
    }
    
    public Vehiculo guardar(Vehiculo v) {
        return vehiculoRepository.save(v);
    }
    
    public void eliminarPorId(Long id) {
        vehiculoRepository.deleteById(id);
    }
    
    //CONSULTAS
    public List<Vehiculo> obtenerPorMarca(String marca){
    	return vehiculoRepository.findByMarca(marca);
    }
    
    public List<Vehiculo> obtenerPorModelo(String modelo){
    	return vehiculoRepository.findByModelo(modelo);
    }

    //METODOS UTILES
    public long contarVehiculos() {
        return vehiculoRepository.count();
    }
}