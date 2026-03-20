package com.concesionario.backend.dominio;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "imagen")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El vehículo es obligatorio")
    @ManyToOne
    @JoinColumn(name = "vehiculo_id", nullable = false)
    private Vehiculo vehiculo;

    @NotBlank(message = "El UID no puede estar vacío")
    @Column(nullable = false, length = 100)
    private String uid;

    @Min(1) @Max(999)
    private Integer orden = 1;

    private Boolean esPortada = false;

    // Constructor vacío
    public Imagen() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vehiculo getVehiculo() { return vehiculo; }
    public void setVehiculo(Vehiculo vehiculo) { this.vehiculo = vehiculo; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public Integer getOrden() { return orden; }
    public void setOrden(Integer orden) { this.orden = orden; }

    public Boolean getEsPortada() { return esPortada; }
    public void setEsPortada(Boolean esPortada) { this.esPortada = esPortada; }
}