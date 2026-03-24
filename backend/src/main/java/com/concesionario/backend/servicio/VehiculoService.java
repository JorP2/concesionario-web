package com.concesionario.backend.servicio;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.concesionario.backend.dominio.Vehiculo;
import com.concesionario.backend.repositorio.VehiculoRepository;
import com.concesionario.backend.utils.DateUtils;

@Service
@Transactional
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    // .- CRUD BASICO

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo obtenerPorId(Long id) {
        return vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
    }

    public void eliminar(Long id) {
        vehiculoRepository.deleteById(id);
    }

    // CREAR

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        validarVehiculo(vehiculo);
        asignarValoresPorDefecto(vehiculo);
        return vehiculoRepository.save(vehiculo);
    }

    // ACTUALIZAR

    public Vehiculo actualizarVehiculo(Long id, Vehiculo vehiculoActualizado) {
        Vehiculo existente = obtenerPorId(id);
        actualizarCampos(existente, vehiculoActualizado);
        return vehiculoRepository.save(existente);
    }

    // .- GESTIÓN DE OFERTAS
    // APLICAR OFERTA
    public Vehiculo aplicarOferta(Long id, Double descuento) {
        if (descuento <= 0 || descuento > 100) {
            throw new RuntimeException("El descuento debe ser entre 1 y 100");
        }

        Vehiculo vehiculo = obtenerPorId(id);
        Double precioOferta = vehiculo.getPrecio() - (vehiculo.getPrecio() * descuento / 100);

        vehiculo.setPrecioOferta(precioOferta);
        vehiculo.setEnOferta(true);
        vehiculo.setFechaFinOferta(DateUtils.ahora().plusDays(30));

        return vehiculoRepository.save(vehiculo);
    }

    // QUITAR OFERTA
    public Vehiculo quitarOferta(Long id) {
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setEnOferta(false);
        vehiculo.setPrecioOferta(null);
        vehiculo.setFechaFinOferta(null);
        return vehiculoRepository.save(vehiculo);
    }

    // .- GESTION DE ESTADOS
    // CAMBIAR VISIBILIDAD
    public Vehiculo cambiarVisibilidad(Long id, Boolean visible) {
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setVisible(visible);
        return vehiculoRepository.save(vehiculo);
    }

    //CAMBIAR ESTADO
    public Vehiculo cambiarEstadoVenta(Long id, String estado) {
        if (!estado.equals("en_venta") && !estado.equals("vendido") && !estado.equals("proximo")) {
            throw new RuntimeException("Estado no válido");
        }
        Vehiculo vehiculo = obtenerPorId(id);
        vehiculo.setEstadoVenta(estado);
        return vehiculoRepository.save(vehiculo);
    }

    // .-CONSULTAS PUBLICAS

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

    // .- ESTADÍSTICAS

    public long contarVehiculos() {
        return vehiculoRepository.count();
    }

    public long contarEnVenta() {
        return vehiculoRepository.countByEstadoVenta("en_venta");
    }

    public long contarVendidos() {
        return vehiculoRepository.countByEstadoVenta("vendido");
    }

    // METODOS PRIVADOS

    private void validarVehiculo(Vehiculo vehiculo) {
        int añoActual = LocalDateTime.now().getYear();

        if (vehiculo.getPrecio() < 0) {
            throw new RuntimeException("El precio no puede ser negativo");
        }
        if (vehiculo.getAnio() < 1900 || vehiculo.getAnio() > añoActual + 1) {
            throw new RuntimeException("Año no válido");
        }
        if (vehiculo.getKilometros() < 0) {
            throw new RuntimeException("Los kilómetros no pueden ser negativos");
        }
        if (vehiculo.getAsientos() < 1 || vehiculo.getAsientos() > 9) {
            throw new RuntimeException("Número de asientos no válido");
        }
    }

    private void asignarValoresPorDefecto(Vehiculo vehiculo) {
        if (vehiculo.getVisible() == null) {
            vehiculo.setVisible(true);
        }
        if (vehiculo.getEstadoVenta() == null) {
            vehiculo.setEstadoVenta("en_venta");
        }
        if (vehiculo.getEnOferta() == null) {
            vehiculo.setEnOferta(false);
        }
    }

    private void actualizarCampos(Vehiculo existente, Vehiculo nuevo) {
        existente.setMarca(nuevo.getMarca());
        existente.setModelo(nuevo.getModelo());
        existente.setPrecio(nuevo.getPrecio());
        existente.setAnio(nuevo.getAnio());
        existente.setKilometros(nuevo.getKilometros());
        existente.setCombustible(nuevo.getCombustible());
        existente.setColorExterior(nuevo.getColorExterior());
        existente.setInterior(nuevo.getInterior());
        existente.setAsientos(nuevo.getAsientos());
        existente.setPuertas(nuevo.getPuertas());
        existente.setMotor(nuevo.getMotor());
        existente.setCambio(nuevo.getCambio());
        existente.setPegatina(nuevo.getPegatina());
        existente.setDescripcion(nuevo.getDescripcion());
        existente.setExtras(nuevo.getExtras());
    }
}