package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.dto.LoginRequest;
import com.concesionario.backend.dto.UsuarioResponseDTO;
import com.concesionario.backend.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // LOGIN

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody LoginRequest loginRequest) {
        try {
            Usuario usuario = usuarioService.login(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            );
            return ResponseEntity.ok(convertirADTO(usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }

    // ACTIVOS

    @GetMapping("/activos")
    public ResponseEntity<List<UsuarioResponseDTO>> listarActivos() {
        List<Usuario> usuarios = usuarioService.obtenerActivos();
        List<UsuarioResponseDTO> dtos = usuarios.stream().map(this::convertirADTO).toList();
        return ResponseEntity.ok(dtos);
    }

    // CRUD

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        List<Usuario> usuarios = usuarioService.obtenerTodos();
        List<UsuarioResponseDTO> dtos = usuarios.stream().map(this::convertirADTO).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(convertirADTO(usuario));
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> crear(@RequestBody Usuario usuario) {
        Usuario nuevo = usuarioService.crearUsuario(usuario);
        return ResponseEntity.ok(convertirADTO(nuevo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {
        Usuario actualizado = usuarioService.actualizarUsuario(id, usuario);
        return ResponseEntity.ok(convertirADTO(actualizado));
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UsuarioResponseDTO> cambiarPassword(
            @PathVariable Long id,
            @RequestParam String password) {
        Usuario usuario = usuarioService.cambiarPassword(id, password);
        return ResponseEntity.ok(convertirADTO(usuario));
    }

    @PatchMapping("/{id}/activar")
    public ResponseEntity<UsuarioResponseDTO> activar(@PathVariable Long id) {
        Usuario usuario = usuarioService.activarUsuario(id);
        return ResponseEntity.ok(convertirADTO(usuario));
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<UsuarioResponseDTO> desactivar(@PathVariable Long id) {
        Usuario usuario = usuarioService.desactivarUsuario(id);
        return ResponseEntity.ok(convertirADTO(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    // DTO

    private UsuarioResponseDTO convertirADTO(Usuario u) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(u.getId());
        dto.setUsername(u.getUsername());
        dto.setNombre(u.getNombre());
        dto.setEmail(u.getEmail());
        dto.setTelefono(u.getTelefono());
        dto.setActivo(u.getActivo());
        dto.setEsSuperUsuario(u.getEsSuperUsuario());
        return dto;
    }
}