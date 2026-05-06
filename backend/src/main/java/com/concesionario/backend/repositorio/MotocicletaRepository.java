package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.vehiculo.Motocicleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MotocicletaRepository extends JpaRepository<Motocicleta, Long> {

    // ========== CONSULTAS ESPECÍFICAS DE MOTOS ==========
    
    // Motos por cilindrada
    List<Motocicleta> findByCilindrada(Integer cilindrada);
    
    // Motos con cilindrada mayor a X
    List<Motocicleta> findByCilindradaGreaterThan(Integer cilindrada);
    
    // Motos con cilindrada entre dos valores
    List<Motocicleta> findByCilindradaBetween(Integer min, Integer max);
    
    // Motos por tipo de motor
    List<Motocicleta> findByTipoMotorIgnoreCase(String tipoMotor);
    
    // Motos que tienen sidecar
    List<Motocicleta> findByTieneSidecarTrue();
    
    // Motos que tienen baúl
    List<Motocicleta> findByTieneBaulTrue();
    
    // ========== ESTADÍSTICAS ==========
    long countByCilindradaGreaterThan(Integer cilindrada);
    long countByTipoMotorIgnoreCase(String tipoMotor);
}