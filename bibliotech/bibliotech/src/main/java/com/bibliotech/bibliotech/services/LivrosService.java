package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.repositories.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivrosService {
    @Autowired
    private LivroRepository livroRepository;

    public Livro cadastrarLivro(Livro livro){
        livroRepository.save(livro);
        return livro;
    }

    public Livro deletarLivro(Integer id){
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Livro com ID " + id + " não encontrado."));

        livroRepository.delete(livro);
        return livro;
    }

    public Livro atualizarLivro(Integer id, Livro livro){

        Livro livroExistente = livroRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Aluno com ID " + id + " não encontrado."));

        livroExistente.setIsbn(livro.getIsbn());
        livroExistente.setTitulo(livro.getTitulo());
        livroExistente.setAutor(livro.getAutor());
        livroExistente.setSituacao(livro.getSituacao());
        livroExistente.setObservacao(livro.getObservacao());
        livroExistente.setIdSecao(livro.getIdSecao());
        livroExistente.setIdEstantePrateleira(livro.getIdEstantePrateleira());

        livroRepository.save(livroExistente);
        return livroExistente;
    }

    public List<Livro> getLivros(){ return livroRepository.findAll(); }

    public Optional<Livro> getLivroById(Integer id){return livroRepository.findById(id);}
}