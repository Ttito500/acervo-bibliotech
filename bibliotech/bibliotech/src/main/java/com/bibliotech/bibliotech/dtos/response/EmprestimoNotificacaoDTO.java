package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmprestimoNotificacaoDTO {
    private Integer idEmprestimo;
    private Integer idAluno;
    private Integer idExemplar;
    private Integer numeroExemplar;
    private String nomeAluno;
    private String emailAluno;
    private String titulo;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrazo;
}