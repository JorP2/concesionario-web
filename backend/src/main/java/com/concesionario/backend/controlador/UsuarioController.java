package com.concesionario.backend.controlador;

import com.concesionario.backend.dominio.Usuario;
import com.concesionario.backend.dto.request.UsuarioRequestDTO;
import com.concesionario.backend.dto.response.UsuarioResponseDTO;
import com.concesionario.backend.servicio.UsuarioService;
import com.concesionario.backend.utils.DTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

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
        Usuario usuario = DTOConverter.toEntity(requestDTO);
        Usuario nuevo = usuarioService.crearUsuario(usuario);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(nuevo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody UsuarioRequestDTO requestDTO) {
        Usuario usuarioActualizado = DTOConverter.toEntity(requestDTO);
        Usuario actualizado = usuarioService.actualizarUsuario(id, usuarioActualizado);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(actualizado));
    }
    
    @PutMapping("/{id}/cambiar-password")
    public ResponseEntity<UsuarioResponseDTO> cambiarPassword(
            @PathVariable Long id,
            @RequestParam String password) {
        Usuario actualizado = usuarioService.cambiarPassword(id, password);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(actualizado));
    }
    
    @PutMapping("/{id}/restablecer-password")
    public ResponseEntity<UsuarioResponseDTO> restablecerPassword(@PathVariable Long id) {
        Usuario usuario = usuarioService.restablecerPasswordAdmin(id);
        return ResponseEntity.ok(DTOConverter.toUsuarioResponseDTO(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}