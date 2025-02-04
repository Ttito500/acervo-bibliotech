package com.bibliotech.bibliotech.services;

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

    public Usuario cadastrarUsuario(Usuario usuario) {
        if (usuario.getNome() == null) {
            throw new ValidationException("O nome do usuário é obrigatório.");
        }
        if (usuario.getEmail() == null) {
            throw new ValidationException("O email do usuário é obrigatório.");
        }
        if (usuario.getSenha() == null) {
            throw new ValidationException("A senha do usuário é obrigatória.");
        }
        if (!usuario.getCargo().equals("aluno_monitor") && !usuario.getCargo().equals("bibliotecario")) {
            throw new ValidationException("Cargo invalido! Cargos válidos: 'aluno_monitor', 'bibliotecario'.");
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new ValidationException("Já existe um usuário cadastrado com esse e-mail.");
        }

        usuario.setAtivo(true);

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
