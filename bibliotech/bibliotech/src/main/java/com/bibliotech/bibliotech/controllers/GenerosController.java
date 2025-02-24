package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.services.GenerosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/generos")
public class GenerosController {

    @Autowired
    private GenerosService generosService;

    @GetMapping("/buscar")
    public ResponseEntity<List<Genero>> buscarGeneroPorGenero(@RequestParam String genero) {
        return ResponseEntity.ok(generosService.findGenerosByGeneroContaining(genero));
    }

    @DeleteMapping("/sem-associacao")
    public ResponseEntity<Void> deletarGeneroSemAssociacao() {
        generosService.removeGenerosWithNoAssociation();
        return ResponseEntity.noContent().build();
    }
}