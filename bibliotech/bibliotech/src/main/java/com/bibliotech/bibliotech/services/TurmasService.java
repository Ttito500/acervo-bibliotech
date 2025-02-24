package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.TurmaRequestDTO;
import com.bibliotech.bibliotech.dtos.request.mappers.TurmaRequestMapper;
import com.bibliotech.bibliotech.dtos.response.TurmaLeiturasDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.repositories.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TurmasService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private AlunosService alunosService;

    @Autowired
    private TurmaRequestMapper turmaRequestMapper;


    public Turma cadastrarTurma(TurmaRequestDTO requestDTO) {
        if (requestDTO.getSerie() == null || requestDTO.getSerie() < 1) {
            throw new ValidationException("Série é obrigatória e deve ser maior que zero.");
        }
        if (requestDTO.getTurma() == null || requestDTO.getTurma().length() > 1) {
            throw new ValidationException("Turma é obrigatória e deve ter no máximo 1 caractere.");
        }
        if (requestDTO.getAnoDeEntrada() == null || requestDTO.getAnoDeEntrada() <= 0) {
            throw new ValidationException("Ano de entrada é obrigatório e deve ser maior que zero.");
        }
        if (turmaRepository.existsBySerieAndTurmaAndAnoDeEntrada(requestDTO.getSerie(), requestDTO.getTurma(), requestDTO.getAnoDeEntrada())) {
            throw new ValidationException("Já existe uma turma com essa combinação de série, turma e ano de entrada.");
        }

        requestDTO.setTurma(requestDTO.getTurma().toUpperCase());

        Turma turma = turmaRequestMapper.toEntity(requestDTO);
        turma.setAtivo(true);
        return turmaRepository.save(turma);
    }

    public Turma getTurmaById(Integer id){
        return turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));
    }

    public List<Turma> filtrarTurmas(Integer serie, String turma, Integer anoDeEntrada, Boolean ativo) {
        if (turma != null) {
            turma = turma.toUpperCase();
        }

        return turmaRepository.filtrarTurmas(serie, turma, anoDeEntrada, ativo);
    }

    public Turma alterarTurma(Integer id, TurmaRequestDTO novaTurmaDTO) {
        Turma turmaExistente = turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));

        if (novaTurmaDTO.getSerie() == null || novaTurmaDTO.getSerie() < 1) {
            throw new ValidationException("Série é obrigatória e deve ser maior que zero.");
        }
        if (novaTurmaDTO.getTurma() == null || novaTurmaDTO.getTurma().length() > 1) {
            throw new ValidationException("Turma é obrigatória e deve ter no máximo 1 caractere.");
        }
        if (novaTurmaDTO.getAnoDeEntrada() == null || novaTurmaDTO.getAnoDeEntrada() <= 0) {
            throw new ValidationException("Ano de entrada é obrigatório e deve ser maior que zero.");
        }
        if (turmaRepository.existsBySerieAndTurmaAndAnoDeEntrada(novaTurmaDTO.getSerie(), novaTurmaDTO.getTurma(), novaTurmaDTO.getAnoDeEntrada())) {
            throw new ValidationException("Já existe uma turma com essa combinação de série, turma e ano de entrada.");
        }

        turmaExistente.setSerie(novaTurmaDTO.getSerie());
        turmaExistente.setTurma(novaTurmaDTO.getTurma().toUpperCase());
        turmaExistente.setAnoDeEntrada(novaTurmaDTO.getAnoDeEntrada());

        return turmaRepository.save(turmaExistente);
    }

    public void inativarTurma(Integer id) {

        Turma turmaExistente = turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));

        alunosService.inativarAlunosPorTurma(turmaExistente);
        turmaExistente.setAtivo(false);
        turmaRepository.save(turmaExistente);
    }

    public void ativarTurma(Integer id) {
        Turma turmaExistente = turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Turma com ID " + id + " não encontrada."));

        alunosService.ativarAlunosPorTurma(turmaExistente);
        turmaExistente.setAtivo(true);
        turmaRepository.save(turmaExistente);
    }

    public List<TurmaLeiturasDTO> obterTurmasMaisLeitoras(LocalDate dataInicio, LocalDate dataFim, Integer qtdMax) {
        if (dataInicio == null) {
            throw new ValidationException("A data de início é obrigatória.");
        } else if (dataFim == null) {
            dataFim = LocalDate.now();
        } else if (dataInicio.isAfter(dataFim)) {
            throw new ValidationException("A data de início deve ser anterior à data final.");
        }

        List<TurmaLeiturasDTO> result = turmaRepository.obterTurmasMaisLeitoras(dataInicio, dataFim);

        if (qtdMax != null && result.size() > qtdMax) {
            return result.subList(0, qtdMax);
        }

        return result;
    }
}