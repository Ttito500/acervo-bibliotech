package com.bibliotech.bibliotech.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExemplarRequestPatchDTO {
    private Integer idLivro;
    private Integer idEstantePrateleira;
    private Integer idSecao;
    private String situacao;
    private String observacao;
}
