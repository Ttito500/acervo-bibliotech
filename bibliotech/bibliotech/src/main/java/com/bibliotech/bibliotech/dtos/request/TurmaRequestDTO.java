package com.bibliotech.bibliotech.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TurmaRequestDTO {
    private Integer id;
    private Integer serie;
    private String turma;
    private Integer AnoDeEntrada;
    private boolean ativo;
}
