package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dto.request.VehiculoRequestDTO;
import com.concesionario.backend.dto.response.VehiculoResponseDTO;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    // ENDPOINTS PÚBLICOS

    @GetMapping("/public/en-venta")
    public List<VehiculoResponseDTO> listarEnVenta() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosEnVenta();
        return vehiculos.stream()
        		.map(DTOConverter::toVehiculoResponseDTO)
        		.toList();
    }

    @GetMapping("/public/proximos")
    public List<VehiculoResponseDTO> listarProximos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerProximos();
        return vehiculos.stream()
        		.map(DTOConverter::toVehiculoResponseDTO)
        		.toList();
    }

    @GetMapping("/public/vendidos")
    public List<VehiculoResponseDTO> listarVendidos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVendidos();
        return vehiculos.stream()
        		.map(DTOConverter::toVehiculoResponseDTO)
        		.toList();
    }

    @GetMapping("/public/buscar")
    public List<VehiculoResponseDTO> buscarPublico(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {
        List<Vehiculo> vehiculos = vehiculoService.buscarVehiculos(marca, precioMin, precioMax);
        return vehiculos.stream()
        		.map(DTOConverter::toVehiculoResponseDTO)
        		.toList();
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<VehiculoResponseDTO> obtenerPublico(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.obtenerPorId(id);
        if (!vehiculo.getVisible() || !vehiculo.getEstadoVenta().equals("en_venta")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }

    // ENDPOINTS ADMIN (siguen con Vehiculo)
    @GetMapping
    public List<VehiculoResponseDTO> listarTodos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerTodos();
        return vehiculos.stream()
                .map(DTOConverter::toVehiculoResponseDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculoResponseDTO> obtenerPorId(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.obtenerPorId(id);
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }

    @PostMapping
    public VehiculoResponseDTO crear(@RequestBody VehiculoRequestDTO requestDTO) {
        // 1. Request → Entidad (usando DTOConverter)
        Vehiculo vehiculo = DTOConverter.toEntity(requestDTO);

        // 2. Service guarda y devuelve entidad
        Vehiculo vehiculoCreado = vehiculoService.crearVehiculo(vehiculo);

        // 3. Entidad → Response (usando DTOConverter)
        return DTOConverter.toVehiculoResponseDTO(vehiculoCreado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehiculoResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody VehiculoRequestDTO requestDTO) {

        // 1. Request → Entidad
        Vehiculo vehiculoActualizado = DTOConverter.toEntity(requestDTO);

        // 2. Service actualiza y devuelve entidad
        Vehiculo vehiculo = vehiculoService.actualizarVehiculo(id, vehiculoActualizado);

        // 3. Entidad → Response
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        vehiculoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/visible")
    public ResponseEntity<VehiculoResponseDTO> cambiarVisibilidad(
            @PathVariable Long id,
            @RequestParam Boolean visible) {
        Vehiculo vehiculo = vehiculoService.cambiarVisibilidad(id, visible);
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<VehiculoResponseDTO> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {
        Vehiculo vehiculo = vehiculoService.cambiarEstadoVenta(id, estado);
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }

    @PostMapping("/{id}/oferta")
    public ResponseEntity<VehiculoResponseDTO> aplicarOferta(
            @PathVariable Long id,
            @RequestParam Double descuento) {
        Vehiculo vehiculo = vehiculoService.aplicarOferta(id, descuento);
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }

    @DeleteMapping("/{id}/oferta")
    public ResponseEntity<VehiculoResponseDTO> quitarOferta(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.quitarOferta(id);
        return ResponseEntity.ok(DTOConverter.toVehiculoResponseDTO(vehiculo));
    }


}
