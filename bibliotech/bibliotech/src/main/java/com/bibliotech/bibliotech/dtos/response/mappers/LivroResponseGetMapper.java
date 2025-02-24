package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.mappers.AutorMapper;
import com.bibliotech.bibliotech.dtos.mappers.GeneroMapper;
import com.bibliotech.bibliotech.dtos.response.LivroResponseGetDTO;
import com.bibliotech.bibliotech.models.Livro;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LivroResponseGetMapper {

    private static GeneroMapper generoMapper;
    private static AutorMapper autorMapper;

    public LivroResponseGetDTO toDTO(Livro livro) {
        LivroResponseGetDTO livroResponseGetDTO = new LivroResponseGetDTO();

        livroResponseGetDTO.setId(livro.getId());
        livroResponseGetDTO.setTitulo(livro.getTitulo());
        livroResponseGetDTO.setIsbn(livro.getIsbn());
        livroResponseGetDTO.setAtivo(livro.getAtivo());
        livroResponseGetDTO.setGeneros(generoMapper.toDTOList(livro.getGeneros()));
        livroResponseGetDTO.setAutores(autorMapper.toDTOList(livro.getAutores()));
        livroResponseGetDTO.setTotalExemplares(livro.getExemplares().size());
        livroResponseGetDTO.setTotalEmprestados(livro.getExemplares().stream().filter(exemplar -> exemplar.getSituacao().equals("emprestado")).collect(Collectors.toList()).size());
        livroResponseGetDTO.setTotalDisponiveis(livro.getExemplares().stream().filter(exemplar -> exemplar.getSituacao().equals("disponivel")).collect(Collectors.toList()).size());
        livroResponseGetDTO.setTotalExtraviados(livro.getExemplares().stream().filter(exemplar -> exemplar.getSituacao().equals("extraviado")).collect(Collectors.toList()).size());

        return livroResponseGetDTO;
    }

    public List<LivroResponseGetDTO> toDTOList(List<Livro> livros) {
        return livros.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}