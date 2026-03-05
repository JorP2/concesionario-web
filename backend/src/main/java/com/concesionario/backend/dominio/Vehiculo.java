package com.concesionario.backend.dominio;

// Paquete jakarta
import jakarta.persistence.*;
// Paquete validaciones
import jakarta.validation.constraints.*;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {
	
	
	// A
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String marca;
	@NotNull
	private String modelo;
	@NotNull
	private Double precio;
	@NotNull
	private Integer anio;
	@NotNull
	private Integer kilometros;
	@NotNull
	private String combustible;
	@NotNull
	private String colorExterior;
	@NotNull
	private Integer asientos;
	@NotNull
	private Integer puertas;
	@NotNull
	private String motor;
	@NotNull
	private String cambio;
	@NotNull
	private String descripcion;
	private String extras;
	
	// C
	public Vehiculo() {
	}

	
	// G y S
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public Integer getKilometros() {
		return kilometros;
	}

	public void setKilometros(Integer kilometros) {
		this.kilometros = kilometros;
	}

	public String getCombustible() {
		return combustible;
	}

	public void setCombustible(String combustible) {
		this.combustible = combustible;
	}

	public String getColorExterior() {
		return colorExterior;
	}

	public void setColorExterior(String colorExterior) {
		this.colorExterior = colorExterior;
	}

	public Integer getAsientos() {
		return asientos;
	}

	public void setAsientos(Integer asientos) {
		this.asientos = asientos;
	}

	public Integer getPuertas() {
		return puertas;
	}

	public void setPuertas(Integer puertas) {
		this.puertas = puertas;
	}

	public String getMotor() {
		return motor;
	}

	public void setMotor(String motor) {
		this.motor = motor;
	}

	public String getCambio() {
		return cambio;
	}

	public void setCambio(String cambio) {
		this.cambio = cambio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getExtras() {
		return extras;
	}

	public void setExtras(String extras) {
		this.extras = extras;
	}
	
	
	
	
	
}
