package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurmasService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private AlunosService alunosService;

    public Turma cadastrarTurma(Turma turma) {
        if (turma.getSerie() == null || turma.getSerie() < 1) {
            throw new ValidationException("Série é obrigatória e deve ser maior que zero.");
        }
        if (turma.getTurma() == null || turma.getTurma().length() > 1) {
            throw new ValidationException("Turma é obrigatória e deve ter no máximo 1 caractere.");
        }
        if (turma.getAnoDeEntrada() == null || turma.getAnoDeEntrada() <= 0) {
            throw new ValidationException("Ano de entrada é obrigatório e deve ser maior que zero.");
        }
        if (turmaRepository.existsBySerieAndTurmaAndAnoDeEntrada(turma.getSerie(), turma.getTurma(), turma.getAnoDeEntrada())) {
            throw new ValidationException("Já existe uma turma com essa combinação de série, turma e ano de entrada.");
        }

        turma.setAtivo(true);
        turma.setTurma(turma.getTurma().toUpperCase());

        return turmaRepository.save(turma);
    }

    public Turma getTurmaById(Integer id){
        return turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));
    }

    public List<Turma> filtrarTurmas(Integer serie, String turma, Integer anoDeEntrada, Boolean ativo) {
        return turmaRepository.filtrarTurmas(serie, turma, anoDeEntrada, ativo);
    }

    public Turma alterarTurma(Integer id, Turma novaTurma) {
        Turma turmaExistente = turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));

        if (turmaRepository.existsBySerieAndTurmaAndAnoDeEntrada(novaTurma.getSerie(), novaTurma.getTurma(), novaTurma.getAnoDeEntrada())) {
            throw new ValidationException("Já existe uma turma com essa combinação de série, turma e ano de entrada.");
        }

        turmaExistente.setSerie(novaTurma.getSerie());
        turmaExistente.setTurma(novaTurma.getTurma().toUpperCase());
        turmaExistente.setAnoDeEntrada(novaTurma.getAnoDeEntrada());

        return turmaRepository.save(turmaExistente);
    }

    public void inativarTurma(Integer id) {

        Turma turmaExistente = turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));

        alunosService.inativarAlunosPorTurma(turmaExistente);
        turmaExistente.setAtivo(false);
        turmaRepository.save(turmaExistente);
    }
}