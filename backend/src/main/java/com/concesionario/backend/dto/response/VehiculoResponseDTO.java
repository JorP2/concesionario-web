package com.concesionario.backend.dto.response;

import java.util.List;

public abstract class VehiculoResponseDTO {
    
    // ===== CAMPOS COMUNES (todos los vehículos) =====
    private Long id;
    private String marca;
    private String modelo;
    private Double precio;
    private Integer anio;
    private Integer kilometros;
    private String combustible;
    private String colorExterior;
    private String descripcion;
    private String extras;
    private Boolean visible;
    private Boolean enOferta;
    private Double precioOferta;
    private String fechaFinOferta;
    private String estadoVenta;
    
    // Imágenes (común a todos)
    private String imagenPortada;
    private List<String> imagenes;


    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public Boolean getVisible() { return visible; }
    public void setVisible(Boolean visible) { this.visible = visible; }

    public Boolean getEnOferta() { return enOferta; }
    public void setEnOferta(Boolean enOferta) { this.enOferta = enOferta; }

    public Double getPrecioOferta() { return precioOferta; }
    public void setPrecioOferta(Double precioOferta) { this.precioOferta = precioOferta; }

    public String getFechaFinOferta() { return fechaFinOferta; }
    public void setFechaFinOferta(String fechaFinOferta) { this.fechaFinOferta = fechaFinOferta; }

    public String getEstadoVenta() { return estadoVenta; }
    public void setEstadoVenta(String estadoVenta) { this.estadoVenta = estadoVenta; }

    public String getImagenPortada() { return imagenPortada; }
    public void setImagenPortada(String imagenPortada) { this.imagenPortada = imagenPortada; }

    public List<String> getImagenes() { return imagenes; }
    public void setImagenes(List<String> imagenes) { this.imagenes = imagenes; }
}