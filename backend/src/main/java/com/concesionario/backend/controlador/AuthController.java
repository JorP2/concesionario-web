package com.concesionario.backend.controlador;


import com.concesionario.backend.dto.request.LoginRequest;
import com.concesionario.backend.dto.request.RefreshTokenRequest;
import com.concesionario.backend.servicio.UsuarioService;
import com.concesionario.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsuarioService usuarioService;  // ← Agregar

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            String role = authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
            String accessToken = jwtUtil.generateToken(loginRequest.getUsername(), role);
            String refreshToken = jwtUtil.generateRefreshToken(loginRequest.getUsername());
            
            // Guardar refresh token en BD
            usuarioService.guardarRefreshToken(loginRequest.getUsername(), refreshToken);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("username", loginRequest.getUsername());
            response.put("role", role);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
    
    // ========== NUEVO ENDPOINT: REFRESCAR TOKEN ==========
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        
        // Validar formato del refresh token
        if (!jwtUtil.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(401).body("Refresh token inválido");
        }
        
        String username = jwtUtil.extractUsername(refreshToken);
        
        // Verificar refresh token en BD
        if (!usuarioService.validarRefreshToken(username, refreshToken)) {
            return ResponseEntity.status(401).body("Refresh token no válido o expirado");
        }
        
        // Obtener rol del usuario
        String role = usuarioService.obtenerRol(username);
        
        // Generar nuevo access token
        String newAccessToken = jwtUtil.generateToken(username, role);
        
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", newAccessToken);
        
        return ResponseEntity.ok(response);
    }
    
    // ========== CERRAR SESIÓN (eliminar refresh token) ==========
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        String username = jwtUtil.extractUsername(refreshToken);
        
        usuarioService.eliminarRefreshToken(username);
        
        return ResponseEntity.ok("Sesión cerrada correctamente");
    }
}
