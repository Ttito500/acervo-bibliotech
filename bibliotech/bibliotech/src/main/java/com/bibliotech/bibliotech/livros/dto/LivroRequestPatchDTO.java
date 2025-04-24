package com.bibliotech.bibliotech.livros.dto;

import com.bibliotech.bibliotech.autores.dto.AutorDTO;
import com.bibliotech.bibliotech.dtos.GeneroDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LivroRequestPatchDTO {
    private String titulo;
    private String isbn;
    private List<AutorDTO> autores;
    private List<GeneroDTO> generos;
}
