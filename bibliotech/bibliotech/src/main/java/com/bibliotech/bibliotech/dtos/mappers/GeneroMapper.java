package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.GeneroDTO;
import com.bibliotech.bibliotech.models.Genero;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class GeneroMapper {

    public static GeneroDTO toDTO(Genero genero) {
        if (genero == null) return null;

        GeneroDTO dto = new GeneroDTO();
        dto.setId(genero.getId());
        dto.setGenero(genero.getGenero());

        return dto;
    }

    public static Genero toEntity(GeneroDTO dto) {
        if (dto == null) return null;

        Genero entity = new Genero();
        entity.setId(dto.getId());
        entity.setGenero(dto.getGenero());

        return entity;
    }

    public static List<GeneroDTO> toDTOList(List<Genero> generos) {
        if (generos == null) return new ArrayList<>();
        return generos.stream().map(GeneroMapper::toDTO).collect(Collectors.toList());
    }

    public static List<Genero> toEntityList(List<GeneroDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().map(GeneroMapper::toEntity).collect(Collectors.toList());
    }
}