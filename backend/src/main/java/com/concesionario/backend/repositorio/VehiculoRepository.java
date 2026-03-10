package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

    // Filtrar por visibilidad (para la web)
    List<Vehiculo> findByVisibleTrue();

    // Filtrar por estado de venta
    List<Vehiculo> findByEstadoVenta(String estadoVenta);

    // Coches en venta y visibles (los que se muestran en la web)
    List<Vehiculo> findByVisibleTrueAndEstadoVenta(String estadoVenta);

    // Filtrar por precio
    List<Vehiculo> findByPrecioBetween(Double min, Double max);

    // Filtrar por marca
    List<Vehiculo> findByMarcaContainingIgnoreCase(String marca);

    // Búsqueda combinada
    @Query("SELECT v FROM Vehiculo v WHERE " +
           "(:marca IS NULL OR LOWER(v.marca) LIKE LOWER(CONCAT('%', :marca, '%'))) AND " +
           "(:estado IS NULL OR v.estadoVenta = :estado) AND " +
           "(:precioMin IS NULL OR v.precio >= :precioMin) AND " +
           "(:precioMax IS NULL OR v.precio <= :precioMax)")
    List<Vehiculo> buscarAvanzado(
            @Param("marca") String marca,
            @Param("estado") String estado,
            @Param("precioMin") Double precioMin,
            @Param("precioMax") Double precioMax);
}