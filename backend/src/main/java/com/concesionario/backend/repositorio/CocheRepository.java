package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.vehiculo.Coche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CocheRepository extends JpaRepository<Coche, Long> {

    // ========== CONSULTAS ESPECÍFICAS DE COCHES ==========
    
    // Coches por número de puertas
    List<Coche> findByPuertas(Integer puertas);
    
    // Coches por tipo de cambio (manual/automático)
    List<Coche> findByCambioIgnoreCase(String cambio);
    
    // Coches por tipo de motor
    List<Coche> findByMotorContainingIgnoreCase(String motor);
    
    // Coches por pegatina ambiental (ECO, C, B, etc.)
    List<Coche> findByPegatinaIgnoreCase(String pegatina);
    
    // Coches con más de X asientos
    List<Coche> findByAsientosGreaterThanEqual(Integer asientos);
    
    // ========== BÚSQUEDAS COMBINADAS ==========
    List<Coche> findByPuertasAndCambio(Integer puertas, String cambio);
    
    // ========== ESTADÍSTICAS DE COCHES ==========
    long countByPuertas(Integer puertas);
    long countByCambioIgnoreCase(String cambio);
    
    // ========== BÚSQUEDA AVANZADA EN COCHES ==========
    @Query("SELECT c FROM Coche c WHERE " +
           "(:puertas IS NULL OR c.puertas = :puertas) AND " +
           "(:cambio IS NULL OR LOWER(c.cambio) = LOWER(:cambio)) AND " +
           "(:asientosMin IS NULL OR c.asientos >= :asientosMin)")
    List<Coche> buscarCochesAvanzado(
            @Param("puertas") Integer puertas,
            @Param("cambio") String cambio,
            @Param("asientosMin") Integer asientosMin);
}