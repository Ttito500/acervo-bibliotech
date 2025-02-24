package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.mappers.AutorMapper;
import com.bibliotech.bibliotech.dtos.mappers.GeneroMapper;
import com.bibliotech.bibliotech.dtos.response.LivroResponseDTO;
import com.bibliotech.bibliotech.models.Livro;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LivroResponseMapper {

    private static final AutorMapper autorMapper = new AutorMapper();
    private static final GeneroMapper generoMapper = new GeneroMapper();

    public LivroResponseDTO toDTO(Livro livro) {
        LivroResponseDTO dto = new LivroResponseDTO();
        dto.setId(livro.getId());
        dto.setTitulo(livro.getTitulo());
        dto.setIsbn(livro.getIsbn());
        dto.setAtivo(livro.getAtivo());
        dto.setAutores(AutorMapper.toDTOList(livro.getAutores()));
        dto.setGeneros(GeneroMapper.toDTOList(livro.getGeneros()));

        return dto;
    }

    public List<LivroResponseDTO> toDTOList(List<Livro> livros) {
        if (livros == null) {
            return Collections.emptyList();
        }
        return livros.stream().map(this::toDTO).collect(Collectors.toList());
    }
}