package com.concesionario.backend.dto.response;

public class UsuarioResponseDTO {
    private Long id;
    private String username;
    private String nombre;
    private String email;
    private String telefono;
    private Boolean activo;
    private Boolean esSuperUsuario;

    public UsuarioResponseDTO() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public Boolean getEsSuperUsuario() { return esSuperUsuario; }
    public void setEsSuperUsuario(Boolean esSuperUsuario) { this.esSuperUsuario = esSuperUsuario; }
}