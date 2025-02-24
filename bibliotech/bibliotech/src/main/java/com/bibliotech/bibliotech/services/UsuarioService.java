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

    private UsuarioRepository usuarioRepository;
    private UsuarioRequestMapper requestMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioRequestMapper usuarioRequestMapper) {
        this.usuarioRepository = usuarioRepository;
        this.requestMapper = usuarioRequestMapper;
    }

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

    public Usuario buscarUsuarioAlunoMonitorPorId(Integer id) {
        return usuarioRepository.findByIdAndCargo(id, "aluno_monitor")
                .orElseThrow(() -> new NotFoundException("Usuário com o cargo de aluno_monitor não encontrado."));
    }

    public List<Usuario> filtrarUsuarios(String nome, String cargo, Boolean ativo) {
        return usuarioRepository.filtrarUsuarios(nome, cargo, ativo);
    }

    public Usuario alterarUsuario(Integer id, Usuario novoUsuario) {
        Usuario usuarioExistente = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new NotFoundException("Usuario com ID " + id + " não encontrado."));

        if (novoUsuario.getNome() == null || novoUsuario.getNome().isEmpty()) {
            throw new ValidationException("O nome do usuário é obrigatório.");
        }
        if (novoUsuario.getEmail() == null || novoUsuario.getEmail().isEmpty()) {
            throw new ValidationException("O email do usuário é obrigatório.");
        }
        if (novoUsuario.getSenha() == null || novoUsuario.getSenha().isEmpty()) {
            throw new ValidationException("A senha do usuário é obrigatória.");
        }
        if (!novoUsuario.getCargo().equals("aluno_monitor") && !novoUsuario.getCargo().equals("bibliotecario")) {
            throw new ValidationException("Cargo invalido! Cargos válidos: 'aluno_monitor', 'bibliotecario'.");
        }
        if (novoUsuario.getAtivo() == null) {
            throw new ValidationException("O campo ativo é obrigatório");
        }
        if (usuarioRepository.existsByEmail(novoUsuario.getEmail())) {
            throw new ValidationException("Já existe um usuário cadastrado com esse e-mail.");
        }

        usuarioExistente.setNome(novoUsuario.getNome());
        usuarioExistente.setEmail(novoUsuario.getEmail());
        usuarioExistente.setSenha(novoUsuario.getSenha());
        usuarioExistente.setCargo(novoUsuario.getCargo());
        usuarioExistente.setAtivo(novoUsuario.getAtivo());

        return usuarioRepository.save(usuarioExistente);
    }

    public void inativarUsuario(Integer id) {

        Usuario usuarioExistente = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new NotFoundException("Usuario com ID " + id + " não encontrado."));

        usuarioExistente.setAtivo(false);
        usuarioRepository.save(usuarioExistente);
    }

    public void ativarUsuario(Integer id) {

        Usuario usuarioExistente = usuarioRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new NotFoundException("Usuario com ID " + id + " não encontrado."));

        usuarioExistente.setAtivo(true);
        usuarioRepository.save(usuarioExistente);
    }
}
