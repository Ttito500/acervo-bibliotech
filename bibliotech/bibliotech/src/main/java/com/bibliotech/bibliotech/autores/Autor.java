package com.bibliotech.bibliotech.autores;

import com.bibliotech.bibliotech.livros.Livro;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "autor")
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Livro> livros;
}