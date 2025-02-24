package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TurmaResponseDTO {
    private Integer id;
    private Integer serie;
    private String turma;
    private Integer anoDeEntrada;
    private boolean ativo;
}