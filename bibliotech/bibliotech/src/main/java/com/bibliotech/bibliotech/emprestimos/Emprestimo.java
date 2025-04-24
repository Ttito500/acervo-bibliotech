package com.bibliotech.bibliotech.emprestimos;

import com.bibliotech.bibliotech.alunos.Aluno;
import com.bibliotech.bibliotech.models.Exemplar;
import com.bibliotech.bibliotech.models.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_exemplar", nullable = false)
    private Exemplar exemplar;

    @Column(name = "data_emprestimo", nullable = false)
    private LocalDate dataEmprestimo;

    @Column(name = "data_prazo", nullable = false)
    private LocalDate dataPrazo;

    @ColumnDefault("0")
    @Column(name = "qtd_renovacao")
    private Integer qtdRenovacao;

    @Column(name = "situacao", length = 20)
    private String situacao; // "pendente", "entregue", "atrasado", "extraviado", "cancelado"

    @Column(name = "observacao", length = 500)
    private String observacao;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "realizado_por", nullable = false)
    private Usuario realizadoPor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "concluido_por")
    private Usuario concluidoPor;

    @Column(name = "data_conclusao")
    private LocalDate dataConclusao;

    @Column(name = "data_ultima_notificacao")
    private LocalDate dataUltimaNotificacao;
}