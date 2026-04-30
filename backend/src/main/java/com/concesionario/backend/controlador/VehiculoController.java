package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Imagen;
import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import com.concesionario.backend.servicio.ImagenService;
import com.concesionario.backend.servicio.VehiculoService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private List<Object> convertirRespuesta(List<Vehiculo> vehiculos) {
        List<Object> resultados = new ArrayList<>();
        for (Vehiculo v : vehiculos) {
            List<Imagen> imagenes = imagenService.obtenerImagenesPorVehiculo(v.getId());
            resultados.add(convertirUnicoConImagenes(v, imagenes));
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
        throw new RuntimeException("Tipo de vehículo no soportado");
    }
}