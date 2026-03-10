package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {

    // Mensajes de un coche específico
    List<Mensaje> findByVehiculoIdOrderByFechaDesc(Long vehiculoId);

    // Todos los mensajes ordenados (nuevos primero)
    List<Mensaje> findAllByOrderByFechaDesc();

    // Mensajes por email
    List<Mensaje> findByEmail(String email);
}