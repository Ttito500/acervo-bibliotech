package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.AutenticacaoDTO;
import com.bibliotech.bibliotech.dtos.request.UsuarioRequestDTO;
import com.bibliotech.bibliotech.dtos.request.mappers.UsuarioRequestMapper;
import com.bibliotech.bibliotech.dtos.response.LoginResponseDTO;
import com.bibliotech.bibliotech.dtos.response.UsuarioResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.UsuarioResponseMapper;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.services.TokenService;
import com.bibliotech.bibliotech.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRequestMapper usuarioRequestMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioResponseMapper usuarioResponseMapper;

    @PostMapping("")
    public ResponseEntity<UsuarioResponseDTO> criarUsuario (@Valid @RequestBody UsuarioRequestDTO body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        String senhaEncriptada = new BCryptPasswordEncoder().encode(body.getSenha());
        body.setSenha(senhaEncriptada);

        UsuarioResponseDTO usuario = usuarioResponseMapper.toDto(usuarioService.cadastrarUsuario(body));
        return ResponseEntity.ok(usuario);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer id){
        return ResponseEntity.ok(usuarioService.getUsuarioById(id));
    }

    @GetMapping("/filtrar")
    public List<Usuario> filtrarUsuarios(@RequestParam(required = false) String nome,
                                     @RequestParam(required = false) String cargo,
                                     @RequestParam(required = false) Boolean ativo) {
        return usuarioService.filtrarUsuarios(nome, cargo, ativo);
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Usuario> alterarUsuario(@PathVariable Integer id, @Valid @RequestBody Usuario body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        Usuario usuarioAtualizado = usuarioService.alterarUsuario(id, body);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Void> inativarUsuario(@PathVariable Integer id) {
        usuarioService.inativarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<Void> ativarUsuario(@PathVariable Integer id) {
        usuarioService.ativarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AutenticacaoDTO autenticacaoDTO) {
        try {
            var tokenAutenticacao = new UsernamePasswordAuthenticationToken(autenticacaoDTO.getEmail(), autenticacaoDTO.getSenha());
            var autenticacao = authenticationManager.authenticate(tokenAutenticacao);

            var token = tokenService.gerarToken((Usuario) autenticacao.getPrincipal());

            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (AuthenticationException e) {
            throw new ValidationException("Email ou senha incorretos.");
        }
    }

}
