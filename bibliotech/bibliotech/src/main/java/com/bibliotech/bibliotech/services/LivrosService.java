package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.models.Autor;
import com.bibliotech.bibliotech.repositories.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivrosService {

    @Autowired
    AutorService autorService;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private LivroautorService livroautorService;

    public Livro cadastrarLivro(Livro livro){
        livroRepository.save(livro);

        //lgc para ver se o autor já está no banco ou não
        Optional<Autor> autorOptional = autorService.buscarPorNome(livro.getAutor());
        Autor autor;

        if(autorOptional.isPresent()){
            //autor já existe no banco de dados
            autor = autorOptional.get();
        }else{
            //cadastrar novo autor
            autor = new Autor();
            autor.setNome(livro.getAutor());
            autorService.addAutor(autor);
        }

        //associar autor e livro em Livroautor
        livroautorService.cadastrarLivroautor(livro.getId(), autor.getId());

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