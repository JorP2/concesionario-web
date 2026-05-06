package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.vehiculo.coche.Furgoneta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FurgonetaRepository extends JpaRepository<Furgoneta, Long> {

    // ========== CONSULTAS ESPECÍFICAS DE FURGONETAS ==========
    
    // Furgonetas por capacidad de carga
    List<Furgoneta> findByCapacidadCargaGreaterThanEqual(Double capacidad);
    
    // Furgonetas por número de asientos
    List<Furgoneta> findByNumeroAsientos(Integer asientos);
    
    // Furgonetas con puerta corredera
    List<Furgoneta> findByTienePuertaCorrederaTrue();
    
    // Furgonetas ordenadas por capacidad de carga (mayor a menor)
    List<Furgoneta> findAllByOrderByCapacidadCargaDesc();
}