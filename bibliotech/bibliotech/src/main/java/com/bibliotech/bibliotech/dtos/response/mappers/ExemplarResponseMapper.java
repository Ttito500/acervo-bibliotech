package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.ExemplarResponseDTO;
import com.bibliotech.bibliotech.models.Exemplar;

import java.util.List;
import java.util.stream.Collectors;

public class ExemplarResponseMapper {

    public static ExemplarResponseDTO toDTO(Exemplar entity) {
        ExemplarResponseDTO dto = new ExemplarResponseDTO();
        dto.setId(entity.getId());
        dto.setObservacao(entity.getObservacao());
        dto.setNumero(entity.getNumero());
        dto.setSituacao(entity.getSituacao());
        dto.setSecao(SecaoResponseMapper.toDTO(entity.getSecao()));
        dto.setEstanteprateleira(EstanteprateleiraResponseMapper.toDTO(entity.getEstanteprateleira()));

        return dto;
    }

    public static Exemplar toEntity(ExemplarResponseDTO dto) {
        Exemplar entity = new Exemplar();
        entity.setId(dto.getId());
        entity.setObservacao(dto.getObservacao());
        entity.setNumero(dto.getNumero());
        entity.setSituacao(dto.getSituacao());
        entity.setSecao(SecaoResponseMapper.toEntity(dto.getSecao()));
        entity.setEstanteprateleira(EstanteprateleiraResponseMapper.toEntity(dto.getEstanteprateleira()));

        return entity;
    }

    public static List<ExemplarResponseDTO> toDTOList(List<Exemplar> entities) {
        return entities.stream()
                .map(ExemplarResponseMapper::toDTO)
                .collect(Collectors.toList());
    }

}