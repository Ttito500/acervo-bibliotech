package com.bibliotech.bibliotech.dtos.response.mappers;

import com.bibliotech.bibliotech.dtos.response.UsuarioResponseDTO;
import com.bibliotech.bibliotech.models.Usuario;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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

    public Usuario toEntity(UsuarioResponseDTO dto) {
        if (dto == null) {
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setId(dto.getId());
        usuario.setNome(dto.getNome());
        usuario.setCargo(dto.getCargo());
        usuario.setAtivo(dto.getAtivo());
        usuario.setEmail(dto.getEmail());
        usuario.setDataUltimoAcesso(dto.getDataUltimoAcesso());

        return usuario;
    }

    public List<UsuarioResponseDTO> toDtoList(List<Usuario> usuarios) {
        if (usuarios == null || usuarios.isEmpty()) {
            return new ArrayList<>();
        }

        List<UsuarioResponseDTO> dtos = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            dtos.add(toDto(usuario));
        }
        return dtos;
    }
}
