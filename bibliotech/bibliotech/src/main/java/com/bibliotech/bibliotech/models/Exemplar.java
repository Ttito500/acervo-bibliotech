package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exemplar")
public class Exemplar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_livro", nullable = false)
    private Livro livro;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estante_prateleira")
    private Estanteprateleira estanteprateleira;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_secao", nullable = false)
    private Secao secao;

    @Column(name = "observacao", length = 500)
    private String observacao;

    @Column(name = "numero", nullable = false)
    private Integer numero;

    @Column(name = "situacao", length = 10)
    private String situacao = "disponivel"; // "disponivel", "emprestado", "extraviado"

    @PrePersist
    public void prePersist() {
        this.situacao = "disponivel";
        this.observacao = "";
    }
}