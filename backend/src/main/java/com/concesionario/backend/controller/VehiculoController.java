package com.concesionario.backend.controller;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VehiculoRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*")
public class VehiculoController {

    private final VehiculoRepository vehiculoRepository;

    public VehiculoController(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }

    // =========================================
    // ENDPOINTS PARA LA WEB PÚBLICA
    // =========================================

    // GET /api/vehiculos/web - Coches visibles en venta
    @GetMapping("/web")
    public List<Vehiculo> obtenerWeb() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("en_venta");
    }

    // GET /api/vehiculos/web/proximos - Coches próximos
    @GetMapping("/web/proximos")
    public List<Vehiculo> obtenerProximos() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("proximo");
    }

    // =========================================
    // ENDPOINTS PARA ADMIN (TODO)
    // =========================================

    // GET /api/vehiculos - Todos (admin)
    @GetMapping
    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    // GET /api/vehiculos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerPorId(@PathVariable Long id) {
        return vehiculoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/vehiculos/estado/{estado} - Filtrar por estado
    @GetMapping("/estado/{estado}")
    public List<Vehiculo> obtenerPorEstado(@PathVariable String estado) {
        return vehiculoRepository.findByEstadoVenta(estado);
    }

    // POST /api/vehiculos - Crear nuevo
    @PostMapping
    public Vehiculo crear(@RequestBody Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    // PUT /api/vehiculos/{id} - Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizar(@PathVariable Long id, @RequestBody Vehiculo vehiculo) {
        return vehiculoRepository.findById(id)
                .map(v -> {
                    vehiculo.setId(id);
                    return ResponseEntity.ok(vehiculoRepository.save(vehiculo));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/vehiculos/{id} - Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (vehiculoRepository.existsById(id)) {
            vehiculoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // PATCH /api/vehiculos/{id}/visible - Cambiar visibilidad
    @PatchMapping("/{id}/visible")
    public ResponseEntity<Vehiculo> cambiarVisibilidad(@PathVariable Long id, @RequestParam boolean visible) {
        return vehiculoRepository.findById(id)
                .map(v -> {
                    v.setVisible(visible);
                    return ResponseEntity.ok(vehiculoRepository.save(v));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // PATCH /api/vehiculos/{id}/estado - Cambiar estado venta
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Vehiculo> cambiarEstado(@PathVariable Long id, @RequestParam String estado) {
        return vehiculoRepository.findById(id)
                .map(v -> {
                    v.setEstadoVenta(estado);
                    return ResponseEntity.ok(vehiculoRepository.save(v));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/vehiculos/buscar - Búsqueda avanzada
    @GetMapping("/buscar")
    public List<Vehiculo> buscar(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {
        return vehiculoRepository.buscarAvanzado(marca, estado, precioMin, precioMax);
    }
}