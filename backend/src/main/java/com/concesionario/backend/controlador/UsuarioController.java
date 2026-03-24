package com.concesionario.backend.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.dto.request.LoginRequest;
import com.concesionario.backend.dto.request.UsuarioRequestDTO;
import com.concesionario.backend.dto.response.UsuarioResponseDTO;
import com.concesionario.backend.servicio.UsuarioService;
import com.concesionario.backend.utils.DTOConverter;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody LoginRequest loginRequest) {
        try {
            Usuario usuario = usuarioService.login(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            );
            return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }

    // ACTIVOS

    @GetMapping("/activos")
    public ResponseEntity<List<UsuarioResponseDTO>> listarActivos() {
        List<Usuario> usuarios = usuarioService.obtenerActivos();
        List<UsuarioResponseDTO> dtos = usuarios.stream()
                .map(DTOConverter::toUsuarioResponseDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        List<Usuario> usuarios = usuarioService.obtenerTodos();
        List<UsuarioResponseDTO> dtos = usuarios.stream()
                .map(DTOConverter::toUsuarioResponseDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(usuario));
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> crear(@RequestBody UsuarioRequestDTO requestDTO) {
        // 1. Request → Entidad
        Usuario usuario = DTOConverter.toEntity(requestDTO);

        // 2. Service crea
        Usuario nuevo = usuarioService.crearUsuario(usuario);

        // 3. Entidad → Response
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(nuevo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody UsuarioRequestDTO requestDTO) {

        // 1. Request → Entidad
        Usuario usuarioActualizado = DTOConverter.toEntity(requestDTO);

        // 2. Service actualiza
        Usuario actualizado = usuarioService.actualizarUsuario(id, usuarioActualizado);

        // 3. Entidad → Response
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(actualizado));
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<UsuarioResponseDTO> cambiarPassword(
            @PathVariable Long id,
            @RequestParam String password) {
        Usuario usuario = usuarioService.cambiarPassword(id, password);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(usuario));
    }

    @PatchMapping("/{id}/activar")
    public ResponseEntity<UsuarioResponseDTO> activar(@PathVariable Long id) {
        Usuario usuario = usuarioService.activarUsuario(id);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(usuario));
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<UsuarioResponseDTO> desactivar(@PathVariable Long id) {
        Usuario usuario = usuarioService.desactivarUsuario(id);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}