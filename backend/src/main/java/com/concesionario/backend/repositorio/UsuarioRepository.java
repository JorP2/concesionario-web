package com.concesionario.backend.repositorio;

import com.concesionario.backend.dominio.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);

    Optional<Usuario> findByEmail(String email);

    long countByEsSuperUsuarioTrue();

    List<Usuario> findByActivoTrue();

}