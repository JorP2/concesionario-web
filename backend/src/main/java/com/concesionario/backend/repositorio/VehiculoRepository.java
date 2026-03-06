package com.concesionario.backend.repositorio;

// paquetes jpa (CRUD)
import org.springframework.data.jpa.repository.JpaRepository;
import com.concesionario.backend.dominio.Vehiculo;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>{
	
	// Filtros
}
