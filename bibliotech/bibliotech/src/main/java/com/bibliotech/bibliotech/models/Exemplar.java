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
@Table(name = "exemplar")
public class Exemplar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_livro", nullable = false)
    private com.bibliotech.bibliotech.models.Livro idLivro;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_secao", nullable = false)
    private com.bibliotech.bibliotech.models.Secao idSecao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_estante_prateleira")
    private Estanteprateleira idEstantePrateleira;

    @Column(name = "observacao", length = 500)
    private String observacao;

    @Column(name = "numero", nullable = false)
    private Integer numero;

    @ColumnDefault("'disponivel'")
    @Column(name = "situacao", length = 10)
    private String situacao;

    @OneToMany(mappedBy = "idExemplar")
    private Set<Emprestimo> emprestimos = new LinkedHashSet<>();

}