package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.dtos.AutenticacaoDTO;
import com.bibliotech.bibliotech.dtos.request.UsuarioRequestDTO;
import com.bibliotech.bibliotech.dtos.request.UsuarioRequestPatchDTO;
import com.bibliotech.bibliotech.dtos.request.mappers.UsuarioRequestMapper;
import com.bibliotech.bibliotech.dtos.request.mappers.UsuarioRequestPatchMapper;
import com.bibliotech.bibliotech.dtos.response.LoginResponseDTO;
import com.bibliotech.bibliotech.dtos.response.UsuarioResponseDTO;
import com.bibliotech.bibliotech.dtos.response.mappers.UsuarioResponseMapper;
import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.repositories.UsuarioRepository;
import com.bibliotech.bibliotech.services.TokenService;
import com.bibliotech.bibliotech.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioResponseMapper usuarioResponseMapper;

    @Autowired
    private UsuarioRequestMapper usuarioRequestMapper;

    @Autowired
    private UsuarioRequestPatchMapper usuarioRequestPatchMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("")
    public ResponseEntity<UsuarioResponseDTO> criarUsuario (@Valid @RequestBody UsuarioRequestDTO body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return ResponseEntity.ok(usuarioResponseMapper.toDto(usuarioService.cadastrarUsuario(usuarioRequestMapper.toEntity(body))));
    }


    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> getUsuarioById(@PathVariable Integer id){
        return ResponseEntity.ok(usuarioResponseMapper.toDto(usuarioService.getUsuarioById(id)));
    }

    @GetMapping("/filtrar")
    public List<UsuarioResponseDTO> filtrarUsuarios(@RequestParam(required = false) String nome,
                                     @RequestParam(required = false) String cargo,
                                     @RequestParam(required = false) Boolean ativo) {
        return usuarioResponseMapper.toDtoList(usuarioService.filtrarUsuarios(nome, cargo, ativo));
    }

    @PutMapping ("/{id}")
    public ResponseEntity<UsuarioResponseDTO> alterarUsuario(@PathVariable Integer id, @Valid @RequestBody UsuarioRequestPatchDTO body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        return ResponseEntity.ok(usuarioResponseMapper.toDto(usuarioService.alterarUsuario(id, usuarioRequestPatchMapper.toEntity(body))));
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

            Usuario usuario = usuarioRepository.getUsuariosByEmailAndAtivoTrue(autenticacaoDTO.getEmail());
            usuario.setDataUltimoAcesso(LocalDate.now().atStartOfDay(ZoneId.of("America/Sao_Paulo")).toInstant());
            usuarioService.alterarUsuario(usuario.getId(), usuario);

            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (AuthenticationException e) {
            throw new ValidationException("Email ou senha incorretos.");
        }
    }

}
