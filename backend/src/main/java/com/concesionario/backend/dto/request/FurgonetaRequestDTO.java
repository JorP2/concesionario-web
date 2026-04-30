package com.concesionario.backend.dto.request;

public class FurgonetaRequestDTO extends VehiculoRequestDTO {
    
    // ===== CAMPOS DE COCHE =====
    private String interior;
    private Integer asientos;
    private Integer puertas;
    private String motor;
    private String cambio;
    private String pegatina;
    
    // Campos específicos de Furgoneta
    private Double capacidadCarga;
    private Integer numeroAsientos;
    private Boolean tienePuertaCorredera;

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

    public Double getCapacidadCarga() { return capacidadCarga; }
    public void setCapacidadCarga(Double capacidadCarga) { this.capacidadCarga = capacidadCarga; }

    public Integer getNumeroAsientos() { return numeroAsientos; }
    public void setNumeroAsientos(Integer numeroAsientos) { this.numeroAsientos = numeroAsientos; }

    public Boolean getTienePuertaCorredera() { return tienePuertaCorredera; }
    public void setTienePuertaCorredera(Boolean tienePuertaCorredera) { 
        this.tienePuertaCorredera = tienePuertaCorredera; 
    }
}