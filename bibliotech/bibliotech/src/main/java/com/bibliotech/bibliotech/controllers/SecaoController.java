package com.bibliotech.bibliotech.controllers;

import com.bibliotech.bibliotech.models.Secao;
import com.bibliotech.bibliotech.services.SecoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/secoes")
public class SecaoController {

    @Autowired
    private SecoesService secaoService;

    @PostMapping ("")
    public ResponseEntity<Secao> cadastrarSecao(@RequestBody Secao request) {
        return ResponseEntity.ok(secaoService.criarSecao(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarSecao(@PathVariable Integer id) {
        return ResponseEntity.ok(secaoService.deletarSecao(id));
    }

    @GetMapping("")
    public ResponseEntity<List<Secao>> getSecoes() {
        return ResponseEntity.ok(secaoService.getSecoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Secao> getSecaoById(@PathVariable Integer id) {
        return ResponseEntity.ok(secaoService.getSecaoById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Secao> atualizarSecao(@PathVariable Integer id, @RequestBody Secao request) {
        return ResponseEntity.ok(secaoService.atualizarSecao(id, request));
    }
}
