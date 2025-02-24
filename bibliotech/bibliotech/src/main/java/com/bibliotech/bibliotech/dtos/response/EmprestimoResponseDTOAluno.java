package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmprestimoResponseDTOAluno {
    private Integer id;
    private Integer exemplarId;
    private Integer numeroExemplar;
    private String tituloLivro;
    private String isbn;
    private LocalDate dataEmprestimo;
    private LocalDate dataConclusao;
    private String situacao;
}