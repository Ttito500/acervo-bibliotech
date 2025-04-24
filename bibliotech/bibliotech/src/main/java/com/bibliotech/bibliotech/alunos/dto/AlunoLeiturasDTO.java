package com.bibliotech.bibliotech.alunos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AlunoLeiturasDTO {
    private String nome;
    private Integer serie;
    private String turma;
    private Long quantidade_leituras;
}
