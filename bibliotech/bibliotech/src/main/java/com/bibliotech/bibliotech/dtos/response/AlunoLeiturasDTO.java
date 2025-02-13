package com.bibliotech.bibliotech.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AlunoLeiturasDTO {
    private String nome;
    private Integer idTurma;
    private Long quantidade_leituras;
}
