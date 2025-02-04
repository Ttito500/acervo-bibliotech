package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

}