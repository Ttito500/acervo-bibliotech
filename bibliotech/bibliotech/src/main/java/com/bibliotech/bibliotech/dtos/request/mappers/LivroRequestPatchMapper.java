package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.mappers.AutorMapper;
import com.bibliotech.bibliotech.dtos.mappers.GeneroMapper;
import com.bibliotech.bibliotech.dtos.request.LivroRequestPatchDTO;
import com.bibliotech.bibliotech.models.Livro;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LivroRequestPatchMapper {

    private static final AutorMapper autorMapper = new AutorMapper();
    private static final GeneroMapper generoMapper = new GeneroMapper();

    public static LivroRequestPatchDTO toDTO(Livro livro) {
        if (livro == null) return null;

        LivroRequestPatchDTO dto = new LivroRequestPatchDTO();

        dto.setTitulo(livro.getTitulo());
        dto.setIsbn(livro.getIsbn());
        dto.setAutores(AutorMapper.toDTOList(livro.getAutores()));
        dto.setGeneros(GeneroMapper.toDTOList(livro.getGeneros()));

        return dto;
    }

    public static List<LivroRequestPatchDTO> toDTOList(List<Livro> livros) {
        if (livros == null) return new ArrayList<>();
        return livros.stream().map(LivroRequestPatchMapper::toDTO).collect(Collectors.toList());
    }

    public static Livro toEntity(LivroRequestPatchDTO dto) {
        Livro entity = new Livro();

        entity.setTitulo(dto.getTitulo());
        entity.setIsbn(dto.getIsbn());
        entity.setAutores(autorMapper.toEntityList(dto.getAutores()));
        entity.setGeneros(generoMapper.toEntityList(dto.getGeneros()));

        return entity;
    }

}
