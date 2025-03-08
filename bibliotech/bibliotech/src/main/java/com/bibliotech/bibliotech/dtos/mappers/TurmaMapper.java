package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.response.TurmaResponseDTO;
import com.bibliotech.bibliotech.models.Turma;
import org.springframework.stereotype.Component;

@Component
public class TurmaMapper {
    public static TurmaResponseDTO toTurmaResponseDTO(Turma turma) {
        TurmaResponseDTO dto = new TurmaResponseDTO();
        dto.setId(turma.getId());
        dto.setSerie(turma.getSerie());
        dto.setTurma(turma.getTurma());
        dto.setAnoDeEntrada(turma.getAnoDeEntrada());
        dto.setAtivo(turma.isAtivo());

        return dto;
    }
}
