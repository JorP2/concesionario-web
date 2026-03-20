package com.concesionario.backend.dominio;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La marca no puede estar vacía")
    @Size(min = 2, max = 50, message = "La marca debe tener entre 2 y 50 caracteres")
    @Column(nullable = false, length = 50)
    private String marca;

    @NotBlank(message = "El modelo no puede estar vacío")
    @Size(min = 1, max = 100, message = "El modelo debe tener entre 1 y 100 caracteres")
    @Column(nullable = false, length = 100)
    private String modelo;

    @NotNull(message = "El precio no puede ser nulo")
    @Positive(message = "El precio debe ser positivo")
    @Column(nullable = false)
    private Double precio;

    @NotNull(message = "El año no puede ser nulo")
    @Min(value = 1900, message = "El año mínimo es 1900")
    @Max(value = 2026, message = "El año máximo es 2026")
    @Column(nullable = false)
    private Integer anio;

    @NotNull(message = "Los kilómetros no pueden ser nulos")
    @PositiveOrZero(message = "Los kilómetros deben ser 0 o positivos")
    @Column(nullable = false)
    private Integer kilometros;

    @NotBlank(message = "El combustible no puede estar vacío")
    @Column(nullable = false, length = 30)
    private String combustible;

    @NotBlank(message = "El color exterior no puede estar vacío")
    @Size(min = 3, max = 30, message = "El color debe tener entre 3 y 30 caracteres")
    @Column(nullable = false, length = 30)
    private String colorExterior;

    @NotNull(message = "Los asientos no pueden ser nulos")
    @Min(value = 1, message = "Mínimo 1 asiento")
    @Max(value = 9, message = "Máximo 9 asientos")
    @Column(nullable = false)
    private Integer asientos;

    @NotNull(message = "Las puertas no pueden ser nulas")
    @Min(value = 2, message = "Mínimo 2 puertas")
    @Max(value = 5, message = "Máximo 5 puertas")
    @Column(nullable = false)
    private Integer puertas;

    @NotBlank(message = "El motor no puede estar vacío")
    @Size(min = 2, max = 50, message = "El motor debe tener entre 2 y 50 caracteres")
    @Column(nullable = false, length = 50)
    private String motor;

    @NotBlank(message = "El cambio no puede estar vacío")
    @Column(nullable = false, length = 50)
    private String cambio;

    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(min = 10, max = 500, message = "La descripción debe tener entre 10 y 500 caracteres")
    @Column(nullable = false, length = 500)
    private String descripcion;

    @Size(max = 200, message = "Los extras no pueden superar 200 caracteres")
    @Column(length = 200)
    private String extras;

    // 🔴 NUEVOS CAMPOS PARA ESTADOS
    @Column(name = "visible")
    private Boolean visible = true;  // true = visible en web, false = oculto

    @Column(name = "estado_venta", length = 20)
    private String estadoVenta = "en_venta"; // "en_venta", "vendido", "proximo"

    // Constructor vacío
    public Vehiculo() {}

    // Getters y Setters (los que ya tenías más los nuevos)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public Integer getKilometros() { return kilometros; }
    public void setKilometros(Integer kilometros) { this.kilometros = kilometros; }

    public String getCombustible() { return combustible; }
    public void setCombustible(String combustible) { this.combustible = combustible; }

    public String getColorExterior() { return colorExterior; }
    public void setColorExterior(String colorExterior) { this.colorExterior = colorExterior; }

    public Integer getAsientos() { return asientos; }
    public void setAsientos(Integer asientos) { this.asientos = asientos; }

    public Integer getPuertas() { return puertas; }
    public void setPuertas(Integer puertas) { this.puertas = puertas; }

    public String getMotor() { return motor; }
    public void setMotor(String motor) { this.motor = motor; }

    public String getCambio() { return cambio; }
    public void setCambio(String cambio) { this.cambio = cambio; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getExtras() { return extras; }
    public void setExtras(String extras) { this.extras = extras; }

    // 🔴 NUEVOS GETTERS Y SETTERS
    public Boolean getVisible() { return visible; }
    public void setVisible(Boolean visible) { this.visible = visible; }

    public String getEstadoVenta() { return estadoVenta; }
    public void setEstadoVenta(String estadoVenta) { this.estadoVenta = estadoVenta; }
}