package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.mappers.AutorMapper;
import com.bibliotech.bibliotech.dtos.mappers.GeneroMapper;
import com.bibliotech.bibliotech.dtos.request.LivroRequestPostDTO;
import com.bibliotech.bibliotech.models.Livro;
import org.springframework.stereotype.Component;

@Component
public class LivroRequestPostMapper {

    private final AutorMapper autorMapper = new AutorMapper();
    private final GeneroMapper generoMapper = new GeneroMapper();

    public Livro toEntity(LivroRequestPostDTO livro){
        Livro livroEntity = new Livro();

        livroEntity.setIsbn(livro.getIsbn());
        livroEntity.setTitulo(livro.getTitulo());
        livroEntity.setAtivo(true);
        livroEntity.setGeneros(generoMapper.toEntityList(livro.getGeneros()));
        livroEntity.setAutores(autorMapper.toEntityList(livro.getAutores()));

        return livroEntity;
    }
}
