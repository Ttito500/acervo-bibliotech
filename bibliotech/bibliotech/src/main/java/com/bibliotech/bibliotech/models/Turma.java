package com.bibliotech.bibliotech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "turma", schema = "adelino_cunha")
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "serie", nullable = false)
    @Min(value = 1, message = "O campo série deve ser maior que 0")
    @Max(value = 3, message = "O campo série deve ser menor que 4")
    @NotNull(message = "O campo série não pode ser nulo")
    private Integer serie;

    @Column(name = "turma", nullable = false, length = 1)
    @Pattern(regexp = "[a-cA-C]", message = "O campo turma deve ser uma letra entre A e C")
    @NotEmpty(message = "O campo turma não pode ser vazio")
    private String turma;

    @Column(name = "ano_de_entrada", nullable = false)
    @NotNull(message = "O campo ano de entrada não pode ser nulo")
    Integer anoDeEntrada;

    @ColumnDefault("true")
    @Column(name = "ativo", nullable = false)
    boolean ativo;
}