package com.bibliotech.bibliotech.dtos;

import com.bibliotech.bibliotech.dtos.response.UsuarioResponseDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CronogramaAlunoMonitorDTO {

    private Integer id;

    @NotNull(message = "O ID do aluno monitor é obrigatório.")
    private UsuarioResponseDTO AlunoMonitor;

    @NotBlank(message = "O dia da semana é obrigatório.")
    private String diaDaSemana;
}
