package com.concesionario.backend.dominio.vehiculo.moto;

import com.concesionario.backend.dominio.vehiculo.Motocicleta;
import jakarta.persistence.*;

@Entity
@Table(name = "moto_scooter")
@PrimaryKeyJoinColumn(name = "motocicleta_id") 
public class Scooter extends Motocicleta {

    private Boolean tieneMaletinBajoAsiento = true;
    private Double autonomia;  // kilómetros por tanque

    public Scooter() {}

    // Getters y Setters
    public Boolean getTieneMaletinBajoAsiento() { return tieneMaletinBajoAsiento; }
    public void setTieneMaletinBajoAsiento(Boolean tieneMaletinBajoAsiento) { 
        this.tieneMaletinBajoAsiento = tieneMaletinBajoAsiento; 
    }

    public Double getAutonomia() { return autonomia; }
    public void setAutonomia(Double autonomia) { this.autonomia = autonomia; }
}