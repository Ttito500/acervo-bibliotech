package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "aluno")
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_turma")
    private Turma turma;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Email(message = "O email está inválido!")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "telefone", length = 15)
    private String telefone;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    @Column(name = "situacao", length = 20) // 'regular', 'irregular', 'debito'
    private String situacao;

    @PrePersist
    public void prePersist() {
        this.ativo = true;
        this.situacao = "regular";
    }
}