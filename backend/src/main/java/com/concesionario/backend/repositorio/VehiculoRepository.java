package com.concesionario.backend.repositorio;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.concesionario.backend.dominio.Vehiculo;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>{
	
	List<Vehiculo>findByMarca(String marca);
	List<Vehiculo>findByCombustible(String combustible);
}