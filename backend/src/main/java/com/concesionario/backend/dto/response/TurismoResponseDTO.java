package com.concesionario.backend.dto.response;

public class TurismoResponseDTO extends VehiculoResponseDTO {
    
    // ===== CAMPOS DE COCHE =====
    private String interior;
    private Integer asientos;
    private Integer puertas;
    private String motor;
    private String cambio;
    private String pegatina;
    
    // ===== CAMPOS ESPECÍFICOS DE TURISMO =====
    private Boolean tieneAireAcondicionado;
    private Boolean tieneNavegacion;

    // Getters y Setters
    public String getInterior() { return interior; }
    public void setInterior(String interior) { this.interior = interior; }

    public Integer getAsientos() { return asientos; }
    public void setAsientos(Integer asientos) { this.asientos = asientos; }

    public Integer getPuertas() { return puertas; }
    public void setPuertas(Integer puertas) { this.puertas = puertas; }

    public String getMotor() { return motor; }
    public void setMotor(String motor) { this.motor = motor; }

    public String getCambio() { return cambio; }
    public void setCambio(String cambio) { this.cambio = cambio; }

    public String getPegatina() { return pegatina; }
    public void setPegatina(String pegatina) { this.pegatina = pegatina; }

    public Boolean getTieneAireAcondicionado() { return tieneAireAcondicionado; }
    public void setTieneAireAcondicionado(Boolean tieneAireAcondicionado) { 
        this.tieneAireAcondicionado = tieneAireAcondicionado; 
    }

    public Boolean getTieneNavegacion() { return tieneNavegacion; }
    public void setTieneNavegacion(Boolean tieneNavegacion) { 
        this.tieneNavegacion = tieneNavegacion; 
    }
}