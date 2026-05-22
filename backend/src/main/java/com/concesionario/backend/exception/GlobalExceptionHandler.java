package com.concesionario.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.concesionario.backend.dto.response.ErrorResponseDTO;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFound(ResourceNotFoundException e) {
        ErrorResponseDTO error = new ErrorResponseDTO(
            "NOT_FOUND",
            "Recurso no encontrado.",
            HttpStatus.NOT_FOUND.value()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(MethodArgumentNotValidException e) {
        String mensajes = e.getBindingResult().getAllErrors().stream()
            .map(error -> {
                if (error instanceof FieldError) {
                    return ((FieldError) error).getField() + ": " + error.getDefaultMessage();
                }
                return error.getDefaultMessage();
            })
            .collect(Collectors.joining(", "));
        
        ErrorResponseDTO error = new ErrorResponseDTO(
            "VALIDATION_ERROR",
            "Datos inválidos: " + mensajes,
            HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntime(RuntimeException e) {
        String mensaje;
        String errorMensaje = e.getMessage();
        
        if (errorMensaje != null) {
            if (errorMensaje.contains("Usuario no encontrado")) {
                mensaje = "Usuario no existe. Verifique sus datos.";
            } else if (errorMensaje.contains("contraseña") || errorMensaje.contains("password")) {
                mensaje = "Contraseña incorrecta. Intente nuevamente.";
            } else if (errorMensaje.contains("Vehículo") || errorMensaje.contains("vehículo")) {
                mensaje = "Vehículo no encontrado.";
            } else if (errorMensaje.contains("El nombre de usuario ya existe")) {
                mensaje = "El nombre de usuario ya está registrado.";
            } else if (errorMensaje.contains("Email ya existe") || errorMensaje.contains("email ya está registrado")) {
                mensaje = "El correo electrónico ya está en uso.";
            } else if (errorMensaje.contains("El teléfono debe tener 9 dígitos")) {
                mensaje = "El teléfono debe contener 9 dígitos.";
            } else if (errorMensaje.contains("Usuario desactivado")) {
                mensaje = "Usuario bloqueado. Contacte al administrador.";
            } else if (errorMensaje.contains("El precio no puede ser negativo")) {
                mensaje = "El precio no puede ser negativo.";
            } else if (errorMensaje.contains("Año no válido")) {
                mensaje = "El año ingresado no es válido.";
            } else if (errorMensaje.contains("Estado no válido")) {
                mensaje = "El estado de venta no es válido.";
            } else {
                mensaje = "Error en la solicitud. Revise los datos enviados.";
            }
        } else {
            mensaje = "Error en la solicitud. Revise los datos enviados.";
        }
        
        ErrorResponseDTO error = new ErrorResponseDTO("ERROR", mensaje, HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneral(Exception e) {
        ErrorResponseDTO error = new ErrorResponseDTO(
            "ERROR_INTERNO",
            "Error interno del servidor. Intente más tarde.",
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}