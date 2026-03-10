package com.concesionario.backend.dominio;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "mensaje")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nombre;

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "Debe ser un email válido")
    @Size(max = 100, message = "El email no puede superar 100 caracteres")
    @Column(nullable = false, length = 100)
    private String email;

    @NotBlank(message = "El mensaje no puede estar vacío")
    @Size(min = 5, max = 500, message = "El mensaje debe tener entre 5 y 500 caracteres")
    @Column(nullable = false, length = 500)
    private String texto;

    @Column(name = "vehiculo_id")
    private Long vehiculoId;  // Relación opcional con vehículo

    @CreationTimestamp
    @Column(name = "fecha", updatable = false)
    private LocalDateTime fecha;

    // Constructor vacío (OBLIGATORIO para JPA)
    public Mensaje() {}

    // Constructor con campos principales (opcional)
    public Mensaje(String nombre, String email, String texto, Long vehiculoId) {
        this.nombre = nombre;
        this.email = email;
        this.texto = texto;
        this.vehiculoId = vehiculoId;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Long getVehiculoId() {
        return vehiculoId;
    }

    public void setVehiculoId(Long vehiculoId) {
        this.vehiculoId = vehiculoId;
    }

    public LocalDateTime getFechaCreacion() {
        return fecha;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fecha = fechaCreacion;
    }

    // Método toString (opcional, útil para depuración)
    @Override
    public String toString() {
        return "Mensaje{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", texto='" + texto + '\'' +
                ", vehiculoId=" + vehiculoId +
                ", fechaCreacion=" + fecha +
                '}';
    }
}