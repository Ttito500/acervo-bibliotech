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
@Table(name = "emprestimo", schema = "adelino_cunha")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno idAluno;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_livro", nullable = false)
    private com.bibliotech.bibliotech.models.Livro idLivro;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "data_emprestimo", nullable = false)
    private LocalDate dataEmprestimo;

    @Column(name = "data_devolucao")
    private LocalDate dataDevolucao;

    @Column(name = "data_prazo", nullable = false)
    private LocalDate dataPrazo;

    @ColumnDefault("0")
    @Column(name = "qtd_renovacao")
    private Integer qtdRenovacao;

    @ColumnDefault("'pendente'")
    @Column(name = "situacao", length = 20)
    private String situacao;

    @Column(name = "observacao", length = 500)
    private String observacao;

}