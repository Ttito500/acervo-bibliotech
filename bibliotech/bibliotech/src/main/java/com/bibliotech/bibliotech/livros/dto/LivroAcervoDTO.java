package com.bibliotech.bibliotech.livros.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LivroAcervoDTO {
    private String titulo;
    private Integer quantidadeExemplares;
    private String autor;
}

