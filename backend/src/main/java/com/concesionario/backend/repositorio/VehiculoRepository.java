package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {


    List<Vehiculo> findByMarcaIgnoreCase(String marca);

    List<Vehiculo> findByModeloIgnoreCase(String modelo);

    List<Vehiculo> findByMarcaIgnoreCaseAndModeloIgnoreCase(String marca, String modelo);

    List<Vehiculo> findByAnio(Integer anio);

    List<Vehiculo> findByPrecioBetween(Double precioMin, Double precioMax);

    List<Vehiculo> findByCombustibleIgnoreCase(String combustible);

    List<Vehiculo> findByVisibleTrue();

    List<Vehiculo> findByEstadoVenta(String estadoVenta);

    List<Vehiculo> findByVisibleTrueAndEstadoVenta(String estadoVenta);

    List<Vehiculo> findByEnOfertaTrue();

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

    long countByEstadoVenta(String estadoVenta);

    long countByVisibleTrue();
}