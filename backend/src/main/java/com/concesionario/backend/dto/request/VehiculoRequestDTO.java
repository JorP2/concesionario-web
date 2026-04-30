package com.concesionario.backend.dto.request;

public abstract class VehiculoRequestDTO {
    
    // ===== CAMPOS COMUNES (todos los vehículos) =====
    private String marca;
    private String modelo;
    private Double precio;
    private Integer anio;
    private Integer kilometros;
    private String combustible;
    private String colorExterior;
    private String descripcion;
    private String extras;

    

    // Getters y Setters (solo los comunes)
    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public Integer getKilometros() { return kilometros; }
    public void setKilometros(Integer kilometros) { this.kilometros = kilometros; }

    public String getCombustible() { return combustible; }
    public void setCombustible(String combustible) { this.combustible = combustible; }

    public String getColorExterior() { return colorExterior; }
    public void setColorExterior(String colorExterior) { this.colorExterior = colorExterior; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getExtras() { return extras; }
    public void setExtras(String extras) { this.extras = extras; }
}