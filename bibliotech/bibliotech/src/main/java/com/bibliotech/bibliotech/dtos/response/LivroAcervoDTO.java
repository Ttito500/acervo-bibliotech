package com.bibliotech.bibliotech.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class LivroAcervoDTO {
    private String titulo;
    private Integer quantidadeExemplares;
    private String autor;
}

