package com.bibliotech.bibliotech.models;

import com.bibliotech.bibliotech.livros.Livro;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "genero")
public class Genero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "genero", nullable = false)
    private String genero;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Livro> livros;
}