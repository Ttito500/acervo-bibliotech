package com.bibliotech.bibliotech.dtos.mappers;

import com.bibliotech.bibliotech.dtos.AutorDTO;
import com.bibliotech.bibliotech.models.Autor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class AutorMapper {

    public static AutorDTO toDTO(Autor autor) {
        if (autor == null) return null;
        AutorDTO dto = new AutorDTO();
        dto.setId(autor.getId());
        dto.setNome(autor.getNome());
        return dto;
    }

    public static Autor toEntity(AutorDTO dto) {
        if (dto == null) return null;
        Autor entity = new Autor();
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        return entity;
    }

    public static List<AutorDTO> toDTOList(List<Autor> autores) {
        if (autores == null) return new ArrayList<>();
        return autores.stream().map(AutorMapper::toDTO).collect(Collectors.toList());
    }

    public static List<Autor> toEntityList(List<AutorDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().map(AutorMapper::toEntity).collect(Collectors.toList());
    }
}