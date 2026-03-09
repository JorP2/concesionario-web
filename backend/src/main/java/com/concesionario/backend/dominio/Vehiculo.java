package com.concesionario.backend.dominio;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "Marca no puede quedar vacio")
	@Column(nullable = false)
	private String marca;
	@NotBlank(message = "Modelo no puede quedar vacio")
	@Column(nullable = false)
	private String modelo;
	@NotNull(message = "Precio no puede quedar vacio")
	@Positive
	@Column(nullable = false)
	private Double precio;
	@NotNull(message = "Año no puede quedar vacio")
	@Positive
	@Column(nullable = false)
	private Integer anio;
	@NotNull(message = "kilometros no puede quedar vacio")
	@PositiveOrZero
	@Column(nullable = false)
	private Integer kilometros;
	@NotBlank(message = "combustible no puede quedar vacio")
	@Column(nullable = false)
	private String combustible;
	@NotBlank(message = "Color no puede quedar vacio")
	@Column(nullable = false)
	private String colorExterior;
	@NotNull(message = "Asientos no puede quedar vacio")
	@Positive
	@Column(nullable = false)
	private Integer asientos;
	@NotNull(message = "Puertas no puede quedar vacio")
	@Positive
	@Column(nullable = false)
	private Integer puertas;
	@NotNull(message = "Motor no puede quedar vacio")
	@Column(nullable = false)
	private String motor;
	@NotNull(message = "Cambio no puede quedar vacio")
	@Column(nullable = false)
	private String marchas;
	@NotNull(message = "Descripcion no puede quedar vacio")
	@Column(nullable = false)
	private String descripcion;
	private String extras;
	
	public Vehiculo() {}
	
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
	public String getCambio() { return marchas; }
	public void setCambio(String marchas) { this.marchas = marchas; }
	public String getDescripcion() { return descripcion; }
	public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
	public String getExtras() { return extras; }
	public void setExtras(String extras) { this.extras = extras; }
}