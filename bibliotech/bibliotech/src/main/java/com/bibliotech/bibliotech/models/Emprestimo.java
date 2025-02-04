package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "emprestimo")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_exemplar", nullable = false)
    private Exemplar exemplar;

    @Column(name = "data_emprestimo", nullable = false)
    private LocalDate dataEmprestimo;

    @Column(name = "data_conclusao")
    private LocalDate dataConclusao;

    @Column(name = "data_prazo", nullable = false)
    private LocalDate dataPrazo;

    @ColumnDefault("0")
    @Column(name = "qtd_renovacao")
    private Integer qtdRenovacao;

    @Column(name = "situacao", length = 20)
    private String situacao; // "pendente", "entregue", "atrasado", "extraviado", "cancelado"

    @Column(name = "observacao", length = 500)
    private String observacao;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "realizado_por", nullable = false)
    private Usuario realizadoPor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concluido_por")
    private Usuario concluidoPor;

    @Column(name = "data_devolucao")
    private LocalDate dataDevolucao;
}