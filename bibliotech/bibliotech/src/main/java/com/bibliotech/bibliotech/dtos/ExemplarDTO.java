package com.bibliotech.bibliotech.dtos;

import com.bibliotech.bibliotech.dtos.response.SecaoResponseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExemplarDTO {
    private Integer id;
    private EstanteprateleiraDTO estanteprateleira;
    private SecaoResponseDTO secao;
    private String observacao;
    private Integer numero;
    private String situacao = "disponivel";
}
