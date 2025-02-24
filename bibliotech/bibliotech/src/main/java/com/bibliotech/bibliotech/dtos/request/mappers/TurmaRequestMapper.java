package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.repositories.TurmaRepository;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.dtos.request.TurmaRequestDTO;
import org.springframework.stereotype.Component;

@Component
public class TurmaRequestMapper {
    private final TurmaRepository turmaRepository;

    public TurmaRequestMapper(TurmaRepository turmaRepository) {this.turmaRepository = turmaRepository;}

    public Turma toEntity(TurmaRequestDTO turmaRequestDTO) {
        Turma turma = new Turma();
        turma.setId(turmaRequestDTO.getId());
        turma.setSerie(turmaRequestDTO.getSerie());
        turma.setTurma(turmaRequestDTO.getTurma());
        turma.setAnoDeEntrada(turmaRequestDTO.getAnoDeEntrada());
        turma.setAtivo(turmaRequestDTO.isAtivo());

        return turma;
    }

}
