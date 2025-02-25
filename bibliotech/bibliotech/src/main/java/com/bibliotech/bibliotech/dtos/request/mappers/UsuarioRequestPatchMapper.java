package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.UsuarioRequestPatchDTO;
import com.bibliotech.bibliotech.models.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UsuarioRequestPatchMapper {
    public Usuario toEntity(UsuarioRequestPatchDTO requestDTO){
        Usuario usuario = new Usuario();

        usuario.setNome(requestDTO.getNome());
        usuario.setCargo(requestDTO.getCargo());
        usuario.setEmail(requestDTO.getEmail());

        if (requestDTO.getSenha() != null) {
            usuario.setSenha(new BCryptPasswordEncoder().encode(requestDTO.getSenha()));
        }
        usuario.setAtivo(requestDTO.isAtivo());

        return usuario;
    }
}
