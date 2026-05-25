package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.CategoriaGaleria;
import com.concesionario.backend.dominio.Galeria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GaleriaRepository extends JpaRepository<Galeria, Long> {
    List<Galeria> findByCategoria(CategoriaGaleria categoria);
    
    // Nuevos métodos
    long countByCategoria(CategoriaGaleria categoria);
}