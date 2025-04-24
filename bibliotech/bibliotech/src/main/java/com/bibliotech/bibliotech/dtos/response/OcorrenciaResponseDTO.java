package com.bibliotech.bibliotech.dtos.response;

import com.bibliotech.bibliotech.alunos.dto.AlunoResponseDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OcorrenciaResponseDTO {
    private Integer id;
    private AlunoResponseDTO aluno;
    private UsuarioResponseDTO registradaPor;
    private String detalhes;
    private LocalDate data;
}
