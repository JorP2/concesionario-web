package com.concesionario.backend.dto.response;

public class ImagenResponseDTO {
    private Long id;
    private String url;
    private Integer orden;
    private Boolean esPortada;

    public ImagenResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Integer getOrden() { return orden; }
    public void setOrden(Integer orden) { this.orden = orden; }
    public Boolean getEsPortada() { return esPortada; }
    public void setEsPortada(Boolean esPortada) { this.esPortada = esPortada; }
}