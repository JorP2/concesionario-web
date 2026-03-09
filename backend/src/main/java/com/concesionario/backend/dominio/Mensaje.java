package com.concesionario.backend.dominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Mensaje {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	@NotBlank(message = "El nombre no puede estar vacío")
	private String nombre;
	
	@Column(nullable = false)
	@NotBlank(message = "El mensaje no puede estar vacío")
	private String texto;
	
	@Column(nullable = false)
	@NotBlank(message = "El email no puede estar vacío")
	private String email;
	
	public Mensaje() {}

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto=texto; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email=email; }
}