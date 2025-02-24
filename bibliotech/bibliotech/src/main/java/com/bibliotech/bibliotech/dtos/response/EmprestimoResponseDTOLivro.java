package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmprestimoResponseDTOLivro {
    private Integer id;
    private Integer alunoId;
    private Integer exemplarId;
    private Integer numeroExemplar;
    private String nomeAluno;
    private Integer serieAluno;
    private String turmaAluno;
    private LocalDate dataEmprestimo;
    private LocalDate dataConclusao;
    private String situacao;
}