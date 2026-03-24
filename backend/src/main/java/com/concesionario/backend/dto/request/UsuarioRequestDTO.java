package com.concesionario.backend.dto.request;

public class UsuarioRequestDTO {
    private String username;
    private String nombre;
    private String email;
    private String telefono;
    private String password;

    // Constructor vacío
    public UsuarioRequestDTO() {}

    // Getters y Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}