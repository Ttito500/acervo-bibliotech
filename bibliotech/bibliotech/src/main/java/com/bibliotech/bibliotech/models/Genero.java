package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "genero")
public class Genero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "genero", nullable = false)
    private String genero;

    @OneToMany(mappedBy = "idGenero")
    private Set<com.bibliotech.bibliotech.models.Livrogenero> livroGeneros = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idGenero")
    private Set<com.bibliotech.bibliotech.models.Secaogenero> secaoGeneros = new LinkedHashSet<>();

}