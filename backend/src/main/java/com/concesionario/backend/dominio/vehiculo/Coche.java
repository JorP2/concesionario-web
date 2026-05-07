package com.concesionario.backend.dominio.vehiculo;

import com.concesionario.backend.dominio.Vehiculo;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "coche")
@PrimaryKeyJoinColumn(name = "vehiculo_id") 
public abstract class Coche extends Vehiculo{

    @NotNull(message = "Los asientos no pueden ser nulos")
    @Min(1) @Max(9)
    @Column(nullable = false)
    private Integer asientos;

    @NotNull(message = "Las puertas no pueden ser nulas")
    @Min(2) @Max(5)
    @Column(nullable = false)
    private Integer puertas;

    @NotBlank(message = "El motor no puede estar vacío")
    @Size(min = 2, max = 50)
    @Column(nullable = false)
    private String motor;

    @NotBlank(message = "El cambio no puede estar vacío")
    @Size(min = 3, max = 50)
    @Column(nullable = false)
    private String cambio;

    @NotBlank(message = "La pegatina no puede estar vacía")
    @Size(min = 1, max = 10)
    @Column(nullable = false)
    private String pegatina;
    
    @NotBlank(message = "El interior no puede estar vacío")
    @Size(min = 3, max = 30)
    @Column(nullable = false)
    private String interior;

    public Coche() {}

    // Getters y Setters
    public Integer getAsientos() { return asientos; }
    public void setAsientos(Integer asientos) { this.asientos = asientos; }

    public Integer getPuertas() { return puertas; }
    public void setPuertas(Integer puertas) { this.puertas = puertas; }

    public String getMotor() { return motor; }
    public void setMotor(String motor) { this.motor = motor; }

    public String getCambio() { return cambio; }
    public void setCambio(String cambio) { this.cambio = cambio; }

    
    public String getInterior() { return interior;}

	public void setInterior(String interior) { this.interior = interior;}

	public String getPegatina() { return pegatina; }
    public void setPegatina(String pegatina) { this.pegatina = pegatina; }
}