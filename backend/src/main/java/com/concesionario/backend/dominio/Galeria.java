package com.concesionario.backend.dominio;

import jakarta.persistence.*;

@Entity
@Table(name = "galeria")
public class Galeria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CategoriaGaleria categoria;

    @Column(nullable = false, length = 100)
    private String uid;

    public Galeria() {}

    public Galeria(CategoriaGaleria categoria, String uid) {
        this.categoria = categoria;
        this.uid = uid;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CategoriaGaleria getCategoria() { return categoria; }
    public void setCategoria(CategoriaGaleria categoria) { this.categoria = categoria; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }
}