package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.exception.ValidationException;
import com.bibliotech.bibliotech.models.Turma;
import com.bibliotech.bibliotech.models.Usuario;
import com.bibliotech.bibliotech.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("")
    public ResponseEntity<Usuario> criarUsuario (@Valid @RequestBody Usuario body, BindingResult result){
        if (result.hasErrors()) {
            throw new ValidationException(result);
        }

        Usuario usuario = usuarioService.cadastrarUsuario(body);
        URI location = URI.create("/usuarios/" + usuario.getId());
        return ResponseEntity.created(location).body(usuario);
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

}
