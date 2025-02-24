package com.bibliotech.bibliotech.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FrequenciaAlunosResponseDTO {
    private Integer id;
    private AlunoResponseDTO aluno;
    private UsuarioResponseDTO registradaPor;
    private String atividade;
    private LocalDate data;
}
