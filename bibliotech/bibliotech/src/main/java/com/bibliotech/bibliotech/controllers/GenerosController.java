package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Genero;
import com.bibliotech.bibliotech.services.GenerosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/generos")
public class GenerosController {

    @Autowired
    private GenerosService generosService;

    @PostMapping("")
    public ResponseEntity<Genero> adicionarGenero(@RequestBody Genero body) {
        Genero genero = generosService.criarSecao(body);
        return ResponseEntity.ok(genero);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Genero> deleteGenero(@PathVariable Integer id) {
        Genero generoDeletado = generosService.deletarSecao(id);
        return ResponseEntity.ok().body(generoDeletado);
    }

    @GetMapping("")
    public ResponseEntity<List<Genero>> getGeneros() {
        List<Genero> generos = generosService.getGeneros();
        return ResponseEntity.ok(generos);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Genero> getGeneroById(@PathVariable Integer id) {
        return ResponseEntity.ok(generosService.getGeneroById(id));
    }

    @GetMapping("/filtrar")
    public List<Genero> filtrarGeneros(@RequestParam(required = false) String genero) {
        return generosService.filtrarGenero(genero);
    }
}
