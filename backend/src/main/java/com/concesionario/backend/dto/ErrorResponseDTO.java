package com.concesionario.backend.dto;

public class ErrorResponseDTO {
    private String error;
    private String mensaje;
    private int codigo;
    private String timestamp;

    public ErrorResponseDTO() {}

    public ErrorResponseDTO(String error, String mensaje, int codigo) {
        this.error = error;
        this.mensaje = mensaje;
        this.codigo = codigo;
        this.timestamp = java.time.LocalDateTime.now().toString();
    }

    // Getters y Setters
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public int getCodigo() { return codigo; }
    public void setCodigo(int codigo) { this.codigo = codigo; }
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}