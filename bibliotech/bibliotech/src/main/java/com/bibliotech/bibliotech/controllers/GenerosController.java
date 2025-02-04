package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.services.GenerosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/generos")
public class GenerosController {

    @Autowired
    private GenerosService generosService;

    @GetMapping("")
    public ResponseEntity<List<Genero>> listarGeneros() {
        return ResponseEntity.ok(generosService.getAllGeneros());
    }

    @PostMapping("")
    public ResponseEntity<List<Genero>> adicionarGeneros(@RequestBody List<Genero> generos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(generosService.addGenero(generos));
    }

    @GetMapping("/buscar")
    public ResponseEntity<Optional<Genero>> buscarGeneroPorGenero(@RequestParam String genero) {
        return ResponseEntity.ok(generosService.findGeneroByGenero(genero));
    }

    @DeleteMapping("/sem-associacao")
    public ResponseEntity<Void> deletarGeneroSemAssociacao() {
        generosService.removeGenerosWithNoAssociation();
        return ResponseEntity.noContent().build();
    }
}
