package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlunoResponseDTO {
    private Integer id;
    private String nome;
    private String email;
    private String telefone;
    private TurmaResponseDTO turma;
    private String situacao;
    private boolean ativo;
}