package com.bibliotech.bibliotech.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CronogramaAlunoMonitorRequestDTO {
    @NotNull(message = "O ID do aluno monitor é obrigatório.")
    private Integer idAlunoMonitor;

    @NotBlank(message = "O dia da semana é obrigatório.")
    private String diaDaSemana;
}
