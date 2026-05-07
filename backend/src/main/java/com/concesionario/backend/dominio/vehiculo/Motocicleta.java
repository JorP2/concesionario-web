package com.concesionario.backend.dominio.vehiculo;

import com.concesionario.backend.dominio.Vehiculo;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "motocicleta")
@PrimaryKeyJoinColumn(name = "vehiculo_id")
public abstract class Motocicleta extends Vehiculo {

    @NotNull(message = "La cilindrada no puede ser nula")
    @Positive
    @Column(nullable = false)
    private Integer cilindrada;

    @NotBlank(message = "El tipo de motor no puede estar vacío")
    private String tipoMotor;  // "2 tiempos", "4 tiempos", "Eléctrico"

    private Boolean tieneSidecar = false;
    private Boolean tieneBaul = false;

    public Motocicleta() {}

    // Getters y Setters
    public Integer getCilindrada() { return cilindrada; }
    public void setCilindrada(Integer cilindrada) { this.cilindrada = cilindrada; }

    public String getTipoMotor() { return tipoMotor; }
    public void setTipoMotor(String tipoMotor) { this.tipoMotor = tipoMotor; }

    public Boolean getTieneSidecar() { return tieneSidecar; }
    public void setTieneSidecar(Boolean tieneSidecar) { this.tieneSidecar = tieneSidecar; }

    public Boolean getTieneBaul() { return tieneBaul; }
    public void setTieneBaul(Boolean tieneBaul) { this.tieneBaul = tieneBaul; }
}