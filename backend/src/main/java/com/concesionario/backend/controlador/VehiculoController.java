package com.concesionario.backend.controlador;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.servicio.VehiculoService;

@RestController
@RequestMapping("/vehiculos")
public class VehiculoController {

    private final VehiculoService vehiculoService;

    public VehiculoController(VehiculoService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    //GET
    @GetMapping
    public List<Vehiculo> listarTodos() {
        return vehiculoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerPorId(@PathVariable Long id) {
        Optional<Vehiculo> v = vehiculoService.obtenerPorId(id);
        return v.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/marca/{marca}")
    public List<Vehiculo> buscarPorMarca(@PathVariable String marca) {
        return vehiculoService.obtenerPorMarca(marca);
    }

    @GetMapping("/modelo/{modelo}")
    public List<Vehiculo> buscarPorModelo(@PathVariable String modelo) {
        return vehiculoService.obtenerPorModelo(modelo);
    }

    //POST
    @PostMapping
    public Vehiculo crear(@RequestBody Vehiculo vehiculo) {
        return vehiculoService.guardar(vehiculo);
    }

    //PUT
    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizar(@PathVariable Long id, @RequestBody Vehiculo vehiculo) {
        Optional<Vehiculo> vExistente = vehiculoService.obtenerPorId(id);
        if (vExistente.isPresent()) {
            vehiculo.setId(id);
            return ResponseEntity.ok(vehiculoService.guardar(vehiculo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Vehiculo> v = vehiculoService.obtenerPorId(id);
        if (v.isPresent()) {
            vehiculoService.eliminarPorId(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}