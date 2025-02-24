package com.bibliotech.bibliotech.dtos.response;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SecaoResponseDTO {
    private Integer id;
    private String nome;
    private String descricao;
}
