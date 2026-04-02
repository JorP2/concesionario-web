package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dto.request.VehiculoRequestDTO;
import com.concesionario.backend.dto.response.VehiculoResponseDTO;
import com.concesionario.backend.servicio.ImagenService;
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
    
    @Autowired
    private ImagenService imagenService;
    
    @Autowired
    private DTOConverter dtoConverter;

    // ========== ENDPOINTS PÚBLICOS ==========

    @GetMapping("/public/en-venta")
    public List<VehiculoResponseDTO> listarEnVenta() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosEnVenta();
        return vehiculos.stream()
                .map(v -> {
                    List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(v.getId());
                    return dtoConverter.toVehiculoResponseDTO(v, imagenes);
                })
                .toList();
    }

    @GetMapping("/public/proximos")
    public List<VehiculoResponseDTO> listarProximos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerProximos();
        return vehiculos.stream()
                .map(v -> {
                    List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(v.getId());
                    return dtoConverter.toVehiculoResponseDTO(v, imagenes);
                })
                .toList();
    }

    @GetMapping("/public/vendidos")
    public List<VehiculoResponseDTO> listarVendidos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVendidos();
        return vehiculos.stream()
                .map(v -> {
                    List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(v.getId());
                    return dtoConverter.toVehiculoResponseDTO(v, imagenes);
                })
                .toList();
    }

    @GetMapping("/public/buscar")
    public List<VehiculoResponseDTO> buscarPublico(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {
        List<Vehiculo> vehiculos = vehiculoService.buscarVehiculos(marca, precioMin, precioMax);
        return vehiculos.stream()
                .map(v -> {
                    List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(v.getId());
                    return dtoConverter.toVehiculoResponseDTO(v, imagenes);
                })
                .toList();
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<VehiculoResponseDTO> obtenerPublico(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.obtenerPorId(id);
        if (!vehiculo.getVisible() || !vehiculo.getEstadoVenta().equals("en_venta")) {
            return ResponseEntity.notFound().build();
        }
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
    }

    // ========== ENDPOINTS ADMIN ==========

    @GetMapping
    public List<VehiculoResponseDTO> listarTodos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerTodos();
        return vehiculos.stream()
                .map(v -> {
                    List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(v.getId());
                    return dtoConverter.toVehiculoResponseDTO(v, imagenes);
                })
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculoResponseDTO> obtenerPorId(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.obtenerPorId(id);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
    }

    @PostMapping
    public VehiculoResponseDTO crear(@RequestBody VehiculoRequestDTO requestDTO) {
        Vehiculo vehiculo = DTOConverter.toEntity(requestDTO);
        Vehiculo vehiculoCreado = vehiculoService.crearVehiculo(vehiculo);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(vehiculoCreado.getId());
        return dtoConverter.toVehiculoResponseDTO(vehiculoCreado, imagenes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehiculoResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody VehiculoRequestDTO requestDTO) {
        Vehiculo vehiculoActualizado = DTOConverter.toEntity(requestDTO);
        Vehiculo vehiculo = vehiculoService.actualizarVehiculo(id, vehiculoActualizado);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
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
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<VehiculoResponseDTO> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {
        Vehiculo vehiculo = vehiculoService.cambiarEstadoVenta(id, estado);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
    }

    @PostMapping("/{id}/oferta")
    public ResponseEntity<VehiculoResponseDTO> aplicarOferta(
            @PathVariable Long id,
            @RequestParam Double descuento) {
        Vehiculo vehiculo = vehiculoService.aplicarOferta(id, descuento);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
    }

    @DeleteMapping("/{id}/oferta")
    public ResponseEntity<VehiculoResponseDTO> quitarOferta(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.quitarOferta(id);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(dtoConverter.toVehiculoResponseDTO(vehiculo, imagenes));
    }
}