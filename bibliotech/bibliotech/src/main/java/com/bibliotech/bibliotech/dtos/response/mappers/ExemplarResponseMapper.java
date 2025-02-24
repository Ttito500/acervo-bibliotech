package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.ExemplarResponseDTO;
import com.bibliotech.bibliotech.models.Exemplar;
import org.springframework.stereotype.Component;

@Component
public class ExemplarResponseMapper {
    public ExemplarResponseDTO toDTO(Exemplar exemplar) {
        ExemplarResponseDTO dto = new ExemplarResponseDTO();

        dto.setIdExemplar(exemplar.getId());
        dto.setTituloExemplar(exemplar.getLivro().getTitulo());
        dto.setSecaoExemplar(exemplar.getSecao().getNome());

        return dto;
    }
}
