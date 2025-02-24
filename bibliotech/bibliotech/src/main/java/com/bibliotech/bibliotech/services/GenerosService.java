package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.models.Livro;
import com.bibliotech.bibliotech.models.Livrogenero;
import com.bibliotech.bibliotech.repositories.GeneroRepository;
import com.bibliotech.bibliotech.repositories.LivrogeneroRepository;
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
    @Autowired
    private LivrogeneroRepository livrogeneroRepository;

    public List<Genero> addGenero(List<Genero> generos, Livro livro) {
        Set<String> nomesNovosGeneros = generos.stream()
                .map(Genero::getGenero)
                .filter(genero -> genero != null && !genero.isEmpty())
                .collect(Collectors.toSet());

        List<Genero> generosAssociados = new ArrayList<>();

        for (String genero : nomesNovosGeneros) {
            Optional<Genero> generoOptional = generoRepository.findFirstByGeneroIgnoreCase(genero);

            Genero genero1;
            if (generoOptional.isPresent()) {
                genero1 = generoOptional.get();
            } else {
                Genero novoGenero = new Genero();
                novoGenero.setGenero(genero);
                genero1 = generoRepository.save(novoGenero);
            }

            Livrogenero livroGenero = new Livrogenero();
            livroGenero.setLivro(livro);
            livroGenero.setGenero(genero1);
            livrogeneroRepository.save(livroGenero);
            generosAssociados.add(genero1);
        }

        return generosAssociados;
    }

    public void removeGenerosWithNoAssociation() {
        List<Genero> generosSemAssociacao = generoRepository.findGenerosSemAssociacao();
        System.out.println("Deletando " + generosSemAssociacao.size() + " gêneros não associados.");

        generoRepository.deleteAll(generosSemAssociacao);
    }

    public List<Genero> findGenerosByGeneroContaining(String genero) {
        List<Genero> generos = generoRepository.findByGeneroContainingIgnoreCase(genero);
        if (generos.isEmpty()) {
            throw new NotFoundException("Nenhum gênero encontrado contendo: " + genero);
        }
        return generos;
    }

    public List<Genero> findGenerosByLivroId(Integer id) {
        return generoRepository.findGenerosByLivroId(id);
    }

    public List<Genero> cadastrarNovosGeneros(List<Genero> novosGeneros, Livro livro) {
        livrogeneroRepository.deleteByLivroId(livro.getId());

        return addGenero(novosGeneros, livro);
    }
}
