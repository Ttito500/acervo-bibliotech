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
@Table(name = "turma")
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "serie", nullable = false)
    private Integer serie;

    @Column(name = "turma", nullable = false, length = 1)
    private String turma;

    @Column(name = "ano_de_entrada", nullable = false)
    private Integer anoDeEntrada;

    @ColumnDefault("true")
    @Column(name = "ativo", nullable = false)
    private Boolean ativo = false;

    @OneToMany(mappedBy = "idTurma")
    private Set<Aluno> alunos = new LinkedHashSet<>();

}