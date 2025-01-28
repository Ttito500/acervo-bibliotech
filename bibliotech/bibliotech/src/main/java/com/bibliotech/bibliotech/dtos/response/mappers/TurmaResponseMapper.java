package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.TurmaResponseDTO;
import com.bibliotech.bibliotech.models.Turma;
import org.springframework.stereotype.Component;

@Component
public class TurmaResponseMapper {

    public TurmaResponseDTO toDto(Turma turma) {
        if (turma == null) {
            return null;
        }

        TurmaResponseDTO dto = new TurmaResponseDTO();
        dto.setId(turma.getId());
        dto.setSerie(turma.getSerie());
        dto.setTurma(turma.getTurma());

        return dto;
    }
}