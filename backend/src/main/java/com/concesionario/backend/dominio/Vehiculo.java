package com.concesionario.backend.dominio;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La marca no puede estar vacía")
    @Size(min = 2, max = 50)
    @Column(nullable = false, length = 50)
    private String marca;

    @NotBlank(message = "El modelo no puede estar vacío")
    @Size(min = 1, max = 100)
    @Column(nullable = false, length = 100)
    private String modelo;

    @NotNull(message = "El año no puede ser nulo")
    @Min(1900) @Max(2026)
    @Column(nullable = false)
    private Integer anio;

    @NotNull(message = "El precio no puede ser nulo")
    @Positive
    @Column(nullable = false)
    private Double precio;

    @NotNull(message = "Los kilómetros no pueden ser nulos")
    @PositiveOrZero
    @Column(nullable = false)
    private Integer kilometros;

    @NotBlank(message = "El combustible no puede estar vacío")
    @Size(min = 3, max = 30, message = "Combustible entre 3 y 30 caracteres")
    private String combustible;

    @NotBlank(message = "El color exterior no puede estar vacío")
    @Size(min = 3, max = 30, message = "Color entre 3 y 30 caracteres")
    private String colorExterior;

    @NotBlank(message = "El interior no puede estar vacío")
    @Size(min = 3, max = 30, message = "Interior entre 3 y 30 caracteres")
    private String interior;

    @NotNull(message = "Los asientos no pueden ser nulos")
    @Min(1) @Max(9)
    @Column(nullable = false)
    private Integer asientos;

    @NotNull(message = "Las puertas no pueden ser nulas")
    @Min(2) @Max(5)
    @Column(nullable = false)
    private Integer puertas;

    @NotBlank(message = "El motor no puede estar vacío")
    @Size(min = 2, max = 50, message = "Motor entre 2 y 50 caracteres")
    private String motor;

    @NotBlank(message = "El cambio no puede estar vacío")
    @Size(min = 3, max = 50, message = "Cambio entre 3 y 50 caracteres")
    private String cambio;

    @NotBlank(message = "La pegatina no puede estar vacía")
    @Size(min = 1, max = 10, message = "Pegatina 1-10 caracteres")
    private String pegatina;

    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(min = 10, max = 1000)
    @Column(nullable = false, length = 1000)
    private String descripcion;

    @Column(length = 500)
    private String extras;

    @Column(name = "en_oferta")
    private Boolean enOferta = false;

    @Column(name = "precio_oferta")
    private Double precioOferta;

    @Column(name = "fecha_fin_oferta")
    private LocalDateTime fechaFinOferta;

    @Column(name = "visible")
    private Boolean visible = true;

    @Column(name = "estado_venta", length = 20)
    private String estadoVenta = "en_venta";


    // Constructor vacío

    public Vehiculo() {}

    // GETTERS Y SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getKilometros() { return kilometros; }
    public void setKilometros(Integer kilometros) { this.kilometros = kilometros; }

    public String getCombustible() { return combustible; }
    public void setCombustible(String combustible) { this.combustible = combustible; }

    public String getColorExterior() { return colorExterior; }
    public void setColorExterior(String colorExterior) { this.colorExterior = colorExterior; }

    public String getInterior() { return interior; }
    public void setInterior(String interior) { this.interior = interior; }

    public Integer getAsientos() { return asientos; }
    public void setAsientos(Integer asientos) { this.asientos = asientos; }

    public Integer getPuertas() { return puertas; }
    public void setPuertas(Integer puertas) { this.puertas = puertas; }

    public String getMotor() { return motor; }
    public void setMotor(String motor) { this.motor = motor; }

    public String getCambio() { return cambio; }
    public void setCambio(String cambio) { this.cambio = cambio; }

    public String getPegatina() { return pegatina; }
    public void setPegatina(String pegatina) { this.pegatina = pegatina; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getExtras() { return extras; }
    public void setExtras(String extras) { this.extras = extras; }

    public Boolean getEnOferta() { return enOferta; }
    public void setEnOferta(Boolean enOferta) { this.enOferta = enOferta; }

    public Double getPrecioOferta() { return precioOferta; }
    public void setPrecioOferta(Double precioOferta) { this.precioOferta = precioOferta; }

    public LocalDateTime getFechaFinOferta() { return fechaFinOferta; }
    public void setFechaFinOferta(LocalDateTime fechaFinOferta) { this.fechaFinOferta = fechaFinOferta; }

    public Boolean getVisible() { return visible; }
    public void setVisible(Boolean visible) { this.visible = visible; }

    public String getEstadoVenta() { return estadoVenta; }
    public void setEstadoVenta(String estadoVenta) { this.estadoVenta = estadoVenta; }
}