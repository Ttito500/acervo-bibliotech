package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.FrequenciaAlunosResponseDTO;
import com.bibliotech.bibliotech.models.FrequenciaAlunos;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FrequenciaAlunosResponseMapper {

    private final AlunoResponseMapper alunoResponseMapper;
    private final UsuarioResponseMapper usuarioResponseMapper;

    public FrequenciaAlunosResponseMapper(AlunoResponseMapper alunoResponseMapper, UsuarioResponseMapper usuarioResponseMapper) {
        this.alunoResponseMapper = alunoResponseMapper;
        this.usuarioResponseMapper = usuarioResponseMapper;
    }

    public FrequenciaAlunosResponseDTO toDto(FrequenciaAlunos frequenciaAlunos) {
        if (frequenciaAlunos == null) {
            return null;
        }

        FrequenciaAlunosResponseDTO dto = new FrequenciaAlunosResponseDTO();
        dto.setId(frequenciaAlunos.getId());
        dto.setAluno(alunoResponseMapper.toDto(frequenciaAlunos.getAluno()));
        dto.setRegistradaPor(usuarioResponseMapper.toDto(frequenciaAlunos.getRegistradaPor()));
        dto.setAtividade(frequenciaAlunos.getAtividade());
        dto.setData(frequenciaAlunos.getData());

        return dto;
    }

    public List<FrequenciaAlunosResponseDTO> toDtoList(List<FrequenciaAlunos> frequenciaAlunos) {
        return frequenciaAlunos.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
