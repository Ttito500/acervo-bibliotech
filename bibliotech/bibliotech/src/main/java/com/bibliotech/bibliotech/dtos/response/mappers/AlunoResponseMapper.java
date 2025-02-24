package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.models.Aluno;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlunoResponseMapper {

    private static TurmaResponseMapper turmaResponseMapper;

    public AlunoResponseMapper(TurmaResponseMapper turmaResponseMapper) {
        this.turmaResponseMapper = turmaResponseMapper;
    }

    public static AlunoResponseDTO toDto(Aluno aluno) {
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

    public static List<AlunoResponseDTO> toDtoList(List<Aluno> alunos) {
        return alunos.stream()
                .map(AlunoResponseMapper::toDto)
                .collect(Collectors.toList());
    }
}