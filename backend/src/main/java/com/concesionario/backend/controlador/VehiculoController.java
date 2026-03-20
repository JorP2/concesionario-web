package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dto.VehiculoResponseDTO;
import com.concesionario.backend.servicio.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    // ENDPOINTS PÚBLICOS

    @GetMapping("/public/en-venta")
    public List<VehiculoResponseDTO> listarEnVenta() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosEnVenta();
        return vehiculos.stream().map(this::convertirADTO).toList();
    }

    @GetMapping("/public/proximos")
    public List<VehiculoResponseDTO> listarProximos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerProximos();
        return vehiculos.stream().map(this::convertirADTO).toList();
    }

    @GetMapping("/public/vendidos")
    public List<VehiculoResponseDTO> listarVendidos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVendidos();
        return vehiculos.stream().map(this::convertirADTO).toList();
    }

    @GetMapping("/public/buscar")
    public List<VehiculoResponseDTO> buscarPublico(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {
        List<Vehiculo> vehiculos = vehiculoService.buscarVehiculos(marca, precioMin, precioMax);
        return vehiculos.stream().map(this::convertirADTO).toList();
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<VehiculoResponseDTO> obtenerPublico(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.obtenerPorId(id);
        if (!vehiculo.getVisible() || !vehiculo.getEstadoVenta().equals("en_venta")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(convertirADTO(vehiculo));
    }

    // ENDPOINTS ADMIN (siguen con Vehiculo)
    @GetMapping
    public List<Vehiculo> listarTodos() {
        return vehiculoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculoService.obtenerPorId(id));
    }

    @PostMapping
    public Vehiculo crear(@RequestBody Vehiculo vehiculo) {
        return vehiculoService.crearVehiculo(vehiculo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizar(
            @PathVariable Long id,
            @RequestBody Vehiculo vehiculo) {
        return ResponseEntity.ok(vehiculoService.actualizarVehiculo(id, vehiculo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        vehiculoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/visible")
    public ResponseEntity<Vehiculo> cambiarVisibilidad(
            @PathVariable Long id,
            @RequestParam Boolean visible) {
        return ResponseEntity.ok(vehiculoService.cambiarVisibilidad(id, visible));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Vehiculo> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {
        return ResponseEntity.ok(vehiculoService.cambiarEstadoVenta(id, estado));
    }

    @PostMapping("/{id}/oferta")
    public ResponseEntity<Vehiculo> aplicarOferta(
            @PathVariable Long id,
            @RequestParam Double descuento) {
        return ResponseEntity.ok(vehiculoService.aplicarOferta(id, descuento));
    }

    @DeleteMapping("/{id}/oferta")
    public ResponseEntity<Vehiculo> quitarOferta(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculoService.quitarOferta(id));
    }

    // Método privado de conversión
    private VehiculoResponseDTO convertirADTO(Vehiculo v) {
        VehiculoResponseDTO dto = new VehiculoResponseDTO();
        dto.setId(v.getId());
        dto.setMarca(v.getMarca());
        dto.setModelo(v.getModelo());
        dto.setPrecio(v.getPrecio());
        dto.setAnio(v.getAnio());
        dto.setKilometros(v.getKilometros());
        dto.setCombustible(v.getCombustible());
        dto.setColorExterior(v.getColorExterior());
        dto.setInterior(v.getInterior());
        dto.setAsientos(v.getAsientos());
        dto.setPuertas(v.getPuertas());
        dto.setMotor(v.getMotor());
        dto.setCambio(v.getCambio());
        dto.setPegatina(v.getPegatina());
        dto.setDescripcion(v.getDescripcion());
        dto.setExtras(v.getExtras());
        dto.setEnOferta(v.getEnOferta());
        dto.setPrecioOferta(v.getPrecioOferta());
        dto.setFechaFinOferta(v.getFechaFinOferta() != null ? v.getFechaFinOferta().toString() : null);
        dto.setEstadoVenta(v.getEstadoVenta());
        return dto;
    }
}
