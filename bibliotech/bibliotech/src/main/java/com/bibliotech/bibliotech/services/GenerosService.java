package com.bibliotech.bibliotech.services;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.repositories.GeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenerosService {
    @Autowired
    private GeneroRepository generoRepository;

    public Genero criarSecao(Genero genero) {
        generoRepository.save(genero);
        return genero;
    }

    public Genero deletarSecao (Integer id) {
        Genero genero = generoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Genero com ID " + id + " não encontrado"));

        generoRepository.delete(genero);
        return genero;
    }

    public List<Genero> getGeneros() {
        return generoRepository.findAll();
    }

    public Genero getGeneroById(Integer id) {
        return generoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Gênero com ID " + id + " não encontrado"));
    }

    public List<Genero> filtrarGenero(String genero) {
        return generoRepository.filtrarGeneros(genero);
    }


}
