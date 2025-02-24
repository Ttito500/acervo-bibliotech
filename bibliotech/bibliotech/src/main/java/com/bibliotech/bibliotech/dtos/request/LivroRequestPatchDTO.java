package com.bibliotech.bibliotech.dtos.request;

import com.bibliotech.bibliotech.dtos.AutorDTO;
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
