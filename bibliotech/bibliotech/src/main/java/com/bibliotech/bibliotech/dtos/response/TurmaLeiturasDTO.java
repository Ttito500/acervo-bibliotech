package com.bibliotech.bibliotech.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TurmaLeiturasDTO {
    private Integer serie;
    private String turma;
    private Long quantidadeLeiturasTurma;
    private String nomeAluno;
    private Long quantidadeLeiturasAluno;
}
