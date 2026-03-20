package com.concesionario.backend.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private String error;
    private String mensaje;
    private int codigo;
    private LocalDateTime timestamp;

    public ErrorResponse(String error, String mensaje, int codigo) {
        this.error = error;
        this.mensaje = mensaje;
        this.codigo = codigo;
        this.timestamp = LocalDateTime.now();
    }

    // Getters y Setters
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public int getCodigo() { return codigo; }
    public void setCodigo(int codigo) { this.codigo = codigo; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}