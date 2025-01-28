package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.stereotype.Component;

@Component
public class AlunoResponseMapper {

    private final TurmaResponseMapper turmaResponseMapper;

    public AlunoResponseMapper(TurmaResponseMapper turmaResponseMapper) {
        this.turmaResponseMapper = turmaResponseMapper;
    }

    public AlunoResponseDTO toDto(Aluno aluno) {
        if (aluno == null) {
            return null;
        }

        AlunoResponseDTO dto = new AlunoResponseDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setEmail(aluno.getEmail());
        dto.setTelefone(aluno.getTelefone());

        if (aluno.getTurma() != null) {
            dto.setTurma(turmaResponseMapper.toDto(aluno.getTurma()));
        }

        dto.setSituacao(aluno.getSituacao());
        dto.setAtivo(aluno.getAtivo());

        return dto;
    }
}