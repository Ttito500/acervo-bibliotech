package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cronogramaalunomonitor", schema = "adelino_cunha")
public class CronogramaAlunoMonitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_aluno_monitor", nullable = false)
    private Usuario usuario;

    @Column(name = "dia_da_semana", length = 20, nullable = false)
    private String diaDaSemana;
}