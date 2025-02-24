package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.SecaoResponseDTO;
import com.bibliotech.bibliotech.models.Secao;

public class SecaoResponseMapper {

    public static SecaoResponseDTO toDTO(Secao secao) {
        SecaoResponseDTO dto = new SecaoResponseDTO();
        dto.setId(secao.getId());
        dto.setNome(secao.getNome());
        dto.setDescricao(secao.getDescricao());

        return dto;
    }

    public static Secao toEntity(SecaoResponseDTO dto) {
        Secao secao = new Secao();
        secao.setNome(dto.getNome());
        secao.setDescricao(dto.getDescricao());

        return secao;
    }
}