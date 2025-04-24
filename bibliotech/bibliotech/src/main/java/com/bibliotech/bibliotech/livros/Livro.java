package com.bibliotech.bibliotech.livros;

import com.bibliotech.bibliotech.models.Autor;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.models.Genero;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "livro")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "isbn", nullable = false, length = 13)
    private String isbn;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    @JsonIgnore
    @OneToMany(mappedBy = "livro")
    private List<Exemplar> exemplares;

    @JsonIgnore
    @ManyToMany(mappedBy = "livros")
    private List<Autor> autores;

    @JsonIgnore
    @ManyToMany(mappedBy = "livros")
    private List<Genero> generos;
}