package com.bibliotech.bibliotech.services;

import com.bibliotech.bibliotech.dtos.request.UsuarioRequestDTO;
import com.bibliotech.bibliotech.dtos.request.mappers.UsuarioRequestMapper;
import com.bibliotech.bibliotech.exception.NotFoundException;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Locale;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioRequestMapper requestMapper;

    public Usuario cadastrarUsuario(UsuarioRequestDTO usuarioRequestDTO) {
        if (usuarioRepository.existsByEmail(usuarioRequestDTO.getEmail())) {
            throw new ValidationException("Já existe um usuário cadastrado com esse e-mail.");
        }

        Usuario usuario = requestMapper.toEntity(usuarioRequestDTO);

        return usuarioRepository.save(usuario);
    }
    public Usuario getUsuarioById(Integer id){
        return usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new NotFoundException("Usuario com ID " + id + " não encontrado."));
    }

    public List<Usuario> filtrarUsuarios(String nome, String cargo, Boolean ativo) {
        return usuarioRepository.filtrarUsuarios(nome, cargo, ativo);
    }

    public Usuario alterarUsuario(Integer id, Usuario novoUsuario) {
        Usuario usuarioExistente = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new NotFoundException("Usuario com ID " + id + " não encontrado."));

        if (!novoUsuario.getCargo().equals("aluno_monitor") && !novoUsuario.getCargo().equals("bibliotecario")) {
            throw new ValidationException("Cargo invalido! Cargos válidos: 'aluno_monitor', 'bibliotecario'.");
        }
        if (usuarioRepository.existsByEmail(novoUsuario.getEmail()) && !usuarioExistente.getEmail().equals(novoUsuario.getEmail())) {
            throw new ValidationException("Já existe um usuário cadastrado com esse e-mail.");
        }

        usuarioExistente.setNome(novoUsuario.getNome());
        usuarioExistente.setEmail(novoUsuario.getEmail());
        usuarioExistente.setSenha(novoUsuario.getSenha());
        usuarioExistente.setCargo(novoUsuario.getCargo());

        return usuarioRepository.save(usuarioExistente);
    }

    public void inativarUsuario(Integer id) {

        Usuario usuarioExistente = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new NotFoundException("Usuario com ID " + id + " não encontrado."));

        usuarioExistente.setAtivo(false);
        usuarioRepository.save(usuarioExistente);
    }
}
