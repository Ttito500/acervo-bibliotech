package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.mappers.AlunoMapper;
import com.bibliotech.bibliotech.dtos.response.OcorrenciaResponseDTO;
import com.bibliotech.bibliotech.models.Ocorrencia;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OcorrenciaResponseMapper {
    private final AlunoMapper alunoMapper;
    private final UsuarioResponseMapper usuarioResponseMapper;

    public OcorrenciaResponseMapper(AlunoMapper alunoMapper, UsuarioResponseMapper usuarioResponseMapper) {
        this.alunoMapper = alunoMapper;
        this.usuarioResponseMapper = usuarioResponseMapper;
    }

    public OcorrenciaResponseDTO toDto(Ocorrencia ocorrencia) {
        if (ocorrencia == null) {
            return null;
        }

        OcorrenciaResponseDTO dto = new OcorrenciaResponseDTO();
        dto.setId(ocorrencia.getId());
        dto.setAluno(alunoMapper.toAlunoResponseDTO(ocorrencia.getAluno()));
        dto.setRegistradaPor(usuarioResponseMapper.toDto(ocorrencia.getRegistradaPor()));
        dto.setDetalhes(ocorrencia.getDetalhes());
        dto.setData(ocorrencia.getData());

        return dto;
    }

    public List<OcorrenciaResponseDTO> toDtoList(List<Ocorrencia> ocorrencias) {
        return ocorrencias.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
