package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Autor;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.models.Livroautor;
import com.bibliotech.bibliotech.repositories.AutorRepository;
import com.bibliotech.bibliotech.repositories.LivroautorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;
    @Autowired
    private LivroautorRepository livroautorRepository;

    public List<Autor> cadastrarAutores(List<Autor> autores, Livro livro) {
        Set<String> nomesNovosAutores = autores.stream()
                .map(Autor::getNome)
                .filter(nome -> nome != null && !nome.isEmpty())
                .collect(Collectors.toSet());

        List<Autor> autoresAssociados = new ArrayList<>();

        for (String nome : nomesNovosAutores) {
            Optional<Autor> autorOptional = autorRepository.findFirstByNomeIgnoreCase(nome);

            Autor autor;
            if (autorOptional.isPresent()) {
                autor = autorOptional.get();
            } else {
                Autor novoAutor = new Autor();
                novoAutor.setNome(nome);
                autor = autorRepository.save(novoAutor);
            }

            Livroautor livroAutor = new Livroautor();
            livroAutor.setLivro(livro);
            livroAutor.setAutor(autor);
            livroautorRepository.save(livroAutor);
            autoresAssociados.add(autor);
        }

        return autoresAssociados;
    }

    public List<Autor> buscarPorNomeQueContem(String nome) {
        List<Autor> autores = autorRepository.findByNomeContainingIgnoreCase(nome);
        if (autores.isEmpty()) {
            throw new NotFoundException("Nenhum autor encontrado contendo: " + nome);
        }
        return autores;
    }

    public void deletarAutoresSemAssociacao() {
        List<Autor> autoresSemLivros = autorRepository.findAutoresSemLivros();
        System.out.println("Deletando {} autores não associados a livros." + autoresSemLivros.size());

        autorRepository.deleteAll(autoresSemLivros);
    }

    public List<Autor> findAutorByLivroId(Integer id) {
        return autorRepository.findAutoresByLivroId(id);
    }

    public List<Autor> cadastrarNovosAutores(List<Autor> autores, Livro livro) {
        livroautorRepository.deleteByLivroId(livro.getId());
        return cadastrarAutores(autores, livro);
    }
}
