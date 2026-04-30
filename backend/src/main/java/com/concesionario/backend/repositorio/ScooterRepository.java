package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.vehiculo.moto.Scooter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScooterRepository extends JpaRepository<Scooter, Long> {

    // ========== CONSULTAS ESPECÍFICAS DE SCOOTERS ==========
    
    // Scooters con autonomía mayor a X km
    List<Scooter> findByAutonomiaGreaterThanEqual(Double autonomia);
    
    // Scooters con maletín bajo asiento
    List<Scooter> findByTieneMaletinBajoAsientoTrue();
    
    // Scooters ordenados por autonomía
    List<Scooter> findAllByOrderByAutonomiaDesc();
}