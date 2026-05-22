package com.concesionario.backend.controlador;

import com.concesionario.backend.dto.request.LoginRequest;
import com.concesionario.backend.dto.request.RefreshTokenRequest;
import com.concesionario.backend.servicio.UsuarioService;
import com.concesionario.backend.utils.JwtUtil;
import com.concesionario.backend.utils.SecurityLogger;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
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
    private UsuarioService usuarioService;
    
    @Autowired
    private SecurityLogger securityLogger;

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null) {
            return xfHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String ip = getClientIP(request);
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            String role = authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
            String accessToken = jwtUtil.generateToken(loginRequest.getUsername(), role);
            String refreshToken = jwtUtil.generateRefreshToken(loginRequest.getUsername());
            
            usuarioService.guardarRefreshToken(loginRequest.getUsername(), refreshToken);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("username", loginRequest.getUsername());
            response.put("role", role);

            securityLogger.logLoginSuccess(loginRequest.getUsername(), ip);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            securityLogger.logLoginFailed(loginRequest.getUsername(), ip, "Credenciales incorrectas");
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos. Intente nuevamente.");
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest request, HttpServletRequest servletRequest) {
        String ip = getClientIP(servletRequest);
        String refreshToken = request.getRefreshToken();
        
        if (refreshToken == null || refreshToken.isEmpty()) {
            securityLogger.logTokenInvalid("desconocido", ip, "Refresh token no proporcionado");
            return ResponseEntity.status(401).body("Token de refresco no proporcionado. Inicie sesión nuevamente.");
        }
        
        if (!jwtUtil.validateRefreshToken(refreshToken)) {
            securityLogger.logTokenInvalid(jwtUtil.extractUsername(refreshToken), ip, "Refresh token expirado o inválido");
            return ResponseEntity.status(401).body("Sesión caducada. Inicie sesión nuevamente.");
        }
        
        String username = jwtUtil.extractUsername(refreshToken);
        
        if (!usuarioService.validarRefreshToken(username, refreshToken)) {
            securityLogger.logTokenInvalid(username, ip, "Refresh token no coincide en BD");
            return ResponseEntity.status(401).body("La sesión no es válida. Inicie sesión otra vez.");
        }
        
        String role = usuarioService.obtenerRol(username);
        String newAccessToken = jwtUtil.generateToken(username, role);
        
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", newAccessToken);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body("No se pudo cerrar sesión. Token no proporcionado.");
        }
        
        try {
            String username = jwtUtil.extractUsername(refreshToken);
            usuarioService.eliminarRefreshToken(username);
            return ResponseEntity.ok("Sesión cerrada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.ok("Sesión cerrada.");
        }
    }
}