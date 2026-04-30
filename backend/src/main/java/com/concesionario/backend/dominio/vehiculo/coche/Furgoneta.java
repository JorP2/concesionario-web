package com.concesionario.backend.dominio.vehiculo.coche;

import com.concesionario.backend.dominio.vehiculo.Coche;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "furgoneta")
@PrimaryKeyJoinColumn(name = "coche_id")
public class Furgoneta extends Coche {

    @NotNull(message = "La capacidad de carga es obligatoria")
    @Positive
    private Double capacidadCarga;  // metros cúbicos

    @NotNull(message = "El número de asientos es obligatorio")
    @Min(2) @Max(3)
    private Integer numeroAsientos;

    private Boolean tienePuertaCorredera = true;

    public Furgoneta() {}

    // Getters y Setters
    public Double getCapacidadCarga() { return capacidadCarga; }
    public void setCapacidadCarga(Double capacidadCarga) { this.capacidadCarga = capacidadCarga; }

    public Integer getNumeroAsientos() { return numeroAsientos; }
    public void setNumeroAsientos(Integer numeroAsientos) { this.numeroAsientos = numeroAsientos; }

    public Boolean getTienePuertaCorredera() { return tienePuertaCorredera; }
    public void setTienePuertaCorredera(Boolean tienePuertaCorredera) { 
        this.tienePuertaCorredera = tienePuertaCorredera; 
    }
}