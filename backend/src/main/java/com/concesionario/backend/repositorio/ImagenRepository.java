package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ImagenRepository extends JpaRepository<Imagen, Long> {

    List<Imagen> findByVehiculoIdOrderByOrdenAsc(Long vehiculoId);

    List<Imagen> findByVehiculoIdAndEsPortadaTrue(Long vehiculoId);

    @Query("SELECT MAX(i.orden) FROM Imagen i WHERE i.vehiculo.id = :vehiculoId")

    Integer findMaxOrdenByVehiculoId(Long vehiculoId);

    long countByVehiculoId(Long vehiculoId);

}