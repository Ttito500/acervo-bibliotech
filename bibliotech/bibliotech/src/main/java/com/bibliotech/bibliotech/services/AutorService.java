package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Autor;
import com.bibliotech.bibliotech.repositories.AutorRepository;
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

    public List<Autor> cadastrarAutores(List<Autor> autores) {

        // Coleta os nomes dos autores em um Set para remover duplicados
        Set<String> nomesNovosAutores = autores.stream()
                .map(Autor::getNome)
                .filter(nome -> nome != null && !nome.isEmpty())
                .collect(Collectors.toSet());

        // Cria uma lista para armazenar os novos autores
        List<Autor> novosAutores = new ArrayList<>();

        // Itera sobre cada nome único e cadastra o autor se ele não existir
        nomesNovosAutores.forEach(nome -> {
            Optional<Autor> autorOptional = autorRepository.findFirstByNomeIgnoreCase(nome);
            autorOptional.orElseGet(() -> {
                Autor novoAutor = new Autor();
                novoAutor.setNome(nome);
                novoAutor = autorRepository.save(novoAutor);
                novosAutores.add(novoAutor);
                return novoAutor;
            });
        });

        return novosAutores;
    }

    public List<Autor> getAll() {
        return autorRepository.findAll();
    }

    public Optional<Autor> buscarPorNome(String nome) {
        Optional<Autor> autor = autorRepository.findFirstByNomeIgnoreCase(nome);
        if (autor.isEmpty() ) {
            throw new NotFoundException("Autor com o nome: "+ nome +" não encontrado.");
        }

        return autor;
    }

    public void deletarAutoresSemAssociacao() {
        List<Autor> autoresSemLivros = autorRepository.findAutoresSemLivros();
        System.out.println("Deletando {} autores não associados a livros." + autoresSemLivros.size());

        autorRepository.deleteAll(autoresSemLivros);
    }
}
