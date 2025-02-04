package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Secao;
import com.bibliotech.bibliotech.repositories.SecaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SecoesService {

    @Autowired
    private SecaoRepository secaoRepository;

    public Secao criarSecao (Secao secao) {
        if (secao.getNome() == null || secao.getNome().isEmpty()) {
            throw new ValidationException("O nome da seção não pode ser vazio.");
        }
        if (secaoRepository.existsByNome(secao.getNome())) {
            throw new ValidationException("Já existe uma seção com esse nome.");
        }
        secaoRepository.save(secao);
        return secao;
    }

    public void deletarSecao (Integer id) {
        Secao secao = secaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Seção com ID " + id + " não encontrada."));
        secaoRepository.delete(secao);
    }

    public Secao atualizarSecao (Integer id, Secao secao) {
        Secao secaoExistente = secaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Seção com ID " + id + " não encontrada."));

        if (secaoRepository.existsByNome(secao.getNome())) {
            throw new ValidationException("Já existe uma seção com esse nome.");
        }

        secaoExistente.setNome(secao.getNome());
        secaoExistente.setDescricao(secao.getDescricao());

        secaoRepository.save(secaoExistente);
        return secaoExistente;
    }

    public List<Secao> getSecoes(){ return secaoRepository.findAll(); }

    public Secao getSecao(Integer id){
        return secaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Seção com ID " + id + " não encontrada"));
    }

}
