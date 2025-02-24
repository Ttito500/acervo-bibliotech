package com.bibliotech.bibliotech.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExemplarRequestPostDTO {
    Integer idLivro;
    Integer idSecao;
    Integer qtdExemplares;
    Integer idEstanteprateleira;
}
