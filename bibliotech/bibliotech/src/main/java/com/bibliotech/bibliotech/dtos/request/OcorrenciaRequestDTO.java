package com.bibliotech.bibliotech.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OcorrenciaRequestDTO {
    private Integer id;
    @NotNull
    private Integer idAluno;
    @NotNull
    private Integer registradaPor;
    @NotNull
    @Size(max = 500)
    private String detalhes;
}
