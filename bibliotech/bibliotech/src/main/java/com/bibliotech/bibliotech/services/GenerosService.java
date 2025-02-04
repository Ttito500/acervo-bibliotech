package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.repositories.GeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GenerosService {
    @Autowired
    private GeneroRepository generoRepository;

    public List<Genero> addGenero(List<Genero> generos) {
        Set<String> nomesNovosGeneros = generos.stream()
                .map(Genero::getGenero)
                .filter(genero -> genero != null && !genero.isEmpty())
                .collect(Collectors.toSet());

        List<Genero> novosGeneros = new ArrayList<>();

        nomesNovosGeneros.forEach(genero -> {
            Optional<Genero> generoOptional = generoRepository.findFirstByGeneroIgnoreCase(genero);
            Genero generoParaSalvar = generoOptional.orElseGet(() -> {
                Genero novoGenero = new Genero();
                novoGenero.setGenero(genero);
                return novoGenero;
            });

            if (generoOptional.isEmpty()) {
                generoRepository.save(generoParaSalvar);
                novosGeneros.add(generoParaSalvar);
            }
        });

        return novosGeneros;
    }

    public void removeGenerosWithNoAssociation() {
        List<Genero> generosSemAssociacao = generoRepository.findGenerosSemAssociacao();
        System.out.println("Deletando " + generosSemAssociacao.size() + " gêneros não associados.");

        generoRepository.deleteAll(generosSemAssociacao);
    }

    public Optional<Genero> findGeneroByGenero(String genero) {
        Optional<Genero> generoOptional = generoRepository.findByGenero(genero);
        if (generoOptional.isEmpty()) {
            throw new NotFoundException("Genero " + genero + " não encontrado.");
        }

        return generoOptional;
    }

    public List<Genero> getAllGeneros() {
        return generoRepository.findAll();
    }


}
