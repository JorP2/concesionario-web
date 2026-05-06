package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.vehiculo.coche.Turismo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurismoRepository extends JpaRepository<Turismo, Long> {

    
}