package com.concesionario.backend.dominio.vehiculo.coche;

import com.concesionario.backend.dominio.vehiculo.Coche;
import jakarta.persistence.*;

@Entity
@Table(name = "turismo")
@PrimaryKeyJoinColumn(name = "coche_id")
public class Turismo extends Coche {

    private Boolean tieneAireAcondicionado = true;
    private Boolean tieneNavegacion = false;

    public Turismo() {}

    // Getters y Setters
    public Boolean getTieneAireAcondicionado() { return tieneAireAcondicionado; }
    public void setTieneAireAcondicionado(Boolean tieneAireAcondicionado) { 
        this.tieneAireAcondicionado = tieneAireAcondicionado; 
    }

    public Boolean getTieneNavegacion() { return tieneNavegacion; }
    public void setTieneNavegacion(Boolean tieneNavegacion) { 
        this.tieneNavegacion = tieneNavegacion; 
    }
}