package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import com.concesionario.backend.servicio.ImagenService;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @GetMapping("/public/en-venta")
    public List<Object> listarEnVenta() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosEnVenta();
        return convertirRespuesta(vehiculos);
    }

    @GetMapping("/public/vendidos")
    public List<Object> listarVendidos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVendidos();
        return convertirRespuesta(vehiculos);
    }

    @GetMapping("/public/buscar")
    public List<Object> buscarPublico(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {
        List<Vehiculo> vehiculos = vehiculoService.buscarVehiculos(marca, precioMin, precioMax);
        return convertirRespuesta(vehiculos);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Object> obtenerPublico(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.obtenerPorId(id);
        if (!vehiculo.getVisible() || !vehiculo.getEstadoVenta().equals("en_venta")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(convertirUnico(vehiculo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        vehiculoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/visible")
    public ResponseEntity<Object> cambiarVisibilidad(
            @PathVariable Long id,
            @RequestParam Boolean visible) {
        Vehiculo vehiculo = vehiculoService.cambiarVisibilidad(id, visible);
        return ResponseEntity.ok(convertirUnico(vehiculo));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Object> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {
        Vehiculo vehiculo = vehiculoService.cambiarEstadoVenta(id, estado);
        return ResponseEntity.ok(convertirUnico(vehiculo));
    }

    @PostMapping("/{id}/oferta")
    public ResponseEntity<Object> aplicarOferta(
            @PathVariable Long id,
            @RequestParam Double descuento) {
        Vehiculo vehiculo = vehiculoService.aplicarOferta(id, descuento);
        return ResponseEntity.ok(convertirUnico(vehiculo));
    }

    @PostMapping("/{id}/oferta-precio")
    public ResponseEntity<Object> aplicarOfertaPrecioFijo(
            @PathVariable Long id,
            @RequestParam Double precioOferta,
            @RequestParam(required = false) String fechaFin) {
        Vehiculo vehiculo = fechaFin == null || fechaFin.isBlank()
                ? vehiculoService.aplicarOfertaPrecioFijo(id, precioOferta)
                : vehiculoService.aplicarOfertaPrecioFijo(id, precioOferta, LocalDateTime.parse(fechaFin));
        return ResponseEntity.ok(convertirUnico(vehiculo));
    }

    @DeleteMapping("/{id}/oferta")
    public ResponseEntity<Object> quitarOferta(@PathVariable Long id) {
        Vehiculo vehiculo = vehiculoService.quitarOferta(id);
        return ResponseEntity.ok(convertirUnico(vehiculo));
    }

    private List<Object> convertirRespuesta(List<Vehiculo> vehiculos) {
        List<Object> resultados = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(vehiculo.getId());
            resultados.add(convertirUnicoConImagenes(vehiculo, imagenes));
        }
        return resultados;
    }

    private Object convertirUnico(Vehiculo vehiculo) {
        List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(vehiculo.getId());
        return convertirUnicoConImagenes(vehiculo, imagenes);
    }

    private Object convertirUnicoConImagenes(Vehiculo vehiculo, List<Imagen> imagenes) {
        if (vehiculo instanceof Turismo) {
            return dtoConverter.toTurismoResponseDTO((Turismo) vehiculo, imagenes);
        } else if (vehiculo instanceof Furgoneta) {
            return dtoConverter.toFurgonetaResponseDTO((Furgoneta) vehiculo, imagenes);
        } else if (vehiculo instanceof Scooter) {
            return dtoConverter.toScooterResponseDTO((Scooter) vehiculo, imagenes);
        }
        throw new RuntimeException("Tipo de vehiculo no soportado");
    }
}
