package com.concesionario.backend.controller;

import com.concesionario.backend.dominio.Mensaje;
import com.concesionario.backend.repositorio.MensajeRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "*")
public class MensajeController {

    private final MensajeRepository mensajeRepository;

    public MensajeController(MensajeRepository mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }

    // POST /api/mensajes - Enviar mensaje (público)
    @PostMapping
    public Mensaje crearMensaje(@RequestBody Mensaje mensaje) {
        return mensajeRepository.save(mensaje);
    }

    // GET /api/mensajes - Todos (admin)
    @GetMapping
    public List<Mensaje> obtenerTodos() {
        return mensajeRepository.findAllByOrderByFechaDesc();
    }

    // GET /api/mensajes/vehiculo/{vehiculoId}
    @GetMapping("/vehiculo/{vehiculoId}")
    public List<Mensaje> obtenerPorVehiculo(@PathVariable Long vehiculoId) {
        return mensajeRepository.findByVehiculoIdOrderByFechaDesc(vehiculoId);
    }

    // DELETE /api/mensajes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (mensajeRepository.existsById(id)) {
            mensajeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}