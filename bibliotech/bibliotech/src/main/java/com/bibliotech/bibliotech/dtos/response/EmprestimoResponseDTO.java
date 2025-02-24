package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmprestimoResponseDTO {
    private Integer id;
    private Integer alunoId;
    private Integer exemplarId;
    private Integer numeroExemplar;
    private String estante;
    private Integer prateleira;
    private String isbn;
    private String tituloLivro;
    private String nomeAluno;
    private String realizadoPor;
    private String concluidoPor;
    private String observacao;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrazo;
    private LocalDate dataConclusao;
    private Integer qtdRenovacao;
    private String situacao;
}