package com.concesionario.backend.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import com.concesionario.backend.dominio.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
