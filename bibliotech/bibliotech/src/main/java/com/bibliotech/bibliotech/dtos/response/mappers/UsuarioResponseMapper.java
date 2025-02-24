package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.UsuarioResponseDTO;
import com.bibliotech.bibliotech.models.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioResponseMapper {
    public UsuarioResponseDTO toDto(Usuario usuario) {
        if (usuario == null) {
            return null;
        }

        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setCargo(usuario.getCargo());
        dto.setAtivo(usuario.getAtivo());
        dto.setEmail(usuario.getEmail());
        dto.setDataUltimoAcesso(usuario.getDataUltimoAcesso());

        return dto;
    }

}
