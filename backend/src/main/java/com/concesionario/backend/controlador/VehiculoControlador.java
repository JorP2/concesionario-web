package com.concesionario.backend.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VehiculoRepository;

@RestController
@RequestMapping("/vehiculos")
public class VehiculoControlador {
	
	@Autowired
    private VehiculoRepository repo;

    // 🔹 LISTAR TODOS
    @GetMapping
    public List<Vehiculo> listar() {
        return repo.findAll();
    }

    // 🔹 GUARDAR
    @PostMapping
    public Vehiculo guardar(@RequestBody Vehiculo vehiculo) {
        return repo.save(vehiculo);
    }
}
