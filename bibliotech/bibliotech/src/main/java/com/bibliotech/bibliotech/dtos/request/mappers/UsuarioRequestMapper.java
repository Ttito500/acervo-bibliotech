package com.bibliotech.bibliotech.dtos.request.mappers;

import com.bibliotech.bibliotech.dtos.request.UsuarioRequestDTO;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioRequestMapper {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario toEntity(UsuarioRequestDTO requestDTO){
        Usuario usuario = new Usuario();

        //usuario.setId(requestDTO.getId());
        usuario.setNome(requestDTO.getNome());
        usuario.setCargo(requestDTO.getCargo());
        usuario.setEmail(requestDTO.getEmail());
        usuario.setSenha(requestDTO.getSenha());
        usuario.setAtivo(true);

        return usuario;
    }
}
