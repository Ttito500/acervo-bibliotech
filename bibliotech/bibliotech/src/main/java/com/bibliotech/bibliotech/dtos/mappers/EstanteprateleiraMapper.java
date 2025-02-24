package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.EstanteprateleiraDTO;
import com.bibliotech.bibliotech.models.Estanteprateleira;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class EstanteprateleiraMapper {

    public static EstanteprateleiraDTO toDTO(Estanteprateleira estanteprateleira) {
        if (estanteprateleira == null) return null;
        EstanteprateleiraDTO dto = new EstanteprateleiraDTO();
        dto.setId(estanteprateleira.getId());
        dto.setEstante(estanteprateleira.getEstante().toUpperCase());
        dto.setPrateleira(estanteprateleira.getPrateleira());
        return dto;
    }

    public static Estanteprateleira toEntity(EstanteprateleiraDTO dto) {
        if (dto == null) return null;
        Estanteprateleira entity = new Estanteprateleira();
        entity.setId(dto.getId());
        entity.setEstante(dto.getEstante().toUpperCase());
        entity.setPrateleira(dto.getPrateleira());
        return entity;
    }

    public static List<EstanteprateleiraDTO> toDTOList(List<Estanteprateleira> estanteprateleiras) {
        if (estanteprateleiras == null) return new ArrayList<>();
        return estanteprateleiras.stream().map(EstanteprateleiraMapper::toDTO).collect(Collectors.toList());
    }

    public static List<Estanteprateleira> toEntityList(List<EstanteprateleiraDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().map(EstanteprateleiraMapper::toEntity).collect(Collectors.toList());
    }
}