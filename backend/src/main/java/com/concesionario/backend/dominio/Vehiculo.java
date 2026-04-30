package com.concesionario.backend.dominio;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)  
@Table(name = "vehiculo")
public abstract class Vehiculo {  //  CAMBIADO: public class → public abstract class

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
    @Size(min = 3, max = 30)
    private String combustible;

    @NotBlank(message = "El color exterior no puede estar vacío")
    @Size(min = 3, max = 30)
    private String colorExterior;


    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(min = 10, max = 1000)
    @Column(length = 1000)
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