package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByVehiculoIdOrderByOrdenAsc(Long vehiculoId);

    @Query("SELECT MAX(v.orden) FROM Video v WHERE v.vehiculo.id = :vehiculoId")

    Integer findMaxOrdenByVehiculoId(Long vehiculoId);

}