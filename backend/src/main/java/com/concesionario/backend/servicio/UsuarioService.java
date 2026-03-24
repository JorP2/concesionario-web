package com.concesionario.backend.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.repositorio.UsuarioRepository;
import com.concesionario.backend.utils.PasswordEncoder;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CRUD BÁSICO

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    // CREAR USUARIO (con validaciones)

    public Usuario crearUsuario(Usuario usuario) {

        // 1. Validar username único
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }

        // 2. Validar email único
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 3. Validar teléfono (9 dígitos)
        if (usuario.getTelefono() != null && !usuario.getTelefono().matches("\\d{9}")) {
            throw new RuntimeException("El teléfono debe tener 9 dígitos");
        }

        // 4. Validar super usuario (solo puede haber 1)
        if (usuario.getEsSuperUsuario() != null && usuario.getEsSuperUsuario()) {
            long superCount = usuarioRepository.countByEsSuperUsuarioTrue();
            if (superCount >= 1) {
                throw new RuntimeException("Ya existe un super usuario");
            }
        }

        // 5. Valores por defecto
        if (usuario.getActivo() == null) {
            usuario.setActivo(true);
        }
        if (usuario.getEsSuperUsuario() == null) {
            usuario.setEsSuperUsuario(false);
        }

        // 6. Encriptar contraseña con BCrypt
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioRepository.save(usuario);
    }

    // ACTUALIZAR USUARIO

    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        Usuario existente = obtenerPorId(id);

        // Validar si intenta convertirse en super usuario
        if (usuarioActualizado.getEsSuperUsuario() != null &&
            usuarioActualizado.getEsSuperUsuario() &&
            !existente.getEsSuperUsuario()) {

            long superCount = usuarioRepository.countByEsSuperUsuarioTrue();
            if (superCount >= 1) {
                throw new RuntimeException("Ya existe un super usuario");
            }
        }

        // Actualizar campos permitidos
        if (usuarioActualizado.getNombre() != null) {
            existente.setNombre(usuarioActualizado.getNombre());
        }
        if (usuarioActualizado.getEmail() != null) {
            // Validar email no repetido (si cambia)
            if (!existente.getEmail().equals(usuarioActualizado.getEmail())) {
                if (usuarioRepository.findByEmail(usuarioActualizado.getEmail()).isPresent()) {
                    throw new RuntimeException("El email ya está registrado");
                }
                existente.setEmail(usuarioActualizado.getEmail());
            }
        }
        if (usuarioActualizado.getTelefono() != null) {
            if (!usuarioActualizado.getTelefono().matches("\\d{9}")) {
                throw new RuntimeException("El teléfono debe tener 9 dígitos");
            }
            existente.setTelefono(usuarioActualizado.getTelefono());
        }
        if (usuarioActualizado.getEsSuperUsuario() != null) {
            existente.setEsSuperUsuario(usuarioActualizado.getEsSuperUsuario());
        }

        return usuarioRepository.save(existente);
    }

    // CAMBIAR CONTRASEÑA


    public Usuario cambiarPassword(Long id, String passwordNueva) {
        Usuario usuario = obtenerPorId(id);

        if (passwordNueva == null || passwordNueva.length() < 4) {
            throw new RuntimeException("La contraseña debe tener al menos 4 caracteres");
        }

        usuario.setPassword(passwordEncoder.encode(passwordNueva));
        return usuarioRepository.save(usuario);
    }

    // LOGIN

    public Usuario login(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getActivo()) {
            throw new RuntimeException("Usuario desactivado");
        }

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return usuario;
    }

    // GESTIÓN DE ESTADOS

    public Usuario activarUsuario(Long id) {
        Usuario usuario = obtenerPorId(id);
        usuario.setActivo(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario desactivarUsuario(Long id) {
        Usuario usuario = obtenerPorId(id);

        // No permitir desactivar al super usuario
        if (usuario.getEsSuperUsuario()) {
            throw new RuntimeException("No puedes desactivar al super usuario");
        }

        usuario.setActivo(false);
        return usuarioRepository.save(usuario);
    }

    // ELIMINAR USUARIO

    public void eliminarUsuario(Long id) {
        Usuario usuario = obtenerPorId(id);

        // No permitir eliminar al super usuario
        if (usuario.getEsSuperUsuario()) {
            throw new RuntimeException("No puedes eliminar al super usuario");
        }

        usuarioRepository.deleteById(id);
    }

    // CONSULTAS


    public List<Usuario> obtenerActivos() {
        return usuarioRepository.findByActivoTrue();
    }

    public Usuario obtenerPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

}