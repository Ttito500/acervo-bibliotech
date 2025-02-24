package com.bibliotech.bibliotech.dtos.request;

import com.bibliotech.bibliotech.dtos.AutorDTO;
import com.bibliotech.bibliotech.dtos.GeneroDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LivroRequestPostDTO {
    private String titulo;
    private String isbn;
    private boolean ativo;
    private Integer qtdExemplares;
    private List<AutorDTO> autores;
    private List<GeneroDTO> generos;
    private Integer idSecao;
    private Integer idEstanteprateleira;
}
