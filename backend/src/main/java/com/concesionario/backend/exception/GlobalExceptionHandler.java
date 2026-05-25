package com.concesionario.backend.exception;

import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.concesionario.backend.dto.response.ErrorResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFound(ResourceNotFoundException e) {
        ErrorResponseDTO error = new ErrorResponseDTO(
            "NOT_FOUND",
            e.getMessage(),
            HttpStatus.NOT_FOUND.value()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // ========== NUEVO: Capturar errores de JWT ==========
    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorResponseDTO> handleJwtSignature(SignatureException e) {
        ErrorResponseDTO error = new ErrorResponseDTO(
            "TOKEN_INVALIDO",
            "Token inválido o expirado. Inicie sesión nuevamente.",
            HttpStatus.UNAUTHORIZED.value()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntime(RuntimeException e) {
        String mensaje = e.getMessage();
        
        // Personalizar mensajes comunes
        if (mensaje != null) {
            if (mensaje.contains("imagen") || mensaje.contains("archivo")) {
                mensaje = "Error con el archivo: " + mensaje;
            } else if (mensaje.contains("Categoría")) {
                mensaje = "Categoría no válida. Usa: CONCESIONARIO, TALLER, ENTREGAS";
            } else if (mensaje.contains("no encontrada")) {
                mensaje = "Recurso no encontrado";
            }
        }
        
        ErrorResponseDTO error = new ErrorResponseDTO(
            "ERROR",
            mensaje != null ? mensaje : "Error en la solicitud",
            HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneral(Exception e) {
        ErrorResponseDTO error = new ErrorResponseDTO(
            "INTERNAL_ERROR",
            "Error interno del servidor. Intente más tarde.",
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}