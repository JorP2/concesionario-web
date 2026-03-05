package Dominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Mensaje {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String nombre;
	
	@Column(nullable = false)	
	private String texto;
	
	@Column(nullable = false)
	private String email;
	
	public Mensaje() {
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto=texto; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email=email; }
}