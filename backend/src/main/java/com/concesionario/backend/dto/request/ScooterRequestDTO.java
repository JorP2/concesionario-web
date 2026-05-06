package com.concesionario.backend.dto.request;

public class ScooterRequestDTO extends VehiculoRequestDTO {
    
    // ===== CAMPOS DE MOTOCICLETA =====
    private Integer cilindrada;
    private String tipoMotor;
    private Boolean tieneSidecar;
    private Boolean tieneBaul;
    
    // Campos específicos de Scooter
    private Boolean tieneMaletinBajoAsiento;
    private Double autonomia;

    // Getters y Setters
    public Integer getCilindrada() { return cilindrada; }
    public void setCilindrada(Integer cilindrada) { this.cilindrada = cilindrada; }

    public String getTipoMotor() { return tipoMotor; }
    public void setTipoMotor(String tipoMotor) { this.tipoMotor = tipoMotor; }

    public Boolean getTieneSidecar() { return tieneSidecar; }
    public void setTieneSidecar(Boolean tieneSidecar) { this.tieneSidecar = tieneSidecar; }

    public Boolean getTieneBaul() { return tieneBaul; }
    public void setTieneBaul(Boolean tieneBaul) { this.tieneBaul = tieneBaul; }

    public Boolean getTieneMaletinBajoAsiento() { return tieneMaletinBajoAsiento; }
    public void setTieneMaletinBajoAsiento(Boolean tieneMaletinBajoAsiento) { 
        this.tieneMaletinBajoAsiento = tieneMaletinBajoAsiento; 
    }

    public Double getAutonomia() { return autonomia; }
    public void setAutonomia(Double autonomia) { this.autonomia = autonomia; }
}