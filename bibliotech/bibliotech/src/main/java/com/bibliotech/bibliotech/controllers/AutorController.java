package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Autor;
import com.bibliotech.bibliotech.services.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/autor")
public class AutorController {

    @Autowired
    private AutorService autorService;

    @GetMapping("/buscar")
    public ResponseEntity<List<Autor>> buscarAutorPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(autorService.buscarPorNomeQueContem(nome));
    }

    @DeleteMapping("/sem-associacao")
    public ResponseEntity<Void> deletarAutoresSemAssociacao() {
        autorService.deletarAutoresSemAssociacao();
        return ResponseEntity.noContent().build();
    }
}