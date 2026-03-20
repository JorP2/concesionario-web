package com.concesionario.backend.servicio;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo obtenerPorId(Long id) {
        return vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
    }

    public Vehiculo guardar(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public void eliminar(Long id) {
        vehiculoRepository.deleteById(id);
    }

    // CREAR

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {

        // Validar precio
        if (vehiculo.getPrecio() < 0) {
            throw new RuntimeException("El precio no puede ser negativo");
        }

        // Validar año
        int añoActual = LocalDateTime.now().getYear();
        if (vehiculo.getAnio() < 1900 || vehiculo.getAnio() > añoActual + 1) {
            throw new RuntimeException("Año no válido");
        }

        // Validar kilómetros
        if (vehiculo.getKilometros() < 0) {
            throw new RuntimeException("Los kilómetros no pueden ser negativos");
        }

        // Validar asientos
        if (vehiculo.getAsientos() < 1 || vehiculo.getAsientos() > 9) {
            throw new RuntimeException("Número de asientos no válido");
        }

        // Valores por defecto
        if (vehiculo.getVisible() == null) {
            vehiculo.setVisible(true);
        }
        if (vehiculo.getEstadoVenta() == null) {
            vehiculo.setEstadoVenta("en_venta");
        }
        if (vehiculo.getEnOferta() == null) {
            vehiculo.setEnOferta(false);
        }

        return vehiculoRepository.save(vehiculo);
    }


    // ACTUALIZAR

    public Vehiculo actualizarVehiculo(Long id, Vehiculo vehiculoActualizado) {
        Vehiculo existente = obtenerPorId(id);

        // Actualizar solo campos permitidos
        existente.setMarca(vehiculoActualizado.getMarca());
        existente.setModelo(vehiculoActualizado.getModelo());
        existente.setPrecio(vehiculoActualizado.getPrecio());
        existente.setAnio(vehiculoActualizado.getAnio());
        existente.setKilometros(vehiculoActualizado.getKilometros());
        existente.setCombustible(vehiculoActualizado.getCombustible());
        existente.setColorExterior(vehiculoActualizado.getColorExterior());
        existente.setInterior(vehiculoActualizado.getInterior());
        existente.setAsientos(vehiculoActualizado.getAsientos());
        existente.setPuertas(vehiculoActualizado.getPuertas());
        existente.setMotor(vehiculoActualizado.getMotor());
        existente.setCambio(vehiculoActualizado.getCambio());
        existente.setPegatina(vehiculoActualizado.getPegatina());
        existente.setDescripcion(vehiculoActualizado.getDescripcion());
        existente.setExtras(vehiculoActualizado.getExtras());

        return vehiculoRepository.save(existente);
    }


    // GESTIÓN DE OFERTAS

    public Vehiculo aplicarOferta(Long id, Double descuento) {
        Vehiculo vehiculo = obtenerPorId(id);

        if (descuento <= 0 || descuento > 100) {
            throw new RuntimeException("El descuento debe ser entre 1 y 100");
        }

        Double precioOferta = vehiculo.getPrecio() - (vehiculo.getPrecio() * descuento / 100);
        vehiculo.setPrecioOferta(precioOferta);
        vehiculo.setEnOferta(true);
        vehiculo.setFechaFinOferta(LocalDateTime.now().plusDays(30));

        return vehiculoRepository.save(vehiculo);
    }

    public Vehiculo quitarOferta(Long id) {
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setEnOferta(false);
        vehiculo.setPrecioOferta(null);
        vehiculo.setFechaFinOferta(null);
        return vehiculoRepository.save(vehiculo);
    }

    // GESTIÓN DE ESTADOS

    public Vehiculo cambiarVisibilidad(Long id, Boolean visible) {
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setVisible(visible);
        return vehiculoRepository.save(vehiculo);
    }

    public Vehiculo cambiarEstadoVenta(Long id, String estado) {
        // Validar estado permitido
        if (!estado.equals("en_venta") && !estado.equals("vendido") && !estado.equals("proximo")) {
            throw new RuntimeException("Estado no válido");
        }
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setEstadoVenta(estado);
        return vehiculoRepository.save(vehiculo);
    }

    // CONSULTAS PARA WEB PÚBLICA

    public List<Vehiculo> obtenerVehiculosEnVenta() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("en_venta");
    }

    public List<Vehiculo> obtenerProximos() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("proximo");
    }

    public List<Vehiculo> obtenerVendidos() {
        return vehiculoRepository.findByVisibleTrueAndEstadoVenta("vendido");
    }

    public List<Vehiculo> buscarVehiculos(String marca, Double precioMin, Double precioMax) {
        return vehiculoRepository.buscarAvanzado(marca, "en_venta", precioMin, precioMax);
    }

    // ESTADÍSTICAS

    public long contarVehiculos() {
        return vehiculoRepository.count();
    }

    public long contarEnVenta() {
        return vehiculoRepository.countByEstadoVenta("en_venta");
    }

    public long contarVendidos() {
        return vehiculoRepository.countByEstadoVenta("vendido");
    }
}