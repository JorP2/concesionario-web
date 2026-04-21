package com.concesionario.backend.servicio;

import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.repositorio.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Transactional
public class UsuarioService {

    private static final Logger log = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ========== CRUD BÁSICO ==========

    public List<Usuario> obtenerTodos() {
        log.info("Obteniendo todos los usuarios");
        return usuarioRepository.findAll();
    }

    public Usuario obtenerPorId(Long id) {
        log.info("Obteniendo usuario por ID: {}", id);
        return usuarioRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Usuario no encontrado con ID: {}", id);
                    return new RuntimeException("Usuario no encontrado");
                });
    }

    // ========== CREAR USUARIO ==========

    public Usuario crearUsuario(Usuario usuario) {
        log.info("Creando nuevo usuario: {}", usuario.getUsername());
        
        validarUsernameUnico(usuario.getUsername());
        validarEmailUnico(usuario.getEmail());
        validarTelefono(usuario.getTelefono());
        validarSuperUsuario(usuario);
        
        asignarValoresPorDefecto(usuario);
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        Usuario resultado = usuarioRepository.save(usuario);
        log.info("Usuario creado con ID: {}", resultado.getId());
        return resultado;
    }

    // ========== ACTUALIZAR USUARIO ==========

    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        log.info("Actualizando usuario ID: {}", id);
        
        Usuario existente = obtenerPorId(id);
        validarSuperUsuarioAlActualizar(existente, usuarioActualizado);
        
        actualizarCamposPermitidos(existente, usuarioActualizado);
        
        Usuario resultado = usuarioRepository.save(existente);
        log.info("Usuario ID: {} actualizado correctamente", id);
        return resultado;
    }

    // ========== CAMBIAR CONTRASEÑA ==========

    public Usuario cambiarPassword(Long id, String passwordNueva) {
        log.info("Cambiando contraseña del usuario ID: {}", id);
        
        validarPassword(passwordNueva);
        
        Usuario usuario = obtenerPorId(id);
        usuario.setPassword(passwordEncoder.encode(passwordNueva));
        
        Usuario resultado = usuarioRepository.save(usuario);
        log.info("Contraseña cambiada para usuario ID: {}", id);
        return resultado;
    }

    // ========== LOGIN ==========

    public Usuario login(String username, String password) {
        log.info("Intento de login: {}", username);
        
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warn("Login fallido: usuario no encontrado - {}", username);
                    return new RuntimeException("Usuario no encontrado");
                });
        
        validarUsuarioActivo(usuario, username);
        validarPasswordCorrecta(password, usuario, username);
        
        log.info("Login exitoso: {}", username);
        return usuario;
    }

    // ========== GESTIÓN DE ESTADOS ==========

    public Usuario activarUsuario(Long id) {
        log.info("Activando usuario ID: {}", id);
        
        Usuario usuario = obtenerPorId(id);
        usuario.setActivo(true);
        
        Usuario resultado = usuarioRepository.save(usuario);
        log.info("Usuario ID: {} activado", id);
        return resultado;
    }

    public Usuario desactivarUsuario(Long id) {
        log.info("Desactivando usuario ID: {}", id);
        
        Usuario usuario = obtenerPorId(id);
        validarNoEsSuperUsuario(usuario);
        
        usuario.setActivo(false);
        
        Usuario resultado = usuarioRepository.save(usuario);
        log.info("Usuario ID: {} desactivado", id);
        return resultado;
    }
    
    // Guardar refresh token (por username)
    public void guardarRefreshToken(String username, String refreshToken) {
        Usuario usuario = obtenerPorUsername(username);
        usuario.setRefreshToken(refreshToken);
        usuario.setRefreshTokenExpiry(LocalDateTime.now().plusDays(7));
        usuarioRepository.save(usuario);
        log.info("Refresh token guardado para usuario: {}", username);
    }

    // Validar refresh token
    public boolean validarRefreshToken(String username, String refreshToken) {
        Usuario usuario = obtenerPorUsername(username);
        
        if (usuario.getRefreshToken() == null) {
            log.warn("Refresh token no existe para usuario: {}", username);
            return false;
        }
        
        if (!usuario.getRefreshToken().equals(refreshToken)) {
            log.warn("Refresh token no coincide para usuario: {}", username);
            return false;
        }
        
        if (usuario.getRefreshTokenExpiry().isBefore(LocalDateTime.now())) {
            log.warn("Refresh token expirado para usuario: {}", username);
            return false;
        }
        
        return true;
    }

    // Eliminar refresh token (logout)
    public void eliminarRefreshToken(String username) {
        Usuario usuario = obtenerPorUsername(username);
        usuario.setRefreshToken(null);
        usuario.setRefreshTokenExpiry(null);
        usuarioRepository.save(usuario);
        log.info("Refresh token eliminado para usuario: {}", username);
    }

    // Obtener rol del usuario
    public String obtenerRol(String username) {
        Usuario usuario = obtenerPorUsername(username);
        return usuario.getEsSuperUsuario() ? "ADMIN" : "USER";
    }
    
    // ========== ELIMINAR USUARIO ==========

    public void eliminarUsuario(Long id) {
        log.info("Eliminando usuario ID: {}", id);
        
        Usuario usuario = obtenerPorId(id);
        validarNoEsSuperUsuario(usuario);
        
        usuarioRepository.deleteById(id);
        log.info("Usuario ID: {} eliminado", id);
    }

    // ========== CONSULTAS ==========

    public List<Usuario> obtenerActivos() {
        log.info("Obteniendo usuarios activos");
        return usuarioRepository.findByActivoTrue();
    }

    public Usuario obtenerPorUsername(String username) {
        log.info("Obteniendo usuario por username: {}", username);
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warn("Usuario no encontrado con username: {}", username);
                    return new RuntimeException("Usuario no encontrado");
                });
    }

    
    // ========== MÉTODOS PRIVADOS DE VALIDACIÓN ==========

    private void validarUsernameUnico(String username) {
        if (usuarioRepository.findByUsername(username).isPresent()) {
            log.warn("Username ya existe: {}", username);
            throw new RuntimeException("El nombre de usuario ya existe");
        }
    }

    private void validarEmailUnico(String email) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            log.warn("Email ya existe: {}", email);
            throw new RuntimeException("El email ya está registrado");
        }
    }

    private void validarTelefono(String telefono) {
        if (telefono != null && !telefono.matches("\\d{9}")) {
            log.warn("Teléfono inválido: {}", telefono);
            throw new RuntimeException("El teléfono debe tener 9 dígitos");
        }
    }

    private void validarSuperUsuario(Usuario usuario) {
        if (usuario.getEsSuperUsuario() == null || !usuario.getEsSuperUsuario()) {
            return;
        }
        
        if (usuarioRepository.countByEsSuperUsuarioTrue() >= 1) {
            log.warn("Intento de crear otro super usuario");
            throw new RuntimeException("Ya existe un super usuario");
        }
    }

    private void validarSuperUsuarioAlActualizar(Usuario existente, Usuario nuevo) {
        if (nuevo.getEsSuperUsuario() == null || !nuevo.getEsSuperUsuario()) {
            return;
        }
        
        if (!existente.getEsSuperUsuario() && usuarioRepository.countByEsSuperUsuarioTrue() >= 1) {
            log.warn("Intento de convertir a otro usuario en super usuario");
            throw new RuntimeException("Ya existe un super usuario");
        }
    }

    private void validarUsuarioActivo(Usuario usuario, String username) {
        if (!usuario.getActivo()) {
            log.warn("Login fallido: usuario desactivado - {}", username);
            throw new RuntimeException("Usuario desactivado");
        }
    }

    private void validarPasswordCorrecta(String password, Usuario usuario, String username) {
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            log.warn("Login fallido: contraseña incorrecta - {}", username);
            throw new RuntimeException("Contraseña incorrecta");
        }
    }

    private void validarPassword(String password) {
        if (password == null || password.length() < 4) {
            log.warn("Contraseña inválida: longitud menor a 4");
            throw new RuntimeException("La contraseña debe tener al menos 4 caracteres");
        }
    }

    private void validarNoEsSuperUsuario(Usuario usuario) {
        if (usuario.getEsSuperUsuario()) {
            log.warn("Intento de modificar/eliminar super usuario: {}", usuario.getUsername());
            throw new RuntimeException("No puedes modificar al super usuario");
        }
    }

    // ========== MÉTODOS PRIVADOS DE ASIGNACIÓN ==========

    private void asignarValoresPorDefecto(Usuario usuario) {
        if (usuario.getActivo() == null) {
            usuario.setActivo(true);
        }
        if (usuario.getEsSuperUsuario() == null) {
            usuario.setEsSuperUsuario(false);
        }
    }

    private void actualizarCamposPermitidos(Usuario existente, Usuario nuevo) {
        if (nuevo.getNombre() != null) {
            existente.setNombre(nuevo.getNombre());
        }
        
        if (nuevo.getEmail() != null) {
            actualizarEmail(existente, nuevo.getEmail());
        }
        
        if (nuevo.getTelefono() != null) {
            validarTelefono(nuevo.getTelefono());
            existente.setTelefono(nuevo.getTelefono());
        }
        
        if (nuevo.getEsSuperUsuario() != null) {
            existente.setEsSuperUsuario(nuevo.getEsSuperUsuario());
        }
    }

    private void actualizarEmail(Usuario existente, String nuevoEmail) {
        if (!existente.getEmail().equals(nuevoEmail)) {
            if (usuarioRepository.findByEmail(nuevoEmail).isPresent()) {
                log.warn("Email ya existe: {}", nuevoEmail);
                throw new RuntimeException("El email ya está registrado");
            }
            existente.setEmail(nuevoEmail);
        }
    }
}