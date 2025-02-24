package com.bibliotech.bibliotech.dtos.response;

import com.bibliotech.bibliotech.dtos.AutorDTO;
import com.bibliotech.bibliotech.dtos.GeneroDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LivroResponseGetDTO {
    private Integer id;
    private String titulo;
    private String isbn;
    private boolean ativo;
    private List<AutorDTO> autores;
    private List<GeneroDTO> generos;
    private Integer totalExemplares;
    private Integer totalEmprestados;
    private Integer totalExtraviados;
    private Integer totalDisponiveis;
}


