package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

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

    @ColumnDefault("true")
    @Column(name = "ativo", nullable = false)
    private Boolean ativo = false;

    @Column(name = "autor", nullable = false)
    private String autor;

    @Column(name = "observacao", length = 500)
    private String observacao;

    @ColumnDefault("'disponivel'")
    @Column(name = "situacao", length = 20)
    private String situacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_estante_prateleira")
    private Estanteprateleira idEstantePrateleira;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_secao", nullable = false)
    private com.bibliotech.bibliotech.models.Secao idSecao;

    @OneToMany(mappedBy = "idLivro")
    private Set<Emprestimo> emprestimos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idLivro")
    private Set<Exemplar> exemplares = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idLivro")
    private Set<com.bibliotech.bibliotech.models.Livroautor> livroAutores = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idLivro")
    private Set<com.bibliotech.bibliotech.models.Livrogenero> livroGeneros = new LinkedHashSet<>();

}