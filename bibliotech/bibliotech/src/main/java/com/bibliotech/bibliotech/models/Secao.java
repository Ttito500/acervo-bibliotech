package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "secao", schema = "adelino_cunha")
public class Secao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "descricao", length = 500)
    private String descricao;

    @OneToMany(mappedBy = "idSecao")
    private Set<Estanteprateleira> estantePrateleiras = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idSecao")
    private Set<Exemplar> exemplares = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idSecao")
    private Set<Livro> livros = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idSecao")
    private Set<Estanteprateleirasecao> estantePrateleiraSecoes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idSecao")
    private Set<Secaogenero> secaoGeneros = new LinkedHashSet<>();

}