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
@Table(name = "estanteprateleira")
public class Estanteprateleira {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "estante", nullable = false, length = 1)
    private String estante;

    @Column(name = "prateleira", nullable = false)
    private Integer prateleira;

    @OneToMany(mappedBy = "idEstantePrateleira")
    private Set<com.bibliotech.bibliotech.models.Estanteprateleirasecao> estantePrateleiraSecoes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idEstantePrateleira")
    private Set<com.bibliotech.bibliotech.models.Exemplar> exemplares = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idEstantePrateleira")
    private Set<com.bibliotech.bibliotech.models.Livro> livros = new LinkedHashSet<>();

}