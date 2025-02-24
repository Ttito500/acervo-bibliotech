package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "frequenciaalunos")
public class FrequenciaAlunos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "registrada_por", nullable = false)
    private Usuario registradaPor;

    @Column(name = "atividade" , length = 20, nullable = false)
    private String atividade; // 'lendo', 'celula_de_estudo', 'estudo_individual', 'descansando', 'outros'

    @Column(name = "data_frequencia", nullable = false)
    private LocalDate data;
}
