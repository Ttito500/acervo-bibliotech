package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.request.AlunoRequestDTO;
import com.bibliotech.bibliotech.dtos.response.AlunoResponseDTO;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.models.Aluno;
import com.bibliotech.bibliotech.services.TurmasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlunoMapper {

    @Autowired
    private static TurmaMapper turmaMapper;

    @Autowired
    private TurmasService turmasService;

    public Aluno toEntity(AlunoRequestDTO alunoRequestDTO) {
        Aluno aluno = new Aluno();

        aluno.setId(alunoRequestDTO.getId());
        aluno.setTurma(turmasService.getTurmaById(alunoRequestDTO.getIdTurma()));
        aluno.setNome(alunoRequestDTO.getNome());
        aluno.setEmail(alunoRequestDTO.getEmail());
        aluno.setTelefone(alunoRequestDTO.getTelefone());
        aluno.setSituacao(alunoRequestDTO.getSituacao());

        return aluno;
    }

    public static AlunoResponseDTO toAlunoResponseDTO(Aluno aluno) {
        AlunoResponseDTO dto = new AlunoResponseDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setEmail(aluno.getEmail());
        dto.setTelefone(aluno.getTelefone());

        if (aluno.getTurma() != null) {
            dto.setTurma(turmaMapper.toTurmaResponseDTO(aluno.getTurma()));
        }

        dto.setSituacao(aluno.getSituacao());
        dto.setAtivo(aluno.getAtivo());

        return dto;
    }

    public static List<AlunoResponseDTO> toAlunoResponseDTOList(List<Aluno> alunos) {
        return alunos.stream()
                .map(AlunoMapper::toAlunoResponseDTO)
                .collect(Collectors.toList());
    }
}