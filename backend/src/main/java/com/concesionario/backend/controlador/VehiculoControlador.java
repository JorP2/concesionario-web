package com.concesionario.backend.controlador;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VehiculoRepository;

// Marca la clase como API que devuelve JSON
@RestController
// Define la ruta base para los endpoints de este controlador
@RequestMapping("/api/vehiculos")
// Permite que el frontend consuma la API sin errores CORS
@CrossOrigin(origins = "*")
public class VehiculoControlador {

    private final VehiculoRepository repo;

    // Constructor para inyectar automáticamente el repositorio
    public VehiculoControlador(VehiculoRepository repo) {
        this.repo = repo;
    }

    // Endpoint - GET obtener vehiculos
    @GetMapping
    public List<Vehiculo> listar() {
        return repo.findAll();
    }

 // Endpoint - POST guardar vehiculo
    @PostMapping
    public Vehiculo guardar(@RequestBody Vehiculo vehiculo) {
        return repo.save(vehiculo);
    }
}
