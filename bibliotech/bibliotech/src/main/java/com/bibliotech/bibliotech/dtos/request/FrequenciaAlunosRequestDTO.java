package com.bibliotech.bibliotech.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

//n precisa de data pois a data é cadastrada automaticamente e sempre vai ser do dia atual
@Getter
@Setter
public class FrequenciaAlunosRequestDTO {
    private Integer id;
    @NotNull
    private Integer idAluno;
    @NotNull
    private Integer registradaPor; //id do usuario
    @NotNull
    @Pattern(regexp = "^(lendo|celula_de_estudo|estudo_individual|descansando|outros)$")
    private String atividade;
}
