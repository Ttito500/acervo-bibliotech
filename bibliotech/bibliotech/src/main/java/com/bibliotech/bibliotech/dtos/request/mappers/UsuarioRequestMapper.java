package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.UsuarioRequestDTO;
import com.bibliotech.bibliotech.models.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UsuarioRequestMapper {
    public Usuario toEntity(UsuarioRequestDTO requestDTO){
        Usuario usuario = new Usuario();

        usuario.setNome(requestDTO.getNome());
        usuario.setCargo(requestDTO.getCargo());
        usuario.setEmail(requestDTO.getEmail());
        usuario.setSenha(new BCryptPasswordEncoder().encode(requestDTO.getSenha()));
        usuario.setAtivo(true);

        return usuario;
    }
}
