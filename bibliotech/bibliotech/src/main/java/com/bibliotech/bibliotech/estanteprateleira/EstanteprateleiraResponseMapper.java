package com.bibliotech.bibliotech.estanteprateleira;

public class EstanteprateleiraResponseMapper {

    public static EstanteprateleiraDTO toDTO(Estanteprateleira entity) {
        if (entity == null) {
            return null;
        }

        EstanteprateleiraDTO dto = new EstanteprateleiraDTO();
        dto.setId(entity.getId());
        dto.setEstante(entity.getEstante());
        dto.setPrateleira(entity.getPrateleira());
        return dto;
    }

    public static Estanteprateleira toEntity(EstanteprateleiraDTO dto) {
        if (dto == null) {
            return null;
        }

        Estanteprateleira entity = new Estanteprateleira();
        entity.setEstante(dto.getEstante());
        entity.setPrateleira(dto.getPrateleira());
        return entity;
    }
}