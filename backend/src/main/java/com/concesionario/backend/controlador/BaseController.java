package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.servicio.ImagenService;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;

public abstract class BaseController<REQ, RES, ENT extends Vehiculo> {

    @Autowired
    protected VehiculoService vehiculoService;
    
    @Autowired
    protected ImagenService imagenService;  // ← AÑADIR
    
    @Autowired
    protected DTOConverter dtoConverter;

    // Métodos abstractos
    protected abstract List<ENT> listarEntidades();
    protected abstract ENT obtenerEntidadPorId(Long id);
    protected abstract RES crearEntidad(REQ request);
    protected abstract RES actualizarEntidad(Long id, REQ request);
    protected abstract void eliminarEntidad(Long id);
    protected abstract Function<ENT, RES> getConverter();
    protected abstract RES convertWithImages(ENT entity, List<Imagen> imagenes);  // ← NUEVO

    // ========== ENDPOINTS GENÉRICOS ==========

    @GetMapping
    public ResponseEntity<List<RES>> listarTodos() {
        List<ENT> entidades = listarEntidades();
        List<RES> dtos = entidades.stream()
                .map(e -> convertWithImages(e, imagenService.obtenerImagenesPorVehiculo(e.getId())))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RES> obtenerPorId(@PathVariable Long id) {
        ENT entidad = obtenerEntidadPorId(id);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(convertWithImages(entidad, imagenes));
    }

    @PostMapping
    public ResponseEntity<RES> crear(@Valid @RequestBody REQ request) {
        return ResponseEntity.ok(crearEntidad(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RES> actualizar(@PathVariable Long id, @Valid @RequestBody REQ request) {
        return ResponseEntity.ok(actualizarEntidad(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        eliminarEntidad(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/visible")
    public ResponseEntity<RES> cambiarVisibilidad(@PathVariable Long id, @RequestParam Boolean visible) {
        Vehiculo vehiculo = vehiculoService.cambiarVisibilidad(id, visible);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(convertWithImages((ENT) vehiculo, imagenes));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<RES> cambiarEstadoVenta(@PathVariable Long id, @RequestParam String estado) {
        Vehiculo vehiculo = vehiculoService.cambiarEstadoVenta(id, estado);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(convertWithImages((ENT) vehiculo, imagenes));
    }

    @PostMapping("/{id}/oferta")
    public ResponseEntity<RES> aplicarOferta(@PathVariable Long id, @RequestParam Double descuento) {
        Vehiculo vehiculo = vehiculoService.aplicarOferta(id, descuento);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(convertWithImages((ENT) vehiculo, imagenes));
    }

    @PostMapping("/{id}/oferta-precio")
    public ResponseEntity<RES> aplicarOfertaPrecioFijo(
            @PathVariable Long id,
            @RequestParam Double precioOferta,
            @RequestParam String fechaFin) {
        LocalDateTime fechaFinOferta = LocalDateTime.parse(fechaFin);
        Vehiculo vehiculo = vehiculoService.aplicarOfertaPrecioFijo(id, precioOferta, fechaFinOferta);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(convertWithImages((ENT) vehiculo, imagenes));
    }

    @DeleteMapping("/{id}/oferta")
    public ResponseEntity<RES> quitarOferta(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.quitarOferta(id);
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(id);
        return ResponseEntity.ok(convertWithImages((ENT) vehiculo, imagenes));
    }
}