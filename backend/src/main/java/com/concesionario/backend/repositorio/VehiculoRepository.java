package com.concesionario.backend.repositorio;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.concesionario.backend.dominio.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>{
	List<Vehiculo> findByMarca(String marca);
	List<Vehiculo> findByModelo(String modelo);
}