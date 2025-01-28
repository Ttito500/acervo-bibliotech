package com.bibliotech.bibliotech.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlunoRequestDTO {
    private Integer id;
    private String nome;
    private String email;
    private String telefone;
    private Integer idTurma;
    private String situacao;
}