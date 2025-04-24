package com.bibliotech.bibliotech.alunos.dto;

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