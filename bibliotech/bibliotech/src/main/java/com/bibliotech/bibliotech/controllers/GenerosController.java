package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.services.GenerosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/generos")
public class GenerosController {

    @Autowired
    private GenerosService generosService;

    @PostMapping("")
    public ResponseEntity<Genero> adicionarGenero(@RequestBody Genero body) {
        Genero genero = generosService.criarGenero(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(genero);
    }

    @DeleteMapping("/sem-associacao")
    public ResponseEntity<Void> deleteGenero() {
        generosService.deletarGenerosSemAssociacao();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genero> getGeneroById(@PathVariable Integer id) {
        return ResponseEntity.ok(generosService.getGeneroById(id));
    }

    @GetMapping("/por-genero/{genero}")
    public Genero buscarGeneroPorGenero(@PathVariable String genero) {
        return generosService.buscarGeneroPorGenero(genero);
    }

    @GetMapping("")
    public List<Genero> listarGeneros() {
        return generosService.listarGeneros();
    }
}
